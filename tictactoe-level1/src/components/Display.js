import React, { useState } from "react";
import xIcon from "../icons/x.svg";
import oIcon from "../icons/o.svg";
import PersonGame from "./PersonGame";
import MachineGame from "./MachineGame";

export default function Display() {
  const [activePage, setActivePage] = useState("home");

  return (
    <>
      <SwitchDisplay activePage={activePage} setActivePage={setActivePage} />
    </>
  );
}

const SwitchDisplay = ({ activePage, setActivePage }) => {
  switch (activePage) {
    case "home":
      return <Entrace setActivePage={setActivePage} />;
    case "p2p":
      return <PersonGame />;
    case "p2m":
      return <MachineGame />;
    default:
      return <Entrace />;
  }
};

const Entrace = ({ setActivePage }) => {
  const height = {
    height: "400px",
  };

  return (
    <>
      <section className="hero is-fullheight">
        <div className="container is-flex is-align-items-center">
          <div className="columns is-mobile is-centered">
            <div className="column is-half">
              <div className="is-flex">
                <figure className="image">
                  <img
                    src={xIcon}
                    className="xshadow animate__animated animate__rotateInDownLeft"
                    style={height}
                    alt="x"
                  />
                </figure>
                <figure className="image">
                  <img
                    src={oIcon}
                    className="oshadow animate__animated animate__lightSpeedInRight"
                    style={height}
                    alt="o"
                  />
                </figure>
              </div>
              <button
                className="button button_mode is-rounded is-medium is-fullwidth is-inverted animate__animated animate__fadeInUp"
                onClick={() => setActivePage("p2p")}
              >
                With a Friend
              </button>
              <button
                className="button button_mode mt-3 is-rounded is-medium is-fullwidth is-inverted animate__animated animate__fadeInUp"
                onClick={() => setActivePage("p2m")}
              >
                With a Machine
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
