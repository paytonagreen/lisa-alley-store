import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';

import { useUser } from '../../utils/User';
import { smallPerPage } from '../../../config';

import {
  SectionTitle,
  SectionDivider,
  SectionLink,
} from '../../styles/HomeSectionStyles';
import { Center, ItemsList } from '../../styles/ItemListStyles';
import Item from '../item-card/Item';
import Loader from '../../utils/Loader';
import Error from '../../utils/ErrorMessage';

const FEATURED_ORIGINALS_QUERY = gql`
  query ALL_ORIGINALS_QUERY($skip: Int = 0, $first: Int = ${smallPerPage}) {
    items (where: {
        AND: [
          { type: "original" }
          { featured: true }
        ]
      }, first: $first, skip: $skip, orderBy: createdAt_DESC) {
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
  const { data, error, loading } = useQuery(FEATURED_ORIGINALS_QUERY, {
    variables: {
      skip: page * smallPerPage - smallPerPage,
      first: smallPerPage,
    },
  });
  return (
    <Center>
      <SectionTitle>ORIGINALS</SectionTitle>
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
      <Link href='originals'>
        <SectionLink>BROWSE ALL ORIGINALS</SectionLink>
      </Link>
      <SectionDivider />
    </Center>
  );
};

export default Originals;
