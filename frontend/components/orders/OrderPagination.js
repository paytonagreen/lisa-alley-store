import Head from 'next/head';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';

import { ordersPerPage } from '../../config';

import PaginationStyles from '../styles/PaginationStyles';
import Loader from '../utils/Loader';

const ORDER_PAGINATION_QUERY = gql`
  query ORDER_PAGINATION_QUERY {
    ordersConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = ({ page }) => {
  const { data, loading, error } = useQuery(ORDER_PAGINATION_QUERY);
  if (loading) return <Loader />;
  const count = data.ordersConnection.aggregate.count;
  const pages = Math.ceil(count / ordersPerPage);
  return (
    <PaginationStyles data-test='pagination'>
      <Head>
        <title>
          Orders - Page {page} of {pages}
        </title>
      </Head>
      <Link
        href={{
          pathname: 'adminOrders',
          query: { page: page - 1 },
        }}
      >
        <a className='prev' aria-disabled={page <= 1}>
          Prev
        </a>
      </Link>
      <p>
        Page {page} of <span className='totalPages'>{pages}</span>
      </p>
      <p>{count} Items Total</p>
      <Link
        href={{
          pathname: 'adminOrders',
          query: { page: page + 1 },
        }}
      >
        <a className='next' aria-disabled={page === pages}>
          Next
        </a>
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
export { ORDER_PAGINATION_QUERY };
