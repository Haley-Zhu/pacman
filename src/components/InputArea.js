import React from "react";

const InputArea = props => {
  return (
    <form className="input-area" onSubmit={e => props.onInputSubmit(e)}>
      <input
        placeholder="Please enter command"
        onChange={e => props.handleChange(e.target.value)}
        value={props.inputCommand}
      />
    </form>
  );
};

export default InputArea;
