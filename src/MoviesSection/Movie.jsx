import React, { useState } from "react";
import NowShowing from "./Nowshowing";
import Upcoming from "./Upcoming";
import Preference from "./Preference";
import "./movie.css";

function Movie() {
  const [tab, setTab] = useState("now");

  return (
    <div className="movies-container">
      <h2 className="text-left mb-4">Movies</h2>

      <div className="tab-buttons mb-5">
        <button
          className={tab === "now" ? "active" : ""}
          onClick={() => setTab("now")}
        >
          Now Showing
        </button>

        <button
          className={tab === "upcoming" ? "active" : ""}
          onClick={() => setTab("upcoming")}
        >
          Upcoming
        </button>

        <button
          className={tab === "preference" ? "active" : ""}
          onClick={() => setTab("preference")}
        >
          Preference
        </button>
      </div>

      {tab === "now" && <NowShowing />}
      {tab === "upcoming" && <Upcoming />}
      {tab === "preference" && <Preference />}
    </div>
  );
}

export default Movie;
