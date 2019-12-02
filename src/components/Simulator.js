import React from "react";
import InputArea from "./InputArea";
import PacmanMap from "./PacmanMap";

const directions = ["NORTH", "EAST", "SOUTH", "WEST"];
const directionMove = {
  NORTH: { moveX: 0, moveY: 1 },
  EAST: { moveX: 1, moveY: 0 },
  SOUTH: { moveX: 0, moveY: -1 },
  WEST: { moveX: -1, moveY: 0 }
};
const initialState = {
  isReport: false,
  gridNumber: 5,
  direction: "",
  position: {
    x: -1,
    y: -1
  },
  inputCommand: "",
  message: ""
};

class Simulator extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // set input value when onChange
  handleChange = value => {
    this.setState({
      inputCommand: value
    });
  };

  // reset initialState when click RESET Button
  handleClick = () => {
    this.setState(initialState);
  };

  // press 'enter' on keyboard
  onInputSubmit = e => {
    e.preventDefault();
    const { inputCommand, position, isReport } = this.state;
    // reset message state and
    this.setState({
      message: ""
    });

    if (isReport) {
      this.setState({
        message: "Please click RESET button to start a new test!"
      });
      return;
    }

    // eslint-disable-next-line
    let commands = inputCommand.toUpperCase().split(/\s|\,/);

    if (!this.availablePosition(position) && commands[0] !== "PLACE") {
      // ErrorMsg: invalid command
      this.setState({
        message: "Please enter place command FIRST!"
      });
      return;
    }
    if (commands[0] === "PLACE" && commands.length === 4) {
      this.placePacman(commands.slice(1));
      return;
    }
    if (commands[0] === "MOVE") {
      this.movePacman();
      return;
    }
    if (commands[0] === "LEFT" || commands[0] === "RIGHT") {
      this.rotatePacman(commands[0]);
      return;
    }
    if (commands[0] === "REPORT") {
      this.report();
      return;
    }

    // ErrorMsg: invalid command
    this.setState({
      message: "Invalid Command!"
    });
  };

  getIndexFromArray = (value, arr) => {
    return arr.indexOf(value);
  };

  // check is position in map
  availablePosition = position => {
    const { gridNumber } = this.state;
    if (position.x < 0 || position.x >= gridNumber) {
      return false;
    }
    if (position.y < 0 || position.y >= gridNumber) {
      return false;
    }

    return true;
  };

  // place command
  placePacman = ([x, y, face]) => {
    const { gridNumber } = this.state;
    x = x - 0;
    y = y - 0;
    if (!this.availablePosition({ x, y })) {
      // ErrorMsg: invalid place
      this.setState({
        message: `Invalid Position, Please place position X and Y in 0 ~ ${gridNumber -
          1}`
      });
      return;
    }

    if (this.getIndexFromArray(face, directions) === -1) {
      // ErrorMsg: invalid direction
      this.setState({
        message: `Invalid Direction, Please use NORTH, EAST, SOUTH, WEST`
      });
      return;
    }

    this.setState({
      position: { x, y },
      direction: face
    });
  };

  // move command
  movePacman = () => {
    const {
      direction,
      position: { x, y },
      gridNumber
    } = this.state;

    const newX = x + directionMove[direction].moveX;
    const newY = y + directionMove[direction].moveY;

    const newPosition = { x: newX, y: newY };
    if (!this.availablePosition(newPosition)) {
      // ErrorMsg: invalid move
      this.setState({
        message: `Invalid move, Please move position X and Y in 0 ~ ${gridNumber -
          1}`
      });
      return;
    }

    this.setState({
      position: newPosition
    });
  };

  // left command or right command
  rotatePacman = rotate => {
    const { direction } = this.state;
    const index = this.getIndexFromArray(direction, directions);

    let newDirection;
    if (rotate === "LEFT") {
      newDirection = directions[(index - 1 + 4) % 4];
    }
    if (rotate === "RIGHT") {
      newDirection = directions[(index + 1) % 4];
    }

    this.setState({
      direction: newDirection
    });
  };

  // report command
  report = () => {
    this.setState({
      isReport: true
    });
  };

  render() {
    const {
      gridNumber,
      direction,
      position,
      isReport,
      message,
      inputCommand
    } = this.state;

    return (
      <div>
        <h1 className="simulator__title">Pacman</h1>
        <div className="simulator__content">
          <div className="simulator__control">
            <InputArea
              handleChange={this.handleChange}
              onInputSubmit={this.onInputSubmit}
              inputCommand={inputCommand}
            />
            <button onClick={() => this.handleClick()}>RESET</button>
            {!!message ? (
              <p className="simulator__message">Message: {message}</p>
            ) : null}
            {isReport ? (
              <p className="simulator__output">
                Output: {position.x},{position.y},{direction}
              </p>
            ) : null}
          </div>
          <div className="simulator__map">
            <PacmanMap
              gridNumber={gridNumber}
              direction={direction}
              position={position}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Simulator;
