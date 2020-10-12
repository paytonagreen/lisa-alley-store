import styled from "styled-components";

const BurgerStyles = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;
  background: ${(props) => props.theme.teal};
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 40%;
  max-width: 50vw;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  ${(props) => props.open && `transform: translateX(0);`};
  .links {
    font-size: 1.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  a,
  button {
    text-align: center;
    width: 100%;
    margin: 1rem;
    border: none;
    outline: none;
    padding: 1rem 0rem;
    color: ${(props) => props.theme.lavender};
    background: ${(props) => props.theme.teal};
    div {
      color: ${(props) => props.theme.teal};
    }
  }
`;

export default BurgerStyles;
