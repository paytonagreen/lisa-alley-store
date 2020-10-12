import styled from 'styled-components';

const FooterStyles = styled.footer`
  background: ${(props) => props.theme.teal};
  color: ${props => props.theme.lavender};
  position: absolute;
  bottom: 0;
  width: 100%;
  min-height: 12vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a {
    color: ${props => props.theme.yellow};
  }
  .social {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    font-size: 2rem;
    @media(max-width: 700px) {
      font-size: 1.5rem;
    }
  }
  .created {
    text-align: center;
    @media (max-width: 700) {
      font-size: 0.75rem;
    }
  }
`;

export default FooterStyles;
