import styled from 'styled-components';

const FooterStyles = styled.footer`
  background: ${(props) => props.theme.teal};
  position: absolute;
  bottom: 0;
  width: 100%;
  min-height: 12vh;
  .social {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    img {
      height: 4rem;
      color: white;
      margin: 0 1rem;
      @media (max-width: 700px) {
        height: 3rem;
      }
    }
  }
  .created {
    text-align: center;
    margin-top: 1rem;
    @media (max-width: 700) {
      font-size: 0.75rem;
    }
  }
`;

export default FooterStyles;
