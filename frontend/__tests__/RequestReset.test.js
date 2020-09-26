import { mount } from "enzyme";
import wait from "waait";
import toJSON from "enzyme-to-json";
import { MockedProvider } from "@apollo/client/testing";
import { act } from 'react-dom/test-utils';
import RequestReset, { REQUEST_RESET_MUTATION } from "../components/signup-signin/RequestReset";

const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email: "paytonagreen@gmail.com" },
    },
    result: {
      data: { requestReset: { message: "success", __typename: "Message" } },
    },
  },
];

describe("<RequestReset/>", () => {
  let wrapper = '';
  it("renders and matches snapsot", async () => {
    act(() => {
    wrapper = mount(
      <MockedProvider>
        <RequestReset />
      </MockedProvider>
    );
  })
    const form = wrapper.find('form[data-test="form"]');
    expect(toJSON(form)).toMatchSnapshot();
  });

  it("calls the mutation", async () => {
    let wrapper = '';
    act (() => {
      wrapper = mount(
        <MockedProvider mocks={mocks}>
          <RequestReset />
        </MockedProvider>
      );
    })
    act(() => {
      //Simulate typing an email
      wrapper
        .find("input")
        .simulate("change", {
          target: { name: "email", value: "paytonagreen@gmail.com" },
        });
    })
    await act(async () => {
      wrapper.find('form').simulate('submit');
      await wait();
      wrapper.update();
    })
    expect(wrapper.find('p').text()).toContain("Success! Check your e-mail for a reset link.")
  });

});
