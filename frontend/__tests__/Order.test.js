import { screen, waitForElementToBeRemoved } from '@testing-library/react'

import Order from '../components/orders/Order';
import { render } from '../lib/testUtils';

const item = {
  id: 'abc123',
  title: 'A Cool Item',
  price: 5000,
  description: 'This item is so dang cool',
  image: 'dog.jpg',
  largeImage: 'largedog.jpg',
};

const order = {
  id: 'abc123',
  charge: 5500,
  total: 5500,
  createdAt: '2018-04-06 07:24PM',
  user: {
    id: '4234',
  },
  items: [
    {...item},
    {...item},
    {...item},
  ]
}

describe('<Order/>', () => {

  it('renders a Loader', async () => {
    render(<Order id='abc123' />)
    expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();
  })

  it('renders the form', async () => {
    render(<Order id='abc123' />);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
    expect(await screen.findByText(/Order Number/i)).toBeInTheDocument();
  })
})