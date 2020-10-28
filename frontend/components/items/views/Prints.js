import React from 'react';
import { useQuery, gql } from '@apollo/client';

import { Center, ItemsList } from '../../styles/ItemListStyles';
import Item from '../item-card/Item';
import { useUser } from '../../utils/User';
import Pagination from '../Pagination';
import { perPage } from '../../../config';
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
      <Pagination page={page} />
      {loading && <Center><Loader /></Center>}
      {error && <Error error={error}/>}
      {!loading && !error && (
        <ItemsList>
          {data.items.map((item) => (
            <Item me={me} key={item.id} item={item} />
          ))}
        </ItemsList>
      )}
      <Pagination page={page} />
    </Center>
  );
};

export default Prints;
export { ALL_PRINTS_QUERY };