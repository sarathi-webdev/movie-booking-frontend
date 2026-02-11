import { useParams } from "react-router-dom";
import "./select.css";
import { useState,useEffect } from "react";

function Selectpre() {
  const { id } = useParams();

  const [gettingname,setGettingName] = useState(null)

  const theatreList = [
    "PVR Cinemas",
    "INOX",
    "AGS Cinemas",
    "SPI Cinemas",
    "Rohini Theatre",
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
 
        useEffect(()=>{
        //   fetch('https://unskillful-serendipitously-vanetta.ngrok-free.dev/api/movies'+id,{
        //   headers: {
        //     "ngrok-skip-browser-warning": "true"
        //       }
        //  }).

          
        //   then(res => res.json()).
        //   then(data => setGettingName(data)).
        //   catch((err)=>console.log("Error dai yeh da ippadi pandra"))

         
              fetch('http://localhost:3000/movies/'+id).
              then(res => res.json()).
              then(data => setGettingName(data)).
              catch((err)=>console.log(err))
           

         
         fetch('http://localhost:3000/upcomingmovie/'+id).
                then(data => data.json()).
                then(data => setGettingName(data)).
                catch((err)=>console.log(err))
                
          },[id])
      
     return (
    <>(<div className=" preference-page">
      <div className="preference-card">
        <h3 className="text-center mb-4">{gettingname?.name}</h3>
      
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


        {/* Timing Selection */}
        <div className="mb-4">
          <label className="form-label">Select Time Slot</label>

         <div className="time-slots">
  <input type="checkbox" id="t1" />
  <label htmlFor="t1">09:00</label>

  <input type="checkbox" id="t2" />
  <label htmlFor="t2">12:00</label>

  <input type="checkbox" id="t3" />
  <label htmlFor="t3">03:00</label>

  <input type="checkbox" id="t4" />
  <label htmlFor="t4">06:00</label>
</div>

        

 
        </div>

        <button className="btn btn-success w-100">
          Continue
        </button>
      </div>
    </div>) 
      
    
    </>
   
   
  );
}

export default Selectpre;
