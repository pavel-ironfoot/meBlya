import { Route, Routes } from "react-router";

import { Header } from "../Header";
import { Footer } from "../../HomePage/Footer";
import { ProductPage } from "../ProductPage";
import { Checkout } from "../../Basket/Checkout";
import { AccauntMain } from "../../PersonalAccaunt/AccauntMain";
import { CheckoutSuccessfully } from "../../Basket/CheckoutSuccessfully";
import { Partners } from "../Partners";
import { AboutUs } from "../AboutUs";
import { OurPartnersPage } from "../OurPartnersPage";

import { Contacts } from "../Contacts";
import { PrivacyPolicy } from "../PrivacyPolicy";
import { FAQ } from "../FAQ";
import { NotFoundPage } from "../NotFoundPage";

import './MainAside.scss';

export const MainAside = () =>{
    return (
        <div className="main-aside">
            <Header />
            <Routes>
                <Route path='/product-page/:productId' element= {<ProductPage />}/>
                <Route path="/checkout" element={<Checkout />} />
                <Route path='/personal-accaunt/*' element={<AccauntMain />} />
                <Route path='/checkout-successfully' element={<CheckoutSuccessfully />} />
                <Route path='/partners/:partner' element={<Partners />} />
                <Route path='/about-us' element={<AboutUs />} />
                <Route path='/our-partners' element={<OurPartnersPage />} />
                <Route path='/contacts' element={<Contacts />} />
                <Route path='/fuckyou' element={<FAQ />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                <Route path='*' element={<NotFoundPage />} /> 
            </Routes>
            <Footer />
        </div>
    );
}

