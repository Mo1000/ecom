import "./App.css";
import { Route, Routes } from "react-router-dom";
import Root from "./pages/Root.tsx";
import CreateProduct from "./pages/product/CreateProduct.tsx";
import Header from "./pages/Header.tsx";
import Product from "./pages/product/Product.tsx";
import { ToastContainer } from "react-toastify";
import UpdateProduct from "@/pages/product/UpdateProduct.tsx";
//import MeiliSearch from "@/pages/MeiLiSearch.tsx";

function App() {
  return (
    <>
      <Header />

      <div className="px-8 py-5">
        <AppRouting />
      </div>
      <ToastContainer />
    </>
  );
}

function AppRouting() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      {/*<Route path="/search" element={<MeiliSearch />} />*/}
      <Route path="/product" element={<Product />}>
        <Route path="create" element={<CreateProduct />} />
        <Route path="update/:objectId" element={<UpdateProduct />} />
      </Route>
    </Routes>
  );
}

export default App;
