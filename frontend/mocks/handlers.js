import { graphql } from 'msw';
import { fakeUser, fakeItem } from '../lib/testUtils';

const item = fakeItem();
const user = fakeUser();

export const handlers = [
  graphql.query('CURRENT_USER_QUERY', (req, res, ctx) => {
    return res(ctx.data({ me: fakeUser() }));
  }),

  graphql.query('ALL_ITEMS_QUERY', (req, res, ctx) => {
    //variables??
    return res(ctx.data({ items: [fakeItem(), fakeItem(), fakeItem()] }));
  }),

  graphql.query('PAGINATION_QUERY', (req, res, ctx) => {
    return res(
      ctx.data({
        itemsConnection: {
          aggregate: { count: 20, __typename: 'AggregateItem' },
          __typename: 'ItemConnection',
        },
      })
    );
  }),

  graphql.query('SINGLE_ITEM_QUERY', (req, res, ctx) => {
    let { id } = req.variables;
    if (id === 'abc123') {
      return res(
        ctx.data({
          item,
        })
      );
    } else if (id === 'abc124') {
      return res(
        ctx.errors([
          {
            status: 400,
            message: 'Items Not Found!',
          },
        ])
      );
    }
  }),

  graphql.mutation('REQUEST_RESET_MUTATION', (req, res, ctx) => {
    let { email } = req.variables;
    if (email === 'test@test.com') {
      return res(
        ctx.data({
          requestReset: {
            message: 'success',
            __typename: 'Message',
          }
        })
      );
    } else {
      return res(
        ctx.errors([
          {
            status: 400,
            message: 'Oops, no go'
          }
        ])
      )
    }
  }),

  graphql.mutation('CREATE_ITEM_MUTATION', (req, res, ctx) => {
    return res(
      ctx.data({
        createItem: {
          ...item,
          id: 'abc123',
          __typename: 'Item',
        },
      })
    );
  }),
];
