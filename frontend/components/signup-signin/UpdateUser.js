import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';

import useForm from '../../lib/useForm';
import { CURRENT_USER_QUERY } from '../utils/User';

import Form from '../styles/Form';
import Error from '../utils/ErrorMessage';

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

  const [savingStarted, setSavingStarted] = useState(false);

  const { values, handleChange, handleSubmit } = useForm(callback);

  function callback() {
    if (!savingStarted) {
      try {
        setSavingStarted(true);
        updateUser({
          variables: { id: data.me.id, ...values },
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;

  return (
    <Form data-testid='updateUserForm' onSubmit={handleSubmit}>
      <fieldset disabled={mutationLoading} aria-busy={mutationLoading}>
        {!mutationError && !mutationLoading && mutationCalled && (
          <p>Success! Account updated.</p>
        )}
        <h2>Update Your Account</h2>
        <Error error={mutationError} />
        <label htmlFor='email'>
          Email
          <input
            id='email'
            type='email'
            name='email'
            placeholder='email'
            required
            defaultValue={data.me.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='name'>
          Name
          <input
            id='name'
            type='text'
            name='name'
            placeholder='name'
            required
            defaultValue={data.me.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='address1'>
          Address Line 1
          <input
            id='address1'
            type='text'
            name='address1'
            placeholder='Address Line 1'
            required
            defaultValue={data.me.address1}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='address2'>
          Address Line 2
          <input
            id='address2'
            type='text'
            name='address2'
            placeholder='Address Line 2'
            defaultValue={data.me.address2}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='city'>
          City
          <input
            id='city'
            type='text'
            name='city'
            placeholder='City'
            required
            defaultValue={data.me.city}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='state'>
          State
          <input
            id='state'
            type='input'
            name='state'
            placeholder='State'
            required
            defaultValue={data.me.state}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='zip'>
          Zip Code
          <input
            id='zip'
            type='number'
            name='zip'
            placeholder='Zip Code'
            required
            defaultValue={data.me.zip}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>
          Sav{mutationLoading ? 'ing' : 'e'} Changes
        </button>
      </fieldset>
    </Form>
  );
};
export default UpdateUser;
