import { TransitionGroup, CSSTransition } from 'react-transition-group';

import BurgerAnimationStyles from '../styles/BurgerAnimationStyles';
import BurgerDot from '../styles/BurgerDot';

const CartCount = ({ count }) => (
  <BurgerAnimationStyles>
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        className='count'
        classNames='count'
        key={count}
        timeout={{ enter: 400, exit: 400 }}
      >
        <BurgerDot>{count}</BurgerDot>
      </CSSTransition>
    </TransitionGroup>
  </BurgerAnimationStyles>
);

export default CartCount;
