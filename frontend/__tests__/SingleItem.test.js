import React from 'react';
import { useQuery } from '@apollo/client';
import { screen, waitFor } from '@testing-library/react';
import SingleItem from '../components/items/SingleItem';
import { render, fakeItem } from '../lib/testUtils';
import { server } from '../mocks/server';
import { CURRENT_USER_QUERY } from '../components/utils/User';
import { graphql } from 'msw';
import withData from '../lib/withData';

const item = fakeItem();

describe('<SingleItem/>', () => {
  beforeAll(() => server.listen());
  it('renders with proper data', async () => {
    render(<SingleItem id="abc123" />);
    const loading = await screen.findByText('Loading...');
    expect(loading).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: `Viewing ${item.title}` }));
      const img = screen.getByAltText(item.title);
      expect(img.src).toContain(item.largeImage);
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });

  it('errors with an unfound item', async () => {
    server.use(
      graphql.query('SINGLE_ITEM_QUERY', (req, res, ctx) => {
        return res.once(
          ctx.errors([
            {
              status: 500,
              message: 'Items Not Found!',
            },
          ])
        );
      })
    );
    render(<SingleItem id="abc123" />);
    const item = await screen.findByTestId('graphql-error');
    expect(item).toHaveTextContent('Items Not Found!');
  });
});
