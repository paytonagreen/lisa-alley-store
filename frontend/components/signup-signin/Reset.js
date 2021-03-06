import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import PropTypes from 'prop-types';

import { CURRENT_USER_QUERY } from '../utils/User';
import useForm from '../../lib/useForm';

import Form from '../styles/Form';
import Error from '../utils/ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

const Reset = ({ resetToken }) => {
  const { values, handleSubmit, handleChange } = useForm(callback);
  const [savingStarted, setSavingStarted] = useState(false);

  const [reset, { loading, error, called }] = useMutation(RESET_MUTATION);

  function callback() {
    if (!savingStarted) {
      try {
        setSavingStarted(true);
        reset({
          variables: {
            resetToken,
            ...values,
          },
          refetchQueries: [{ query: CURRENT_USER_QUERY }],
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form data-testid='reset-form' method='post' onSubmit={handleSubmit}>
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Reset Your Password</h2>
        <Error error={error} />
        {!loading && !error && called && (
          <p>Success! Your password has been reset.</p>
        )}
        <label htmlFor='password'>
          Password
          <input
            id='password'
            type='password'
            name='password'
            placeholder='password'
            value={values.password}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='confirmPassword'>
          Confirm
          <input
            id='confirmPassword'
            type='password'
            name='confirmPassword'
            placeholder='confirmPassword'
            value={values.confirmPassword}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Reset Your Password!</button>
      </fieldset>
    </Form>
  );
};

Reset.propTypes = {
  resetToken: PropTypes.string.isRequired,
};

export default Reset;
export { RESET_MUTATION };
