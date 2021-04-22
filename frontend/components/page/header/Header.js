import NProgress from 'nprogress';
import Router from 'next/router';

import { useTogglers } from '../../utils/LocalState';

import Nav from './Nav';
import Cart from '../../cart/Cart';
import { StyledHeader, HamburgerButton, Logo } from '../../styles/HeaderStyles';
import HamburgerMenu from '../../burger-menu/HamburgerMenu';
import Search from './Search';

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
  const { toggleBurger } = useTogglers();
  return (
    <>
      <HamburgerButton onClick={toggleBurger}>MENU</HamburgerButton>
      <StyledHeader>
        <div className='bar'>
          <Logo>
            <a href='https://lisa-alley.com'>LISA ALLEY STORE</a>
          </Logo>
          <Nav />
        </div>
        <div className='sub-bar'>
          <Search />
        </div>
        <Cart />
        <HamburgerMenu />
      </StyledHeader>
    </>
  );
};

export default Header;
