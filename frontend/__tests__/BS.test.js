import { render } from '../lib/testUtils';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import Numberwang from '../components/utils/BS';
import { graphql } from 'msw';
import {server} from '../mocks/server';

describe('this thing', () => {
  it ('finally works', async () => {
    server.use(
      graphql.query('NUMBERWANG_QUERY',
        (req, res, ctx) => {
          return res(ctx.data(
            { bullshit: {number: 'wang', wang: 'number', __typename: 'bullshit'} },
          ));
        }
      )
    )
    render(<Numberwang/>)
    await waitFor(() => {
      expect(screen.getByRole('heading', {name: /wang/i})).toBeInTheDocument();
    })
  });
  
});