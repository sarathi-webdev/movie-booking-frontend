import React, { createContext, useEffect, useState } from "react";
import { useNavigate, } from "react-router-dom";
import { movieApi } from "./Nowshowing";
import { useContext } from "react";

const times = ["9:00", "12:00", "3:00", "6:00", "8:00", "10:00"];

export const movie2Api = createContext()

function Upcoming() {

  const navigate = useNavigate();

  

  const [upcomingmovie,setUpcomingmovie] = useState([])

      useEffect(()=>{
         fetch('http://localhost:3000/upcomingmovie').
      then(data => data.json()).
      then(data => setUpcomingmovie(data)).
      catch((err)=>console.log(err))
      },[])
      
  
      
  if(!upcomingmovie)
  {
    return <></>
  }
  
  
  return (
    <movie2Api.Provider value={{upcomingmovie}}>
    <div className="movie-grid">
      {upcomingmovie.map((movie) => (
        <div className="movie-card upcoming d-flex flex-column justify-content-evenly" key={movie.id}>
          {/* <img className="rounded-top" src={movie.image} alt=""></img> */}
          <h4 className="">{movie.name}</h4>
          

          {/* <div className="timings">
            {times.map((time) => (
              <span key={time}>{time}</span>
            ))}
          </div> */}
          <button className="btn btn-primary w-100" onClick={()=> navigate('/selectpreference/'+movie.id)}>
            Select Prefrence
          </button>
        </div>
      ))}
    </div>
    </movie2Api.Provider>
  );
}

export default Upcoming;
