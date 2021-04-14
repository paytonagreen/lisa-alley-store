import React from "react";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import Error from "../utils/ErrorMessage";
import styled from "styled-components";
import SickButton from '../styles/SickButton'
import { formatDistance } from "date-fns";
import formatMoney from "../../lib/formatMoney";
import OrderItemStyles from "../styles/OrderItemStyles";
import useUser from '../utils/User';

const ALL_ORDERS_QUERY = gql`
  query ALL_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`;

const OrderUL = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
  padding: 0;
  @media(max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const OrderList = () => {
  const { data, error, loading } = useQuery(ALL_ORDERS_QUERY);
  const me = useUser();
  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;
  if (data) {
    const {orders} = data
    console.log(orders)
    return (
      <div>
        <h2>
          You have {orders.length} order{orders.length === 1 ? "" : "s"}
        </h2>
        {me && me.permissions.includes("ADMIN") && (
        <Link
        href={{
          pathname: '/adminOrders',
        }}>
          <a>
          <SickButton>Admin View</SickButton>
          </a>
        </Link>
        )}
        <OrderUL>
          {orders.map((order) => (
            <OrderItemStyles key={order.id}>
              <Link
                href={{
                  pathname: "/order",
                  query: { id: order.id },
                }}
              >
                <a>
                  <div className="order-meta">
                    <p>{order.items.reduce((a, b) => a + b.quantity, 0)} Items</p>
                    <p>{order.items.length} Products</p>
                    <p>{formatDistance(new Date(order.createdAt), new Date())}</p>
                    <p>{formatMoney(order.total)}</p>
                  </div>
                  <div className="images">
                    {order.items.map((item) => (
                      <img key={item.id} src={item.image} alt={item.title} />
                    ))}
                  </div>
                </a>
              </Link>
            </OrderItemStyles>
          ))}
        </OrderUL>
        
      </div>
    );
  }
};

export default OrderList;
