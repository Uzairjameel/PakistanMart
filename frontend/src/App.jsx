import React, { lazy, Suspense, useContext } from "react";
const Registration = lazy(() => import("./pages/registration"));
import Home from "./pages/Home";
const Login = lazy(() => import("./pages/login"));
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Nav from "./component/Nav";
import { UserDataContext } from "./context/UserContext";
import About from "./pages/About";
import Collections from "./pages/Collections";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import NotFound from "./pages/NotFound";
import Ai from "./component/Ai";

function App() {
  let { UserData } = useContext(UserDataContext);
  let location = useLocation();
  return (
    <>
      {!["/login", "/singup"].includes(location.pathname) && <Nav />}
      <Suspense
        fallback={
          <div className="page-loading" role="status">
            Getting things ready…
          </div>
        }
      >
        <Routes>
          <Route
            path="/login"
            element={
              UserData ? (
                <Navigate to={location.state?.from || "/"} />
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/singup"
            element={
              UserData ? (
                <Navigate to={location.state?.from || "/"} />
              ) : (
                <Registration />
              )
            }
          />

          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/collection" element={<Collections />} />

          <Route path="/product" element={<Product />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/productdetail/:productId" element={<ProductDetail />} />

          <Route
            path="/cart"
            element={
              UserData ? (
                <Cart />
              ) : (
                <Navigate to="/login" state={{ from: location.pathname }} />
              )
            }
          />

          <Route
            path="/placeorder"
            element={
              UserData ? (
                <PlaceOrder />
              ) : (
                <Navigate to="/login" state={{ from: location.pathname }} />
              )
            }
          />

          <Route
            path="/order"
            element={
              UserData ? (
                <Order />
              ) : (
                <Navigate to="/login" state={{ from: location.pathname }} />
              )
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Ai />
    </>
  );
}

export default App;
