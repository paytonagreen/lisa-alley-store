import withApollo from 'next-with-apollo';
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import { createUploadLink } from 'apollo-upload-client';
import { endpoint, prodEndpoint } from '../config';

function determineEndpoint() {
  if (process.env.NODE_ENV === 'development') return endpoint;
  if (process.env.NODE_ENV === 'production') return prodEndpoint;
  if (process.env.NODE_ENV === 'test') return 'http://localhost:3000/graphql';
}

const cache = new InMemoryCache();

function createClient({ headers }) {
  return new ApolloClient({
    cache,
    link: ApolloLink.from([
      createUploadLink({
        uri: determineEndpoint,
        headers,
      }),
    ]),
    defaultOptions: {
      watchQuery: {
        fetchPolicy:
          process.env.NODE_ENV === 'test' ? 'no-cache' : 'cache-first',
      },
      query: {
        fetchPolicy:
          process.env.NODE_ENV === 'test' ? 'no-cache' : 'cache-first',
      },
    },
  });
}

export default withApollo(createClient, { getDataFromTree });
