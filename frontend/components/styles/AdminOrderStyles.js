import styled from 'styled-components';

const OrderItemStyles = styled.li`
  box-shadow: ${props => props.theme.bs};
  background-color: #f4f4f4;
  list-style: none;
  padding: 2rem;
  border: 1px solid ${props => props.theme.offWhite};
  h2 {
    border-bottom: 2px solid red;
    margin-top: 0;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }

  .images {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    margin-top: 1rem;
    img {
      height: 200px;
      object-fit: cover;
      width: 100%;
    }
  }
  .order-meta {
    display: flex;
    flex-direction: column;
    display: grid;
    grid-gap: 1rem;
    text-align: center;
    & > * {
      margin: 0;
      text-align: left;
    }
    strong {
      display: block;
      margin-bottom: 1rem;
    }
    button {

    }
  }
`;

const Title = styled.span`
  color: ${(props) => props.theme.red};
`;

const ButtonDiv = styled.div`
  display: flex;
  position: relative;
`;

const FulfilledButton = styled.button`
  border: none;
  background: ${(props) =>
    props.fulfilled ? props.theme.teal : props.theme.yellow};
  color: ${(props) =>
    props.fulfilled ? props.theme.lightgrey : props.theme.black};
  padding: 1rem;
  display: inline-block;
  position: absolute;
  top: -1.25rem;
  right: -1.25rem;
  outline: none;
  transition: all .5s;
`;

const OrderUL = styled.ul`
  display: grid;
  grid-gap: 4rem;
  padding: 0;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
  @media(max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export default OrderItemStyles;
export { Title, ButtonDiv, FulfilledButton, OrderUL }