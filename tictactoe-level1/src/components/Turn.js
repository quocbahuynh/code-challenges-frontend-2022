import React from "react";

export default function Turn({ playing, players }) {
  return (
    <>
      <div>
        <h1>Turn: {playing ? players[0].name : players[1].name}</h1>
      </div>
    </>
  );
}
