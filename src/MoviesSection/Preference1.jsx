import React, { useState } from "react";
import Completed from "../PreferencesSel/Completed1";
import Active from "../PreferencesSel/Active1";

const PREF_TABS = [
  { id: "active",    label: "Active",    icon: "🟢" },
  { id: "completed", label: "Completed", icon: "✅" },
];

function Preference() {
  const [tab1, setTab1] = useState("active");

  return (
    <div>
      {/* Pill tab switcher */}
      <div className="pref-tab-strip" role="tablist">
        {PREF_TABS.map(({ id, label, icon }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab1 === id}
            className={`pref-tab-btn${tab1 === id ? " active" : ""}`}
            onClick={() => setTab1(id)}
          >
            <span aria-hidden="true" style={{ marginRight: 6 }}>{icon}</span>
            {label}
          </button>
        ))}
      </div>

      {/* Panel — key remount triggers fadeUp */}
      <div role="tabpanel" key={tab1}>
        {tab1 === "active"    && <Active />}
        {tab1 === "completed" && <Completed />}
      </div>
    </div>
  );
}

export default Preference;
