import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

import Header from './header/Header';
import Footer from './Footer';
import Meta from './Meta';

const theme = {
  red: '#bc140a',
  lavender: '#E6E6FA',
  yellow: '#f2a900',
  black: '#393939',
  grey: '3A3A3A',
  teal: '#4c797e',
  lightgrey: '#E1E1E1',
  lightlavender: '#f5f5f8',
  offwhite: '#FCF5EB',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0,0,0,0.09)',
};

const StyledPage = styled.div`
  background-color: ${(props) => props.theme.offwhite};
  color: ${(props) => props.theme.black};
  position: relative;
  min-height: 100vh;
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  padding-bottom: 20vh;
  @media(max-width: 700px) {
    padding-bottom: 20vh;
  }
`;

const GlobalStyle = createGlobalStyle`
  html {
    font-family: 'Alegreya Sans SC', sans-serif;
    box-sizing: border-box;
    font-size: 10px;
    overflow-y: scroll;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    background-color: ${props => props.theme.offwhite};
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'Alegreya Sans SC', sans-serif;
  }
  a,
  button{
    text-decoration: none;
    color: ${theme.black};
    font-family: 'Alegreya Sans SC', sans-serif;
  }
`;

const Page = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <GlobalStyle />
        <Meta />
        <Header />
        <Inner>{children}</Inner>
        <Footer />
      </StyledPage>
    </ThemeProvider>
  );
};

export default Page;
