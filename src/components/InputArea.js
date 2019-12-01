import React from "react";

const InputArea = props => {
  return (
    <form onSubmit={e => props.onInputSubmit(e)}>
      <input
        placeholder="Please enter command"
        onChange={e => props.handleChange(e.target.value)}
      />
    </form>
  );
};

export default InputArea;
