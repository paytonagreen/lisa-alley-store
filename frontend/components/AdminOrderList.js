import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import OrderPagination from "./OrderPagination";
import Link from "next/link";
import Error from "./ErrorMessage";
import { formatDistance } from "date-fns";
import formatMoney from "../lib/formatMoney";
import AdminOrderStyles, { Title, ButtonDiv, FulfilledButton, OrderUL } from "./styles/AdminOrderStyles";
import { Center } from "./styles/ItemListStyles";
import { ordersPerPage } from "../config";
import FulfillmentToggler from './FulfillmentToggler';

const ALL_ORDERS_QUERY = gql`
  query ALL_ORDERS_QUERY($skip: Int = 0, $first: Int = ${ordersPerPage} ) {
    orders(skip: $skip, first: $first, orderBy: createdAt_DESC) {
      user {
        name
        email
        address1
        address2
        city
        state
        zip
      }
      id
      fulfilled
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



const OrderList = ({ page }) => {
  const { data, error, loading } = useQuery(ALL_ORDERS_QUERY, {
    variables: {
      skip: ordersPerPage * page - ordersPerPage,
      first: ordersPerPage,
    }
  });
  
  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;
  const { orders } = data;
  console.log(orders);
  if (data) {
    return (
      <div>
        <Center>
          <OrderPagination page={page}/>
        </Center>
          <OrderUL>
            {orders.map((order) => (
              <AdminOrderStyles key={order.id}>
                <ButtonDiv>
                  <Link
                    href={{
                      pathname: "/order",
                      query: { id: order.id },
                    }}
                  >
                    <a>
                      <div className="order-meta">
                        <p>
                          {formatDistance(
                            new Date(order.createdAt),
                            new Date()
                          )}{" "}
                          ago
                        </p>
                        <hr />
                        <h3>
                          <Title>
                            Order: (
                            {order.items.reduce((a, b) => a + b.quantity, 0)}{" "}
                            Items, {order.items.length} Products)
                          </Title>
                        </h3>
                        {order.items.map((item) => {
                          return (
                            <p key={item.title}>
                              {item.quantity} &times; {item.title}
                            </p>
                          );
                        })}
                        <hr />
                        <p>Total: {formatMoney(order.total)}</p>
                        <hr />
                        <p>
                          <Title>Name:</Title> {order.user.name}
                        </p>
                        <p>
                          <Title>Email:</Title> {order.user.email}
                        </p>
                        <p>
                          <Title>Address:</Title>
                        </p>
                        <p>{order.user.address1}</p>
                        {order.user.address2 && <p>{order.user.address2}</p>}
                        <p>
                          {order.user.city}, {order.user.state} {order.user.zip}
                        </p>
                      </div>
                    </a>
                  </Link>
                  <FulfillmentToggler order={order}/>
                </ButtonDiv>
              </AdminOrderStyles>
            ))}
          </OrderUL>
        <Center>
          <OrderPagination page={page} />
        </Center>
      </div>
    );
  }
};

export default OrderList;
