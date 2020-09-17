import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const AnimationStyles = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: all .4s;
    backface-visibility: hidden;
  }
  /* Initial state of entered dot */
  .count-enter {
    transform: scale(4) rotateX(0.5turn);
  }
  .count-enter-active {
    transform: rotateX(0);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }
  .count-exit-active {
    transform: scale(4) rotateX(0.5turn);
  }
`;

const Dot = styled.div`
  background: ${(props) => props.theme.yellow};
  color: ${props => props.theme.teal};
  border-radius: 50%;
  margin: auto;
  padding: 0.5rem;
  line-height: 2rem;
  max-width: 3rem;
  font-weight: 100;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
`;

const CartCount = ({ count }) => (
  <AnimationStyles>
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        className="count"
        classNames="count"
        key={count}
        timeout={{ enter: 400, exit: 400 }}
      >
        <Dot>{count}</Dot>
      </CSSTransition>
    </TransitionGroup>
  </AnimationStyles>
);

export default CartCount;