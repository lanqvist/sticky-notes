import React from "react";
import ReactDOM from "react-dom";
import StickyNotes from "./components/StickyNotes";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <div>Sticky notes</div>
    <StickyNotes />
  </React.StrictMode>,
  document.getElementById("root")
);
