import React from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';


import {
  ItemSectionStyles,
  SectionTitle,
  SectionDivider,
  SectionLink,
} from '../../styles/HomeSectionStyles';
import { Center, ItemsList } from '../../styles/ItemListStyles';
import Item from '../item-card/Item';
import { useUser } from '../../utils/User';
import { smallPerPage } from '../../../config';
import Loader from '../../utils/Loader';
import Error from '../../utils/ErrorMessage';
import Link from 'next/link';

const FEATURED_PRINTS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 3, $first: Int = ${smallPerPage}) {
    items (where: {
      AND: [
        {type: "print"},
        {featured: true}
       ]
       } first: $first, skip: $skip, orderBy: createdAt_DESC) {
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
  const { data, error, loading } = useQuery(FEATURED_PRINTS_QUERY, {
    variables: {
      skip: page * smallPerPage - smallPerPage,
      first: smallPerPage,
    },
  });
  return (
    <ItemSectionStyles>
      <SectionDivider />
      <SectionTitle>PRINTS</SectionTitle>
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
      <Link href="/prints">
        <SectionLink>BROWSE ALL PRINTS</SectionLink>
      </Link>
      <SectionDivider />
    </ItemSectionStyles>
  );
};

export default Prints;
