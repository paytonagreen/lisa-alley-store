import styled from 'styled-components';

export const Center = styled.div`
  text-align: center;
`;

export const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 60px;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    max-width: 70vw;
  }
`;