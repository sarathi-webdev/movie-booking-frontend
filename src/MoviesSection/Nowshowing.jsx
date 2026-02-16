import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const movieApi = createContext();

function NowShowing() {
  const navigate = useNavigate();
  const [moviecard, setMoviecard] = useState([]);

  useEffect(() => {
    fetch("https://moviealert-26ig.onrender.com/api/movies/theatres-shows")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        // console.log("API RESPONSE:", data);

        // ✅ CORRECT: array is inside data.theatre
        if (data?.theatre && Array.isArray(data.theatre)) {
          setMoviecard(
            data.theatre.map((movie) => ({
              id: movie.id,
              name: movie.name,
            }))
          );
        } else {
          setMoviecard([]);
        }
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setMoviecard([]);
      });
  }, []);

  return (
    <movieApi.Provider value={{ moviecard }}>
      <div className="movie-grid">
        {moviecard.map((movie) => (
          <div
            className="movie-card d-flex flex-column justify-content-between"
            key={movie.id}
          >
            {/* ✅ YOUR DESIGN UNCHANGED */}
            <div>
              <h4 className="mt-4">{movie.name}</h4>
              {/* optional debug */}
              {/* <small>ID: {movie.id}</small> */}
            </div>

            <div className="prefrenece-nav">
              <button
                className="btn btn-success w-100 mb-1"
                onClick={() => navigate("/theatres/" + movie.id)}
              >
                Book Now
              </button>

              <button
                className="btn btn-primary w-100 mb-1"
                onClick={() =>
                  navigate("/selectpreference/now/" + movie.id)
                }
              >
                Select Preference
              </button>
            </div>
          </div>
        ))}

        {moviecard.length === 0 && (
          <p style={{ color: "white" }}>No movies available</p>
        )}
      </div>
    </movieApi.Provider>
  );
}

export default NowShowing;






