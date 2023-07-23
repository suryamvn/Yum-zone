import React, { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdArrowDropup, IoMdArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

// components
import FoodItem from "./FoodItem";

const CartData = ({ toggle }) => {
  const cart = useSelector((glocalState) => glocalState.cart.cart);
  // const [cart, setCart] = useState([
  //   {
  //     image:
  //       "https://b.zmtcdn.com/data/dish_photos/af1/fd1b012ebfbe82f2e5212b702ce19af1.jpg",
  //     name: "Butter Pancakes with Bacon",
  //     rating: 4.5,
  //     totalPrice: 695,
  //     description: "Rashers and bourbon caramel sauce.",
  //   },
  //   {
  //     image:
  //       "https://b.zmtcdn.com/data/dish_photos/077/28e7baadea310b7b337fd2fb3f653077.jpg",
  //     name: "Amritsari Fish Tikka",
  //     rating: 5,
  //     totalPrice: 545,
  //     description:
  //       "Fish marinated in flavourful lemon-chilli masala roasted in the tandoor with care. Serves 2-3 people.",
  //   },
  // ]);
  const navigate = useNavigate();
  const continueToCheckout = () => navigate("/checkout/orders");

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start">
          <small className="flex items-center gap-1" onClick={toggle}>
            {cart.length} Item <IoMdArrowDropup />
          </small>
          <h4>
            ₹ {cart.reduce((acc, curVal) => acc + curVal.totalPrice, 0)}{" "}
            <sub>(plus tax)</sub>
          </h4>
        </div>
        <button
          onClick={continueToCheckout}
          className={
            "flex items-center gap-1 bg-zomato-400 px-3 py-1 text-white rounded-lg"
          }
        >
          Continue <IoMdArrowDropright />
        </button>
      </div>
    </>
  );
};

const CartContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const cart = useSelector((glocalState) => glocalState.cart.cart);
  // const [cart, setCart] = useState([
  //   {
  //     image:
  //       "https://b.zmtcdn.com/data/dish_photos/af1/fd1b012ebfbe82f2e5212b702ce19af1.jpg",
  //     name: "Butter Pancakes with Bacon",
  //     rating: 4.5,
  //     price: 695,
  //     quantity: 1,
  //     totalPrice: 695,
  //     description: "Rashers and bourbon caramel sauce.",
  //   },
  //   {
  //     image:
  //       "https://b.zmtcdn.com/data/dish_photos/077/28e7baadea310b7b337fd2fb3f653077.jpg",
  //     name: "Amritsari Fish Tikka",
  //     rating: 5,
  //     price: 545,
  //     quantity: 1,
  //     totalPrice: 545,
  //     description:
  //       "Fish marinated in flavourful lemon-chilli masala roasted in the tandoor with care. Serves 2-3 people.",
  //   },
  // ]);
  const toggleCart = () => setIsOpen((prev) => !prev);
  const closeCart = () => setIsOpen(false);

  return (
    <>
      {cart.length && (
        <>
          {isOpen && (
            <div className="w-full overflow-y-scroll h-48 bg-white z-20 p-2 bottom-14 px-3 fixed">
              <div className="flex items-center justify-between md:px-20">
                <h3 className="text-xl font-semibold">Your Orders</h3>
                <IoCloseSharp onClick={closeCart} className="cursor-pointer" />
              </div>

              <hr className="my-2" />

              <div className="flex flex-col gap-2 md:px-20">
                {cart.map((food) => (
                  <FoodItem key={food._id} {...food} />
                ))}
              </div>
            </div>
          )}

          <div className="fixed w-full bg-white z-10 p-2 px-3 bottom-0 mx-auto lg:px-20">
            <CartData toggle={toggleCart} />
            Cart
          </div>
        </>
      )}
    </>
  );
};

export default CartContainer;
