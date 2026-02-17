import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./stylethreatre1.css";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ALL LOGIC IDENTICAL TO ORIGINAL
//  Only JSX classNames / structure updated
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function TheatreList() {
  const { id }     = useParams();
  const navigate   = useNavigate();

  // ── original state (untouched) ──────────────
  const [movie,        setMovie]        = useState(null);
  const [selectedDate, setSelectedDate] = useState(0);
  const [loading,      setLoading]      = useState(true);

  // ── original useEffect (untouched) ──────────
  useEffect(() => {
    if (!id) return;

    fetch("https://moviealert-26ig.onrender.com/api/movies/theatres-shows")
      .then((res) => res.json())
      .then((data) => {
        console.log("API RESPONSE:", data);

        if (!Array.isArray(data?.theatre)) {
          setMovie(null);
          return;
        }

        const foundMovie = data.theatre.find(
          (m) => String(m.id) === String(id)
        );

        if (!foundMovie) {
          console.error("Movie not found for id:", id);
          setMovie(null);
          return;
        }

        setSelectedDate(0);
        setMovie(foundMovie);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setMovie(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // ── loading / not-found guards ───────────────
  if (loading || !movie || !movie.dates || movie.dates.length === 0) {
    return (
      <div className="theatre-loading">
        <div className="theatre-loading-spinner" />
        <p>Loading theatres…</p>
      </div>
    );
  }

  const currentDate = movie.dates[selectedDate];   /* ← original logic */

  return (
    // CHANGED: .container.container1 → .container1 only (no Bootstrap .container)
    <div className="container1">
      <div className="theatreshow">

        {/* ── Back button + movie name ── */}
        <div className="theatre-header">
          <button
            className="theatre-back-btn"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            ←
          </button>
          <div>
            <p className="theatre-movie-label">Now Showing</p>
            <h2 className="theatre-movie-name">{movie.name}</h2>
          </div>
        </div>

        {/* ── Date bar ── */}
        <p className="theatre-section-label">Choose a date</p>

        {/* CHANGED: .date-bar + .date-box — same onClick logic, new styles */}
        <div className="date-bar">
          {movie.dates.map((d, index) => (
            <div
              key={index}
              className={`date-box${selectedDate === index ? " active" : ""}`}
              onClick={() => setSelectedDate(index)}   /* ← original handler */
            >
              <small>{d.day}</small>
              <h5>{d.date}</h5>
              <small className="date-label-tag">{d.label}</small>
            </div>
          ))}
        </div>

        {/* ── Theatre cards ── */}
        <p className="theatre-section-label">
          {currentDate.theatres.length} theatre{currentDate.theatres.length !== 1 ? "s" : ""} available
        </p>

        <div className="theatre-cards">
          {currentDate.theatres.map((theatre) => (
            <div key={theatre.id} className="theatre-card">

              {/* Card header row */}
              <div className="theatre-card-header">
                <h6>{theatre.name}</h6>
                <span className="theatre-avail-tag">Available</span>
              </div>

              {/* Time buttons — original .time-btn class kept, new CSS applied */}
              <div className="time-btns-row">
                {theatre.times.map((time, i) => (
                  <button key={i} className="time-btn">
                    {time}
                  </button>
                ))}
              </div>

              <hr className="theatre-card-divider" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default TheatreList;
