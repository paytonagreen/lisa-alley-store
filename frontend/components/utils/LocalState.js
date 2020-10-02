import { createContext, useState, useContext } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function ToggleProvider({children}) {
  const [cartOpen, setCartOpen] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function toggleBurger() {
    setBurgerOpen(!burgerOpen);
  }

  return(
    <LocalStateProvider value={{cartOpen, burgerOpen, toggleCart, toggleBurger}}>
      {children}
    </LocalStateProvider>
  )
}

function useTogglers() {
  const all = useContext(LocalStateContext);
  return all
}

export { ToggleProvider, LocalStateContext, useTogglers }