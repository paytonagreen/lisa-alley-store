import { screen, waitFor } from '@testing-library/react';
import { render, fakeRegularUser, fakeCartItem, fakeItem } from '../../lib/testUtils';
import HamburgerMenu from '../../components/burger-menu/HamburgerMenu';
import { server } from '../../mocks/server';
import { graphql } from 'msw';

describe('<HamburgerMenu/> as admin', () => {
  it('renders a full admin nav when admin signed in', async () => {
    render(<HamburgerMenu />);
    const sell = await screen.findByRole('link', { name: /Sell/i });
    expect(sell).toBeInTheDocument();
  });
})