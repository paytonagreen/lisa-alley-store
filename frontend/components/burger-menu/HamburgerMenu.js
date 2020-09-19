import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useUser } from "../utils/User";
import Link from 'next/link';
import BurgerStyles from "../styles/BurgerStyles";
import BurgerCloseButton from "../styles/BurgerCloseButton";
import Signout from "../signup-signin/Signout";
import BurgerCartCount from "./BurgerCartCount";
import { TOGGLE_CART_MUTATION } from '../cart/Cart';

const LOCAL_BURGER_QUERY = gql`
  query {
    burgerOpen @client
  }
`;

const TOGGLE_BURGER_MUTATION = gql`
  mutation {
    toggleBurger @client
  }
`;

const HamburgerMenu = () => {
  const me = useUser();
  const [toggleBurger, {loading, error, called }] = useMutation(TOGGLE_BURGER_MUTATION);
  const [toggleCart ] = useMutation(TOGGLE_CART_MUTATION)
  const { data } = useQuery(LOCAL_BURGER_QUERY);
  const burgerOpen = data.burgerOpen
  return (
    <BurgerStyles open={burgerOpen}>
      <BurgerCloseButton onClick={toggleBurger}>
        &times;
      </BurgerCloseButton>
      <div className="links">
      {/* //Admin Only */}
      {me && me.permissions.includes("ADMIN") && (
        <Link href="/sell">
          <a>Sell</a>
        </Link>
      )}
     <Link href="/items">
        <a>Browse</a>
      </Link>
      {/* Signed In */}
      {me && (
        <>
          <Link href="/orders">
            <a>Orders</a>
          </Link>
          <Link href="/me">
            <a>Account</a>
          </Link>
          <Signout />
          <button onClick={() => {
            toggleBurger();
            toggleCart();
          }}>
            My Cart <BurgerCartCount
              count={me.cart.reduce(
                (tally, cartItem) => tally + cartItem.quantity,
                0
              )}
            />
          </button>
        </>
      )}
      {/* //Not Signed In */}
      {!me && (
        <Link href="/signin">
          <a>Sign In</a>
        </Link>
      )}
      </div>
    </BurgerStyles>
  );
};

export default HamburgerMenu;
export { LOCAL_BURGER_QUERY, TOGGLE_BURGER_MUTATION };
