import styled from 'styled-components';

const Item = styled.div`
  background: inherit;
  /* border: 1px solid ${(props) => props.theme.offWhite}; */
  /* box-shadow: ${(props) => props.theme.bs}; */
  position: relative;
  transition: all 1s;
    background: url(${props => props.background}) no-repeat center center/contain;
  .overlay {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 300px;
    transition: all 1s;
    z-index: -1;
    &:hover {
      background: rgba(255,255,255,.7);
      z-index: 0;
      p {
        display: block;
        transform: translateX(0);
      }
    }
    p {
      text-align: center;
      transform: translateX(-10%);
      margin-top: 13rem;
      color: ${props => props.theme.teal};
      font-size: 3rem;
      display: none;
      transition: all 2s;
    }
    @media(max-width: 700px) {
      height: 250px;
    }
  }
  
  p {
    line-height: 1.5;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1rem;
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${(props) => props.theme.lightgrey};
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1px;
    background: ${(props) => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
    @media (max-width: 700px) {
      grid-template-columns: 1fr;
    }
    @media (max-width: 700px) {
      img {
        height: 25vh;
      }
    }
  }
`;

export default Item;
