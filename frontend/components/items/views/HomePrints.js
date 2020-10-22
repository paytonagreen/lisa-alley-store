import React from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';

import { Center, ItemsList } from '../../styles/ItemListStyles';
import Item from '../item-card/Item';
import { useUser } from '../../utils/User';
import ViewsPagination from './ViewsPagination';
import { smallPerPage } from '../../../config';
import Loader from '../../utils/Loader';
import Error from '../../utils/ErrorMessage';

const ALL_PRINTS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 3, $first: Int = ${smallPerPage}) {
    items (where: {type: "Print"} first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const ItemSectionStyles = styled.div`
  text-align: center;
`;

const PrintsTitle = styled.h2`
  color: ${props => props.theme.teal};
  font-size: 3rem;
  font-family: 'Cinzel', serif;
`;

const SectionDivider = styled.div`
  margin: 4rem auto;
  width: 75%;
  height: 1rem;
  background: ${props => props.theme.yellow};
  border-radius: 5px;
  opacity: .7;

`;
const SectionLink = styled.button`
  color: ${props => props.theme.yellow};
  background: ${props => props.theme.teal};
  font-size: 2rem;
  font-family: 'Alegreya Sans SC', sans-serif;
  border: none;
  border-radius: 5px;
  margin-top: 2rem;
  padding: 1rem;
`;

const Prints = ({ page }) => {
  const me = useUser();
  const { data, error, loading } = useQuery(ALL_PRINTS_QUERY, {
    variables: { skip: page * smallPerPage - smallPerPage, first: smallPerPage },
  });
  return (
    <ItemSectionStyles>
      <SectionDivider/>
      <PrintsTitle>PRINTS</PrintsTitle>
      {loading && <Center><Loader /></Center>}
      {error && <Error error={error}/>}
      {!loading && !error && (
        <ItemsList>
          {data.items.map((item) => (
            <Item me={me} key={item.id} item={item} />
          ))}
        </ItemsList>
      )}
      <SectionLink>BROWSE ALL PRINTS</SectionLink>
      <SectionDivider />
    </ItemSectionStyles>
  );
};

export default Prints;
export { ALL_PRINTS_QUERY };
