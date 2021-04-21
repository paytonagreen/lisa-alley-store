import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import CartAnimationStyles from '../styles/CartAnimationStyles';
import CartDot from '../styles/CartDot';

const CartCount = ({ count }) => (
  <CartAnimationStyles>
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        className='count'
        classNames='count'
        key={count}
        timeout={{ enter: 400, exit: 400 }}
      >
        <CartDot>{count}</CartDot>
      </CSSTransition>
    </TransitionGroup>
  </CartAnimationStyles>
);

export default CartCount;
