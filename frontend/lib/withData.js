import withApollo from 'next-with-apollo';
import { ApolloClient } from '@apollo/client';
import { endpoint, prodEndpoint } from '../config';
import { LOCAL_STATE_QUERY } from '../components/cart/Cart'
import { LOCAL_BURGER_QUERY } from '../components/burger-menu/HamburgerMenu'
import { InMemoryCache } from 'apollo-boost';

function determineEndpoint() {
  if (process.env.NODE_ENV === 'development') return endpoint;
  if (process.env.NODE_ENV === 'production') return prodEndpoint;
  if (process.env.NODE_ENV === 'test') return 'http://localhost:3000/graphql';
}

const cache = new InMemoryCache();

function createClient({ headers }) {
  return new ApolloClient({
    cache,
    uri: determineEndpoint(),
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    defaultOptions: {
      watchQuery: {
        fetchPolicy: (process.env.NODE_ENV === 'test' ? 'no-cache' : 'cache-first'),
      },
      query: {
        fetchPolicy: (process.env.NODE_ENV === 'test' ? 'no-cache' : 'cache-first'),
      }
    },
    //local data
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            //Read the cartOpen value from the cache
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            const data = {
              data: {cartOpen: !cartOpen},
            }
            cache.writeData(data);
            return data;
          },
          toggleBurger(_, variables, { cache }) {
            //Read the cartOpen value from the cache
            const { burgerOpen } = cache.readQuery({
              query: LOCAL_BURGER_QUERY,
            });
            const data = {
              data: {burgerOpen: !burgerOpen},
            }
            cache.writeData(data);
            return data;
          },
        },
      },
      defaults: {
        cartOpen: false,
        burgerOpen: false,
      }
    }
  });
}

export default withApollo(createClient);
