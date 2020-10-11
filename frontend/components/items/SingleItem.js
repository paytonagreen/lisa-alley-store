import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Error from '../utils/ErrorMessage';
import Head from 'next/head';
import AddToCart from './item-card/AddToCart';
import SingleItemStyles from '../styles/SingleItemStyles';
import formatMoney from '../../lib/formatMoney'

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      price
      description
      largeImage
    }
  }
`;

const SingleItem = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });
  if (error) return <Error error={error} />;
  if (loading) return <p>Loading...</p>;
  if (!data.item) return <p>No Item Found for {id}</p>;
  const { item } = data;
  return (
    <SingleItemStyles>
      <Head>
        <title>Lisa Alley | {item.title}</title>F
      </Head>
      <img src={item.largeImage} alt={item.title} />
      <div className="details">
        <h2>{item.title}</h2>
        <p>Price: {formatMoney(item.price)}</p>
        <p>{item.description}</p>
        <AddToCart id={item.id} />
      </div>
    </SingleItemStyles>
  );
};

export default SingleItem;
export { SINGLE_ITEM_QUERY };
