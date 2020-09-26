import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import SingleItem, { SINGLE_ITEM_QUERY } from '../components/items/SingleItem';
import { MockedProvider } from '@apollo/client/testing';
import { fakeItem } from '../lib/testUtils';
import { act } from 'react-dom/test-utils';

describe('<SingleItem/>', () => {
  let wrapper = '';
  it('renders with proper data', async () => {
    const mocks = [
      {
        request: {
          query: SINGLE_ITEM_QUERY,
          variables: { id: '123' },
        },
        result: {
          data: {
            item: fakeItem(),
          },
        },
      },
    ];
    act(() => {
      wrapper = mount(
        <MockedProvider mocks={mocks}>
          <SingleItem id="123" />
        </MockedProvider>
      );
    });
    expect(wrapper.text()).toContain('Loading...');
    await act(async () => {
      await wait();
      wrapper.update();
    });
    expect(toJSON(wrapper.find('h2'))).toMatchSnapshot();
    expect(toJSON(wrapper.find('img'))).toMatchSnapshot();
    expect(toJSON(wrapper.find('p'))).toMatchSnapshot();
  });
  it('errors with an unfound item', async () => {
    const mocks = [
      {
        request: {
          query: SINGLE_ITEM_QUERY,
          variables: { id: '123' },
        },
        result: {
          errors: [{ message: 'Items Not Found!' }],
        },
      },
    ];
    await act(async () => {
      wrapper = mount(
        <MockedProvider mocks={mocks}>
          <SingleItem id="123" />
        </MockedProvider>
      );
      await wait();
      wrapper.update();
    });
    const item = wrapper.find('[data-test="graphql-error"]');
    expect(item.text()).toContain('Items Not Found!');
    expect(toJSON(item)).toMatchSnapshot();
  });
});
