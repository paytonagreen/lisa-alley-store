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
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${smallPerPage}) {
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

const PrintsTitle = styled.h2`

`;

const Prints = ({ page }) => {
  const me = useUser();
  const { data, error, loading } = useQuery(ALL_PRINTS_QUERY, {
    variables: { skip: page * smallPerPage - smallPerPage, first: smallPerPage },
  });
  return (
    <Center>
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
      <ViewsPagination view="prints" page={page} />
    </Center>
  );
};

export default Prints;
export { ALL_PRINTS_QUERY };
