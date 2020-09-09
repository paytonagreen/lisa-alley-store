import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useUser } from "./User";
import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import SickButton from "./styles/SickButton";
import CartItem from "./CartItem";
import formatMoney from "../lib/formatMoney";
import calcTotalPrice from "../lib/calcTotalPrice";
import TakeMyMoney from "./TakeMyMoney";

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

const Cart = () => {
  const me = useUser();
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);
  const { data } = useQuery(LOCAL_STATE_QUERY);
  const cartOpen = data.cartOpen
  if (!me) return null;
  return (
    <CartStyles open={cartOpen}>
      <header>
        <CloseButton onClick={toggleCart} title="close">
          &times;
        </CloseButton>
        <Supreme>{me.name}'s Cart</Supreme>
        <p>
          You Have {me.cart.length} Item
          {me.cart.length === 1 ? "" : "s"} in your cart.
        </p>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
        {me.cart.length && (
          <TakeMyMoney>
            <SickButton onClick={() => toggleCart()}>Checkout</SickButton>
          </TakeMyMoney>
        )}
      </footer>
    </CartStyles>
  );
};

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
