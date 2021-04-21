import styled from 'styled-components';

const CartDot = styled.div`
  background: ${(props) => props.theme.teal};
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-weight: 100;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

export default CartDot;
