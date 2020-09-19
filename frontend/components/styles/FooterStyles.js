import styled from 'styled-components';

const FooterStyles = styled.footer`
  background: ${(props) => props.theme.teal};
  position: relative;
  bottom: 0;
  width: 100%;
  .social {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 12vh;
    img {
      height: 4rem;
      color: white;
      margin: 0 1rem;
      @media(max-width: 700px) {
        height: 3rem;
      }
    }
  }
  .created {
    text-align: center;
    @media(max-width: 700) {
      font-size: .75rem;
    }
  }
`;

export default FooterStyles;