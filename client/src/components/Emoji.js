import React from "react";

export default function Emoji(props) {
  return (
    <span aria-label={props.label} role="img">
      {props.symbol}
    </span>
  );
}
