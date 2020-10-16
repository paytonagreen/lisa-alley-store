import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UpdateItem from '../components/items/UpdateItem';
import { render } from '../lib/testUtils';

const fakeItem = {
  id: 'abc123',
  title: 'A Cool Item',
  price: 5000,
  description: 'This item is so dang cool',
  image: 'dog.jpg',
  largeImage: 'largedog.jpg',
};

describe('<UpdateItem/>', () => {
  it('renders properly', async () => {
    render(<UpdateItem id="abc123"/>)
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i))
    expect(await screen.findByDisplayValue(fakeItem.title))
  });
})