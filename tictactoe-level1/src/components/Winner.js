import React from "react";
import cupIcon from "../icons/cup.svg";
import { OptionButtonCus } from "./Options";
export default function Winner({ players, handleRestart, handleBackHome }) {
  const handleWinner = (players) => {
    if (players[0].score == players[1].score) {
      return "Tie!";
    } else if (players[0].score > players[1].score) {
      return `${players[0].name} wins!`;
    } else {
      return `${players[1].name} wins!`;
    }
  };

  return (
    <>
      <div className="box mt-6 animate__animated animate__fadeInDown">
        <figure className="image is-128x128" style={{ margin: "auto" }}>
          <img src={cupIcon} alt="" />
        </figure>
        <h1 className="mt-5 title is-1">{handleWinner(players)}</h1>
        <div className="columns">
          <div className="column"></div>
          <div className="column is-flex is-justify-content-center">
            <OptionButtonCus
              iconName={"refresh-outline"}
              handle={handleRestart}
            />
          </div>
          <div className="column is-flex is-justify-content-center">
            <OptionButtonCus
              iconName={"home-outline"}
              handle={handleBackHome}
            />
          </div>
          <div className="column"></div>
        </div>
      </div>
    </>
  );
}
