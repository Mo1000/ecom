import {ProductModel} from "@/models/product.model.ts";
import {FC, useState} from "react";
import {IoHeart, IoHeartOutline} from "react-icons/io5";
import {FaEye} from "react-icons/fa";
import {optimizeUrl} from "@/utils";
import {MdDelete, MdOutlineShoppingCart, MdOutlineSystemUpdate} from "react-icons/md";
import ProductService from "@/services/product.service.ts";
import {notify} from "@/utils/toast.ts";
import {useMainContext} from "@/hooks/useMainContext.tsx";
import {SwalCustom} from "@/utils/swalUtils.ts";
import {Link} from "react-router-dom";

interface Props {
    product: ProductModel;

}

const ProductCard: FC<Props> = (props) => {
    const {setProductList} = useMainContext()
    const {product} = props;
    const [heartClick, setHeartClick] = useState(false)
    const handleDeleteItem = async () => {
        const request = async () => {
            try {
                await ProductService.deleteProduct(product.objectId);
                setProductList((prev) => {
                    return prev.filter((item) => item.objectId != product.objectId)
                })
                notify("Delete successfully", {
                    type: 'success',
                });

            } catch (e) {
                notify('Delete failed', {
                    type: 'error',
                });
            }
        };

        await SwalCustom.fire({
            html: `<div >
                Are you sure you want to remove<span class="text-blue-500"> ${product?.title} </span></div>`,
            showDenyButton: true,
            icon: 'warning',
            confirmButtonText: "Yes",
            denyButtonText: 'No',
            reverseButtons: true,
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !SwalCustom.isLoading(),
            preConfirm: request
        });

    }
    return (
        <div>
            <div className="card-icons-img h-[250px] w-[270px] bg-gray-100 flex items-center justify-center relative">
                <div className="absolute  right-2 top-3 space-y-3 z-10">
                    <div
                        className="heart-icon bg-white rounded-full w-8 h-8 flex justify-center items-center cursor-pointer"
                        title="heart"
                        onClick={() => setHeartClick(!heartClick)}>
                        {heartClick ? <IoHeart size={21} className="text-red-500"/> :
                            <IoHeartOutline size={21} className="text-gray-400"/>}
                    </div>

                    <div
                        className="eye-icon bg-white rounded-full w-8 h-8 flex justify-center items-center cursor-pointer">
                        <FaEye className="fill-gray-400 hover:fill-red-500"/>
                    </div>
                    <Link
                        className="eye-icon bg-white rounded-full w-8 h-8 flex justify-center items-center cursor-pointer"
                        title="update"
                        to={`/product/update/${product.objectId}`}
                    >

                        <MdOutlineSystemUpdate size={21} className="fill-blue-500 hover:fill-blue-600"/>
                    </Link>
                    <div
                        className="eye-icon bg-white rounded-full w-8 h-8 flex justify-center items-center cursor-pointer"
                        title="delete"
                        onClick={handleDeleteItem}>
                        <MdDelete size={21} className="fill-red-500 hover:fill-red-600"/>
                    </div>
                </div>
                {product.reductionPercent && <div
                    className="reduction-price absolute left-2 top-3 rounded px-3 py-1 bg-red-500 text-white text-sm">
                    {product.reductionPercent}
                </div>}
                <picture className="w-2/3 hover:opacity-75">
                    <img src={optimizeUrl(product.image).toURL()} alt="card product"
                    />
                </picture>

                <div
                    className="add-to-card-section absolute cursor-pointer bottom-0 hidden w-full h-11 bg-black text-white text-xl hover:text-red-100  justify-center items-center gap-3 ">
                    <MdOutlineShoppingCart className="fill-white"/>
                    <span> Add To Cart</span>
                </div>


            </div>
            <div className="text-price-Container space-y-3 my-4">
                <div className="text-card text-base">
                    {product.title}
                </div>
                <div className="flex gap-3">
                    <span className="final-price-card text-red-500">
                        {product.finalPrice}
                    </span>
                    <span className="previous-price-card line-through text-gray-400">
                        {product.previousPrice}
                    </span>
                </div>
                <div className="star-container flex gap-2">
                    <picture className="flex gap-2">
                        {product?.stars && Array.from({length: product.stars.total}, (_, index) => (
                            <img key={index} src="/images/product/star.png" alt="card product" height={20} width={20}/>
                        ))}
                    </picture>
                    {product.stars?.number && <span className="text-gray-400">
                       ({product.stars.number})
                    </span>}
                </div>

                {product?.sizeList && product.sizeList.length > 0 &&
                    <div className="color-list flex gap-2 items-center">
                        {product.sizeList.map((size, index) => (
                            <div key={index}
                                 className="rounded-md px-2 py-1 hover:ring-1 ring-black  cursor-pointer shadow-md "
                            >
                                {size}
                            </div>
                        ))}
                    </div>}
                {product?.colorList && product.colorList.length > 0 &&
                    <div className="color-list flex gap-2 items-center">
                        {product.colorList.map((backgroundColor, index) => (
                            <div key={index}
                                 className="w-5 h-5 rounded-full hover:ring-1 ring-black  cursor-pointer shadow-md "
                                 style={{
                                     backgroundColor
                                 }}/>
                        ))}
                    </div>}


            </div>
        </div>
    );
};

export default ProductCard;
