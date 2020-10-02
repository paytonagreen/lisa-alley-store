import { useTogglers } from '../utils/LocalState';
import { useUser } from '../utils/User';
import CartStyles from '../styles/CartStyles';
import Supreme from '../styles/Supreme';
import CloseButton from '../styles/CloseButton';
import SickButton from '../styles/SickButton';
import CartItem from './CartItem';
import formatMoney from '../../lib/formatMoney';
import calcTotalPrice from '../../lib/calcTotalPrice';
import TakeMyMoney from './TakeMyMoney';


const Cart = () => {
  const me = useUser();
  const { cartOpen, toggleCart } = useTogglers();
  if (!me) return null;
  return (
    <CartStyles open={cartOpen}>
      <header>
        <CloseButton onClick={toggleCart} title="close">
          &times;
        </CloseButton>
        <Supreme>{me.name}'s Cart</Supreme>
        <p>
          You Have {me.cart.length} Item
          {me.cart.length === 1 ? '' : 's'} in your cart.
        </p>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <h3>Shipping: $5</h3>
      <footer>
        <p>Total: {formatMoney(calcTotalPrice(me.cart) + 500)}</p>
        {me.cart.length && (
          <TakeMyMoney>
            <SickButton onClick={() => toggleCart()}>Checkout</SickButton>
          </TakeMyMoney>
        )}
      </footer>
    </CartStyles>
  );
};

export default Cart;