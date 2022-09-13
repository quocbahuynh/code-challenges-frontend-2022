import React from "react";
import Cell from "./Cell";

export default function Board({
  origBoard,
  handleClick,
  winnerWay,
  player,
  tie,
}) {
  return (
    <>
      <div className="columns mt-1 is-mobile is-multiline">
        {origBoard.map((cell, index) => (
          <>
            <div className="column is-4" key={index}>
              <Cell
                value={cell}
                index={index}
                handleClick={handleClick}
                winnerWay={winnerWay}
                player={player}
                tie={tie}
              />
            </div>
          </>
        ))}
      </div>
    </>
  );
}
