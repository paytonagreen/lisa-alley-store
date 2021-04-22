import Link from 'next/link';

import { useTogglers } from '../../utils/LocalState';
import { useUser } from '../../utils/User';

import NavStyles from '../../styles/NavStyles';
import Signout from '../../signup-signin/Signout';
import CartCount from '../../cart/CartCount';

function Nav() {
  const { toggleCart } = useTogglers();
  const me = useUser();
  const SellLink = (
    <Link href='/sell'>
      <a name='sell'>Sell</a>
    </Link>
  );
  const BrowseLink = (
    <Link href='/items'>
      <a name='browse'>Browse</a>
    </Link>
  );
  const OrdersLink = (
    <Link href='/orders'>
      <a name='orders'>Orders</a>
    </Link>
  );
  const AccountLink = (
    <Link href='/me' name='account'>
      <a name='account'>Account</a>
    </Link>
  );
  const SignoutButton = <Signout name='signout' />;
  function CartLink(props) {
    return (
      <button
        name='toggleCart'
        onClick={() => {
          toggleCart();
        }}
      >
        My Cart
        <CartCount
          count={props.me.cart.reduce(
            (tally, cartItem) => tally + cartItem.quantity,
            0
          )}
        />
      </button>
    );
  }
  const SigninLink = (
    <Link href='/signin'>
      <a name='signin'>Sign In</a>
    </Link>
  );

  return (
    <NavStyles>
      {/* ALL VIEWS */}
      {/* //Admin Only */}
      {me && me.permissions.includes('ADMIN') && SellLink}
      {BrowseLink}
      {/* Signed In User */}
      {me && me.permissions.includes('USER') && OrdersLink}
      {me && me.permissions.includes('USER') && AccountLink}
      {me && me.permissions.includes('USER') && SignoutButton}
      {me && me.permissions.includes('GUEST') && SigninLink}
      {me && <CartLink me={me} />}
      {/* //Not Signed In */}
      {!me && SigninLink}
    </NavStyles>
  );
}

export default Nav;
