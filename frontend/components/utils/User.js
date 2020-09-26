import { useQuery, gql } from '@apollo/client';
import propTypes from 'prop-types';

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      address1
      address2
      city
      state
      zip
      cart {
        id
        quantity
        item {
          id
          price
          image
          title
          description
        }
      }
    }
  }
`;

const useUser = () => {
  const { data } = useQuery(CURRENT_USER_QUERY)
  if (data) {
    return data.me;
  }
}


export default useUser;
export {CURRENT_USER_QUERY, useUser};