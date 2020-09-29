import React from 'react';
import PaginationStyles from '../styles/PaginationStyles';
import { useQuery, gql } from '@apollo/client';
import { perPage } from '../../config';
import Head from 'next/head';
import Link from 'next/link';
import Loader from '../utils/Loader';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = ({ page }) => {
  const { data, loading, error } = useQuery(PAGINATION_QUERY);
  if (loading) return <Loader />;
  let count = 0;
  let pages = 0;
  if (!data && !error) {
    count = data.itemsConnection.aggregate.count;
    pages = Math.ceil(count / perPage);
    return count, pages;
  }
  ;
  return (
    <PaginationStyles data-testid="pagination">
      <Head>
        <title>
          Lisa Alley - Page {page} of {pages}
        </title>
      </Head>
      <Link
        href={{
          pathname: 'items',
          query: { page: page - 1 },
        }}
      >
        <a className="prev" aria-disabled={page <= 1}>
          Prev
        </a>
      </Link>
      <p>
        Page {page} of <span className="totalPages">{pages}</span>
      </p>
      <p>{count} Items Total</p>
      <Link
        href={{
          pathname: 'items',
          query: { page: page + 1 },
        }}
      >
        <a className="next" aria-disabled={page === pages}>
          Next
        </a>
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
export { PAGINATION_QUERY };
