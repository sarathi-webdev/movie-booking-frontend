import { useParams } from "react-router-dom";
import "./selectstyle.css";
import { useState, useEffect } from "react";

function Selectpre() {
  const { id } = useParams();

  const [gettingname, setGettingName] = useState(null);

  const [formData, setFormData] = useState({
    movieId: id,
    movieName: name,
    theatreNames: [],
    showDates: "",
    showTimes: []
  });

  const theatreList = [
    "PVR Cinemas",
    "INOX",
    "AGS Cinemas",
    "SPI Cinemas",
    "Rohini Theatre"
  ];

  // ✅ Update movieId when id changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      movieId: id
    }));
  }, [id]);

  // ✅ Fetch movie name
  useEffect(() => {
    if (!id) return;

    fetch("https://moviealert-26ig.onrender.com/api/movies/theatres-shows")
      .then((res) => res.json())
      .then((data) => {
        const movieArray = Array.isArray(data) ? data : data.theatre;

        const foundMovie = movieArray?.find(
          (m) => String(m.id) === String(id)
        );

        setGettingName(foundMovie || null);
      })
      .catch(() => setGettingName(null));
  }, [id]);

  // ✅ Theatre selection
  const handleTheatreChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      theatres: checked
        ? [...prev.theatres, value]
        : prev.theatres.filter((theatre) => theatre !== value)
    }));
  };

  // ✅ Time selection
  const handleTimeChange = (e) => {
    const { id, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      times: checked
        ? [...prev.times, id]
        : prev.times.filter((time) => time !== id)
    }));
  };

  // ✅ Submit
  const handleSubmit = async () => {
    console.log("FORM DATA:", formData);

    if (
      formData.theatres.length === 0 ||
      !formData.date ||
      formData.times.length === 0
    ) {
      alert("Please select theatre, date and time");
      return;
    }
    

    
   const token = localStorage.getItem("token"); // ✅ get token

   
    if (!token) {
      alert("User not logged in");
      return;

    }

    try {
      const response = await fetch(
        "https://moviealert-26ig.onrender.com/api/preferences",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Preferences saved successfully");
        console.log(data);
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="preference-page">
      <div className="preference-card">
        <h3 className="text-center mb-4">{gettingname?.name}</h3>

        {/* THEATRE */}
        <div className="mb-4">
          <label className="form-label">Select Theatres</label>

          <div className="theatre-checkbox-group">
            {theatreList.map((theatre, index) => (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={theatre}
                  id={`theatre-${index}`}
                  onChange={handleTheatreChange}
                />
                <label
                  className="form-check-label"
                  htmlFor={`theatre-${index}`}
                >
                  {theatre}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* DATE */}
        <div className="mb-4">
          <label className="form-label">Select Date Slot</label>
          <input
            type="date"
            className="form-control"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                date: e.target.value
              }))
            }
          />
        </div>

        {/* TIME */}
        <div className="mb-4">
          <label className="form-label">Select Time Slot</label>

          <div className="time-slots">
            <input
              type="checkbox"
              id="09:00"
              onChange={handleTimeChange}
            />
            <label htmlFor="09:00">09:00</label>

            <input
              type="checkbox"
              id="12:00"
              onChange={handleTimeChange}
            />
            <label htmlFor="12:00">12:00</label>

            <input
              type="checkbox"
              id="03:00"
              onChange={handleTimeChange}
            />
            <label htmlFor="03:00">03:00</label>

            <input
              type="checkbox"
              id="06:00"
              onChange={handleTimeChange}
            />
            <label htmlFor="06:00">06:00</label>
          </div>
        </div>

        <button
          className="btn btn-success w-100"
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default Selectpre;


