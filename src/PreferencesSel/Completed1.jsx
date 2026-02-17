import { useEffect, useState } from "react";
import "./preferences.css";

function formatDate(raw) {
  if (!raw) return null;
  try {
    return new Date(raw).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });
  } catch { return raw; }
}

function SkeletonPrefCard() {
  return (
    <div className="pref-skeleton-card">
      <div className="pref-sk-line" style={{ width: "55%", height: 16 }} />
      <div className="pref-sk-line" style={{ width: "80%", height: 12 }} />
      <div className="pref-sk-line" style={{ width: "45%", height: 12 }} />
    </div>
  );
}

function Completed() {
  const [completedPrefs, setCompletedPrefs] = useState([]);
  const [loading,        setLoading]        = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) { setLoading(false); return; }

    fetch("https://moviealert-26ig.onrender.com/api/preferences/completed", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setCompletedPrefs(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Completed fetch error:", err);
        setCompletedPrefs([]);
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (!token) {
    return (
      <div className="pref-empty">
        <span className="pref-empty-icon">🔒</span>
        <p className="pref-empty-title">Not signed in</p>
        <p className="pref-empty-desc">Please log in to view completed preferences.</p>
      </div>
    );
  }

  return (
    <div className="pref-panel">

      {/* Loading */}
      {loading && (
        <div className="pref-list">
          {[...Array(3)].map((_, i) => <SkeletonPrefCard key={i} />)}
        </div>
      )}

      {/* Empty */}
      {!loading && completedPrefs.length === 0 && (
        <div className="pref-empty">
          <span className="pref-empty-icon">🎟️</span>
          <p className="pref-empty-title">Nothing watched yet</p>
          <p className="pref-empty-desc">
            Movies you've marked as watched will appear here.
          </p>
        </div>
      )}

      {/* Cards */}
      {!loading && completedPrefs.length > 0 && (
        <>
          <p className="pref-count">{completedPrefs.length} watched</p>

          <div className="pref-list">
            {completedPrefs.map((pref, index) => (
              <div
                className="pref-card pref-card--completed"
                key={pref._id ?? index}
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                {/* Header row */}
                <div className="pref-card-header">
                  <span className="pref-status-pill pref-status-pill--completed">
                    <span className="pref-status-dot pref-status-dot--done" />
                    Watched
                  </span>
                  {pref.showDate && (
                    <span className="pref-card-date">
                      {formatDate(pref.showDate)}
                    </span>
                  )}
                </div>

                {/* Movie name */}
                <h3 className="pref-card-title">{pref.movieName ?? "—"}</h3>

                {/* Details */}
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

                  {pref.showTimes?.length > 0 && (
                    <div className="pref-detail-row">
                      <span className="pref-detail-icon">🕐</span>
                      <div>
                        <span className="pref-detail-label">Showtime</span>
                        <div className="pref-chips">
                          {pref.showTimes.map((t, i) => (
                            <span className="pref-chip pref-chip--muted" key={i}>{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Rating prompt — optional, harmless if backend doesn't support it */}
                <div className="pref-rating-row">
                  <span className="pref-detail-label">Rate it</span>
                  <div className="pref-stars">
                    {[1,2,3,4,5].map((s) => (
                      <span key={s} className="pref-star">☆</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Completed;
