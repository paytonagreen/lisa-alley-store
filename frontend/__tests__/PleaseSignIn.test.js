import { screen } from '@testing-library/react';
import { render } from '../lib/testUtils';
import PleaseSignIn from '../components/utils/PleaseSignIn';
import { server } from '../mocks/server';
import { graphql } from 'msw';

test('renders a child component if active user session', async () => {
  const Sup = () => {
    return <p>Sup</p>;
  };
  render(
    <PleaseSignIn>
      <Sup />
    </PleaseSignIn>
  );
  expect(await screen.findByText('Sup')).toBeInTheDocument();
});

test('renders signin dialog if no active user session', async () => {
  server.resetHandlers(
    graphql.query('CURRENT_USER_QUERY', (req, res, ctx) => {
      return res.once(ctx.data({ me: null }));
    })
  );
  render(<PleaseSignIn />);
  expect(await screen.findByTestId('prompt')).toHaveTextContent(
    /Please sign in/i
  );
});