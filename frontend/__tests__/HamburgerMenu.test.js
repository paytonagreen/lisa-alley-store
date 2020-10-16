import { screen } from '@testing-library/react';
import { render, fakeRegularUser, fakeCartItem } from '../lib/testUtils';
import HamburgerMenu from '../components/burger-menu/HamburgerMenu';
import { server } from '../mocks/server';
import { graphql } from 'msw';
import { ToggleProvider } from '../components/utils/LocalState';

describe('<HamburgerMenu/>', () => {
  it('renders a minimal nav when signed out', async () => {
    server.use(
      graphql.query('CURRENT_USER_QUERY', (req, res, ctx) => {
        res(null);
      })
    );
    render(<ToggleProvider><HamburgerMenu /></ToggleProvider>);
    const signIn = await screen.findByRole('link', { name: /Sign In/i });
    expect(signIn).toBeInTheDocument();
  });

  it('renders a full admin nav when admin signed in', async () => {
    render(<ToggleProvider><HamburgerMenu /></ToggleProvider>);
    const sell = await screen.findByRole('link', { name: /Sell/i });
    expect(sell).toBeInTheDocument();
  });

  it('renders a full user nav when signed in', async () => {
    server.use(
      graphql.query('CURRENT_USER_QUERY', (req, res, ctx) => {
        return res.once(ctx.data({ me: fakeRegularUser() }));
      })
    );
    render(<ToggleProvider><HamburgerMenu /></ToggleProvider>);
    const SignOut = await screen.findByRole('button', { name: /Sign Out/i });
    expect(SignOut).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Account/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Orders/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /My Cart/i })
    ).toBeInTheDocument();
  });

  it('displays the correct cart count', async () => {
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
    render(<ToggleProvider><HamburgerMenu /></ToggleProvider>);
    const cartCount = await screen.findByText('9');
    expect(cartCount).toBeInTheDocument();
  });
});
