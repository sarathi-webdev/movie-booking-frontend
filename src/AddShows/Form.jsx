import { useState } from "react";
import "./styleform.css";

const API_URL = "https://moviealert-26ig.onrender.com/api/show";

export default function AddShow() {
  const [form, setForm] = useState({
    movieName: "",
    theatreName: "",
    showDate: "",
    showTimes: [],
    bookingUrl: "",
  });

  const [timeInput, setTimeInput] = useState("");
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [ripple, setRipple] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTime = () => {
    const t = timeInput.trim();
    if (!t || form.showTimes.includes(t)) return;
    setForm({ ...form, showTimes: [...form.showTimes, t] });
    setTimeInput("");
  };

  const removeTime = (t) => {
    setForm({ ...form, showTimes: form.showTimes.filter((x) => x !== t) });
  };

  const handleSubmit = async () => {
    if (!form.movieName || !form.theatreName || !form.showDate || !form.bookingUrl) {
      setErrorMsg("Please fill all required fields.");
      setStatus("error");
      return;
    }
    if (form.showTimes.length === 0) {
      setErrorMsg("Add at least one show time.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Error ${res.status}`);
      }

      setStatus("success");
      setRipple(true);
      setTimeout(() => setRipple(false), 800);
      setForm({ movieName: "", theatreName: "", showDate: "", showTimes: [], bookingUrl: "" });
    } catch (e) {
      setErrorMsg(e.message || "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <div className="addshow-form">
      <div className="as-shell">
        <div className="as-card">
          <div className="as-filmstrip" />

          <div className="as-header">
            <div className="as-header-icon">🎬</div>
            <div className="as-header-text">
              <h1>Add New Show</h1>
              <p>Schedule a movie screening</p>
            </div>
            <span className="as-badge">Admin</span>
          </div>

          <div className="as-body">
            {/* Row 1 */}
            <div className="as-row">
              <div className="as-field">
                <span className="as-label">Movie Name <span className="as-required-dot" /></span>
                <input
                  className="as-input"
                  type="text"
                  name="movieName"
                  placeholder="e.g. Remo"
                  value={form.movieName}
                  onChange={handleChange}
                />
              </div>
              <div className="as-field">
                <span className="as-label">Theatre Name <span className="as-required-dot" /></span>
                <input
                  className="as-input"
                  type="text"
                  name="theatreName"
                  placeholder="e.g. PVR Cinemas"
                  value={form.theatreName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="as-row">
              <div className="as-field">
                <span className="as-label">Show Date <span className="as-required-dot" /></span>
                <input
                  className="as-input"
                  type="date"
                  name="showDate"
                  value={form.showDate}
                  onChange={handleChange}
                />
              </div>
              <div className="as-field">
                <span className="as-label">Booking URL <span className="as-required-dot" /></span>
                <input
                  className="as-input"
                  type="url"
                  name="bookingUrl"
                  placeholder="https://..."
                  value={form.bookingUrl}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="as-divider" />

            {/* Show Times */}
            <div className="as-field full">
              <span className="as-label">Show Times <span className="as-required-dot" /></span>
              <div className="as-times-wrapper">
                <div className="as-time-add-row">
                  <input
                    className="as-input"
                    type="time"
                    value={timeInput}
                    onChange={(e) => setTimeInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTime()}
                  />
                  <button className="as-add-btn" onClick={addTime} title="Add Time">+</button>
                </div>

                {form.showTimes.length > 0 ? (
                  <div className="as-time-chips">
                    {form.showTimes.map((t) => (
                      <span className="as-chip" key={t}>
                        🕐 {t}
                        <button className="as-chip-remove" onClick={() => removeTime(t)}>×</button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="as-empty-times">No show times added yet</div>
                )}
              </div>
            </div>

            {/* Status */}
            {status === "success" && (
              <div className="as-status-bar success">
                <span>✓</span> Show added successfully!
              </div>
            )}
            {status === "error" && (
              <div className="as-status-bar error">
                <span>✕</span> {errorMsg}
              </div>
            )}

            {/* Submit */}
            <button
              className="as-submit-btn"
              onClick={handleSubmit}
              disabled={status === "loading"}
            >
              {ripple && <span className="as-ripple-ring" />}
              {status === "loading" ? (
                <><span className="as-spinner" />Scheduling Show…</>
              ) : (
                "Schedule Show"
              )}
            </button>
          </div>

          <div className="as-footer">
            <span className="as-footer-meta">MovieAlert Admin v1.0</span>
            <span className="as-footer-endpoint">POST /api/show</span>
          </div>
        </div>
      </div>
    </div>
  );
}