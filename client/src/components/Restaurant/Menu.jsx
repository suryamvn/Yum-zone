import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import getImage from "../../redux/reducers/image/image.action";

// components
import MenuCollection from "./MenuCollection";

const Menu = () => {
  const [menus, setMenus] = useState([
    "https://b.zmtcdn.com/data/menus/282/18617282/f9e37ac4a32c94c8ca2b5f0bf22ffc84.jpg",
    "https://b.zmtcdn.com/data/menus/282/18617282/9fe671c9eed84225957af7602a0109fd.jpg",
    "https://b.zmtcdn.com/data/menus/282/18617282/aee123227b94a89e84eaab0057b5b25f.jpg",
    "https://b.zmtcdn.com/data/menus/282/18617282/5a53f256f296a457ab5798b5cfce0392.jpg",
    "https://b.zmtcdn.com/data/menus/282/18617282/1fae3fb96e578e6b8b3f3e68147017b9.jpg",
  ]);

  // const dispatch = useDispatch();

  // const reduxState = useSelector(
  //   (globalState) => globalState.restaurant.selectedRestaurant.restaurant
  // );

  // useEffect(() => {
  //   if (reduxState) {
  //     dispatch(getImage(reduxState?.menuImages)).then((data) => {
  //       const images = [];
  //       data.payload.images.map(({ location }) => images.push(location));
  //       setMenus(images);
  //     });
  //   }
  // }, [reduxState]);

  return (
    <div className="flex flex-wrap gap-3">
      <MenuCollection menuTitle="Menu" pages={menus.length} images={menus} />
    </div>
  );
};
export default Menu;
