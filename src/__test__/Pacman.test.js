import React from "react";
import Pacman from "../components/Pacman";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
Enzyme.configure({ adapter: new Adapter() });

const setup = ({ ...props }) => {
  const wrapper = shallow(<Pacman {...props} />);
  return {
    props,
    wrapper
  };
};

describe("Pacman", () => {
  const { wrapper } = setup({
    direction: "NORTH"
  });
  it("Pacman renders correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it("Pacman render direction correctly", () => {
    expect(wrapper.find("div").hasClass("pacman pacman--north")).toBe(true);
  });
});
