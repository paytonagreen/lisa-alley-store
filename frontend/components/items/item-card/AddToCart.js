import React from 'react';
import { useMutation, gql } from '@apollo/client';

import { CURRENT_USER_QUERY } from '../../utils/User';

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

const AddToCart = ({ id }) => {
  const [addToCart, { loading, error }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <>
      {error && alert(error) && console.log(error)}
      <button disabled={loading} onClick={addToCart}>
        Add{loading && 'ing'} to Cart
      </button>
    </>
  );
};

export default AddToCart;
