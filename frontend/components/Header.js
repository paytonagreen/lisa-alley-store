import Link from "next/link";
import { useMutation } from "@apollo/client";
import NProgress from "nprogress";
import Router from "next/router";
import Nav from "./Nav";
import Cart from "./Cart";
import { StyledHeader, HamburgerButton, Logo } from "./styles/HeaderStyles";
import HamburgerMenu from "./HamburgerMenu";
import { TOGGLE_BURGER_MUTATION } from "./HamburgerMenu";
import Search from "./Search";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = () => {
  const [toggleBurger] = useMutation(TOGGLE_BURGER_MUTATION);
  return (
    <>
      <HamburgerButton onClick={toggleBurger}>MENU</HamburgerButton>
      <StyledHeader>
        <div className="bar">
          <Logo>
            <Link href="/">
              <a>Lisa Alley</a>
            </Link>
          </Logo>
          <Nav />
        </div>
        <div className="sub-bar">
          <Search />
        </div>
        <Cart />
        <HamburgerMenu />
      </StyledHeader>
    </>
  );
};

export default Header;
