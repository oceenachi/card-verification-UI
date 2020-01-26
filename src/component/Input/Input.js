import React from "react";
import "./input.css";

function Input(props) {
  return (
    <>
      <div className="inputContainer">
        <input
        className="cardInput"
          type="number"
          name="cardNumber"
          aria-label="form-input"
          maxLength="16"
          min="100000"
          value={props.value}
          onChange = {props.onChange}
          />
      </div>
    </>
  );
}

export default Input;