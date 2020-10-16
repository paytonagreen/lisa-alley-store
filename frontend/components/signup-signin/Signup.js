import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import styled from 'styled-components';
import Router from 'next/router';

import Form from '../styles/Form';
import Error from '../utils/ErrorMessage';
import { CURRENT_USER_QUERY } from '../utils/User';
import useForm from '../../lib/useForm';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
    $address1: String!
    $address2: String
    $city: String!
    $state: String!
    $zip: Int!
  ) {
    signup(
      email: $email
      name: $name
      password: $password
      address1: $address1
      address2: $address2
      city: $city
      state: $state
      zip: $zip
    ) {
      id
      email
      name
      address1
      address2
      city
      state
      zip
    }
  }
`;

const AccountBlurb = styled.p`
  max-width: 300px;
`;

const Signup = () => {
  const [signup, { loading, error, called }] = useMutation(SIGNUP_MUTATION);

  const [savingStarted, setSavingStarted] = useState(false);

  const { values, handleSubmit, handleChange, errors } = useForm(callback);

  async function callback() {
    if (!savingStarted) {
      try {
        setSavingStarted(true);
        await signup({
          variables: { ...values },
          refetchQueries: [{ query: CURRENT_USER_QUERY }],
        });
        Router.push({
          pathname: '/',
        })
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form data-testid="signup-form" method="post" onSubmit={handleSubmit}>
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign Up For An Account</h2>
        <AccountBlurb>
          If you would like to create an account, it allows you to securely keep
          track of your order(s) and helps us to provide more complete customer service. Your
          information is stored securely will not be shared in any way at any time.
        </AccountBlurb>
        <AccountBlurb>  
          Thanks so much foryour interest in my work!
        </AccountBlurb>
        {errors.form && <p className={errors.form}></p>}
        {called && error && <Error error={error} />}
        {!loading && !error && called && <p>Success! Thanks for signing up!</p>}
        <label htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            name="email"
            placeholder="email"
            value={values.email}
            onChange={handleChange}
          />
        </label>
        {errors.email && <p className="validationError">{errors.email}</p>}
        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            name="name"
            placeholder="name"
            value={values.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            name="password"
            placeholder="password"
            value={values.password}
            onChange={handleChange}
          />
        </label>
        {errors.password && (
          <p className="validationError">{errors.password}</p>
        )}
        <label htmlFor="address1">
          Address Line 1
          <input
            id="address1"
            type="text"
            name="address1"
            placeholder="Address Line 1"
            value={values.address1}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="address2">
          Address Line 2
          <input
            id="address2"
            type="text"
            name="address2"
            placeholder="Address Line 2"
            value={values.address2}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="city">
          City
          <input
            id="city"
            type="text"
            name="city"
            placeholder="City"
            value={values.city}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="state">
          State
          <input
            id="state"
            type="input"
            name="state"
            placeholder="State"
            value={values.state}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="zip">
          Zip Code
          <input
            id="zip"
            type="number"
            name="zip"
            placeholder="Zip Code"
            value={values.zip}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  );
};

export default Signup;
export { SIGNUP_MUTATION };
