import styled from 'styled-components';

const Supreme = styled.h3`
  text-align: center;
  color: ${props => props.theme.teal};
  display: inline-block;
  padding: 4px 5px;
  margin: 0;
  font-size: 3rem;
  @media(max-width: 700px) {
    font-size: 2rem;
  }
`;

export default Supreme;
