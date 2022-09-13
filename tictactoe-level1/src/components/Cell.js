import React from "react";
import { useMediaQuery } from "react-responsive";
import xIcon from "../icons/x.svg";
import oIcon from "../icons/o.svg";
import tieIcon from "../icons/tie.svg";

export default function Cell({
  value,
  index,
  handleClick,
  winnerWay,
  player,
  tie,
}) {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });

  const cellStyleDesktop = {
    width: "130px",
    height: "130px",
    margin: "auto",
  };

  const cellStyleMobile = {
    width: "95px",
    height: "95px",
    margin: "auto",
  };

  const drawWinnerWay = (way, player) => {
    if (way.includes(index)) {
      if (player) {
        return "is-winwayuser";
      } else {
        return "is-winwaymachine";
      }
    }
  };

  return (
    <>
      <div
        className={`box 
        ${drawWinnerWay(winnerWay, player)} 
        ${tie ? `shake_me` : `animate__animated animate__backInDown`}`}
        style={isTabletOrMobile ? cellStyleMobile : cellStyleDesktop}
        onClick={() => handleClick(index)}
      >
        {value &&
          !tie &&
          (value === "X" ? (
            <>
              <img
                src={xIcon}
                className="xshadow animate__animated animate__bounceIn"
                alt="x"
              />
            </>
          ) : (
            <>
              <img
                src={oIcon}
                className="oshadow animate__animated animate__bounceIn"
                alt="o"
              />
            </>
          ))}
        {tie && <img src={tieIcon} alt="tie" />}
      </div>
    </>
  );
}
