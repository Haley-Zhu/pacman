import React from 'react';

const Pacman = (props) => {
  const { direction } = props;

  return (
    <div className={`pacman pacman--${direction.toLowerCase()}`}></div>
  )
}

export default Pacman;