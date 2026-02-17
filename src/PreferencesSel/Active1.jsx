import { useEffect, useState } from "react";
import "./preferences.css";

/* ── helpers ────────────────────────────────── */
function formatDate(raw) {
  if (!raw) return null;
  try {
    return new Date(raw).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });
  } catch { return raw; }
}

/* ── Skeleton card ───────────────────────────── */
function SkeletonPrefCard() {
  return (
    <div className="pref-skeleton-card">
      <div className="pref-sk-line" style={{ width: "55%", height: 16 }} />
      <div className="pref-sk-line" style={{ width: "80%", height: 12 }} />
      <div className="pref-sk-line" style={{ width: "45%", height: 12 }} />
      <div className="pref-sk-line pref-sk-btn" />
    </div>
  );
}

/* ── Main component ──────────────────────────── */
function ActivePreferences() {
  const [preferences, setPreferences] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [completing,  setCompleting]  = useState(null); // id of item being completed
  const [toast,       setToast]       = useState(null); // { msg, type }

  const token = localStorage.getItem("token");

  /* ── fetch helper (same logic, extracted cleanly) ── */
  const fetchActivePreferences = () => {
    if (!token) return;
    fetch("https://moviealert-26ig.onrender.com/api/preferences/active", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        setPreferences(Array.isArray(data) ? data : [data]);
      })
      .catch(() => setPreferences([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchActivePreferences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  /* ── complete handler (same PUT logic, same body) ── */
  const handleComplete = async (prefId) => {
    setCompleting(prefId);
    try {
      const response = await fetch(
        "https://moviealert-26ig.onrender.com/api/complete",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ids: [prefId] }),
        }
      );

      const message = await response.text();
      console.log("Server response:", message);

      if (!response.ok) throw new Error("Failed");

      // Remove from active list immediately
      setPreferences((prev) => prev.filter((p) => p._id !== prefId));
      showToast("Marked as completed! 🎉", "success");
      fetchActivePreferences();
    } catch (err) {
      console.error(err);
      showToast("Couldn't complete this preference.", "error");
    } finally {
      setCompleting(null);
    }
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  /* ── render ─────────────────────────────────── */
  if (!token) {
    return (
      <div className="pref-empty">
        <span className="pref-empty-icon">🔒</span>
        <p className="pref-empty-title">Not signed in</p>
        <p className="pref-empty-desc">Please log in to view your preferences.</p>
      </div>
    );
  }

  return (
    <div className="pref-panel">

      {/* ── Toast notification ── */}
      {toast && (
        <div className={`pref-toast pref-toast--${toast.type}`}>
          {toast.type === "success" ? "✅" : "⚠️"} {toast.msg}
        </div>
      )}

      {/* ── Loading skeletons ── */}
      {loading && (
        <div className="pref-list">
          {[...Array(3)].map((_, i) => <SkeletonPrefCard key={i} />)}
        </div>
      )}

      {/* ── Empty state ── */}
      {!loading && preferences.length === 0 && (
        <div className="pref-empty">
          <span className="pref-empty-icon">🎯</span>
          <p className="pref-empty-title">No active preferences</p>
          <p className="pref-empty-desc">
            Set preferences from Now Showing or Upcoming to get notified.
          </p>
        </div>
      )}

      {/* ── Preference cards ── */}
      {!loading && preferences.length > 0 && (
        <>
          <p className="pref-count">{preferences.length} active alert{preferences.length !== 1 ? "s" : ""}</p>

          <div className="pref-list">
            {preferences.map((pref, index) => (
              <div
                className="pref-card pref-card--active"
                key={pref._id ?? index}
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                {/* Status pill */}
                <div className="pref-card-header">
                  <span className="pref-status-pill pref-status-pill--active">
                    <span className="pref-status-dot" />
                    Active
                  </span>
                  <span className="pref-card-id">#{index + 1}</span>
                </div>

                {/* Movie name */}
                <h3 className="pref-card-title">{pref.movieName ?? "—"}</h3>

                {/* Details grid */}
                <div className="pref-details">
                  {pref.theatreNames?.length > 0 && (
                    <div className="pref-detail-row">
                      <span className="pref-detail-icon">🎭</span>
                      <div>
                        <span className="pref-detail-label">Theatres</span>
                        <span className="pref-detail-value">
                          {pref.theatreNames.join(", ")}
                        </span>
                      </div>
                    </div>
                  )}

                  {pref.showDate && (
                    <div className="pref-detail-row">
                      <span className="pref-detail-icon">📅</span>
                      <div>
                        <span className="pref-detail-label">Date</span>
                        <span className="pref-detail-value">
                          {formatDate(pref.showDate)}
                        </span>
                      </div>
                    </div>
                  )}

                  {pref.showTimes?.length > 0 && (
                    <div className="pref-detail-row">
                      <span className="pref-detail-icon">🕐</span>
                      <div>
                        <span className="pref-detail-label">Showtimes</span>
                        <div className="pref-chips">
                          {pref.showTimes.map((t, i) => (
                            <span className="pref-chip" key={i}>{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Complete button */}
                <button
                  className={`pref-btn-complete${completing === pref._id ? " pref-btn--loading" : ""}`}
                  onClick={() => handleComplete(pref._id)}
                  disabled={completing === pref._id}
                >
                  {completing === pref._id ? (
                    <><span className="pref-spinner" /> Completing…</>
                  ) : (
                    <>✓ Mark as Watched</>
                  )}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ActivePreferences;
