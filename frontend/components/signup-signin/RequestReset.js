import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

import Form from "../styles/Form";
import Error from "../utils/ErrorMessage";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const RequestReset = () => {
  const [email, setEmail] = useState("");
  const [reset, { error, loading, called }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: { email },
    }
  );
  return (
    <Form
      method="post"
      data-testid="form"
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await reset();
          setEmail("");
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Request a Password Reset</h2>
        <Error error={error} />
        {!error && !loading && called && (
          <p>Success! Check your e-mail for a reset link.</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
};

export default RequestReset;
export { REQUEST_RESET_MUTATION };
