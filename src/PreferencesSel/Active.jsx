import { useEffect, useState } from "react";

function ActivePreferences() {
  const [preferences, setPreferences] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch("https://moviealert-26ig.onrender.com/api/preferences/active", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        console.log("STATUS:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("ACTIVE DATA:", data);
        console.log("TOKEN:", token);

        // If backend returns array
        if (Array.isArray(data)) {
          setPreferences(data);
        } else {
          // If backend returns single object
          setPreferences([data]);


        }
      })
      .catch((err) => {
        console.error("Error:", err);
        setPreferences([]);
      });

    if (!token) return;
    fetchActivePreferences();


  }, [token]);

  const handleComplete = async (prefId) => {
    try {
      const response = await fetch(
        "https://moviealert-26ig.onrender.com/api/complete",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ ids: [prefId] })
        }
      );

      
      const message = await response.text();
    console.log("Server response:", message);

      if (!response.ok) throw new Error("Failed");

      fetchActivePreferences();

      // Remove completed item from active UI
      setPreferences((prev) =>
        prev.filter((pref) => pref.id !== prefId)
      );
      console.log("sent data to completed")

    } catch (error) {
      console.error(error);
      alert("Error completing preference");
    }
  };

  const fetchActivePreferences = () => {
    fetch("https://moviealert-26ig.onrender.com/api/preferences/active", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setPreferences(Array.isArray(data) ? data : []);
      })
      .catch(() => setPreferences([]));
  };




  return (
    <div className="mt-4">

      {preferences.length === 0 && (
        <p className="text-black mt-5 text-center">No active preferences found</p>
      )}

      {preferences.map((pref, index) => (
        <div
          key={index}
          className="card mb-3 p-3 shadow-sm"
        >
          <h5>{pref.movieName}</h5>

          <p>
            <strong>Theatres:</strong>{" "}
            {pref.theatreNames?.join(", ")}
          </p>


          <p>
            <strong>Date:</strong>{" "}
            {pref.showDate}
          </p>


          <p>
            <strong>Time:</strong>{" "}
            {pref.showTimes?.join(", ")}
          </p>

          <button
            className="btn btn-success"
            onClick={() => handleComplete(pref._id)}
          >
            Complete
          </button>

        </div>
      ))}
    </div>
  );
}

export default ActivePreferences;