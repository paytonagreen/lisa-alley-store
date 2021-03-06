import PropTypes from 'prop-types';

import formatMoney from '../../lib/formatMoney';

import RemoveFromCart from './RemoveFromCart';
import CartItemStyles from '../styles/CartItemStyles';

const CartItem = ({ cartItem }) => {
  if (!cartItem.item)
    return (
      <CartItemStyles>
        <p>We're sorry, but his item has been removed.</p>
        <RemoveFromCart id={cartItem.id} />
      </CartItemStyles>
    );
  return (
    <CartItemStyles>
      <img width='100' src={cartItem.item.image} alt={cartItem.item.title} />
      <div className='cart-item-details'>
        <h3>{cartItem.item.title}</h3>
        <p>
          {formatMoney(cartItem.item.price * cartItem.quantity)}
          {' - '}
          <em>
            {cartItem.quantity}&times;
            {formatMoney(cartItem.item.price)} Each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
};
CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
};

export default CartItem;
