import React from "react";

export default function Score({ players, blinkForPlayer }) {
  const playerNameStyle = {
    border: 0,
  };

  const scoreNumberStyle = {
    border: 0,
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
  };

  const blinkMe = (blinkForPlayer, playerID) => {
    if (blinkForPlayer == playerID) {
      return "blink_me";
    }
  };

  return (
    <>
      <nav
        className="pagination is-centered mt-5"
        role="navigation"
        aria-label="pagination"
      >
        <div className="pagination-previous" style={playerNameStyle}>
          <h3 className="title is-3">{players[0].name}</h3>
        </div>
        <div className="pagination-next" style={playerNameStyle}>
          <h3 className="title is-3">{players[1].name}</h3>
        </div>
        <div className="pagination-list">
          <div className="field has-addons">
            <p className="control">
              <button className="button is-rounded" style={scoreNumberStyle}>
                <h4
                  className={`title is-4 ${blinkMe(
                    blinkForPlayer,
                    players[0].id
                  )}`}
                >
                  {players[0].score}
                </h4>
              </button>
            </p>
            <p className="control">
              <button className="button" style={scoreNumberStyle}>
                <h4 className="title is-4">-</h4>
              </button>
            </p>
            <p className="control">
              <button className="button is-rounded" style={scoreNumberStyle}>
                <h4
                  className={`title is-4 ${blinkMe(
                    blinkForPlayer,
                    players[1].id
                  )}`}
                >
                  {players[1].score}
                </h4>
              </button>
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}
