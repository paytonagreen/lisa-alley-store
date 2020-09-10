import styled from 'styled-components';

const Item = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: 300px;
    object-fit: contain;
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
    grid-template-columns: 1fr;
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
