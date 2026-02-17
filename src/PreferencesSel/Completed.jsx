import { useEffect, useState } from "react";

function Completed() {
  const [completedPrefs, setCompletedPrefs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch("https://moviealert-26ig.onrender.com/api/preferences/completed", {
      headers: {
        Authorization: `Bearer ${token}`
      }
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
      });
  }, [token]);

  return (
    <div className="mt-4">

      {completedPrefs.length === 0 && (
        <p className="text-center mt-5">No completed preferences found</p>
      )}
      
        {completedPrefs.map((pref, index) => (
        <div key={index} className="pref-card completed">
          <p><b>Movie:</b> {pref.movieName}</p>
          <p><b>Status:</b> Watched</p>
        </div>
      ))}
        
     
      

    </div>
  );
}

export default Completed;
