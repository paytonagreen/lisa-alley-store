import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import wait from "waait";
import toJSON from "enzyme-to-json";
import Pagination, { PAGINATION_QUERY } from "../components/Pagination";
import { MockedProvider } from "@apollo/client/testing";

function makeMocksFor(length) {
  return [
    {
      request: {
        query: PAGINATION_QUERY,
      },
      result: {
        data: {
          itemsConnection: {
            __typename: "aggregage",
            aggregate: {
              __typename: "count",
              count: length,
            },
          },
        },
      },
    },
  ];
}

const makeWrapper = (mockNumber, page = 1) => {
  const wrapper = mount(
    <MockedProvider mocks={makeMocksFor(mockNumber)}>
      <Pagination page={page} />
    </MockedProvider>
  );
  return wrapper;
};

describe("<Pagination/>", () => {
  let wrapper = "";
  it("displays a loading message", () => {
    act (() => {
      wrapper = makeWrapper(1);
    });
    expect(wrapper.text()).toContain("Loading...");
  });

  it("displays pagination for 18 items", async () => {
    await act(async () => {
      wrapper = makeWrapper(18);
      await wait();
      wrapper.update();
    });
    expect(wrapper.find(".totalPages").text()).toEqual("3");
    const pagination = wrapper.find('div[data-test="pagination"]');
    expect(toJSON(pagination)).toMatchSnapshot();
  });

  it("disables prev button on first page", async () => {
    await act(async () => {
      wrapper = makeWrapper(28);
      await wait();
      wrapper.update();
    });
    expect(wrapper.find("a.prev").prop("aria-disabled")).toEqual(true);
  });

  it("disables next button on last page", async () => {
    await act(async () => {
      wrapper = makeWrapper(28, 5);
      await wait();
      wrapper.update();
    });
    expect(wrapper.find("a.next").prop("aria-disabled")).toEqual(true);
  });

  it("enables all buttons on a middle page", async () => {
    await act(async () => {
      wrapper = makeWrapper(28, 3);
      await wait();
      wrapper.update();
    });
    expect(wrapper.find("a.prev").prop("aria-disabled")).toEqual(false);
    expect(wrapper.find("a.next").prop("aria-disabled")).toEqual(false);
  });
});
