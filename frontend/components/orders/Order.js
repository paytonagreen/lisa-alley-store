import React from "react";
import PropTypes from "prop-types";
import { useQuery, gql } from "@apollo/client";
import { format } from "date-fns";
import Head from "next/head";
import formatMoney from "../../lib/formatMoney";
import Error from "../utils/ErrorMessage";
import OrderStyles from "../styles/OrderStyles";

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      user {
        id
      }
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`;

const Order = ({id}) => {
  const { loading, error, data } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id },
  });
  if (error) return <Error error={error} />;
  if (loading) return <p>Loading...</p>;
  const order = data.order;
  return (
    <OrderStyles>
      <Head>
        <title>Lisa Alley - Order {order.id}</title>
      </Head>
      <p>
        <span>Order Number: </span>
        <span>{id}</span>
      </p>
      <p>
        <span>Charge</span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Date</span>
        <span>{format(new Date(order.createdAt), "MMMM d, yyyy hh:mm a")}</span>
      </p>
      <p>
        <span>Order Total</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>Item Count</span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((item) => (
          <div key={item.id} className="order-item">
            <img src={item.image} alt={item.title} />
            <div className="item-details">
              <h2>{item.title}</h2>
              <p>Each: {formatMoney(item.price)}</p>
              <p>Subtotal: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
};

Order.propTypes = {
  id: PropTypes.string.isRequired,
};
export default Order;
