import styled from 'styled-components';

const Item = styled.div`
  background: inherit;
  /* border: 1px solid ${props => props.theme.offWhite}; */
  /* box-shadow: ${props => props.theme.bs}; */
  position: relative;
  display: flex;
  flex-direction: column;
  .overlay {
    transition: all 1s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      position: relative;
      top: 50%;
      left: 50%;
      opacity: 0;
      z-index: 2;
      margin-top: 150px;
      padding: 0;
      color: ${props => props.theme.teal};
      font-size: 3rem;
    }
    }
  }
  .overlay:hover {
    p {
      opacity: 1;
    }
  }
  img {
    width: 100%;
    height: 300px;
    margin-top: -150px;
    object-fit: contain;
    transition: all 1s;
  }
  img:hover {
      opacity: .5;
      z-index: 1;
    }
  p {
    line-height: 1.5;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1rem;
  }
  .description-div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
    @media(max-width: 700px) {
      grid-template-columns: 1fr;
  }
  @media(max-width: 700px) {
    img{
      height: 25vh
    }
  }
  }
`;

export default Item;
