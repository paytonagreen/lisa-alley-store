import { screen, waitFor } from '@testing-library/react';
import { render, fakeRegularUser, fakeCartItem, fakeItem } from '../lib/testUtils';
import HamburgerMenu, {
  LOCAL_BURGER_QUERY,
} from '../components/burger-menu/HamburgerMenu';
import { server } from '../mocks/server';
import { graphql } from 'msw';

describe('<HamburgerMenu/>', () => {
  it('renders a minimal nav when signed out', async () => {
    server.use(
      graphql.query('CURRENT_USER_QUERY', (req, res, ctx) => {
        res(null);
      })
    );
    render(<HamburgerMenu />);
    const signIn = await screen.findByRole('link', { name: /Sign In/i });
    expect(signIn).toBeInTheDocument();
  });

  it('renders a full admin nav when admin signed in', async () => {
    render(<HamburgerMenu />);
    const sell = await screen.findByRole('link', { name: /Sell/i });
    expect(sell).toBeInTheDocument();
  });

  it('renders a full user nav when signed in', async () => {
    server.use(
      graphql.query('CURRENT_USER_QUERY', (req, res, ctx) => {
        return res(ctx.data({ me: fakeRegularUser() }));
      })
    );
    render(<HamburgerMenu />);
    const SignOut = await screen.findByRole('button', { name: /Sign Out/i });
    expect(SignOut).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Account/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Orders/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /My Cart/i })
    ).toBeInTheDocument();
  });
});

