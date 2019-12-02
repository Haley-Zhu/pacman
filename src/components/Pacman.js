import React from "react";

const Pacman = ({ direction }) => {
  return <div className={`pacman pacman--${direction.toLowerCase()}`}></div>;
};

export default Pacman;
