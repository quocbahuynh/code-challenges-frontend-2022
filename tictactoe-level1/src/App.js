import { useEffect, useState } from "react";
import Display from "./components/Display";
// import Home from "./components/Home";
// import Game from "./components/Game";
// import Winner from "./components/Winner";
// import PersonGame from "./components/PersonGame";
// import MachineGame from "./components/MachineGame";

function App() {
  /*home, p2p, p2m */
  const [activePage, setActivePage] = useState("home");

  // useEffect(() => {
  //   if (localStorage.getItem("mode")) {
  //     let mode = localStorage.getItem("mode");
  //     if (mode === "home") {
  //       setActivePage("home");
  //     } else if (mode === "p2p") {
  //       setActivePage("p2p");
  //     } else if (mode === "p2m") {
  //       setActivePage("p2m");
  //     } else {
  //       return;
  //     }
  //   }
  // }, []);

  return (
    <>
      <div className="container">
        <Display />
      </div>
    </>
  );
}


export default App;
