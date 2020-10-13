import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useMutation, gql } from "@apollo/client";
import Router from "next/router";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import calcTotalPrice from "../../lib/calcTotalPrice";
import { CURRENT_USER_QUERY, useUser } from "../utils/User";

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

const stripeProductionKey = "pk_live_51HbZ0QHvjzQ7TFDFAG6OvUO1pUG34S0pVLkl3KpTFZN31BmFq8BG8TI9P8jXBUDnVqA7ysf1oNBONyB9hUzA3Uxa00T8kp8AmF"
const stripeTestKey = "pk_test_51HbZ0QHvjzQ7TFDF6sK5qjatPa6jUjXVmelXgDj7C5BBi2Hb988ICnUEDh7Z3uz8pnxtA8qX7jjEKyzzrSGReNF400nC0cdvNH"

function determineStripeKey(env) {
  return env === 'production' ? stripeProductionKey : stripeTestKey
}

const TakeMyMoney = props => {
  const me = useUser();
  const [ createOrder ] = useMutation(CREATE_ORDER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  async function onToken(res) {
    NProgress.start();
    console.log("onToken called!");
    console.log(res.id);
    // manually call the mutation once we have the Stripe token
    const order = await createOrder({
      variables: {
        token: res.id,
      },
    }).catch((err) => {
      alert(err.message);
    });
    Router.push({
      pathname: "/order",
      query: { id: order.data.createOrder.id },
    });
  }
  return (
    <StripeCheckout
      amount={(calcTotalPrice(me.cart) + 500)}
      name="Lisa Alley"
      description={`Order of ${totalItems(me.cart)} item${totalItems(me.cart) > 1 ? 's' : '' }`}
      image={me.cart.length && me.cart[0].item && me.cart[0].item.image}
      stripeKey={determineStripeKey()}
      currency="USD"
      email={me.email}
      token={(res) => onToken(res)}
    >
      {props.children}
    </StripeCheckout>
  );
};

export default TakeMyMoney;
