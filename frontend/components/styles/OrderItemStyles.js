import styled from 'styled-components';

const OrderItemStyles = styled.li`
  box-shadow: ${props => props.theme.bs};
  list-style: none;
  padding: 2rem;
  border: 1px solid ${props => props.theme.offWhite};
  position: relative;
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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25%, 1fr));
    display: grid;
    grid-gap: 1rem;
    text-align: center;
    @media(max-width: 700px) {
      grid-template-columns: 1fr;
      font-size: 1.25rem;
    }
    & > * {
      margin: 0;
      background: rgba(0, 0, 0, 0.03);
      padding: 1rem 0;
    }
    strong {
      display: block;
      margin-bottom: 1rem;
    }
  }
`;

export default OrderItemStyles;
