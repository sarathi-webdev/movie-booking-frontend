import React from 'react'
import { useState } from "react";
import './form.css'

const Form = () => {
  const [formData, setFormData] = useState({
    movieName: "",
    theatres: [],
    timing: ""
  });

  const theatreList = [
    "PVR Cinemas",
    "INOX",
    "AGS Cinemas",
    "SPI Cinemas",
    "Rohini Theatre"
  ];

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData({
        ...formData,
        theatres: [...formData.theatres, value]
      });
    } else {
      setFormData({
        ...formData,
        theatres: formData.theatres.filter(
          (theatre) => theatre !== value
        )
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="Form-container">
      <form className="movie-form p-4" onSubmit={handleSubmit}>
        <h4 className="mb-4">Adding Movies</h4>

        {/* Image upload (optional) */}
        <div className="mb-3">
          <label className="form-label">Movie Poster (optional)</label>
          <input type="file" className="form-control" />
        </div>

        {/* Movie name */}
        <div className="mb-3">
          <label className="form-label">Movie Name</label>
          <input
            type="text"
            name="movieName"
            className="form-control"
            placeholder="Enter movie name"
            value={formData.movieName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Theatre checkboxes */}
        <div className="mb-3">
          <label className="form-label">Select Theatres</label>
          <div className="theatre-checkbox-group">
            {theatreList.map((theatre, index) => (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={theatre}
                  id={`theatre-${index}`}
                  onChange={handleCheckboxChange}
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

        {/*DATE */}
        <div className="mb-4">
          <label className="form-label">Select Date Slot</label>

          <div>
            <input type="date"></input>
          </div>
          </div>

        {/* Timing */}
        <div className="mb-4">
          <label className="form-label">Show Timing</label>
          <input
            type="time"
            name="timing"
            className="form-control"
            value={formData.timing}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
