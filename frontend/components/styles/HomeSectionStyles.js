import styled from 'styled-components';

export const ItemSectionStyles = styled.div`
  text-align: center;
`;

export const SectionTitle = styled.h2`
  color: ${props => props.theme.teal};
  font-size: 3rem;
  font-family: 'Cinzel', serif;
  margin: 1.5rem;
`;

export const SectionDivider = styled.div`
  margin: 4rem auto;
  width: 75%;
  height: 1rem;
  background: ${props => props.theme.yellow};
  border-radius: 5px;
  opacity: .7;

`;
export const SectionLink = styled.button`
  color: ${props => props.theme.yellow};
  background: ${props => props.theme.teal};
  font-size: 2rem;
  font-family: 'Alegreya Sans SC', sans-serif;
  border: none;
  border-radius: 5px;
  margin-top: 3rem;
  padding: 1rem;
`;