import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCartItem } from "../actions/cartActions";

const CartPage = ({ match, location, history }) => {
  const dispatch = useDispatch();

  const productID = match.params.id;

  const quantity = location.search ? location.search.split("=")[1] : 1;

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  useEffect(() => {
    if (productID) {
      dispatch(addToCartItem(productID, quantity));
    }
  }, [dispatch, productID, quantity]);

  return (
    <>
      <p>Cart Page</p>
      {cartItems.map((x) => (
        <p key={x.product}>{x.name}</p>
      ))}
    </>
  );
};

export default CartPage;
