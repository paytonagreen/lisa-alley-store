import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import { render, fakeItem } from '../lib/testUtils';
import CreateItem from '../components/items/CreateItem';

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

const fillForm = async () => {
  await userEvent.type(screen.getByPlaceholderText('Title'), item.title);
  await userEvent.type(
    screen.getByPlaceholderText('Price'),
    item.price.toString()
  );
  await userEvent.type(
    screen.getByPlaceholderText('Enter A Description'),
    item.description
  );
}

const item = fakeItem();
describe('<CreateItem/>', () => {
  it('renders and matches snapshot', async () => {
    const { container } = render(
        <CreateItem />
    );
    expect(container).toMatchSnapshot();
  });

  it('handles state updating', async () => {
    render(
      <CreateItem />
    );

    await fillForm()

    expect(screen.getByDisplayValue(item.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.price.toString())).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.description)).toBeInTheDocument();
  });
  it('creates an item when the form is submitted', async () => {
    render(
        <CreateItem />
    );
    
    await fillForm();
    
    await userEvent.click(screen.getByText('Submit'));
    await waitFor(() => {
      expect(Router.push).toHaveBeenCalled();
      expect(Router.push).toHaveBeenCalledWith({
        pathname: '/item',
        query: { id: 'abc123' },
      });
    });
  });
});
