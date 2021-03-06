import { useQuery, gql } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';

import { perPage } from '../../../config';

import PaginationStyles from '../../styles/PaginationStyles';
import Loader from '../../utils/Loader';
import Error from '../../utils/ErrorMessage';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY($view: String!) {
    itemsConnection(where: { type: $view }) {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = ({ page, view }) => {
  const { data, loading, error } = useQuery(PAGINATION_QUERY, {
    variables: { view },
  });
  if (loading) return <Loader />;
  if (error) return <Error error={error} />;
  let count = 0;
  let pages = 0;
  if (!loading && !error) {
    count = data.itemsConnection.aggregate.count;
    console.log(data);
    pages = Math.ceil(count / perPage);
    return (
      count,
      pages,
      (
        <PaginationStyles data-testid='pagination'>
          <Head>
            <title>
              Lisa Alley - Page {page} of {pages}
            </title>
          </Head>
          <Link
            href={{
              pathname: `/${view}s`,
              query: { page: page - 1 },
            }}
          >
            <a className='prev' aria-disabled={page <= 1}>
              Prev
            </a>
          </Link>
          <p data-testid='pages-index'>
            Page {page} of <span className='totalPages'>{pages}</span>
          </p>
          <p>{count} Items Total</p>
          <Link
            href={{
              pathname: `/${view}s`,
              query: { page: page + 1 },
            }}
          >
            <a className='next' aria-disabled={page === pages}>
              Next
            </a>
          </Link>
        </PaginationStyles>
      )
    );
  }
};

export default Pagination;
export { PAGINATION_QUERY };
