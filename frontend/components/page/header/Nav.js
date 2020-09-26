import Link from "next/link";
import { useMutation } from "@apollo/client";
import NavStyles from "../../styles/NavStyles";
import { useUser } from "../../utils/User";
import Signout from "../../signup-signin/Signout";
import CartCount from "../../cart/CartCount";
import { TOGGLE_CART_MUTATION } from "../../cart/Cart";

function Nav() {
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);
  const me = useUser();
  return (
    <NavStyles data-testid="nav">
      <Link href="/items">
        <a>Browse</a>
      </Link>
      {/* Signed In */}
      {me && (
        <>
          <Link href="/orders">
            <a>Orders</a>
          </Link>
          <Link href="/me">
            <a>Account</a>
          </Link>
          <Signout />
          <button onClick={toggleCart}>
            My Cart
            <CartCount
              count={me.cart.reduce(
                (tally, cartItem) => tally + cartItem.quantity,
                0
              )}
            />
          </button>
        </>
      )}
      {/* //Admin Only */}
      {me && me.permissions.includes("ADMIN") && (
        <Link href="/sell">
          <a>Sell</a>
        </Link>
      )}
      {/* //Not Signed In */}
      {!me && (
        <Link href="/signin">
          <a>Sign In</a>
        </Link>
      )}
    </NavStyles>
  );
}

export default Nav;
