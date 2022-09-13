import React, { useRef, useState } from "react";
import useWindowSize from "@rooks/use-window-size";
import Countdown from "react-countdown";
import Confetti from "react-confetti";
import useSound from "use-sound";

import { p2mWinner, getWinnerWay } from "../util/calculateWinner";

import Board from "./Board";
import Score from "./Score";
import Turn from "./Turn";
import TimmerProcessBar from "./TimmerProcessBar.js";
import Options from "./Options";

import buttonSfx from "../sounds/button.ogg";
import yeehawSfx from "../sounds/yeehaw.ogg";
import winWaySfx from "../sounds/winway.ogg";
import bgSfx from "../sounds/bg.ogg";
import Winner from "./Winner";
import {
  getAvailabaleCells,
  getIndexOfAvailabaleCells,
} from "../util/checkAvailabaleCell";
import ReactSound from "react-sound";

export default function MachineGame() {
  const initialPlayersInfo = [
    { id: "user", name: "Player", score: 0 },
    { id: "machine", name: "Machine", score: 0 },
  ];
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playersInfo, setPlayersInfo] = useState(initialPlayersInfo);
  const [blinkForPlayer, setBlinkForPlayer] = useState(null);
  const [userPlay, setUserPlay] = useState(true);
  const [tie, setTie] = useState(false);
  const [winnerWay, setWinnerWay] = useState([]);
  const user = "X";
  const machine = "O";
  const [timeLimit, setTimeLimit] = useState(Date.now() + 10000);
  const refTimer = useRef();
  const [paused, setPaused] = useState(false);
  const { innerWidth, innerHeight } = useWindowSize();
  const [cogratulation, setCogratulation] = useState(false);
  const [round, setRound] = useState(1);
  const [maxRound, setMaxRound] = useState(3);
  const [disablePaused, setDisablePaused] = useState(false);
  const [clickCellSfx] = useSound(buttonSfx, { volume: 0.5, interrupt: true });
  const [onYeehawSfx] = useSound(yeehawSfx, { volume: 0.4, playbackRate: 0.9 });
  const [onWinwaySfx] = useSound(winWaySfx, { volume: 1, interrupt: true });

  const handlePlayGame = (index) => {
    /* paused */
    if (paused) {
      return;
    }
    // Click on board and the return a new board
    // condition: user is turning
    if (!userPlay) return;
    const newBoard = handleOnClick(user, index, board);

    // restart time
    restartTime();
    // turn
    setUserPlay(false);

    // next to machine

    // disbale paused button
    setDisablePaused(true);

    // fake thinking delay
    setTimeout(() => {
      const [pos, best] = playGame(
        machine,
        newBoard,
        getAvailabaleCells(newBoard).length
      );

      // machine clicks
      handleOnClick(machine, pos, newBoard);

      //unable pasued button
      // disbale paused button
      setDisablePaused(false);

      // restart time
      restartTime();

      // turn
      setUserPlay(true);
    }, fakeThinkingDelay());

    return;
  };

  const playGame = (player, board, remains) => {
    var best;

    if (remains == 0 || gameOver(board)) {
      if (p2mWinner(machine, board)) return [-1, +99];
      else if (p2mWinner(user, board)) return [-1, -99];
      else return [-1, 0];
    }

    if (player == machine) {
      best = -99;
    } else {
      best = +99;
    }

    let tick_cell = -1;

    for (let cell of getIndexOfAvailabaleCells(board)) {
      board[cell] = player;
      const [tick, score] = playGame(reversePlayer(player), board, remains - 1);
      board[cell] = null;

      if (player == machine) {
        if (score > best) {
          best = score;
          tick_cell = cell;
        }
      } else {
        if (score < best) {
          best = score;
          tick_cell = cell;
        }
      }
    }

    return [tick_cell, best];
  };

  const handleOnClick = (player, index, currentBoard) => {
    // If click on an unvailabale cell
    if (board[index] !== null) {
      return;
    }

    //turn on sound
    clickCellSfx();

    // If user does not wait for machine

    // Click on the board and then the board updates
    const tmpBoard = [...currentBoard];
    tmpBoard[index] = player;
    setBoard(tmpBoard);

    // Found out a win way in board => win
    if (
      getAvailabaleCells(tmpBoard).length > 0 &&
      p2mWinner(player, tmpBoard)
    ) {
      onWinwaySfx();
      onYeehawSfx();
      setWinnerWay(getWinnerWay(tmpBoard));
      updateScore(player);
      setCogratulation(true);
      setCogratulation(true);

      setTimeout(() => {
        createNewGame(player);
      }, 2000);

      return;
    }

    // Full board and no body wins => tie
    if (
      getAvailabaleCells(tmpBoard).length < 1 &&
      getWinnerWay(tmpBoard) === null
    ) {
      setTie(true);
      setTimeout(() => {
        createNewGame();
      }, 2000);

      return;
    }

    return tmpBoard;
  };

  const createNewGame = (player) => {
    /* if the winner is the machine, the machine will start the game */
    if (player === machine) {
      setUserPlay(false);
      const newBoard = Array(9).fill(null);
      const randomPos = Math.floor(Math.random() * 9);
      newBoard[randomPos] = machine;
      setBoard(newBoard);
      setUserPlay(true);
    } else {
      setUserPlay(true);
      setBoard(Array(9).fill(null));
    }

    setRound(round + 1);
    setCogratulation(false);
    setPaused(false);
    setTie(false);
    setWinnerWay([]);
    setTimeLimit(Date.now() + 10000);
  };

  const updateScore = (player) => {
    const defineName = player === "X" ? user : machine;
    const copyPlayersInfo = [...playersInfo];
    const firstPlayer = copyPlayersInfo[0];
    const secondsPlayer = copyPlayersInfo[1];

    /*
    If player is playing who is a person then updating score for him
    */
    if (defineName === user) {
      firstPlayer.score = ++firstPlayer.score;
      setPlayersInfo(copyPlayersInfo);
      setBlinkForPlayer(firstPlayer.id);
    } else {
      secondsPlayer.score = ++secondsPlayer.score;
      setPlayersInfo(copyPlayersInfo);
      setBlinkForPlayer(secondsPlayer.id);
    }
  };

  const fakeThinkingDelay = () => {
    const max = 3000; // 3s
    const min = 1000; // 1s
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // reverse player
  const reversePlayer = (player) => {
    return player == user ? machine : user;
  };

  const gameOver = (board) => {
    return p2mWinner(user, board) || p2mWinner(machine, board);
  };

  const renderer = ({ seconds }) => {
    return (
      <>
        <TimmerProcessBar seconds={seconds} />
      </>
    );
  };

  const restartTime = () => {
    setTimeLimit(Date.now() + 10000);
  };

  /* Options */
  const restartGame = () => {
    setRound(1);
    setUserPlay(true);
    setWinnerWay([]);
    setTie(false);
    setBoard(Array(9).fill(null));
    setPlayersInfo([...initialPlayersInfo]);
    setTimeLimit(Date.now() + 10000);
    setPaused(false);
  };

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
                <Turn playing={userPlay} players={playersInfo} />
                <Board
                  origBoard={board}
                  handleClick={handlePlayGame}
                  winnerWay={winnerWay}
                  player={!userPlay}
                  tie={tie}
                />
                <Countdown
                  ref={refTimer}
                  date={timeLimit}
                  key={timeLimit}
                  renderer={renderer}
                  autoStart={true}
                  onComplete={restartTime}
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
              <>
                <Options
                  handlePause={handlePause}
                  handleContinue={handleContinue}
                  handleRestart={restartGame}
                  handleBackHome={handleBackHome}
                  isPaused={paused}
                  disablePaused={disablePaused}
                />
              </>
            )}
          </div>
        </div>
      </section>
      {cogratulation && <Confetti width={innerWidth} height={innerHeight} />}
    </>
  );
}
