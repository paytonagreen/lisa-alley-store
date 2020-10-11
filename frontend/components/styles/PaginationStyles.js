import styled from 'styled-components';

const PaginationStyles = styled.div`
  text-align: center;
  font-size: 1.75rem;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 3rem 0;
  border: 1px solid ${props => props.theme.teal};
  border-radius: 10px;
  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid ${props => props.theme.teal};
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }
  @media(max-width: 700px) {
    font-size: 1rem;
    & > * {
      padding: 1rem;
    }
  }
`;

export default PaginationStyles;
