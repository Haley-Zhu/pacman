import React from "react";
import PacmanMap from "../components/PacmanMap";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
Enzyme.configure({ adapter: new Adapter() });

const setup = ({ ...props }) => {
  const wrapper = shallow(<PacmanMap {...props} />);
  return {
    props,
    wrapper
  };
};

describe("PacmanMap", () => {
  const { props, wrapper } = setup({
    gridNumber: 5,
    direction: "NORTH",
    position: { x: 2, y: 3 }
  });
  it("PacmanMap renders correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it("isPacmanPosition correctly", () => {
    const testIndex = props.position.y * props.gridNumber + props.position.x;
    expect(wrapper.instance().isPacmanPosition(testIndex)).toBe(true);
    expect(wrapper.instance().isPacmanPosition(testIndex + 1)).toBe(false);
  })
  it(`PacmanMap's number is same to ${props.gridNumber} *${props.gridNumber}`, () => {
    const grids = wrapper.find('.pacman-map__cell');
    expect(grids.length).toBe(25);
  })
  it("PacmanMap description correctly", () => {
    const description = wrapper.find('p').text();
    expect(description).toBe(`Grid Number: ${props.gridNumber}`);
  })
});
