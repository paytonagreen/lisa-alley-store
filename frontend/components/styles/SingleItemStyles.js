import styled from 'styled-components';

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${(props) => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2 {
      color: ${(props) => props.theme.red};
    }
    .buttons {
      margin-top: 5rem;
      padding: 2rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    a {
      margin: 1rem 0;
      width: 100%;
      padding: 1rem;
      border: none;
      border-radius: 5px;
      background-color: ${(props) => props.theme.yellow};
      color: ${(props) => props.theme.black};
      text-align: center;
      font-size: 2rem;
    }
    button{
      margin: 2rem 0;
      width: 100%;
      padding: 2rem;
      border: none;
      border-radius: 5px;
      background-color: ${(props) => props.theme.yellow};
      color: ${(props) => props.theme.black};
      text-align: center;
      font-size: 2rem;
    }
  }
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    min-height: 1vh;
    .details {
      margin: 1.5rem;
      font-size: 1.5rem;
    }
  }
`;

export default SingleItemStyles;