import React, { useState } from "react";

export function MyButton(props) {
  const [buttonText, setButtonText] = useState("Click me, please");
  const defaultOp = () => setButtonText("Thanks, been clicked!");
  const op = props.delegate || defaultOp;
  return <button onClick={op}>{buttonText}</button>;
}
