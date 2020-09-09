import React, { Component } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

import Header from "../components/Header";
import Meta from "../components/Meta";

const theme = {
  red: "#FF0000",
  lavender: "#E6E6FA",
  yellow: "#FFDB58",
  black: "#393939",
  grey: "3A3A3A",
  teal: "#008080",
  lightgrey: "#E1E1E1",
  offWhite: "#EDEDED",
  maxWidth: "1000px",
  bs: "0 12px 24px 0 rgba(0,0,0,0.09)",
};

const StyledPage = styled.div`
  background: ${(props) => props.theme.lavender};
  color: ${(props) => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

const GlobalStyle = createGlobalStyle`
@font-face{
  font-family: 'radnika_next';
  src: url('/static/radnikanext-medium-webfont.woff2')
  format('woff2');
  font-weight: normal;
  font-style: normal;
}
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    background-color: ${(props) => props.theme.lavender};
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'radnika_next'
  }
  a,
  button{
    text-decoration: none;
    color: ${theme.black};
    font-family: 'radnika_next'
  }
`;

const Page = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <GlobalStyle />
        <Meta />
        <Header />
        <Inner>{children}</Inner>
      </StyledPage>
    </ThemeProvider>
  );
};

export default Page;
