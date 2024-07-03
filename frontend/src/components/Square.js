import React from "react";
import styled from "styled-components";

/**
 * Renders a square component.
 *
 * @param {number} value - The value of the square.
 * @param {boolean} disabled - Indicates if the square is disabled.
 * @param {function} onClick - Function to handle click events on the square.
 * @return {JSX.Element} The rendered square component.
 */
export default function Square({ value, disabled, onClick }) {
  return (
    <Button disabled={disabled} onClick={onClick}>
      {value}
    </Button>
  );
}

const Button = styled("button")`
  color: black;
  background-color: #fff;
  border: 1px solid #bbb;

  text-align: center;
  font-size: 42px;
  font-weight: 700;

  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  height: var(--square-size);
  width: var(--square-size);

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
    background-color: #0000000e;
  }
  &:disabled {
    opacity: 1;
    cursor: default;
    background-color: white;
  }
`;
