import ItemComponent from "../components/Item";
import { shallow, mount } from "enzyme";
import { MockedProvider } from "@apollo/client/testing";
import { fakeUser, fakeRegularUser } from "../lib/testUtils";
import { act } from "react-dom/test-utils";
import { CURRENT_USER_QUERY } from "../components/User";
import wait from "waait";

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
  id: "ABC123",
  title: "A Cool Item",
  price: 5000,
  description: "This item is so dang cool",
  image: "dog.jpg",
  largeImage: "largedog.jpg",
};

describe("<Item/>", () => {
  const wrapper = shallow(<ItemComponent item={fakeItem} />);

  it("renders the image properly", () => {
    const img = wrapper.find("img");
    expect(img.props().src).toBe(fakeItem.image);
    expect(img.props().alt).toBe(fakeItem.title);
  });

  it("renders the pricetag and title properly", () => {
    const PriceTag = wrapper.find("PriceTag");
    expect(PriceTag.children().text()).toBe("$50");
    expect(wrapper.find("Title a").text()).toBe(fakeItem.title);
  });

  // it("renders the buttons properly for Admin", async () => {
  //   const adminWrapper = mount(
  //     <MockedProvider mocks={adminMocks}>
  //       <ItemComponent item={fakeItem} />
  //     </MockedProvider>
  //   );
  //   act(() => {
  //     await wait();
  //     adminWrapper.update();
  //   })
  //   const buttonList = adminWrapper.find(".buttonList");
  //   // console.log(buttonList.children().debug());
  //   expect(buttonList.children()).toHaveLength(3);
  //   expect(buttonList.find("Link")).toHaveLength(1);
  //   expect(buttonList.find("AddToCart")).toHaveLength(1);
  //   expect(buttonList.find("DeleteItem")).toHaveLength(1);
  // });

  it("renders the button properly for User", () => {
    let userWrapper = ''
    act(() => {
      userWrapper = mount(
        <MockedProvider mocks={userMocks}>
          <ItemComponent item={fakeItem} />
        </MockedProvider>
      );
    });
    const buttonList = userWrapper.find(".buttonList");
    expect(buttonList.children()).toHaveLength(1);
    expect(buttonList.find("Link")).toHaveLength(0);
    expect(buttonList.find("AddToCart")).toHaveLength(1);
    expect(buttonList.find("DeleteItem")).toHaveLength(0);
  });
});
