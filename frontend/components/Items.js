import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Center, ItemsList} from './styles/ItemListStyles';
import Item from "./Item";
import { useUser } from "./User";
import Pagination from "./Pagination";
import { perPage } from "../config";
import Loader from './Loader';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items (first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Items = ({ page }) => {
  const me = useUser();
  const { data, error, loading } = useQuery(ALL_ITEMS_QUERY, {
    variables: 
    { skip: page * perPage - perPage , first: perPage },
  });
  return (
    <Center>
      <Pagination page={page} />
          {loading && <Loader/>}
          {error && <p>Error: {error.message}</p>}
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

export default Items;
export { ALL_ITEMS_QUERY };
