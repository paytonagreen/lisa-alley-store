import React from 'react';
import { useMutation, gql } from '@apollo/client';
import Router from 'next/router';

import { CURRENT_USER_QUERY } from '../utils/User';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = (props) => {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  function handleClick() {
    Router.push({
      pathname: '/',
    });
    signout();
  }
  return <button onClick={handleClick}>Sign Out</button>;
};

export default Signout;
export { SIGN_OUT_MUTATION };
