import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useMutation, gql } from "@apollo/client";
import Router from "next/router";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import calcTotalPrice from "../lib/calcTotalPrice";
import { CURRENT_USER_QUERY, useUser } from "./User";

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
      stripeKey="pk_test_51HHaBNGY3WPM8iu0GDEVbjMMfpaJFBGQ35ClzDDs5IDWpzgnt0qjRWA3yGxwpycHl7Mvq1SHOUuuHLU6gZUqvl1K00poHcVcp2"
      currency="USD"
      email={me.email}
      token={(res) => onToken(res)}
    >
      {props.children}
    </StripeCheckout>
  );
};

export default TakeMyMoney;
