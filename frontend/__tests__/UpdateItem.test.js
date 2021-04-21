import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';

import { render } from '../lib/testUtils';
import { item } from '../mocks/handlers.js';

import UpdateItem from '../components/items/UpdateItem';

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

const newItem = {
  title: 'A Cooler Item',
  price: '5500',
  description: 'Can you believe how cool this is'
}
const fillForm = async () => {
  await userEvent.clear(title);
  await userEvent.type(title, 'A Cooler Item');
  await userEvent.clear(price);
  await userEvent.type(price, '5500');
  await userEvent.clear(description);
  await userEvent.type(description, 'Can you believe how cool this is');
};

describe('<UpdateItem/>', () => {
  it('renders properly', async () => {
    render(<UpdateItem id='abc123' />);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
    expect(screen.queryByDisplayValue(item.title)).toBeInTheDocument();
  });
  it('populates the form with item data', async () => {
    render(<UpdateItem id='abc123' />);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
    const title = screen.getByDisplayValue(item.title);
    const price = screen.getByDisplayValue(item.price.toString());
    const description = screen.getByLabelText(/Description/i);
    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
  it('updates text properly', async () => {
    render(<UpdateItem id='abc123' />);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
    await fillForm();
    expect(await screen.findByDisplayValue('A Cooler Item')
    ).toBeInTheDocument();
    expect(await screen.findByDisplayValue('5500')).toBeInTheDocument();
    expect(await screen.findByDisplayValue('Can you believe how cool this is')
    ).toBeInTheDocument();
  });
  it.skip('redirects to the <Item /> upon submit', async () => {
    render(<UpdateItem id='abc123' />);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
    await fillForm();
    await userEvent.click(screen.getByRole('button', {name: /Save Changes/i}));
    await waitFor(() => {
      expect(Router.push).toHaveBeenCalled();
      expect(Router.push).toHaveBeenCalledWith({
        pathname: '/item',
        query: { id: 'abc123' },
      })
    })
  });
  //Add mutation testing!
})
