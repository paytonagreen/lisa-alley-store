import styled from 'styled-components';

const BurgerDot = styled.div`
  background: ${(props) => props.theme.yellow};
  color: ${(props) => props.theme.teal};
  border-radius: 50%;
  margin: auto;
  padding: 0.5rem;
  line-height: 2rem;
  max-width: 3rem;
  font-weight: 100;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

export default BurgerDot;