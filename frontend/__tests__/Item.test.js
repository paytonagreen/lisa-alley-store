import { screen, waitFor } from '@testing-library/react';
import ItemComponent from '../components/items/item-card/Item';
import { render, fakeUser, fakeRegularUser } from '../lib/testUtils';

const fakeItem = {
  id: 'abc123',
  title: 'A Cool Item',
  price: 5000,
  description: 'This item is so dang cool',
  image: 'dog.jpg',
  largeImage: 'largedog.jpg',
};

describe('<Item/>', () => {
  it('renders the image properly', async () => {
    render(<ItemComponent item={fakeItem} />);
    const background = await screen.findByTestId(/background/i);
    expect(background).toHaveStyle('background: url(${props => props.background}) no repeat center center/contain')
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
      expect(screen.queryByRole('button', {name: /Add To Cart/i})).not.toBeInTheDocument();
      expect(screen.queryByRole('button', {name: /Delete This Item/i})).not.toBeInTheDocument();
    });
  });
});
