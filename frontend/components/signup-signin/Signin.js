import React, { useState } from 'react';
import Link from 'next/link';
import { useMutation, gql } from '@apollo/client';
import Head from 'next/head';
import Router from 'next/router';

import { CURRENT_USER_QUERY } from '../utils/User';

import AccountLink from '../styles/AccountLink';
import Form from '../styles/Form';
import Error from '../utils/ErrorMessage';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
    }
  }
`;

const Signin = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [signin, { error, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: { email, password },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <>
      <Head>
        <title>Lisa Alley | Sign In</title>
      </Head>
      <Form
        method='post'
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await signin();
            console.log(res);
            Router.push({
              pathname: '/items',
            });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <fieldset disabled={loading} aria-busy={loading}>
          <h2>Sign In To Your Account</h2>
          <Error error={error} />
          <label htmlFor='email'>
            Email
            <input
              type='email'
              name='email'
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor='password'>
            Password
            <input
              type='password'
              name='password'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type='submit'>Sign In!</button>
          <br />
          <Link href='/signup'>
            <AccountLink>Sign Up For An Account</AccountLink>
          </Link>
          <br />
          <Link href='/requestReset'>
            <AccountLink>Forgot Password?</AccountLink>
          </Link>
        </fieldset>
      </Form>
    </>
  );
};

export default Signin;
export { SIGNIN_MUTATION };
