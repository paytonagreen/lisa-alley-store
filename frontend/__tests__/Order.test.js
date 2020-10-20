import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { format } from 'date-fns';

import formatMoney from '../lib/formatMoney'
import Order from '../components/orders/Order';
import { render } from '../lib/testUtils';

const item = {
  id: 'abc123',
  title: 'A Cool Item',
  price: 5000,
  description: 'This item is so dang cool',
  image: 'dog.jpg',
  largeImage: 'largedog.jpg',
  quantity: 1,
};

const order = {
  id: 'abc123',
  charge: 'abcdefg12345678',
  total: 5500,
  createdAt: "2020-10-16T00:56:06.638Z",
  user: {
    id: '4234',
  },
  items: [
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
  });

  it('renders the form with the proper data', async () => {
    render(<Order id='abc123' />);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
    expect(await screen.findByText(order.id)).toBeInTheDocument();
    expect(await screen.findByText(order.charge)).toBeInTheDocument();
    expect(await screen.findByText(formatMoney(order.total))).toBeInTheDocument();
    expect(await screen.findByText(format(new Date(order.createdAt), "MMMM d, yyyy hh:mm a"))).toBeInTheDocument();
  });

  it('renders an order item', async () => {
    render(<Order id='abc123' />);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
    expect(await screen.findByRole('heading', {name: item.title})).toBeInTheDocument();
    expect(await screen.findByText(`Each: ${formatMoney(item.price)}`)).toBeInTheDocument();
    expect(await screen.findByText(`Subtotal: ${formatMoney(item.price)}`)).toBeInTheDocument();
    expect(await screen.findByText(item.description)).toBeInTheDocument();
  })
})