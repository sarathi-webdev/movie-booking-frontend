import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./stylethreatre1.css";

const BASE_URL = "https://moviealert-26ig.onrender.com/api/movies";
const isAdmin = localStorage.getItem("isAdmin") === "true";

function TheatreList() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie]               = useState(null);
  const [selectedDate, setSelectedDate] = useState(0);
  const [loading, setLoading]           = useState(true);
  const [deleteMode, setDeleteMode]     = useState(false);
  const [deleting, setDeleting]         = useState(null);

  // ── Fetch ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!id) return;

    fetch(`${BASE_URL}/theatres-shows`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data?.theatre)) { setMovie(null); return; }
        const foundMovie = data.theatre.find((m) => String(m.id) === String(id));
        if (!foundMovie) { setMovie(null); return; }
        setSelectedDate(0);
        setMovie(foundMovie);
      })
      .catch((err) => { console.error("FETCH ERROR:", err); setMovie(null); })
      .finally(() => setLoading(false));
  }, [id]);

  // ── Generic DELETE helper ─────────────────────────────────────────
  const apiDelete = async (endpoint, label) => {
    setDeleting(label);
    try {
      const res = await fetch(`${BASE_URL}/${endpoint}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      return true;
    } catch (err) {
      console.error(`DELETE [${endpoint}] failed:`, err);
      alert(`Failed to delete. Please try again.`);
      return false;
    } finally {
      setDeleting(null);
    }
  };

  const cloneMovie = () => JSON.parse(JSON.stringify(movie));

  // ── Delete: Date ──────────────────────────────────────────────────
  const handleDeleteDate = async (dateIndex) => {
    const dateId = movie.dates[dateIndex]?.id ?? dateIndex;
    const ok = await apiDelete(
      `theatres-shows/${id}/dates/${dateId}`,
      `date-${dateId}`
    );
    if (!ok) return;
    const updated = cloneMovie();
    updated.dates.splice(dateIndex, 1);
    setSelectedDate((prev) => Math.min(prev, updated.dates.length - 1));
    setMovie(updated);
  };

  // ── Delete: Theatre ───────────────────────────────────────────────
  const handleDeleteTheatre = async (dateIndex, theatreId) => {
    const dateId = movie.dates[dateIndex]?.id ?? dateIndex;
    const ok = await apiDelete(
      `theatres-shows/${id}/dates/${dateId}/theatres/${theatreId}`,
      `theatre-${theatreId}`
    );
    if (!ok) return;
    const updated = cloneMovie();
    updated.dates[dateIndex].theatres = updated.dates[dateIndex].theatres.filter(
      (t) => t.id !== theatreId
    );
    setMovie(updated);
  };

  // ── Delete: Showtime ──────────────────────────────────────────────
  const handleDeleteTime = async (dateIndex, theatreId, timeIndex) => {
    const dateId = movie.dates[dateIndex]?.id ?? dateIndex;
    const ok = await apiDelete(
      `theatres-shows/${id}/dates/${dateId}/theatres/${theatreId}/times/${timeIndex}`,
      `time-${theatreId}-${timeIndex}`
    );
    if (!ok) return;
    const updated = cloneMovie();
    const theatre = updated.dates[dateIndex].theatres.find((t) => t.id === theatreId);
    if (theatre) theatre.times.splice(timeIndex, 1);
    setMovie(updated);
  };

  // ── Loading / not-found guard ─────────────────────────────────────
  if (loading || !movie || !movie.dates || movie.dates.length === 0) {
    return (
      <div className="theatre-loading">
        <div className="theatre-loading-spinner" />
        <p>Loading theatres…</p>
      </div>
    );
  }

  const currentDate = movie.dates[selectedDate];

  return (
    <div className="container1">
      <div className="theatreshow">

        {/* ── Header ── */}
        <div className="theatre-header">
          <button
            className="theatre-back-btn"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            ←
          </button>

          <div className="theatre-header-content">
            <div>
              <p className="theatre-movie-label">Now Showing</p>
              <h2 className="theatre-movie-name">{movie.name}</h2>
            </div>

            {isAdmin && (
              <button
                className={`admin-btn delete${deleteMode ? " active" : ""}`}
                onClick={() => setDeleteMode((prev) => !prev)}
              >
                {deleteMode ? "❌ Exit Delete Mode" : "🗑 Enable Delete Mode"}
              </button>
            )}
          </div>
        </div>

        {/* ── Date bar ── */}
        <p className="theatre-section-label">Choose a date</p>
        <div className="date-bar">
          {movie.dates.map((d, index) => (
            <div
              key={index}
              className={`date-box${selectedDate === index ? " active" : ""}`}
              onClick={() => setSelectedDate(index)}
            >
              <small>{d.day}</small>
              <h5>{d.date}</h5>
              <small className="date-label-tag">{d.label}</small>

              {isAdmin && deleteMode && (
                <button
                  className="mini-delete-btn date-delete"
                  disabled={!!deleting}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteDate(index);
                  }}
                >
                  {deleting === `date-${d.id ?? index}` ? "…" : "✖"}
                </button>
              )}
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

              <div className="theatre-card-header">
                <h6>{theatre.name}</h6>
                <div className="theatre-card-actions">
                  <span className="theatre-avail-tag">Available</span>
                  {isAdmin && deleteMode && (
                    <button
                      className="mini-delete-btn"
                      disabled={!!deleting}
                      onClick={() => handleDeleteTheatre(selectedDate, theatre.id)}
                    >
                      {deleting === `theatre-${theatre.id}` ? "…" : "✖"}
                    </button>
                  )}
                </div>
              </div>

              <div className="time-btns-row">
                {theatre.times.map((time, i) => (
                  <div key={i} className="time-wrapper">
                    <button className="time-btn">{time}</button>
                    {isAdmin && deleteMode && (
                      <button
                        className="mini-delete-btn time-delete"
                        disabled={!!deleting}
                        onClick={() => handleDeleteTime(selectedDate, theatre.id, i)}
                      >
                        {deleting === `time-${theatre.id}-${i}` ? "…" : "✖"}
                      </button>
                    )}
                  </div>
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
