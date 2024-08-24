import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductModel } from "@/models/product.model.ts";
import ProductService from "@/services/product.service.ts";
import AddProduct from "@/components/product/AddProduct.tsx";
import { BounceLoader } from "react-spinners";
//@ts-ignore
import Parse from "@/utils/parse/index.ts";
const UpdateProduct = () => {
  const { objectId } = useParams<{ objectId: string }>();
  const [product, setProduct] = useState<ProductModel | undefined>(undefined);
  useEffect(() => {
    if (objectId) {
      (async () => {
        const res = await ProductService.getProductById(objectId);
        setProduct(res);
      })();
    }
    (async () => {
      console.log(new Date());

      const a = new Parse.Query("test");
      const d = await a.equalTo("name", new Date()).find();

      console.log(d);
    })();
  }, [objectId]);
  return (
    <>
      {product ? (
        <AddProduct isUpdate product={product} />
      ) : (
        <div className="w-full h-[40vh] flex justify-center items-center">
          <BounceLoader color="#3376e8" />
        </div>
      )}
    </>
  );
};

export default UpdateProduct;
