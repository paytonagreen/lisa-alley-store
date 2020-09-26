import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import toJSON from 'enzyme-to-json';
import Pagination, { PAGINATION_QUERY } from '../components/items/Pagination';

function makeMocksFor(length) {
  return [
    {
      request: {
        query: PAGINATION_QUERY,
      },
      result: {
        data: {
          itemsConnection: {
            __typename: 'aggregage',
            aggregate: {
              __typename: 'count',
              count: length,
            },
          },
        },
      },
    },
  ];
}

const makeContainer = (mockNumber, page = 1) => {
  const { container } = render(
    <MockedProvider mocks={makeMocksFor(mockNumber)}>
      <Pagination page={page} />
    </MockedProvider>
  );
  return container;
};

describe('<Pagination/>', () => {
  it('displays a loading message', () => {
    makeContainer(1);
    waitFor(() => expect(screen.getByTestId('loader')).toBeInTheDocument());
  });

  it('displays pagination for 18 items', async () => {
    makeContainer(18);
    waitFor(() => {
      expect(screen.getByText('2').toBeInTheDocument());
      expect(screen.getByTestID('pagination').toMatchSnapshot());
    });
  });

  it('disables prev button on first page', async () => {
    makeContainer(28);
    waitFor(() => {
      expect(screen.getByText('Prev').prop('aria-disabled')).toEqual(true);
    })
  });

  it('disables next button on last page', async () => {
    makeContainer(28, 5);
    waitFor(() => {
      expect(screen.getByText('Next').prop('aria-disabled')).toEqual(true);
    });
  });

  it('enables all buttons on a middle page', async () => {
    makeContainer(28, 3);
    waitFor(() => {
      expect(screen.getByText('Prev').prop('aria-disabled')).toEqual(false);
      expect(screen.getByText('Next').prop('aria-disabled')).toEqual(false);
    });
  });
});
