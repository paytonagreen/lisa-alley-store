import React, { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import Form from "./styles/Form";
import useForm from "../lib/useForm";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION(
    $id: ID!
    $name: String
    $email: String
    $address1: String
    $address2: String
    $city: String
    $state: String
    $zip: Int
  ) {
    updateUser(
      id: $id
      name: $name
      email: $email
      address1: $address1
      address2: $address2
      city: $city
      state: $state
      zip: $zip
    ) {
      id
      name
      email
      address1
      address2
      city
      state
      zip
    }
  }
`;

const UpdateUser = () => {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
  const userMutation = useMutation(UPDATE_USER_MUTATION);

  const [updateUser] = userMutation;
  const mutationLoading = userMutation[1].loading;
  const mutationError = userMutation[1].error;
  const mutationCalled = userMutation[1].called;

  const [savingStarted, setSavingStarted ] = useState(false);

  const { values, handleChange, handleSubmit } = useForm(callback);

  function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      updateUser({
        variables: { id: data.me.id, ...values },
      });
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;

  return (
    <Form onSubmit={handleSubmit}>
      <fieldset disabled={mutationLoading} aria-busy={mutationLoading}>
        {!mutationError && !mutationLoading && mutationCalled && (
          <p>Success! Account updated.</p>
        )}
        <h2>Update Your Account</h2>
        <Error error={mutationError} />
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="email"
            required
            defaultValue={data.me.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            placeholder="name"
            required
            defaultValue={data.me.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="address1">
          Address Line 1
          <input
            type="text"
            name="address1"
            placeholder="Address Line 1"
            required
            defaultValue={data.me.address1}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="address2">
          Address Line 2
          <input
            type="text"
            name="address2"
            placeholder="Address Line 2"
            defaultValue={data.me.address2}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="city">
          City
          <input
            type="text"
            name="city"
            placeholder="City"
            required
            defaultValue={data.me.city}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="state">
          State
          <input
            type="input"
            name="state"
            placeholder="State"
            required
            defaultValue={data.me.state}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Zip Code
          <input
            type="number"
            name="zip"
            placeholder="Zip Code"
            required
            defaultValue={data.me.zip}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sav{loading ? "ing" : "e"} Changes</button>
      </fieldset>
    </Form>
  );
};
export default UpdateUser;
