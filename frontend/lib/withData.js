import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint, prodEndpoint } from '../config';
import { LOCAL_STATE_QUERY } from '../components/cart/Cart'
import { LOCAL_BURGER_QUERY } from '../components/burger-menu/HamburgerMenu'

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
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
