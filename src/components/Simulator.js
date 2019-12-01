import React from "react";
import InputArea from "./InputArea";
import PacmanMap from "./PacmanMap";

const directions = ["NORTH", "EAST", "SOUTH", "WEST"];
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

  handleChange = value => {
    this.setState({
      inputCommand: value
    });
  };

  onInputSubmit = e => {
    e.preventDefault();
    const { inputCommand, position, isReport } = this.state;
    // reset message state and 
    this.setState({
      message: "",
      inputCommand: ""
    });

    console.log('-------------', inputCommand);
    if (isReport) {
      this.setState({
        message: "Please click clear button to start a new test!"
      });
      return;
    }

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

  placePacman = ([x, y, face]) => {
    console.log('!!!!!!!!!!!!', x, y, face);
    const { gridNumber } = this.state;
    x = x-0;
    y = y-0;
    if (!this.availablePosition({ x, y })) {
      // ErrorMsg: invalid place
      this.setState({
        message: `Invalid Position, Please place position X and Y in 0 ~ ${gridNumber -
          1}`
      });
      return;
    }

    this.setState({
      position: { x, y },
      direction: face
    });
  };

  movePacman = () => {
    const {
      direction,
      position: { x, y },
      gridNumber
    } = this.state;

    console.log('@@@@@MOVE@@@@@@@@', x, y, direction);
    let moveX = 0;
    let moveY = 0;
    switch (direction) {
      case "NORTH":
        moveY += 1;
        break;
      case "SOUTH":
        moveY -= 1;
        break;
      case "WEST":
        moveX -= 1;
        break;
      case "EAST":
        moveX += 1;
        break;
      default:
        break;
    }
    const newX = x + moveX;
    const newY = y + moveY;

    console.log('@@@@@MOVE 2@@@@@@@@', newX, newY, direction);
    const newPosition = { x: newX, y: newY };
    if (!this.availablePosition(newPosition)) {
      // ErrorMsg: invalid move
      this.setState({
        message: `Invalid move, Please move position X and Y in 0 ~ ${gridNumber -
          1}`
      });
      return;
    }

    console.log('@@@@@MOVE 3@@@@@@@@', newPosition);
    this.setState({
      position: newPosition
    });
  };

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

  report = () => {
    this.setState({
      isReport: true
    });
  };

  render() {
    const { gridNumber, direction, position, isReport, message } = this.state;

    console.log('@@@@@@@@@@@@@', position, direction);

    return (
      <div className="simulator">
        <div className="control">
          <InputArea
            handleChange={this.handleChange}
            onInputSubmit={this.onInputSubmit}
          />
          {!!message ? <p>Message: {message}</p> : null}
          {isReport ? (
            <p>
              Output: {position.x},{position.y},{direction}
            </p>
          ) : null}
        </div>
        <div>
          <PacmanMap
            gridNumber={gridNumber}
            direction={direction}
            position={position}
          />
        </div>
      </div>
    );
  }
}

export default Simulator;
