import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import Router from 'next/router';
import { fakeItem } from '../lib/testUtils';
import CreateItem, {
  CREATE_ITEM_MUTATION,
} from '../components/items/CreateItem';
import { ALL_ITEMS_QUERY } from '../components/items/Items';
import { PAGINATION_QUERY } from '../components/items/Pagination';

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

const item = fakeItem();
describe('<CreateItem/>', () => {
  it('renders and matches snapshot', async () => {
    const { container } = render(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('handles state updating', async () => {
    render(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    );

    await userEvent.type(screen.getByPlaceholderText('Title'), item.title);
    await userEvent.type(
      screen.getByPlaceholderText('Price'),
      item.price.toString()
    );
    await userEvent.type(
      screen.getByPlaceholderText('Enter A Description'),
      item.description
    );

    expect(screen.getByDisplayValue(item.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.price.toString())).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.description)).toBeInTheDocument();
  });
  it('creates an item when the form is submitted', async () => {
    const mocks = [
      {
        request: {
          query: ALL_ITEMS_QUERY,
          variables: {
            skip: 0,
            first: 6,
          },
        },
        result: {
          data: {
            items: [fakeItem(), fakeItem(), fakeItem()],
          },
        },
      },
      {
        request: {
          query: PAGINATION_QUERY,
        },
        result: {
          itemsConnection: {
            aggregate: {
              count: 20,
              __typename: 'AggregateItem',
            },
            __typename: 'ItemConnection',
          },
        },
      },
      {
        request: {
          query: CREATE_ITEM_MUTATION,
          variables: {
            title: item.title,
            description: item.description,
            image: '',
            largeImage: '',
            price: item.price,
          },
        },
        result: {
          data: {
            createItem: {
              ...item,
              id: 'abc123',
              __typename: 'Item',
            },
          },
        },
      },
    ];

    const { container } = render(
      <MockedProvider mocks={mocks}>
        <CreateItem />
      </MockedProvider>
    );
    await userEvent.type(screen.getByPlaceholderText('Title'), item.title);
    await userEvent.type(
      screen.getByPlaceholderText('Price'),
      item.price.toString()
    );
    await userEvent.type(
      screen.getByPlaceholderText('Enter A Description'),
      item.description
    );
    await userEvent.click(screen.getByText('Submit'));
    await waitFor(() => {
      expect(Router.push).toHaveBeenCalled();
      expect(Router.push).toHaveBeenCalledWith({
        pathname: '/item',
        query: { id: 'abc123' },
      });
    });
  });
});
