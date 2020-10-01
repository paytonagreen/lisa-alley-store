import casual from 'casual';
import React from 'react';
import { render } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';

//setup wrapper for tests//
const Providers = ({ children, apollo }) => {
  return <ApolloProvider client={apollo} addTypename={false}>{children}</ApolloProvider>;
};

const customProviders = withData(Providers);

const customRender = (ui, options) =>
  render(ui, { wrapper: customProviders, ...options });

// seed it so we get consistent results
casual.seed(777);

const fakeItem = () => ({
  __typename: 'Item',
  id: 'abc123',
  price: 5000,
  user: null,
  image: 'dog-small.jpg',
  title: 'dogs are best',
  description: 'dogs',
  largeImage: 'dog.jpg',
  createdAt: 1,
});

const fakeUser = () => ({
  __typename: 'User',
  id: '4234',
  name: casual.name,
  email: casual.email,
  address1: casual.address1,
  address2: '',
  city: casual.city,
  state: casual.state,
  zip: 78909,
  permissions: ['ADMIN'],
  orders: [],
  cart: [],
});

const fakeRegularUser = () => ({
  __typename: 'User',
  id: '420',
  name: casual.name,
  email: casual.email,
  address1: casual.address,
  address2: '',

  city: casual.city,
  state: casual.state,
  zip: 11111,
  permissions: ['USER'],
  orders: [],
  cart: [],
});

const fakeOrderItem = () => ({
  __typename: 'OrderItem',
  id: casual.uuid,
  image: `${casual.word}.jpg`,
  title: casual.words(),
  price: 4234,
  quantity: 1,
  description: casual.words(),
});

const fakeOrder = () => ({
  __typename: 'Order',
  id: 'ord123',
  charge: 'ch_123',
  total: 40000,
  items: [fakeOrderItem(), fakeOrderItem()],
  createdAt: '2018-04 - 06T19: 24: 16.000Z',
  user: fakeUser(),
});

const fakeCartItem = (overrides) => ({
  __typename: 'CartItem',
  id: 'omg123',
  quantity: 3,
  item: fakeItem(),
  user: fakeUser(),
  ...overrides,
});

const fakeCartUser = () => ({
  ...fakeUser(),
  cart: [fakeCartItem()],
});

// Fake LocalStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

export {
  LocalStorageMock,
  fakeItem,
  fakeUser,
  fakeRegularUser,
  fakeCartItem,
  fakeOrder,
  fakeOrderItem,
  fakeCartUser,
  customRender as render,
};
