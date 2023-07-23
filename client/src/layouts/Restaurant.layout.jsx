import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TiStarOutline } from "react-icons/ti";
import { RiDirectionLine, RiShareForwardLine } from "react-icons/ri";
import { BiBookmarkPlus } from "react-icons/bi";

// components
import Navbar from "../components/Navbar";
import ImageGrid from "../components/Restaurant/ImageGrid";
import InfoButton from "../components/Restaurant/InfoButton";
import RestaurantInfo from "../components/Restaurant/RestaurantInfo";
import Tabs from "../components/Restaurant/Tabs";
import CartContainer from "../components/Cart/CartContainer";

//redux
import { useDispatch } from "react-redux";
import { getSpecificRestaurant } from "../redux/reducers/restaurant/restaurant.action";
import { getImage } from "../redux/reducers/image/image.action";

const RestaurantLayout = ({ children: Component, ...props }) => {
  const [restaurant, setRestaurant] = useState({
    images: [
      {
        location:
          "https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg",
      },
      {
        location:
          "https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg",
      },
      {
        location:
          "https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg",
      },
      {
        location:
          "https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg",
      },
      {
        location:
          "https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg",
      },
      {
        location:
          "https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg",
      },
    ],
    name: "",
    cuisine: "",
    address: "",
    restaurantRating: 4.1,
    deliveryRating: 3.2,
  });

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSpecificRestaurant(id)).then((data) => {
      setRestaurant((prev) => ({
        ...prev,
        ...data.payload.restaurant,
      }));

      // dispatch(getImage(data.payload.restaurant.photos)).then((data) => {
      //   setRestaurant((prev) => ({
      //     ...prev,
      //     images: data.payload.images,
      //   }));
      // });
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 mt-8 lg:px-20 pb-20">
        {/* {console.log(restaurant.images[0].location)} */}
        <ImageGrid images={restaurant.images} />
        <RestaurantInfo {...restaurant} />
        <div className="my-4 flex flex-wrap gap-3 mx-auto">
          <InfoButton isActive="true">
            <TiStarOutline /> Add Review
          </InfoButton>
          <InfoButton>
            <RiDirectionLine /> Direction
          </InfoButton>
          <InfoButton>
            <BiBookmarkPlus /> Bookmark
          </InfoButton>
          <InfoButton>
            <RiShareForwardLine /> Share
          </InfoButton>
        </div>
        <div className="my-10 sticky bg-white top-0 pt-2 z-10">
          <Tabs />
        </div>
        {Component}
      </div>
      <CartContainer />
    </>
  );
};

export default RestaurantLayout;
