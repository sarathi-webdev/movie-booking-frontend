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

  }, [token]);

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
        </div>
      ))}
    </div>
  );
}

export default ActivePreferences;