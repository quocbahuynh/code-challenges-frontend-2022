import React, { useRef, useState } from "react";
import useWindowSize from "@rooks/use-window-size";
import Countdown from "react-countdown";
import Confetti from "react-confetti";
import useSound from "use-sound";

import Board from "./Board";
import Score from "./Score";
import Turn from "./Turn";
import TimmerProcessBar from "./TimmerProcessBar.js";
import Options from "./Options";

import buttonSfx from "../sounds/button.ogg";
import yeehawSfx from "../sounds/yeehaw.ogg";
import winWaySfx from "../sounds/winway.ogg";
import Winner from "./Winner";
import { getWinnerWay } from "../util/calculateWinner";
import { getAvailabaleCells } from "../util/checkAvailabaleCell";

export default function PersonGame() {
  const initialPlayersInfo = [
    { id: "player1", name: "Player 1", score: 0 },
    { id: "player2", name: "Player 2", score: 0 },
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [playersInfo, setPlayersInfo] = useState(initialPlayersInfo);
  const [firstUserPlaying, setFirstUserPlaying] = useState(true); // first player: X ; Second player: O
  const [blinkForPlayer, setBlinkForPlayer] = useState(null);
  const [winnerWay, setWinnerWay] = useState([]);
  const [timeLimit, setTimeLimit] = useState(Date.now() + 10000);
  const refTimer = useRef();
  const [paused, setPaused] = useState(false);
  const { innerWidth, innerHeight } = useWindowSize();
  const [cogratulation, setCogratulation] = useState(false);
  const [tie, setTie] = useState(false);
  const [clickCellSfx] = useSound(buttonSfx, {
    volume: 0.5,
    interrupt: true,
  });
  const [onYeehawSfx] = useSound(yeehawSfx, { volume: 0.4, playbackRate: 0.9 });
  const [onWinwaySfx] = useSound(winWaySfx, { volume: 1, interrupt: true });
  const [maxRound, setMaxRound] = useState(3);
  const [round, setRound] = useState(1);
  const [soundEffect, setSoundEffect] = useState(true);

  const handleClick = (index) => {
    /* play sound */
    soundEffect && clickCellSfx();

    /* paused */
    if (paused) {
      return;
    }

    /* If the user click on the cell which are unavailable */
    if (board[index] !== null) {
      return;
    }

    /* set a new board base on the move of user */
    const tmpBoard = [...board];
    tmpBoard[index] = firstUserPlaying ? "X" : "O";
    setBoard(tmpBoard);

    // win
    if (getWinnerWay(tmpBoard) !== null) {
      soundEffect && onWinwaySfx();
      soundEffect && onYeehawSfx();
      setCogratulation(true);
      setWinnerWay(getWinnerWay(tmpBoard));
      updateScore(firstUserPlaying);
      setPaused(true);

      setTimeout(() => {
        createNewGame(firstUserPlaying);
        return;
      }, 2000);
    }

    // tie:  !checkAvailabale && !win
    if (
      getAvailabaleCells(tmpBoard).length < 1 &&
      getWinnerWay(tmpBoard) === null
    ) {
      setPaused(true);
      setTie(true);
      setTimeout(() => {
        createNewGame(firstUserPlaying);
        return;
      }, 1500);
      return;
    }

    // next player
    // restart count down timer
    timerCompleted();
  };

  const updateScore = (player) => {
    const copyPlayersInfo = [...playersInfo];
    const firstPlayer = copyPlayersInfo[0];
    const secondsPlayer = copyPlayersInfo[1];

    /*
    If player is playing who is the first user then updating score for him
    */
    if (player) {
      firstPlayer.score = ++firstPlayer.score;
      setPlayersInfo(copyPlayersInfo);
      setBlinkForPlayer(firstPlayer.id);
    } else {
      secondsPlayer.score = ++secondsPlayer.score;
      setPlayersInfo(copyPlayersInfo);
      setBlinkForPlayer(secondsPlayer.id);
    }
  };

  const restartGame = () => {
    setRound(1);
    setFirstUserPlaying(true);
    setPaused(false);
    setTie(false);
    setBoard(Array(9).fill(null));
    setWinnerWay([]);
    setPlayersInfo([...initialPlayersInfo]);
    setTimeLimit(Date.now() + 10000);
  };

  const createNewGame = (player) => {
    player ? setFirstUserPlaying(true) : setFirstUserPlaying(false); // winner begin
    setRound(round + 1);
    setCogratulation(false);
    setPaused(false);
    setTie(false);
    setBoard(Array(9).fill(null));
    setWinnerWay([]);
    setTimeLimit(Date.now() + 10000);
  };

  const renderer = ({ seconds }) => {
    return (
      <>
        <TimmerProcessBar seconds={seconds} />
      </>
    );
  };

  const timerCompleted = () => {
    setTimeLimit(Date.now() + 10000);
    setFirstUserPlaying(!firstUserPlaying);
  };

  /* Options */
  const handlePause = (e) => {
    refTimer.current?.pause();
    setPaused(true);
  };

  const handleContinue = (e) => {
    refTimer.current?.start();
    setPaused(false);
  };

  const handleBackHome = () => {
    window.location.reload();
  };

  return (
    <>
      <section className="hero is-fullheight">
        <div className="columns is-desktop">
          <div className="column"></div>
          <div className="column is-5 has-text-centered">
            {round <= maxRound ? (
              <>
                <Score players={playersInfo} blinkForPlayer={blinkForPlayer} />
                <Turn playing={firstUserPlaying} players={playersInfo} />
                <Board
                  origBoard={board}
                  handleClick={handleClick}
                  winnerWay={winnerWay}
                  player={!firstUserPlaying}
                  tie={tie}
                />
                <Countdown
                  ref={refTimer}
                  date={timeLimit}
                  key={timeLimit}
                  renderer={renderer}
                  autoStart={true}
                  onComplete={timerCompleted}
                  onPause={handlePause}
                />
              </>
            ) : (
              <>
                <Winner
                  players={playersInfo}
                  handleRestart={restartGame}
                  handleBackHome={handleBackHome}
                />
              </>
            )}
          </div>
          <div className="column is-flex is-align-items-center">
            {round <= maxRound && (
              <Options
                handlePause={handlePause}
                handleContinue={handleContinue}
                handleRestart={restartGame}
                handleBackHome={handleBackHome}
                turnSoundEffect={setSoundEffect}
                isPaused={paused}
              />
            )}
          </div>
        </div>
      </section>
      {cogratulation && <Confetti width={innerWidth} height={innerHeight} />}
    </>
  );
}
