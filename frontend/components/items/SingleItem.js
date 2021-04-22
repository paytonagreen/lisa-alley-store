import { useQuery, gql } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';

import formatMoney from '../../lib/formatMoney';
import useUser from '../utils/User';

import Error from '../utils/ErrorMessage';
import AddToCart from './item-card/AddToCart';
import DeleteItem from './item-card/DeleteItem';
import SingleItemStyles from '../styles/SingleItemStyles';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      price
      description
      largeImage
      type
      size
      lowercaseTitle
      lowercaseDescription
      quantity
    }
  }
`;

const SingleItem = ({ id }) => {
  const me = useUser();
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
        <p>
          <strong>{item.type}</strong>
        </p>
        <p>
          <strong>Size:</strong> {item.size}
        </p>
        <p>
          <strong>Price:</strong> {formatMoney(item.price)}
        </p>
        <p>
          <strong>Description:</strong> {item.description}
        </p>
        <div className="buttons">
          {item.quantity >= 1 ? <AddToCart id={item.id}/>: <button>Sold Out</button>}
          {me && me.permissions.includes('ADMIN') && (
          <>
          <Link
            href={{
              pathname: '/update',
              query: { id: item.id },
            }}
          >
            <a>Edit</a>
          </Link>
          <DeleteItem id={item.id}>Delete This Item</DeleteItem>
          </>
          )}
        </div>
      </div>
    </SingleItemStyles>
  );
};

export default SingleItem;
export { SINGLE_ITEM_QUERY };
