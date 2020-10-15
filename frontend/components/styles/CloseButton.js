import styled from 'styled-components';

const CloseButton = styled.button`
  background: ${props => props.theme.teal};
  color: ${props => props.theme.yellow};
  font-size: 3rem;
  border: 0;
  position: absolute;
  z-index: 6;
  right: 0;
  @media(max-width: 700px) {
    background: ${props => props.theme.teal};
    opacity: .5;
  }
`;

export default CloseButton;
