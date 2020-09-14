import React from "react";
import { useQuery, gql } from "@apollo/client";
import Pagination from "./Pagination";
import Link from "next/link";
import Error from "./ErrorMessage";
import styled from "styled-components";
import { formatDistance } from "date-fns";
import formatMoney from "../lib/formatMoney";
import AdminOrderStyles from "./styles/AdminOrderStyles";

const ALL_ORDERS_QUERY = gql`
  query ALL_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
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

const Title = styled.span`
  color: ${(props) => props.theme.red};
`;

const ButtonDiv = styled.div`
  display: flex;
  position: relative;
`;

const FulfilledButton = styled.button`
  border: none;
  background: ${props => props.fulfilled ? props.theme.teal : props.theme.yellow};
  color: ${props => props.fulfilled ? props.theme.lightgrey : props.theme.black};
  padding: 1rem;
  display: inline-block;
  position: absolute;
  top: -1.25rem;
  right: -1.25rem;
`;

const OrderUL = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`;

const OrderList = ({ page }) => {
  const { data, error, loading } = useQuery(ALL_ORDERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;
  if (data) {
    const { orders } = data;
    console.log(orders);
    return (
      <div>
        <h2>
          You have <Title>{orders.length}</Title> order{orders.length === 1 ? "" : "s"}
        </h2>
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
                        {formatDistance(new Date(order.createdAt), new Date())}{" "}
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
                <FulfilledButton fulfilled={order.fulfilled}>
                  {order.fulfilled ? "Fulfilled!" : "Ready to Go?"}
                </FulfilledButton>
              </ButtonDiv>
            </AdminOrderStyles>
          ))}
        </OrderUL>
      </div>
    );
  }
};

export default OrderList;
