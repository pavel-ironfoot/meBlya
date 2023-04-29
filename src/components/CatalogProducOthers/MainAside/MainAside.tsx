import { Route, Routes } from "react-router";

import { Header } from "../Header";
import { Footer } from "../../HomePage/Footer";

import './MainAside.scss';
import { ProductPage } from "../ProductPage";
import { Checkout } from "../../Basket/Checkout";
import { AccauntMain } from "../../PersonalAccaunt/AccauntMain";

export const MainAside = () =>{
    return (
        <div className="main-aside">
            <Header />
            <Routes>
                <Route path='/product-page/:productId' element= {<ProductPage />}/>
                <Route path="/checkout" element={<Checkout />} />
                <Route path='/personal-accaunt/*' element={<AccauntMain />} />
            </Routes>
            <Footer />
        </div>
    );
}

