import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./theatre.css";

function TheatreList() {
  const { id } = useParams(); // movie id from route
  const [movie, setMovie] = useState(null);
  const [selectedDate, setSelectedDate] = useState(0);

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

        // ✅ FIND movie by id
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
      });
  }, [id]);

  // ⛑️ SAFETY
  if (!movie || !movie.dates || movie.dates.length === 0) {
    return <p style={{ color: "white" }}>Loading theatres...</p>;
  }

  const currentDate = movie.dates[selectedDate];

  return (
    <div className="container container1">
      <div className="theatreshow w-100 h-100 m-4">
        {/* MOVIE NAME */}
        <h3>{movie.name}</h3>

        {/* DATE BAR */}
        <div className="d-flex date-bar mt-4 mb-3">
          {movie.dates.map((d, index) => (
            <div
              key={index}
              className={`date-box ${selectedDate === index ? "active" : ""}`}
              onClick={() => setSelectedDate(index)}
            >
              <small className="mb-2">{d.day}</small>
              <h5 className="mb-2">{d.date}</h5>
              <small className="">{d.label}</small>
            </div>
          ))}
        </div>

        {/* THEATRES */}
        <div className="theatre-cards">
        {currentDate.theatres.map((theatre) => (
         
          <div key={theatre.id} className="theatre-card mt-2" >
            <h6>{theatre.name}</h6>

            {theatre.times.map((time, i) => (
              <button key={i} className="btn time-btn">
                {time}
              </button>
            ))}

            <hr />
          </div>
         
         
        ))}
         </div>
        
      </div>
    </div>
  );
}

export default TheatreList;











