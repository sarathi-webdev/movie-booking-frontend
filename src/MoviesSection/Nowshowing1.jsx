import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const movieApi = createContext();

// Skeleton placeholder while loading
function SkeletonCards() {
  return (
    <div className="skeleton-grid">
      {[...Array(6)].map((_, i) => (
        <div className="skeleton-card" key={i}>
          <div className="skeleton-poster" />
          <div className="skeleton-body">
            <div className="skeleton-line" />
            <div className="skeleton-line short" />
            <div className="skeleton-line btn" />
            <div className="skeleton-line btn" />
          </div>
        </div>
      ))}
    </div>
  );
}

function NowShowing() {
  const navigate = useNavigate();
  const [moviecard, setMoviecard] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    fetch("https://moviealert-26ig.onrender.com/api/movies/theatres-shows")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        if (data?.theatre && Array.isArray(data.theatre)) {
          setMoviecard(
            data.theatre.map((movie) => ({
              id:   movie.id,
              name: movie.name,
            }))
          );
        } else {
          setMoviecard([]);
        }
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setError("Couldn't load movies. Please try again.");
        setMoviecard([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <SkeletonCards />;

  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-icon">⚠️</div>
        <p className="empty-title">Something went wrong</p>
        <p className="empty-desc">{error}</p>
      </div>
    );
  }

  if (moviecard.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🎭</div>
        <p className="empty-title">No movies showing</p>
        <p className="empty-desc">Check back soon for new releases in your area.</p>
      </div>
    );
  }

  return (
    <movieApi.Provider value={{ moviecard }}>

      <p className="section-label">
        {moviecard.length} films available
      </p>

      <div className="movie-grid">
        {moviecard.map((movie) => (
          <div className="movie-card" key={movie.id}>

            {/* Poster placeholder (swap src for real poster when API provides it) */}
            <div className="movie-poster">
              <div className="movie-poster-overlay" />
              <span className="movie-poster-badge">Now Playing</span>
            </div>

            {/* Card body */}
            <div className="movie-card-body">
              <h3 className="movie-card-title">{movie.name}</h3>

              <div className="movie-card-meta">
                <span>2h 15m</span>
                <span className="meta-dot" />
                <span>Action</span>
                <span className="meta-dot" />
                <span>U/A</span>
              </div>

              {/* Actions — original navigation logic preserved exactly */}
              <div className="movie-card-actions">
                <button
                  className="btn-book"
                  onClick={() => navigate("/theatres/" + movie.id)}
                >
                  Book Now
                </button>

                <button
                  className="btn-pref"
                  onClick={() => navigate("/selectpreference/now/" + movie.id)}
                >
                  + Add Preference
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </movieApi.Provider>
  );
}

export default NowShowing;
