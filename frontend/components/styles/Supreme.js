import styled from 'styled-components';

const Supreme = styled.h3`
  text-align: center;
  background: ${props => props.theme.red};
  color: white;
  display: inline-block;
  padding: 4px 5px;
  transform: skew(-3deg);
  margin: 0;
  font-size: 3rem;
`;

export default Supreme;
