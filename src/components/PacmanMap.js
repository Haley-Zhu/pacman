import React from "react";
import Pacman from "./Pacman";

class PacmanMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      girdList: [],
      isShowPacman: false
    };
  }

  componentDidMount() {
    const { gridNumber } = this.props;
    let newGridList = [];
    newGridList.length = gridNumber * gridNumber;
    newGridList.fill("");
    this.setState({
      girdList: newGridList
    });
  }

  isPacmanPosition = index => {
    const { gridNumber, position} = this.props;
    const pacmanIndex = position.y * gridNumber + position.x;

    return index === pacmanIndex;
  };

  render() {
    const { direction, gridNumber } = this.props;
    const { girdList } = this.state;

    return (
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
    );
  }
}

export default PacmanMap;
