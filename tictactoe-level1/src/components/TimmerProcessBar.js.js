import React from "react";

export default function TimmerProcessBar({ seconds }) {
  const decreaseProcessBar = (seconds) => {
    return seconds * 10;
  };

  return (
    <>
      <div className="box pb-0">
        <article class="media">
          <div class="media-left">
            <span className="icon">
              <ion-icon name="timer-outline" size="large"></ion-icon>
            </span>
          </div>
          <div class="media-content">
            <progress className="progress is-danger" value={decreaseProcessBar(seconds)} max="100" min="0">
              100%
            </progress>
          </div>
        </article>
      </div>
    </>
  );
}
