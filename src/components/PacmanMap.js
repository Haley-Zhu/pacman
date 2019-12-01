import React from "react";
import Pacman from "./Pacman";

class PacmanMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowPacman: false
    };
  }

  isPacmanPosition = index => {
    const { gridNumber, position } = this.props;
    const pacmanIndex = position.y * gridNumber + position.x;

    return index === pacmanIndex;
  };

  render() {
    const { direction, gridNumber } = this.props;
    let girdList = [];
    girdList.length = gridNumber * gridNumber;
    girdList.fill("");

    return (
      <React.Fragment>
        <p>Grid Number: {gridNumber}</p>
        <div className="pacman-map">
          {girdList.map((grid, index) => (
            <div key={index} className="pacman-map__cell">
              {`(${index % gridNumber}, ${parseInt(index / gridNumber)})`}
              {this.isPacmanPosition(index) ? (
                <Pacman direction={direction} />
              ) : null}
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default PacmanMap;
