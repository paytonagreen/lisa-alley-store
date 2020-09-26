import { render, screen, waitFor } from '@testing-library/react';
import ItemComponent from '../components/items/item-card/Item';
import { MockedProvider } from '@apollo/client/testing';
import { fakeUser, fakeRegularUser } from '../lib/testUtils';
import { CURRENT_USER_QUERY } from '../components/utils/User';

const userMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeRegularUser() } },
  },
];

const adminMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } },
  },
];

const fakeItem = {
  id: 'ABC123',
  title: 'A Cool Item',
  price: 5000,
  description: 'This item is so dang cool',
  image: 'dog.jpg',
  largeImage: 'largedog.jpg',
};

describe('<Item/>', () => {
  it('renders the image properly', () => {
    const { container } = render(
      <MockedProvider mocks={userMocks}>
        <ItemComponent item={fakeItem}/>
      </MockedProvider>
    );
    waitFor(() => {
      const img = screen.getByAltText(fakeItem.title);
      expect(img.props().src).toBe(fakeItem.image);
    })
  });

  it('renders the pricetag and title properly', () => {
    const { container } = render(
      <MockedProvider mocks={userMocks}>
        <ItemComponent item={fakeItem}/>
      </MockedProvider>
    )
    waitFor(() => {
      expect(screen.getByText('fakeItem.price')).toBeInTheDocument();
      expect(screen.getByText('fakeItem.title')).toBeInTheDocument();
    })
  });

  it("renders the buttons properly for Admin", () => {
    const { container } = render(
      <MockedProvider mocks={adminMocks}>
        <ItemComponent item={fakeItem} />
      </MockedProvider>
    );
    waitFor(() => {
      expect(screen.getByText("Edit")).toBeInTheDocument();
      expect(screen.getByText("Add To Cart")).toBeInTheDocument();
      expect(screen.getByText("Delete Item")).toBeInTheDocument();
    })
  });

  it('renders the buttons properly for User', () => {
    const { container } = render(
        <MockedProvider mocks={userMocks}>
          <ItemComponent item={fakeItem} />
        </MockedProvider>
    );
    waitFor(() => {
      expect(screen.getByText('Edit')).not.toBeInTheDocument();
      expect(screen.getByText('Add To Cart')).toBeInTheDocument();
      expect(screen.getByText('Delete Item')).not.toBeInTheDocument();
    })
  });
});
