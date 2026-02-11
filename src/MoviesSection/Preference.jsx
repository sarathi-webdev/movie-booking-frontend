import React from "react";
import Completed from "../PreferencesSel/Completed";

function Preference() {
  return (
    <>
    <div className="preference-section">
      <h4>Active Preferences</h4>
      <div className="pref-card active">
        <p><b>Movie:</b> Leo</p>
        <p><b>Theatre:</b> PVR, INOX</p>
        <p><b>Time:</b> 6:00 PM</p>
      </div>

      <h4 className="mt-4">Completed</h4>
      <div className="pref-card completed">
        <p><b>Movie:</b> Jailer</p>
        <p><b>Status:</b> Watched</p>
      </div>
    </div>
    {/* <Active/>
    <Completed/> */}
    </>
  );
}

export default Preference;
