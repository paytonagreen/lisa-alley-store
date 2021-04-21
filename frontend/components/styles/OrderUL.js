import styled from 'styled-components';

const OrderUL = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
  padding: 0;
  @media(max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export default OrderUL;