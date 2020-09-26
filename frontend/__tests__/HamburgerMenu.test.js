import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';
import { CURRENT_USER_QUERY } from '../components/utils/user';
import { fakeRegularUser, fakeUser, fakeCartItem } from '../lib/testUtils';
import HamburgerMenu, {
  LOCAL_BURGER_QUERY,
} from '../components/burger-menu/HamburgerMenu';

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } },
  },
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeRegularUser() } },
  },
];

const signedInAdminMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } },
  },
];

const burgerMocks = [
  {
    request: { query: LOCAL_BURGER_QUERY },
    result: { data: { burgerOpen: true } },
  },
];

const userWithCartItems = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeRegularUser(),
          cart: [fakeCartItem(), fakeCartItem(), fakeCartItem()],
        },
      },
    },
  },
];

describe('<HamburgerMenu/>', () => {
  it('renders a minimal nav when signed out', () => {
    const { container } = render(
      <MockedProvider mocks={(notSignedInMocks, burgerMocks)}>
        <HamburgerMenu />
      </MockedProvider>
    );
    waitFor(() => {
      expect(screen.getByText('Browse')).toBeInTheDocument();
      expect(screen.getByText('Sign In')).toBeInTheDocument();
    });
  });

  it('renders full user nav when signed in', async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={userWithCartItems} addTypename="false">
          <HamburgerMenu />
        </MockedProvider>
      );
      await screen.findByText('Account');
    });
    expect(container).toHaveTextContent('Sign Out');
  });

  it('renders full admin nav when admin signed in', () => {
    const { container } = render(
      <MockedProvider mocks={signedInAdminMocks}>
        <HamburgerMenu />
      </MockedProvider>
    );
    waitFor(() => {
      expect(screen.getByText('Browse')).toBeInTheDocument();
      expect(screen.getByText('Orders')).toBeInTheDocument();
      expect(screen.getByText('Account')).toBeInTheDocument();
      expect(screen.getByText('Sign Out')).toBeInTheDocument();
      expect(screen.getByText('My Cart')).toBeInTheDocument();
      expect(screen.getByText('Sign In')).toBeInTheDocument();
      expect(screen.getByText('Sell')).toBeInTheDocument();
    });
  });

  it('renders the correct amount of items in the cart', () => {
    const { container } = render(
      <MockedProvider mocks={userWithCartItems}>
        <HamburgerMenu />
      </MockedProvider>
    );
    waitFor(() => {
      expect(screen.getNodeText(getByTestId('burger-count')).toEqual(2));
    });
  });
});
