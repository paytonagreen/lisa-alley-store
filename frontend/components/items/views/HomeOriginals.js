import React from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';

import { Center, ItemsList } from '../../styles/ItemListStyles';
import Item from '../item-card/Item';
import { useUser } from '../../utils/User';
import { smallPerPage } from '../../../config';
import Loader from '../../utils/Loader';
import Error from '../../utils/ErrorMessage';

const ALL_ORIGINALS_QUERY = gql`
  query ALL_ORIGINALS_QUERY($skip: Int = 0, $first: Int = ${smallPerPage}) {
    items (where: {type: "original"} first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.teal};
  font-size: 3rem;
  margin: 0;
  font-family: 'Cinzel', serif;
`;

const SectionDivider = styled.div`
  margin: 2rem auto;
  width: 75%;
  height: 1rem;
  background: ${props => props.theme.yellow};
  border-radius: 5px;
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

const Originals = ({ page }) => {
  const me = useUser();
  const { data, error, loading } = useQuery(ALL_ORIGINALS_QUERY, {
    variables: { skip: page * smallPerPage - smallPerPage, first: smallPerPage },
  });
  return (
    <Center>
      <SectionTitle>ORIGINALS</SectionTitle>
      {loading && <Center><Loader /></Center>}
      {error && <Error error={error}/>}
      {!loading && !error && (
        <ItemsList>
          {data.items.map((item) => (
            <Item me={me} key={item.id} item={item} />
          ))}
        </ItemsList>
      )}
      <SectionLink>BROWSE ALL ORIGINALS</SectionLink>
      <SectionDivider/>
    </Center>
  );
};

export default Originals;
export { ALL_ORIGINALS_QUERY };
