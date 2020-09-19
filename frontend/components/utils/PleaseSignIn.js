import { useQuery } from "@apollo/client";
import { CURRENT_USER_QUERY } from './User';
import Signin from '../signup-signin/Signin'

const PleaseSignIn = props => {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
  if(loading) return <p>Loading...</p>
  if(data && !data.me) {
    return (
      <div>
        <p>Please Sign In Before Continuing</p>
        <Signin/>
      </div>
    )
  }
  return props.children;
}

export default PleaseSignIn;