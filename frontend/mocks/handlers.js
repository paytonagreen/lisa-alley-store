import { graphql } from 'msw';
import { fakeUser, fakeItem } from '../lib/testUtils';

const item = fakeItem();
const user = fakeUser();

export const handlers = [
  graphql.mutation('Login', (req, res, ctx) => {
    console.log('sup');
  }),

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
