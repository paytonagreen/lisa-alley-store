import { useQuery } from "@apollo/client";
import { CURRENT_USER_QUERY } from './User';
import Error from '../utils/ErrorMessage';
import Signin from '../signup-signin/Signin'

const PleaseSignIn = props => {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
  if(loading) return <p>Loading...</p>
  if(error) return <Error error={error}/>
  if(data && !data.me) {
    return (
      <div>
        <p data-testid="prompt">Please Sign In Before Continuing</p>
        <Signin/>
      </div>
    )
  }
  if(data && data.me) {
    return props.children
    } else {
      return <p>what's going on here</p>
    }
}

export default PleaseSignIn;