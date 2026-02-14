// import React,{useState}from "react";
// import Completed from "../PreferencesSel/Completed";
// import Active from "../PreferencesSel/Active";


// function Preference() {

//    const [tab1, setTab1] = useState("now");


//   return (
//     <>
//       <div className="preference-whole">
//          <div className="Preferences-status mb-5">

//         <button
//           className={tab1 === "Active preferences" ? "active" : ""}
//           onClick={() => setTab1("Active preferences")}
//         >
//           Active preferences
//         </button>

//         <button
//           className={tab1 === "Completed" ? "active" : ""}
//           onClick={() => setTab1("Completed")}
//         >
//           Completed
//         </button>
//       </div>

//       {tab1 === "Active preferences" && <Active />}
//       {tab1 === "Completed" && <Completed />}

//       </div>
     
    
//     </>
//   );
// }

// export default Preference;
import React, { useState } from "react";
import Completed from "../PreferencesSel/Completed";
import Active from "../PreferencesSel/Active";

function Preference() {

  const [tab1, setTab1] = useState("Active preferences"); // ✅ default selected

  return (
    <div className="preference-container">
    <div>
       <div className="preference-tabs">
        <button
          className={tab1 === "Active preferences" ? "active" : ""}
          onClick={() => setTab1("Active preferences")}
        >
          Active preferences
        </button>

        <button
          className={tab1 === "Completed" ? "active" : ""}
          onClick={() => setTab1("Completed")}
        >
          Completed
        </button>
      </div>

      <div className="preference-content">
        {tab1 === "Active preferences" && <Active />}
        {tab1 === "Completed" && <Completed />}
      </div>

    </div>
     
    </div>
  );
}

export default Preference;

