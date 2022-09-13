import React, { useState } from "react";
import ReactSound from "react-sound";
import bgSfx from "../sounds/bg.ogg";

export default function Options({
  handlePause,
  handleContinue,
  handleRestart,
  handleBackHome,
  turnSoundEffect,
  isPaused,
  disablePaused,
}) {
  const [onSound, setOnSound] = useState(true);

  const handleTurnSound = () => {
    if (onSound) {
      turnSoundEffect(false);
      setOnSound(false);
    } else {
      turnSoundEffect(true);
      setOnSound(true);
    }
  };

  return (
    <>
      <div className="box">
        {isPaused ? (
          <>
            <OptionButtonCus
              iconName={"caret-forward-outline"}
              handle={handleContinue}
            />
          </>
        ) : (
          <>
            <OptionButtonCus
              iconName={"stop-circle-outline"}
              handle={handlePause}
              disablePaused={disablePaused}
            />
          </>
        )}
        <OptionButtonCus iconName={"refresh-outline"} handle={handleRestart} />
        <OptionButtonCus iconName={"home-outline"} handle={handleBackHome} />
        {onSound ? (
          <>
            <OptionButtonCus
              iconName={"volume-high-outline"}
              handle={handleTurnSound}
            />
          </>
        ) : (
          <>
            <OptionButtonCus
              iconName={"volume-mute-outline"}
              handle={handleTurnSound}
            />
          </>
        )}
      </div>
      <ReactSound
        url={bgSfx}
        playStatus={
          onSound ? ReactSound.status.PLAYING : ReactSound.status.STOPPED
        }
      />
    </>
  );
}

export const OptionButtonCus = ({ iconName, handle, disablePaused }) => {
  return (
    <>
      <nav
        className="pagination is-rounded"
        role="navigation"
        aria-label="pagination"
      >
        <button
          className="button pagination-link"
          disabled={disablePaused}
          onClick={handle}
        >
          <ion-icon name={iconName}></ion-icon>
        </button>
      </nav>
    </>
  );
};
