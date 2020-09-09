import { mount } from "enzyme";
import wait from "waait";
import PleaseSignIn from "../components/PleaseSignIn";
import { CURRENT_USER_QUERY } from "../components/User";
import { MockedProvider } from "@apollo/client/testing";
import { fakeUser } from "../lib/testUtils";
import { act } from 'react-dom/test-utils';

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } },
  },
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } },
  },
];

describe("<PleaseSignIn/>", () => {
  it("renders the sign in dialog to logged out users", async () => {
    let wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <PleaseSignIn />
      </MockedProvider>
    );
    expect(wrapper.text()).toContain("Loading...");
    await act(async () => {
      wrapper = mount(
        <MockedProvider mocks={notSignedInMocks}>
          <PleaseSignIn />
        </MockedProvider>
      );
      await wait();
      wrapper.update()
    });
    expect(wrapper.text()).toContain("Please Sign In Before Continuing");
    expect(wrapper.find("Signin").exists()).toBe(true);
  });

  it("renders the child component when the user IS signed in", async () => {
    const Hey = () => <p>Hey!</p>;
    let wrapper = '';
    await act(async () => {
      wrapper = mount(
        <MockedProvider mocks={signedInMocks}>
          <PleaseSignIn>
            <Hey />
          </PleaseSignIn>
        </MockedProvider>
      );
      await wait();
      wrapper.update();
    });
    expect(wrapper.contains(<Hey />)).toBe(true);
  });
});
