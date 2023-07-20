import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

// pages
import Checkout from "./pages/Checkout.page";
import GoogleAuth from "./pages/GoogleAuth.page";
import Home from "./pages/Home.page";
import Restaurant from "./pages/Restaurant.page";

// components
import Overview from "./components/Restaurant/Overview";
import OrderOnline from "./components/Restaurant/OrderOnline";
import Reviews from "./components/Restaurant/Reviews";
import Photos from "./components/Restaurant/Photos";
import Menu from "./components/Restaurant/Menu";
import RestaurantLayout from "./layouts/Restaurant.layout";

// layouts

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/delivery" />} />
        <Route path="/:type" element={<Home />} />
        {/* <Route path="/restaurant/:id" element={<RedirectRestaurant />} /> */}
        <Route path="/google/:token" element={<GoogleAuth />} />
        {/* subroutes below used in restaurant page, used for not loading the whole page but only to load the following sections in the page */}
        <Route
          path="/restaurant/:id"
          element={
            <RestaurantLayout>
              <Restaurant />
            </RestaurantLayout>
          }
        >
          <Route path="overview" element={<Overview />} />
          <Route path="order-online" element={<OrderOnline />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="menu" element={<Menu />} />
          <Route path="photos" element={<Photos />} />
        </Route>
        <Route path="checkout/orders" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
