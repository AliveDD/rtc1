import React, { useState } from "react";

import Rtc from "./Rtc.js";
import P2P from "./p2p.js";

export default function App() {
  // const [isVid, setIsVid] = useState(false);
  // console.log("isVid", isVid);
  // const toggleFull = () => setIsVid(!isVid);
  return (
    <React.Fragment>
      <P2P />

      {/* <Rtc /> */}
      {/* <button onClick={() => toggleFull()} className="toggle">
        toggle full
      </button> */}
    </React.Fragment>
  );
}
