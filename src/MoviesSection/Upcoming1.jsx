import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const movie2Api = createContext();

function Upcoming() {
  const navigate = useNavigate();
  const [upcomingmovie, setUpcomingmovie] = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);

  useEffect(() => {
    fetch("https://moviealert-26ig.onrender.com/api/upcoming-movie")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        setUpcomingmovie(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(err);
        setError("Couldn't load upcoming movies.");
        setUpcomingmovie([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="upcoming-grid">
        {[...Array(4)].map((_, i) => (
          <div className="skeleton-card" key={i} style={{ borderRadius: 16, padding: 18 }}>
            <div style={{ display: "flex", gap: 14 }}>
              <div className="skeleton-poster" style={{ width: 64, height: 90, aspectRatio: "unset", borderRadius: 8 }} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                <div className="skeleton-line" />
                <div className="skeleton-line short" />
                <div className="skeleton-line short" style={{ width: "40%" }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-icon">⚠️</div>
        <p className="empty-title">Failed to load</p>
        <p className="empty-desc">{error}</p>
      </div>
    );
  }

  if (upcomingmovie.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🗓</div>
        <p className="empty-title">No upcoming movies</p>
        <p className="empty-desc">Nothing scheduled yet. Check back soon!</p>
      </div>
    );
  }

  // Format release date nicely if possible
  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <movie2Api.Provider value={{ upcomingmovie }}>

      <p className="section-label">
        {upcomingmovie.length} releasing soon
      </p>

      <div className="upcoming-grid">
        {upcomingmovie.map((movie) => (
          <div className="upcoming-card" key={movie.id}>

            {/* Poster thumb — swap img src when API provides image URL */}
            <div className="upcoming-poster-thumb">🎞️</div>

            <div className="upcoming-info">
              <h3 className="upcoming-title">{movie.title}</h3>

              <div className="upcoming-chips">
                {movie.genre    && <span className="chip">{movie.genre}</span>}
                {movie.language && <span className="chip amber">{movie.language}</span>}
              </div>

              {movie.releaseDate && (
                <div className="upcoming-release">
                  📅 {formatDate(movie.releaseDate)}
                </div>
              )}

              {/* Original navigation preserved */}
              <button
                className="btn-notify"
                onClick={() => navigate("/selectpreference/upcoming/" + movie.id)}
              >
                🔔 Set Preference
              </button>
            </div>

          </div>
        ))}
      </div>

    </movie2Api.Provider>
  );
}

export default Upcoming;
