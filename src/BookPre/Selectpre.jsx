// import { useParams } from "react-router-dom";
// import "./selectstyle.css";
// import { useState, useEffect } from "react";

// function Selectpre() {

//   const { type, id } = useParams();

//   const [gettingname, setGettingName] = useState(null);

//   const [formData, setFormData] = useState({
//     movieId: id,
//     movieName: "",
//     theatreNames: [],
//     showDates: "",
//     showTimes: []
//   });

//   const theatreList = [
//     "PVR Cinemas",
//     "INOX",
//     "AGS Cinemas",
//     "SPI Cinemas",
//     "Rohini Theatre"
//   ];

//   // Update movieId when id changes
//   useEffect(() => {
//     setFormData((prev) => ({
//       ...prev,
//       movieId: id
//     }));
//   }, [id]);

//   // 🔥 Fetch movie based on type (NOW FIXED)
//   useEffect(() => {
//     if (!id || !type) return;

//     let url = "";

//     if (type === "now") {
//       url = "https://moviealert-26ig.onrender.com/api/movies/theatres-shows";
//     } 
//     else if (type === "upcoming") {
//       url = "https://moviealert-26ig.onrender.com/api/upcoming-movie";
//     }

//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => {

//         const movieArray = Array.isArray(data) ? data : [];

//         const foundMovie = movieArray.find(
//           (m) => String(m.id) === String(id)
//         );

//         setGettingName(foundMovie || null);

//         if (foundMovie) {
//           setFormData((prev) => ({
//             ...prev,
//             movieName: foundMovie.title   // 🔥 use title (not name)
//           }));
//         }
//       })
//       .catch(() => setGettingName(null));

//   }, [type, id]);

//   // Theatre selection
//   const handleTheatreChange = (e) => {
//     const { value, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       theatreNames: checked
//         ? [...prev.theatreNames, value]
//         : prev.theatreNames.filter((theatre) => theatre !== value)
//     }));
//   };

//   // Time selection
//   const handleTimeChange = (e) => {
//     const { id, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       showTimes: checked
//         ? [...prev.showTimes, id]
//         : prev.showTimes.filter((time) => time !== id)
//     }));
//   };

//   // Submit
//   const handleSubmit = async () => {

//     if (
//       formData.theatreNames.length === 0 ||
//       !formData.showDates ||
//       formData.showTimes.length === 0
//     ) {
//       alert("Please select theatre, date and time");
//       return;
//     }

//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("User not logged in");
//       return;
//     }

//     try {
//       const response = await fetch(
//         "https://moviealert-26ig.onrender.com/api/preferences",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//           },
//           body: JSON.stringify({
//             movieName: formData.movieName,
//             theatreNames: formData.theatreNames,
//             showDates: [formData.showDates],
//             showTimes: formData.showTimes
//           })
//         }
//       );

//       const data = await response.text();

//       if (response.ok) {
//         alert("Preferences saved successfully");
//         console.log(data);
//       } else {
//         alert("Something went wrong");
//       }

//     } catch (error) {
//       console.error(error);
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="preference-page">
//       <div className="preference-card">

//         {/* 🔥 FIXED: Use title instead of name */}
//         <h3 className="text-center mb-4">
//           {gettingname?.title}
//         </h3>

//         {/* THEATRE */}
//         <div className="mb-4">
//           <label className="form-label">Select Theatres</label>

//           <div className="theatre-checkbox-group">
//             {theatreList.map((theatre, index) => (
//               <div className="form-check" key={index}>
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   value={theatre}
//                   id={`theatre-${index}`}
//                   onChange={handleTheatreChange}
//                 />
//                 <label
//                   className="form-check-label"
//                   htmlFor={`theatre-${index}`}
//                 >
//                   {theatre}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* DATE */}
//         <div className="mb-4">
//           <label className="form-label">Select Date Slot</label>
//           <input
//             type="date"
//             className="form-control"
//             onChange={(e) =>
//               setFormData((prev) => ({
//                 ...prev,
//                 showDates: e.target.value
//               }))
//             }
//           />
//         </div>

//         {/* TIME */}
//         <div className="mb-4">
//           <label className="form-label">Select Time Slot</label>

//           <div className="time-slots">
//             {["09:00", "12:00", "03:00", "06:00"].map((time) => (
//               <div key={time}>
//                 <input
//                   type="checkbox"
//                   id={time}
//                   onChange={handleTimeChange}
//                 />
//                 <label htmlFor={time}>{time}</label>
//               </div>
//             ))}
//           </div>
//         </div>

//         <button
//           className="btn btn-success w-100"
//           onClick={handleSubmit}
//         >
//           Continue
//         </button>

//       </div>
//     </div>
//   );
// }

// export default Selectpre;
import { useParams } from "react-router-dom";
import "./selectstyle.css";
import { useState, useEffect } from "react";

function Selectpre() {
  const { type, id } = useParams();

  const [gettingname, setGettingName] = useState(null);

  const [formData, setFormData] = useState({
    movieId: id,
    movieName: "",
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

  // Update movieId when id changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      movieId: id
    }));
  }, [id]);

  // ✅ FETCH MOVIE BASED ON TYPE
  useEffect(() => {
    if (!id || !type) return;

    let url = "";

    if (type === "now") {
      url = "https://moviealert-26ig.onrender.com/api/movies/theatres-shows";
    } else if (type === "upcoming") {
      url = "https://moviealert-26ig.onrender.com/api/upcoming-movie";
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        let movieArray = [];

        // 🔥 Handle different response structures
        if (type === "now") {
          movieArray = data?.theatre || [];
        } else {
          movieArray = Array.isArray(data) ? data : [];
        }

        const foundMovie = movieArray.find(
          (m) => String(m.id) === String(id)
        );

        if (foundMovie) {
          setGettingName(foundMovie);

          setFormData((prev) => ({
            ...prev,
            movieName: foundMovie.name || foundMovie.title
          }));
        } else {
          setGettingName(null);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setGettingName(null);
      });

  }, [type, id]);

  // THEATRE SELECTION
  const handleTheatreChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      theatreNames: checked
        ? [...prev.theatreNames, value]
        : prev.theatreNames.filter((theatre) => theatre !== value)
    }));
  };

  // TIME SELECTION
  const handleTimeChange = (e) => {
    const { id, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      showTimes: checked
        ? [...prev.showTimes, id]
        : prev.showTimes.filter((time) => time !== id)
    }));
  };

  // SUBMIT
  const handleSubmit = async () => {
    if (
      formData.theatreNames.length === 0 ||
      !formData.showDates ||
      formData.showTimes.length === 0
    ) {
      alert("Please select theatre, date and time");
      return;
    }

    const token = localStorage.getItem("token");

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
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            movieName: formData.movieName,
            theatreNames: formData.theatreNames,
            showDates: [formData.showDates],
            showTimes: formData.showTimes
          })
        }
      );

      if (response.ok) {
        alert("Preferences saved successfully");
      } else {
        alert("Something went wrong");
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="preference-page">
      <div className="preference-card">

        {/* ✅ Movie Title Display */}
        <h3 className="text-center mb-4">
          {gettingname
            ? gettingname.name || gettingname.title
            : "Loading..."}
        </h3>

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
                showDates: e.target.value
              }))
            }
          />
        </div>

        {/* TIME */}
        <div className="mb-4">
          <label className="form-label">Select Time Slot</label>

          <div className="time-slots">
            {["09:00", "12:00", "03:00", "06:00"].map((time) => (
              <div key={time}>
                <input
                  type="checkbox"
                  id={time}
                  onChange={handleTimeChange}
                />
                <label htmlFor={time}>{time}</label>
              </div>
            ))}
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



