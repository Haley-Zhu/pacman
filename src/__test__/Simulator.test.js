import React from "react";
import { mount } from "enzyme";
import Simulator from "../components/Simulator";
import InputArea from "../components/InputArea";
import PacmanMap from "../components/PacmanMap";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const wrapper = mount(<Simulator />);
  return wrapper;
};

const directions = ["NORTH", "EAST", "SOUTH", "WEST"];

describe("simulator", () => {
  describe("Simulator renders correctly", () => {
    const wrapper = setup();
    it("Simulator renders correctly", () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
  describe("Title", () => {
    const wrapper = setup();

    it("Simulator Title renders correctly", () => {
      const title = wrapper.find("h1");
      expect(title.length).toBe(1);
      expect(title.text()).toBe("Pacman");
    });
  });

  describe("InputArea", () => {
    let state = { inputCommand: "test" };
    const wrapper = setup();
    wrapper.setState(state);

    it("Simulator renders a InputArea", () => {
      expect(wrapper.find(InputArea).length).toBe(1);
    });
    it(`inputCommand is same to ${state.inputCommand}`, () => {
      expect(wrapper.find(InputArea).props().inputCommand).toBe(
        state.inputCommand
      );
    });
  });

  describe("RESET button", () => {
    const wrapper = setup();

    const mock_handleClick = jest.fn();
    const button = wrapper.find("button");
    const instance = wrapper.instance();
    it("Simulator renders a RESET button", () => {
      expect(button.text()).toBe("RESET");
    });

    it("button click", () => {
      instance.handleClick = mock_handleClick;
      button.simulate("click");
      expect(mock_handleClick).toBeCalled();
    });
  });

  describe("Message", () => {
    const wrapper = setup();

    const message = wrapper.find(".simulator__message");
    const instance = wrapper.instance();
    it("when have message", () => {
      const state = { message: "test message" };
      wrapper.setState(state);
      // expect(message.exists()).toEqual(true);
    });
  });

  describe("Output", () => {
    const wrapper = setup();

    const output = wrapper.find(".simulator__output");
    const instance = wrapper.instance();
    it("when have output", () => {
      const state = { isReport: true };
      wrapper.setState(state);
      // expect(message.exists()).toEqual(true);
    });
  });

  describe("PacmanMap", () => {
    const state = {
      gridNumber: 5,
      direction: "SOUTH",
      position: { x: 4, y: 0 }
    };
    const wrapper = setup();
    wrapper.setState(state);
    const pacmanMap = wrapper.find(PacmanMap);
    it("Simulator renders a PacmanMap", () => {
      expect(pacmanMap.length).toBe(1);
    });
    it("receive three props", () => {
      expect(Object.keys(pacmanMap.props()).length).toBe(3);
    });
    it("PacmanMap state passed", () => {
      expect(pacmanMap.props().gridNumber).toBe(5);
      expect(pacmanMap.props().direction).toBe("SOUTH");
      expect(pacmanMap.props().position.x).toBe(4);
      expect(pacmanMap.props().position.y).toBe(0);
    });
  });

  // check functions
  describe("check function", () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    it("handleChange", () => {
      const spyFunction = jest.spyOn(instance, "handleChange");
      const value = "test";
      instance.handleChange(value);
      expect(spyFunction).toHaveBeenCalled();
      expect(wrapper.state("inputCommand")).toBe(value);
    });
    it("handleClick", () => {
      const spyFunction = jest.spyOn(instance, "handleClick");
      instance.handleClick();
      expect(spyFunction).toHaveBeenCalled();
    });

    describe("onInputSubmit", () => {
      const spyFunction = jest.spyOn(instance, "onInputSubmit");
      const event = { preventDefault: function() {} };
      const stateCase1 = { isReport: true };
      const stateCase2 = {
        isReport: false,
        position: { x: 7, y: 2 },
        inputCommand: "MOVE"
      };
      const stateCase3 = {
        isReport: false,
        position: { x: 7, y: 2 },
        inputCommand: "Place 2,3,North,sss"
      };
      const stateCase4 = {
        isReport: false,
        position: { x: 7, y: 2 },
        inputCommand: "Place 2,3,North"
      };
      const stateCase5 = {
        isReport: false,
        position: { x: 2, y: 2 },
        inputCommand: "MOVE"
      };
      const stateCase6 = {
        isReport: false,
        position: { x: 3, y: 0 },
        inputCommand: "LEFT"
      };
      const stateCase7 = {
        isReport: false,
        position: { x: 4, y: 0 },
        inputCommand: "Right"
      };
      const stateCase8 = {
        isReport: false,
        position: { x: 4, y: 0 },
        inputCommand: "REPORT"
      };
      const stateCase9 = {
        isReport: false,
        position: { x: 4, y: 0 },
        inputCommand: "testCommand"
      };

      it("onInputSubmit called stateCase1", () => {
        wrapper.setState(stateCase1);
        instance.onInputSubmit(event);
        expect(spyFunction).toHaveBeenCalled();
        expect(wrapper.state("message")).toBe(
          "Please click RESET button to start a new test!"
        );
      });
      it("onInputSubmit called stateCase2", () => {
        wrapper.setState(stateCase2);
        instance.onInputSubmit(event);
        expect(spyFunction).toHaveBeenCalled();
        expect(wrapper.state("message")).toBe(
          "Please enter place command FIRST!"
        );
      });
      it("onInputSubmit called stateCase3", () => {
        wrapper.setState(stateCase3);
        instance.onInputSubmit(event);
        expect(spyFunction).toHaveBeenCalled();
        expect(wrapper.state("message")).toBe("Invalid Command!");
      });
      it("onInputSubmit called stateCase4", () => {
        wrapper.setState(stateCase4);
        const spyPlacePacman = jest.spyOn(instance, "placePacman");
        instance.onInputSubmit(event);
        expect(spyFunction).toHaveBeenCalled();
        expect(spyPlacePacman).toHaveBeenCalled();
      });
      it("onInputSubmit called stateCase5", () => {
        wrapper.setState(stateCase5);
        const spyMovePacman = jest.spyOn(instance, "movePacman");
        instance.onInputSubmit(event);
        expect(spyFunction).toHaveBeenCalled();
        expect(spyMovePacman).toHaveBeenCalled();
      });
      it("onInputSubmit called stateCase6", () => {
        wrapper.setState(stateCase6);
        const spyRotatePacman = jest.spyOn(instance, "rotatePacman");
        instance.onInputSubmit(event);
        expect(spyFunction).toHaveBeenCalled();
        expect(spyRotatePacman).toHaveBeenCalled();
      });
      it("onInputSubmit called stateCase7", () => {
        wrapper.setState(stateCase7);
        const spyRotatePacman = jest.spyOn(instance, "rotatePacman");
        instance.onInputSubmit(event);
        expect(spyFunction).toHaveBeenCalled();
        expect(spyRotatePacman).toHaveBeenCalled();
      });
      it("onInputSubmit called stateCase8", () => {
        wrapper.setState(stateCase8);
        const spyReport = jest.spyOn(instance, "report");
        instance.onInputSubmit(event);
        expect(spyFunction).toHaveBeenCalled();
        expect(spyReport).toHaveBeenCalled();
      });
      it("onInputSubmit called stateCase9", () => {
        wrapper.setState(stateCase9);
        instance.onInputSubmit(event);
        expect(spyFunction).toHaveBeenCalled();
        expect(wrapper.state("message")).toBe("Invalid Command!");
      });
    });

    it("getIndexFromArray", () => {
      const spyFunction = jest.spyOn(instance, "getIndexFromArray");
      const arr = directions;
      const value = "EAST";
      instance.getIndexFromArray(value, arr);
      expect(spyFunction).toHaveBeenCalled();
      expect(spyFunction(value, arr)).toBe(1);
    });
    describe("availablePosition", () => {
      const spyFunction = jest.spyOn(instance, "availablePosition");
      const position1 = { x: -2, y: 2 };
      const position2 = { x: 7, y: 2 };
      const position3 = { x: 2, y: -2 };
      const position4 = { x: 4, y: 8 };
      const position5 = { x: 3, y: 2 };

      it("availablePosition position1", () => {
        instance.availablePosition(position1);
        expect(spyFunction).toHaveBeenCalled();
        expect(spyFunction(position1)).toBe(false);
      });
      it("availablePosition position2", () => {
        instance.availablePosition(position2);
        expect(spyFunction).toHaveBeenCalled();
        expect(spyFunction(position2)).toBe(false);
      });
      it("availablePosition position3", () => {
        instance.availablePosition(position3);
        expect(spyFunction).toHaveBeenCalled();
        expect(spyFunction(position3)).toBe(false);
      });
      it("availablePosition position4", () => {
        instance.availablePosition(position4);
        expect(spyFunction).toHaveBeenCalled();
        expect(spyFunction(position4)).toBe(false);
      });
      it("availablePosition position5", () => {
        instance.availablePosition(position5);
        expect(spyFunction).toHaveBeenCalled();
        expect(spyFunction(position5)).toBe(true);
      });
    });

    describe("placePacman", () => {
      const spyFunction = jest.spyOn(instance, "placePacman");
      const case1 = [-3, 3, "EAST"];
      const case2 = [3, 3, "test"];
      const case3 = [3, 3, "EAST"];
      it("placePacman case1", () => {
        instance.placePacman(case1);
        expect(spyFunction).toHaveBeenCalled();
        expect(wrapper.state("message")).toBe(
          "Invalid Position, Please place position X and Y in 0 ~ 4"
        );
      });
      it("placePacman case2", () => {
        instance.placePacman(case2);
        expect(spyFunction).toHaveBeenCalled();
        expect(wrapper.state("message")).toBe(
          "Invalid Direction, Please use NORTH, EAST, SOUTH, WEST"
        );
      });
      it("placePacman case3", () => {
        instance.placePacman(case3);
        expect(spyFunction).toHaveBeenCalled();
        expect(wrapper.state("position").x).toBe(3);
        expect(wrapper.state("position").y).toBe(3);
        expect(wrapper.state("direction")).toBe("EAST");
      });
    });
    describe("movePacman", () => {
      const spyFunction = jest.spyOn(instance, "movePacman");
      const stateCase1 = { direction: "WEST", position: { x: 0, y: 4 } };
      const stateCase2 = { direction: "WEST", position: { x: 1, y: 4 } };
      it("movePacman stateCase1", () => {
        wrapper.setState(stateCase1);
        instance.movePacman();
        expect(spyFunction).toHaveBeenCalled();
        expect(wrapper.state("message")).toBe(
          "Invalid move, Please move position X and Y in 0 ~ 4"
        );
      });
      it("movePacman stateCase2", () => {
        wrapper.setState(stateCase2);
        instance.movePacman();
        expect(spyFunction).toHaveBeenCalled();
        expect(wrapper.state("position").x).toBe(0);
        expect(wrapper.state("position").y).toBe(4);
      });
    });
    describe("rotatePacman", () => {
      const spyFunction = jest.spyOn(instance, "rotatePacman");
      const state = { direction: "NORTH" };
      it("rotatePacman LEFT", () => {
        wrapper.setState(state);
        instance.rotatePacman("LEFT");
        expect(spyFunction).toHaveBeenCalled();
        expect(wrapper.state("direction")).toBe("WEST");
      });
      it("rotatePacman RIGHT", () => {
        wrapper.setState(state);
        instance.rotatePacman("RIGHT");
        expect(spyFunction).toHaveBeenCalled();
        expect(wrapper.state("direction")).toBe("EAST");
      });
    });
    it("report", () => {
      const spyFunction = jest.spyOn(instance, "report");
      instance.report();
      expect(spyFunction).toHaveBeenCalled();
      expect(wrapper.state("isReport")).toBe(true);
    });
  });
});
