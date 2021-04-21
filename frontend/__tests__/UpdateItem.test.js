import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UpdateItem from '../components/items/UpdateItem';
import { render } from '../lib/testUtils';
import { item } from '../mocks/handlers.js'


function sentenceCase(string) {
  let stringArr = string.split('')
  stringArr[0] = stringArr[0].toUpperCase();
  return stringArr.join('');
}

describe('<UpdateItem/>', () => {
  it('renders properly', async () => {
    render(<UpdateItem id="abc123"/>)
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i))
    expect(screen.queryByDisplayValue(item.title)).toBeInTheDocument();
  });
  it('populates the form with item data', async () => {
    render(<UpdateItem id="abc123"/>)
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i))
    const title = screen.getByDisplayValue(item.title);
    const price = screen.getByDisplayValue(item.price.toString());
    const description = screen.getByLabelText(/Description/i);
    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  })
  //need to refactor!!
  it('updates text properly', async () => {
    render(<UpdateItem id="abc123"/>)
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i))
    
    await userEvent.clear(title);
    await userEvent.type(title, 'A Cooler Item');
    await userEvent.clear(price);
    await userEvent.type(price, '5500');
    await userEvent.clear(description);
    await userEvent.type(description, 'Can you believe how cool this is');
    expect(await screen.findByDisplayValue('A Cooler Item')).toBeInTheDocument();
    expect(await screen.findByDisplayValue('5500')).toBeInTheDocument();
    expect(await screen.findByDisplayValue('Can you believe how cool this is')).toBeInTheDocument();
  })
})