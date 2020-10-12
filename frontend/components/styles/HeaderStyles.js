import styled from "styled-components";

export const HamburgerButton = styled.button`
  display: none;
  background: ${(props) => props.theme.yellow};
  border: none;
  outline: none;
  z-index: 3;
  @media (max-width: 700px) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 2.5%;
    right: 3%;
    width: 3rem;
    height: 3rem;
    font-size: 0.75rem;
    color: ${(props) => props.theme.teal};
  }
`;

export const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  a {
    padding: 0.5rem 1rem;
    color: ${(props) => props.theme.teal};
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  @media(max-width: 700px) {
    text-align: left;
    font-size: 3.5rem;
  }
  }
`;

export const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${(props) => props.theme.yellow};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
    button {
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${(props) => props.theme.lightgrey};
  }
`;
