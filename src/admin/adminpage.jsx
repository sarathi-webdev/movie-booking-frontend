import React, { useState } from "react";
import "./admin.css";
import '../MoviesSection/Nowshowing1'

function AdminDashboard({ movies, setMovies }) {
  const [form, setForm] = useState({
    title: "",
    language: "",
    releaseDate: "",
  });

  const [editingIndex, setEditingIndex] = useState(null);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update movie
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title) return;

    if (editingIndex !== null) {
      const updated = [...movies];
      updated[editingIndex] = form;
      setMovies(updated);
      setEditingIndex(null);
    } else {
      setMovies([...movies, form]);
    }

    setForm({ title: "", language: "", releaseDate: "" });
  };

  // Edit movie
  const handleEdit = (index) => {
    setForm(movies[index]);
    setEditingIndex(index);
  };

  // Delete movie
  const handleDelete = (index) => {
    const updated = movies.filter((_, i) => i !== index);
    setMovies(updated);
  };
   console.log(movies)

  return (
    <div className="admin-container">

      <h2 className="admin-title">🔐 Admin Dashboard</h2>

      {/* ── Add / Edit Form ── */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          value={form.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={form.language}
          onChange={handleChange}
        />
        <input
          type="date"
          name="releaseDate"
          value={form.releaseDate}
          onChange={handleChange}
        />

        <button type="submit">
          {editingIndex !== null ? "Update Movie" : "Add Movie"}
        </button>
      </form>
      
      
      {/* ── Movie List ── */}
      <div className="admin-movie-list">

       
        {movies.length() === 0 && <p>No movies added yet</p>}

        

        {movies.map((movie, index) => (
          <div key={index} className="admin-movie-card">
            <h3>{movie.title}</h3>
            <p>{movie.language}</p>
            <p>{movie.releaseDate}</p>

            <div className="admin-actions">
              <button onClick={() => handleEdit(index)}>✏️ Edit</button>
              <button onClick={() => handleDelete(index)}>🗑 Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;