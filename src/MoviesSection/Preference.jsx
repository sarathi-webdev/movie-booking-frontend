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


