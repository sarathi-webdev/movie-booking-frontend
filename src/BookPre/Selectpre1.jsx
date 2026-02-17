import { useParams, useNavigate } from "react-router-dom";
import "./selectstyle1.css";
import { useState, useEffect } from "react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ALL LOGIC IDENTICAL TO ORIGINAL
//  Only JSX classNames / structure updated
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const THEATRES = [
  "PVR Cinemas",
  "INOX",
  "AGS Cinemas",
  "SPI Cinemas",
  "Rohini Theatre",
];

const TIMES = ["09:00", "12:00", "03:00", "06:00"];

function Selectpre() {
  const { type, id } = useParams();
  const navigate     = useNavigate();

  const [gettingname, setGettingName] = useState(null);
  const [submitting,  setSubmitting]  = useState(false);
  const [hint,        setHint]        = useState("");

  const [formData, setFormData] = useState({
    movieId:      id,
    movieName:    "",
    theatreNames: [],
    showDates:    "",
    showTimes:    [],
  });

  // ── original useEffects (untouched) ─────────
  useEffect(() => {
    setFormData((prev) => ({ ...prev, movieId: id }));
  }, [id]);

  useEffect(() => {
    if (!id || !type) return;

    const url =
      type === "now"
        ? "https://moviealert-26ig.onrender.com/api/movies/theatres-shows"
        : "https://moviealert-26ig.onrender.com/api/upcoming-movie";

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        const movieArray =
          type === "now"
            ? data?.theatre || []
            : Array.isArray(data) ? data : [];

        const foundMovie = movieArray.find(
          (m) => String(m.id) === String(id)
        );

        if (foundMovie) {
          setGettingName(foundMovie);
          setFormData((prev) => ({
            ...prev,
            movieName: foundMovie.name || foundMovie.title,
          }));
        } else {
          setGettingName(null);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setGettingName(null);
      });
  }, [type, id]);

  // ── original handlers (untouched) ───────────
  const handleTheatreChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      theatreNames: checked
        ? [...prev.theatreNames, value]
        : prev.theatreNames.filter((t) => t !== value),
    }));
  };

  const handleTimeChange = (e) => {
    const { id: timeId, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      showTimes: checked
        ? [...prev.showTimes, timeId]
        : prev.showTimes.filter((t) => t !== timeId),
    }));
  };

  const handleSubmit = async () => {
    // original validation
    if (
      formData.theatreNames.length === 0 ||
      !formData.showDates ||
      formData.showTimes.length === 0
    ) {
      setHint("Please select a theatre, date and at least one time.");
      return;
    }
    setHint("");

    const token = localStorage.getItem("token");
    if (!token) {
      setHint("You must be logged in to save preferences.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(
        "https://moviealert-26ig.onrender.com/api/preferences",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            movieName:    formData.movieName,
            theatreNames: formData.theatreNames,
            showDates:    [formData.showDates],
            showTimes:    formData.showTimes,
          }),
        }
      );

      if (response.ok) {
        navigate("/movie");
      } else {
        setHint("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setHint("Server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const movieTitle = gettingname
    ? gettingname.name || gettingname.title
    : null;

  // ── render ───────────────────────────────────
  return (
    <div className="preference-page">
      <div className="preference-card">

        {/* ── Movie label + title ── */}
        <p className="pref-movie-badge">
          {type === "now" ? "Now Showing" : "Upcoming"}
        </p>

        <h2 className="pref-movie-title">
          {movieTitle ?? "Loading…"}
        </h2>

        {/* ── Theatre selection ── */}
        <div className="pref-section">
          <p className="pref-section-label">Select Theatres</p>

          <div className="theatre-checkbox-group">
            {THEATRES.map((theatre, index) => (
              <label
                key={index}
                className={`theatre-check-item${
                  formData.theatreNames.includes(theatre) ? " is-checked" : ""
                }`}
              >
                <input
                  type="checkbox"
                  value={theatre}
                  id={`theatre-${index}`}
                  onChange={handleTheatreChange}   /* ← original handler */
                />
                <span className="theatre-label">{theatre}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ── Date selection ── */}
        <div className="pref-section">
          <p className="pref-section-label">Select Date</p>
          <input
            type="date"
            className="pref-date-input"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, showDates: e.target.value }))
            }   /* ← original handler */
          />
        </div>

        {/* ── Time slots ── */}
        <div className="pref-section">
          <p className="pref-section-label">Select Showtime</p>

          <div className="time-slots">
            {TIMES.map((time) => (
              <span key={time}>
                {/*
                  IMPORTANT: input MUST come before label for the
                  input:checked + label sibling CSS selector to work
                */}
                <input
                  type="checkbox"
                  id={time}
                  onChange={handleTimeChange}   /* ← original handler */
                />
                <label className="time-slot-label" htmlFor={time}>
                  {time}
                </label>
              </span>
            ))}
          </div>
        </div>

        <hr className="pref-divider" />

        {/* ── Validation hint ── */}
        {hint && <p className={`pref-hint error`}>{hint}</p>}

        {/* ── Submit ── */}
        <button
          className={`pref-submit-btn${submitting ? " is-loading" : ""}`}
          onClick={handleSubmit}   /* ← original handler */
          disabled={submitting}
        >
          {submitting ? "Saving…" : "Save Preferences"}
        </button>

      </div>
    </div>
  );
}

export default Selectpre;
