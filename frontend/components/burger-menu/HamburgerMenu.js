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
    toggleBurger()
  }
  return (
    <BurgerStyles data-testid="burger" open={burgerOpen}>
      <BurgerCloseButton onClick={toggleBurger}>&times;</BurgerCloseButton>
      <div className="links">
        {/* //Admin Only */}
        {me && me.permissions.includes('ADMIN') && (
          <Link href="/sell">
            <a onClick={handleLinkClick}name="sell">Sell</a>
          </Link>
        )}
        <Link href="/items">
          <a onClick={handleLinkClick} name="browse">Browse</a>
        </Link>
        {/* Signed In */}
        {me && (
          <>
            <Link href="/orders">
              <a onClick={handleLinkClick} name="orders">Orders</a>
            </Link>
            <Link href="/me" name="account">
              <a onClick={handleLinkClick} name="account">Account</a>
            </Link>
            <Signout onClick={handleLinkClick} name="signout"/>
            <button name="toggleCart"
              onClick={() => {
                toggleBurger();
                toggleCart();
              }}
            >
              My Cart
              <BurgerCartCount
                count={me.cart.reduce(
                  (tally, cartItem) => tally + cartItem.quantity,
                  0
                )}
              />
            </button>
          </>
        )}
        {/* //Not Signed In */}
        
        {!me && (
          <Link href="/signin">
            <a onClick={handleLinkClick} name="signin">Sign In</a>
          </Link>
        )}
      </div>
    </BurgerStyles>
  );
};

export default HamburgerMenu;