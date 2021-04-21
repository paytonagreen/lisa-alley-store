import { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';

import { FulfilledButton } from '../styles/AdminOrderStyles';

const TOGGLE_FULFILLED_MUTATION = gql`
  mutation TOGGLE_FULFILLED_MUTATION($id: ID!, $fulfilled: Boolean!) {
    updateOrder(id: $id, fulfilled: $fulfilled) {
      fulfilled
    }
  }
`;

const FulfillmentToggler = ({ order }) => {
  const [isFulfilled, setIsFulfilled] = useState(order.fulfilled);
  const [toggler, setToggler] = useState(false);
  const [updateOrder] = useMutation(TOGGLE_FULFILLED_MUTATION);

  useEffect(() => {
    if (toggler) {
      setIsFulfilled(!isFulfilled);
      setToggler(false);
    }
  }, [toggler]);

  useEffect(() => {
    updateOrder({
      variables: { id: order.id, fulfilled: isFulfilled },
    });
  }, [isFulfilled]);

  return (
    <FulfilledButton fulfilled={isFulfilled} onClick={() => setToggler(true)}>
      {isFulfilled ? 'Fulfilled!' : 'Ready to Go?'}
    </FulfilledButton>
  );
};

export default FulfillmentToggler;
