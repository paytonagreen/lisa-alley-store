import React from "react";
import formatMoney from "../../lib/formatMoney";
import styled from "styled-components";
import PropTypes from "prop-types";
import RemoveFromCart from "./RemoveFromCart";

const CartItemStyles = styled.li`
  /* padding: rem 0; */
  border-bottom: 1px solid ${(props) => props.theme.lightgrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 5px;
  }
  h3,
  p {
    margin: 0;
  }
  @media(max-width: 700px) {
    display: flex;
  }
`;

const CartItem = ({ cartItem }) => {
  if (!cartItem.item)
    return (
      <CartItemStyles>
        <p>We're sorry, but his item has been removed.</p>
        <RemoveFromCart id={cartItem.id}/>
      </CartItemStyles>
    );
  return (
    <CartItemStyles>
      <img width="100" src={cartItem.item.image} alt={cartItem.item.title} />
      <div className="cart-item-details">
        <h3>{cartItem.item.title}</h3>
        <p>
          {formatMoney(cartItem.item.price * cartItem.quantity)}
          {" - "}
          <em>
            {cartItem.quantity}&times;
            {formatMoney(cartItem.item.price)} Each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
};
CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
};

export default CartItem;
