import { screen } from '@testing-library/react';
import Nav from '../components/page/header/Nav';
import { server } from '../mocks/server';
import { graphql } from 'msw';
import { render, fakeCartItem, fakeRegularUser } from '../lib/testUtils';
import { ToggleProvider } from '../components/utils/LocalState';

describe('<Nav/>', () => {
  it('renders a minimal nav when signed out', async () => {
    server.use(
      graphql.query('CURRENT_USER_QUERY', (req, res, ctx) => {
        return res(null);
      })
    );
    render(<ToggleProvider><Nav /></ToggleProvider>);
    expect(
      await screen.findByRole('link', { name: /Sign In/i })
    ).toBeInTheDocument();
  });

  it('renders a full admin nav when admin signed in', async () => {
    render(<ToggleProvider><Nav /></ToggleProvider>);
    expect(
      await screen.findByRole('link', { name: /Sell/i })
    ).toBeInTheDocument();
  });

  it('renders full nav when signed in', async () => {
    server.use(
      graphql.query('CURRENT_USER_QUERY', (req, res, ctx) => {
        return res.once(ctx.data({ me: fakeRegularUser() }));
      })
    );

    render(<ToggleProvider><Nav /></ToggleProvider>);
    const orders = await screen.findByRole('link', { name: /Orders/i });
    expect(orders).toBeInTheDocument();
  });

  it('renders the amount of items in the cart', async () => {
    server.use(
      graphql.query('CURRENT_USER_QUERY', (req, res, ctx) => {
        return res.once(
          ctx.data({
            me: {
              ...fakeRegularUser(),
              cart: [fakeCartItem(), fakeCartItem(), fakeCartItem()],
            },
          })
        );
      })
    );
    render(<ToggleProvider><Nav /></ToggleProvider>);
    expect(await screen.findByText('9')).toBeInTheDocument();
  });
});
