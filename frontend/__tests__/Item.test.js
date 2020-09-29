import { screen, waitFor } from '@testing-library/react';
import ItemComponent from '../components/items/item-card/Item';
import { MockedProvider } from '@apollo/client/testing';
import { render, fakeUser, fakeRegularUser } from '../lib/testUtils';
import formatMoney from '../lib/formatMoney';

const fakeItem = {
  id: 'ABC123',
  title: 'A Cool Item',
  price: 5000,
  description: 'This item is so dang cool',
  image: 'dog.jpg',
  largeImage: 'largedog.jpg',
};

describe('<Item/>', () => {
  it('renders the image properly', async () => {
    render(<ItemComponent item={fakeItem} />);
    const img = await screen.findByAltText(fakeItem.title);
    expect(img.src).toContain(fakeItem.image);
  });

  it('renders the pricetag and title properly', async () => {
    render(<ItemComponent item={fakeItem} />);
    expect(await screen.findByText(formatMoney(fakeItem.price))).toBeInTheDocument();
    expect(await screen.findByText(fakeItem.title)).toBeInTheDocument();
  });

  it('renders the buttons properly for Admin', async () => {
    render(<ItemComponent item={fakeItem} me={fakeUser()} />);
    await waitFor(() => {
      expect(screen.getByRole('link', {name: /Edit/i})).toBeInTheDocument();
      expect(screen.getByRole('button', {name: /Add To Cart/i})).toBeInTheDocument();
      expect(screen.getByRole('button', {name: /Delete This Item/i})).toBeInTheDocument();
    });
  });

  it('renders the buttons properly for User', async () => {
    render(<ItemComponent item={fakeItem} me={fakeRegularUser()} />);
    await waitFor(() => {
      expect(screen.queryByRole('link', {name: /Edit/i})).not.toBeInTheDocument();
      expect(screen.getByRole('button', {name: /Add To Cart/i})).toBeInTheDocument();
      expect(screen.queryByRole('button', {name: /Delete This Item/i})).not.toBeInTheDocument();
    });
  });
});
