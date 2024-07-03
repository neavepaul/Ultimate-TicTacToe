import React from "react";

export default function PlayerSelect({onSelectPlayer}) {
  return (
      <div><h1>Ultimate Tic - Tac -
          Toe</h1>
            <p>Developed by [Your Name]</p><div>
          <button onClick = {() => onSelectPlayer("X")}>Play as
      X</button>
                <button onClick={() => onSelectPlayer("O")}>Play as O</button>
      </div>
        </div>);
}
