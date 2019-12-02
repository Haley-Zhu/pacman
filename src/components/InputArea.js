import React from "react";

const InputArea = ({ onInputSubmit, handleChange, inputCommand }) => {
  return (
    <form className="input-area" onSubmit={e => onInputSubmit(e)}>
      <input
        placeholder="Please enter command"
        onChange={e => handleChange(e.target.value)}
        value={inputCommand}
      />
    </form>
  );
};

export default InputArea;
