import { screen, waitFor } from '@testing-library/react';
import { render, fakeRegularUser, fakeUser, fakeCartItem } from '../lib/testUtils';
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
    render(
      <HamburgerMenu/>
    );
    const signIn = await screen.findByRole('link', {name: /Sign In/i});
    expect(signIn).toBeInTheDocument();
  });

  it('renders a full user nav when signed in', async () => {
    server.use(
      graphql.query('CURRENT_USER_QUERY', (req, res, ctx) => {
        res(ctx.data({ me: fakeRegularUser() }))
      })
    )
    render(
      <HamburgerMenu/>
    )
    const SignOut = await screen.findByRole('button', {name: /Sign Out/i});
    expect(SignOut).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Account/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Orders/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /My Cart/i})).toBeInTheDocument();
  });

  it('renders a full admin nave when admin signed in', async () => {
    render(<HamburgerMenu/>)
    const sell = await screen.findByRole('link', {name: /Sell/i});
    expect(sell).toBeInTheDocument();
  })
});


// describe('<HamburgerMenu/>', () => {
//   it('renders a minimal nav when signed out', () => {
//     render(
//       <MockedProvider>
//         <HamburgerMenu />
//       </MockedProvider>
//     );
//     waitFor(() => {
//       expect(screen.getByText('Browse')).toBeInTheDocument();
//       expect(screen.getByText('Sign In')).toBeInTheDocument();
//     });
//   });

//   it('renders full user nav when signed in', async () => {
//     const { container } = render(
//       <MockedProvider mocks={signedInMocks} addTypename={false}>
//         <HamburgerMenu />
//       </MockedProvider>
//     );
//     await screen.findByText('Account');
//     expect(container).toHaveTextContent('Sign Out');
//   });

//   it('renders full admin nav when admin signed in', () => {
//     const { container } = render(
//       <MockedProvider mocks={signedInAdminMocks}>
//         <HamburgerMenu />
//       </MockedProvider>
//     );
//     waitFor(() => {
//       expect(screen.getByText('Browse')).toBeInTheDocument();
//       expect(screen.getByText('Orders')).toBeInTheDocument();
//       expect(screen.getByText('Account')).toBeInTheDocument();
//       expect(screen.getByText('Sign Out')).toBeInTheDocument();
//       expect(screen.getByText('My Cart')).toBeInTheDocument();
//       expect(screen.getByText('Sign In')).toBeInTheDocument();
//       expect(screen.getByText('Sell')).toBeInTheDocument();
//     });
//   });

//   it('renders the correct amount of items in the cart', () => {
//     const { container } = render(
//       <MockedProvider mocks={userWithCartItems}>
//         <HamburgerMenu />
//       </MockedProvider>
//     );
//     waitFor(() => {
//       expect(screen.getNodeText(getByTestId('burger-count')).toEqual(2));
//     });
//   });
// });
