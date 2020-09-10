import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";
import useForm from "../lib/useForm";
import Router from "next/router";

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

const Signup = () => {
  const signupMutation = useMutation(SIGNUP_MUTATION);
  const [signup] = signupMutation;
  const mutationLoading = signupMutation[1].loading;
  const mutationError = signupMutation[1].error;

  const [savingStarted, setSavingStarted] = useState(false);

  const { values, handleSubmit, handleChange } = useForm(callback);

  function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      signup({
        variables: { ...values },
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
      });
      Router.push({
        pathname: '/items',
      })
    }
  }

  return (
    <Form
      method="post"
      onSubmit={handleSubmit}
    >
      <fieldset disabled={mutationLoading} aria-busy={mutationLoading}>
        <h2>Sign Up For An Account</h2>
        <Error error={mutationError} />
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="email"
            value={values.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">
          Name
          <input
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
            type="password"
            name="password"
            placeholder="password"
            value={values.password}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="address1">
          Address Line 1
          <input
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
            type="input"
            name="state"
            placeholder="State"
            value={values.state}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Zip Code
          <input
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
