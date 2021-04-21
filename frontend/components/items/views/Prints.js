import React from 'react';
import { useQuery, gql } from '@apollo/client';

import { useUser } from '../../utils/User';
import { perPage } from '../../../config';

import { Center, ItemsList } from '../../styles/ItemListStyles';
import Item from '../item-card/Item';
import ViewsPagination from './ViewsPagination';
import Loader from '../../utils/Loader';
import Error from '../../utils/ErrorMessage';

const ALL_PRINTS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 3, $first: Int = ${perPage}) {
    items (where: {type: "print"}, first: $first, skip: $skip, orderBy: createdAt_DESC) {
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

const Prints = ({ page }) => {
  const me = useUser();
  const { data, error, loading } = useQuery(ALL_PRINTS_QUERY, {
    variables: { skip: page * perPage - perPage, first: perPage },
  });
  return (
    <Center>
      <ViewsPagination page={page} view='print' />
      {loading && (
        <Center>
          <Loader />
        </Center>
      )}
      {error && <Error error={error} />}
      {!loading && !error && (
        <ItemsList>
          {data.items.map((item) => (
            <Item me={me} key={item.id} item={item} />
          ))}
        </ItemsList>
      )}
      <ViewsPagination page={page} view='print' />
    </Center>
  );
};

export default Prints;
export { ALL_PRINTS_QUERY };
