// import React, { useState } from "react";
// import Completed from "../PreferencesSel/Completed";
// import Active from "../PreferencesSel/Active";

// function Preference() {

//   const [tab1, setTab1] = useState("Active preferences"); // ✅ default selected

//   return (
//     <div className="preference-container">
//     <div>
//        <div className="preference-tabs">
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

//       <div className="preference-content">
//         {tab1 === "Active preferences" && <Active />}
//         {tab1 === "Completed" && <Completed />}
//       </div>

//     </div>
     
//     </div>
//   );
// }

// export default Preference;
import React, { useState } from "react";
import Completed from "../PreferencesSel/Completed";
import Active from "../PreferencesSel/Active";

function Preference() {

  const [tab1, setTab1] = useState("active");

  return (
    <div className="preference-container">
    
      <div className="preference-tabs ">
        <button
          className={tab1 === "active" ? "active" : ""}
          onClick={() => setTab1("active")}
        >
          Active preferences
        </button>

        <button
          className={tab1 === "completed" ? "active" : ""}
          onClick={() => setTab1("completed")}
        >
          Completed
        </button>
      </div>

      <div className="preference-content">
        {tab1 === "active" && <Active />}
        {tab1 === "completed" && <Completed />}
      </div>
   
      

    </div>
  );
}

export default Preference;


