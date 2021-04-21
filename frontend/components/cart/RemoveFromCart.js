import React from 'react';
import { useMutation, gql } from '@apollo/client';
import PropTypes from 'prop-types';

import { CURRENT_USER_QUERY } from '../utils/User';
import BigButton from '../styles/BigButton';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;


const RemoveFromCart = ({ id }) => {
  //Called as soon as post-mutation server response
  const update = (cache, payload) => {
    //Read cache
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    //Remove item from cart
    const cartItemId = payload.data.removeFromCart.id;
    const updatedCart = data.me.cart.filter(
      (cartItem) => cartItem.id !== cartItemId
    );
    //Write it back to the cache
    cache.writeQuery({
      query: CURRENT_USER_QUERY,
      data: {
        ...data,
        me: {
          ...data.me,
          cart: updatedCart,
        },
      },
    });
  };
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    optimisticResponse: {
      __typename: 'Mutation',
      removeFromCart: {
        __typename: 'CartItem',
        id,
      },
    },
  });
  return (
    <BigButton
      disabled={loading}
      onClick={() => {
        removeFromCart().catch((err) => alert(err.message));
      }}
    >
      &times;
    </BigButton>
  );
};

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RemoveFromCart;
