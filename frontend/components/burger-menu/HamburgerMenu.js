import { useTogglers } from '../utils/LocalState';
import { useUser } from '../utils/User';
import Link from 'next/link';

import BurgerStyles from '../styles/BurgerStyles';
import BurgerCloseButton from '../styles/BurgerCloseButton';
import Signout from '../signup-signin/Signout';
import BurgerCartCount from './BurgerCartCount';

const HamburgerMenu = () => {
  const me = useUser();
  const { burgerOpen, toggleBurger, toggleCart } = useTogglers();

  const handleLinkClick = () => {
    toggleBurger();
  };

  const SellLink = (
    <Link href='/sell'>
      <a onClick={handleLinkClick} name='sell'>
        Sell
      </a>
    </Link>
  );
  const BrowseLink = (
    <Link href='/items'>
      <a onClick={handleLinkClick} name='browse'>
        Browse
      </a>
    </Link>
  );
  const OrdersLink = (
    <Link href='/orders'>
      <a onClick={handleLinkClick} name='orders'>
        Orders
      </a>
    </Link>
  );
  const AccountLink = (
    <Link href='/me' name='account'>
      <a onClick={handleLinkClick} name='account'>
        Account
      </a>
    </Link>
  );
  const SignoutButton = <Signout onClick={handleLinkClick} name='signout' />;
  function CartLink(props) {
    return (
      <button
        name='toggleCart'
        onClick={() => {
          toggleBurger();
          toggleCart();
        }}
      >
        My Cart
        <BurgerCartCount
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
      <a onClick={handleLinkClick} name='signin'>
        Sign In
      </a>
    </Link>
  );

  return (
    <BurgerStyles data-testid='burger' open={burgerOpen}>
      <BurgerCloseButton onClick={toggleBurger}>&times;</BurgerCloseButton>
      <div className='links'>
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
      </div>
    </BurgerStyles>
  );
};

export default HamburgerMenu;
