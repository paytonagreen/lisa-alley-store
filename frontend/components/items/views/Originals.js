import React from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';

import { Center, ItemsList } from '../../styles/ItemListStyles';
import Item from '../item-card/Item';
import { useUser } from '../../utils/User';
import ViewsPagination from './ViewsPagination';
import { perPage } from '../../../config';
import Loader from '../../utils/Loader';
import Error from '../../utils/ErrorMessage';

const ALL_ORIGINALS_QUERY = gql`
  query ALL_ORIGINALS_QUERY($skip: Int = 3, $first: Int = ${perPage}) {
    items (where: {type: "original"} first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
      quantity
    }
  }
`;

const Originals = ({ page }) => {
  const me = useUser();
  const { data, error, loading } = useQuery(ALL_ORIGINALS_QUERY, {
    variables: { skip: page * perPage - perPage, first: perPage },
  });
  return (
    <Center>
      <ViewsPagination page={page} />
      {loading && <Center><Loader /></Center>}
      {error && <Error error={error}/>}
      {!loading && !error && (
        <ItemsList>
          {data.items.map((item) => (
            <Item me={me} key={item.id} item={item} />
          ))}
        </ItemsList>
      )}
      <ViewsPagination page={page} />
    </Center>
  );
};

export default Originals;
export { ALL_ORIGINALS_QUERY };
