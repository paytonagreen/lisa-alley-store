import { graphql } from 'msw';
import { fakeUser } from '../lib/testUtils';

export const handlers = [
  graphql.mutation('Login', (req,res,ctx) => {
    console.log('sup')
  }),

  graphql.query('CURRENT_USER_QUERY', (req, res, ctx) => {
    return res(ctx.data({ me: fakeUser() }))
  }),
]