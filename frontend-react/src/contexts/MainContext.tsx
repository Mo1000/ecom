import React, {PropsWithChildren} from "react";
import {ProductModel} from "../models/product.model.ts";

type MainContextType = {
    productList: ProductModel[];
    setProductList: React.Dispatch<React.SetStateAction<ProductModel[]>>;

}
const initialMainContext: MainContextType = {
    productList: [],
    setProductList: () => {
    },
}

export const MainContext = React.createContext<MainContextType>(initialMainContext);

const MainContextProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [productList, setProductList] = React.useState<ProductModel[]>([]);
    return (
        <MainContext.Provider value={{productList, setProductList}}>
            {children}
        </MainContext.Provider>
    );
};
export default MainContextProvider;
