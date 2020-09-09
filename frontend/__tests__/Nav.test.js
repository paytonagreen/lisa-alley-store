import { mount } from "enzyme";
import wait from "waait";
import toJSON from "enzyme-to-json";
import Nav from "../components/Nav";
import { CURRENT_USER_QUERY } from "../components/User";
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-dom/test-utils";
import { fakeUser, fakeCartItem, fakeRegularUser } from "../lib/testUtils";

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } },
  },
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeRegularUser() } },
  },
];

const signedInAdminMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } },
  },
];

const userWithCartItems = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem(), fakeCartItem(), fakeCartItem()],
        },
      },
    },
  },
];

describe("<Nav/>", () => {
  let wrapper = ''
  it("renders a minimal nav when signed out", () => {
    act( () => {
      wrapper = mount(
        <MockedProvider mocks={notSignedInMocks}>
          <Nav />
        </MockedProvider>
      );
    });
    const nav = wrapper.find('ul[data-test="nav"]');
    expect(toJSON(nav)).toMatchSnapshot();
  });

  it("renders full nav when signed in", async () => {
    await act(async () => {
      wrapper = mount(
        <MockedProvider mocks={signedInMocks}>
          <Nav />
        </MockedProvider>
      );
      await wait();
      wrapper.update();
    });
    const nav = wrapper.find('ul[data-test="nav"]');
    expect(nav.children().length).toBe(5);
  });

  it("renders the sell button when ADMIN signed in", async () => {
    await act(async () => {
      wrapper = mount(
        <MockedProvider mocks={signedInAdminMocks}>
          <Nav />
        </MockedProvider>
      );
      await wait();
      wrapper.update();
    });
    const nav = wrapper.find('ul[data-test="nav"]');
    expect(nav.children().length).toBe(6);
  });

  it("renders the amount of items in the cart", async () => {
    await act(async () => {
      wrapper = mount(
        <MockedProvider mocks={userWithCartItems}>
          <Nav />
        </MockedProvider>
      );
      await wait();
      wrapper.update();
    });
    const nav = wrapper.find('ul[data-test="nav"]');
    const count = nav.find("div.count");
    expect(toJSON(count)).toMatchSnapshot();
  });
});
