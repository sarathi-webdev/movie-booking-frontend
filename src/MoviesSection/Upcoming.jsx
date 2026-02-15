// import React, { createContext, useEffect, useState } from "react";
// import { useNavigate, } from "react-router-dom";
// import { movieApi } from "./Nowshowing";
// import { useContext } from "react";

// const times = ["9:00", "12:00", "3:00", "6:00", "8:00", "10:00"];

// export const movie2Api = createContext()

// function Upcoming() {

//   const navigate = useNavigate();

  

//   const [upcomingmovie,setUpcomingmovie] = useState([])

//       useEffect(()=>{
//          fetch('http://localhost:3000/upcomingmovie').
//       then(data => data.json()).
//       then(data => setUpcomingmovie(data)).
//       catch((err)=>console.log(err))
//       },[])
      
  
      
//   if(!upcomingmovie)
//   {
//     return <></>
//   }
  
  
//   return (
//     <movie2Api.Provider value={{upcomingmovie}}>
//     <div className="movie-grid">
//       {upcomingmovie.map((movie) => (
//         <div className="movie-card upcoming d-flex flex-column justify-content-evenly" key={movie.id}>
//           <h4 className="">{movie.name}</h4>
          

//           <button className="btn btn-primary w-100" onClick={()=> navigate('/selectpreference/'+movie.id)}>
//             Select Prefrence
//           </button>
//         </div>
//       ))}
//     </div>
//     </movie2Api.Provider>
//   );
// }

// export default Upcoming;
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const movie2Api = createContext();

function Upcoming() {

  const navigate = useNavigate();
  const [upcomingmovie, setUpcomingmovie] = useState([]);

  useEffect(() => {
    fetch("https://moviealert-26ig.onrender.com/api/upcoming-movie")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUpcomingmovie(data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (upcomingmovie.length === 0) {
    return <p>No upcoming movies found</p>;
  }

  return (
    <movie2Api.Provider value={{ upcomingmovie }}>
      <div className="movie-grid">
        {upcomingmovie.map((movie) => (
          <div
            className="movie-card upcoming"
            key={movie._id}
          >
            <h4 className="mt-2">{movie.title || movie.name}</h4>
            <div className="d-flex flex-column m-2">
            <small><strong>Release Date:</strong> {movie.releaseDate}</small>
            <small><strong>Language:</strong> {movie.language}</small>
            <small><strong>Genre:</strong> {movie.genre}</small>
            </div>
            <button
              className="btn btn-primary w-100 mb-1"
              onClick={() =>
                navigate("/selectpreference/" + movie._id)
              }
            >
              Select Preference
            </button>
          </div>
        ))}
      </div>
    </movie2Api.Provider>
  );
}

export default Upcoming;


