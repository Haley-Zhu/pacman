import React from "react";
import InputArea from "../components/InputArea";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
Enzyme.configure({ adapter: new Adapter() });

const setup = ({ ...props }) => {
  const wrapper = shallow(<InputArea {...props} />);
  return {
    props,
    wrapper
  };
};

describe("InputArea", () => {
  const mock_handleChange = jest.fn();
  const mock_onInputSubmit = jest.fn();

  const { props, wrapper } = setup({
    handleChange: (mock_handleChange),
    onInputSubmit: (mock_onInputSubmit),
    inputCommand: "test command"
  });
  it("InputArea renders correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it("InputArea When inputvalue is passed", () => {
    const input = wrapper.find('input');
    expect(input.props().value).toBe(`${props.inputCommand}`);
  })
  it("InputArea onChange called correctly", () => {
    const input = wrapper.find('input');
    const value = props.inputCommand;
    input.simulate('change', { target: { value }});
    expect(mock_handleChange).toBeCalled();
    expect(mock_handleChange).toBeCalledWith(value);
  })
  it("InputArea onSubmit called correctly", () => {
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(mock_onInputSubmit).toBeCalled();
  })
});
