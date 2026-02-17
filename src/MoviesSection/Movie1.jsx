import React, { useState } from "react";
import NowShowing from "./Nowshowing1";
import Upcoming from "./Upcoming1";
import Preference from "./Preference1";
import "./dummystyle.css";

// Tab config — easy to extend
const TABS = [
  { id: "now",        label: "Now Showing", icon: "🎬" },
  { id: "upcoming",   label: "Upcoming",    icon: "🗓" },
  { id: "preference", label: "Preferences", icon: "⭐" },
];

function Movie() {
  const [tab, setTab] = useState("now");

  return (
    <div className="movies-container">

      {/* ── Header ── */}
      <header className="movies-header">
        <h1 className="movies-title">
          CINE<span>PLEX</span>
        </h1>
        <p className="movies-subtitle">What's playing near you</p>
      </header>

      {/* ── Tab Navigation ── */}
      <nav className="tab-strip" role="tablist" aria-label="Movie categories">
        {TABS.map(({ id, label, icon }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            className={`tab-btn${tab === id ? " active" : ""}`}
            onClick={() => setTab(id)}
          >
            <span className="tab-icon" aria-hidden="true">{icon}</span>
            {label}
          </button>
        ))}
      </nav>

      {/* ── Tab Panels ── */}
      <div
        className="tab-panel"
        role="tabpanel"
        key={tab}              /* remounts child → triggers fadeUp animation */
      >
        {tab === "now"        && <NowShowing />}
        {tab === "upcoming"   && <Upcoming />}
        {tab === "preference" && <Preference />}
      </div>

    </div>
  );
}

export default Movie;
