import styled from 'styled-components';

const SickButton = styled.button`
  background: ${props => props.theme.teal};
  color: white;
  font-weight: 500;
  border: 0;
  border-radius: 0;
  text-transform: uppercase;
  font-size: 2rem;
  padding: 0.8rem 1.5rem;
  transform: skew(-2deg);
  display: inline-block;
  transition: all 0.5s;
  &[disabled] {
    opacity: 0.5;
  }
  @media(max-width: 700px) {
    font-size: 1.5rem;
  }
`;

export default SickButton;
