import styled from 'styled-components';

const CartItemStyles = styled.li`
  /* padding: rem 0; */
  border-bottom: 1px solid ${(props) => props.theme.lightgrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 5px;
  }
  h3,
  p {
    margin: 0;
  }
  @media (max-width: 700px) {
    display: flex;
  }
`;

export default CartItemStyles;