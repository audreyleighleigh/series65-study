import { useState } from "react";

const PASSWORD = "series65";
function loadUnlocked() {
  try { return sessionStorage.getItem("s65-unlocked") === "true"; } catch { return false; }
}

const EXAM_DATE = new Date("2026-04-04");

function daysLeft() {
  const diff = EXAM_DATE - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

// Steps required for a unit to be "complete"
const REQUIRED = ["read", "quiz1", "quiz2", "checkpoint"];

const STEPS = [
  { id: "read",       label: "Read / Speechify" },
  { id: "quiz1",      label: "Quiz 1 — score >90%" },
  { id: "quiz2",      label: "Quiz 2 — score >90%" },
  { id: "checkpoint", label: "Checkpoint exam attempted" },
  { id: "visual",     label: "Visual map drawn", bonus: true },
];

// Color groups by rough topic area (can be updated when unit names are known)
const GROUP_COLORS = ["#E8C547", "#E8C547", "#E8C547", "#E8C547", "#E8C547", "#E8C547",
                      "#7EC8A4", "#7EC8A4", "#7EC8A4", "#7EC8A4", "#7EC8A4", "#7EC8A4",
                      "#A78BF5", "#A78BF5", "#A78BF5", "#A78BF5", "#A78BF5", "#A78BF5",
                      "#F2A65A", "#F2A65A", "#F2A65A", "#F2A65A", "#F2A65A", "#F2A65A"];

const UNITS = Array.from({ length: 24 }, (_, i) => ({
  id: `u${String(i + 1).padStart(2, "0")}`,
  num: i + 1,
  label: `Unit ${String(i + 1).padStart(2, "0")}`,
  color: GROUP_COLORS[i],
}));

function isComplete(unitId, checked) {
  return REQUIRED.every(s => !!checked[`${unitId}-${s}`]);
}

function stepsDone(unitId, checked) {
  return STEPS.filter(s => !!checked[`${unitId}-${s.id}`]).length;
}

function DonutRing({ pct, color, size = 120, stroke = 11 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1e1c18" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`} strokeDashoffset={circ / 4}
        strokeLinecap="round" style={{ transition: "stroke-dasharray 0.6s ease" }} />
      <text x={size/2} y={size/2 + 6} textAnchor="middle" fill="#f0e8d8"
        style={{ fontFamily: "Source Code Pro, monospace", fontSize: size * 0.15, fontWeight: 600 }}>
        {pct}%
      </text>
    </svg>
  );
}

function Sidebar({ units, checked, completedCount }) {
  const pct = Math.round((completedCount / units.length) * 100);
  return (
    <div style={{ paddingTop: 48 }}>
      <div style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Overall donut */}
        <div style={{ background: "#111009", border: "1px solid #1e1c1a", borderRadius: 8, padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ fontFamily: "Source Code Pro, monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555" }}>Complete</div>
          <DonutRing pct={pct} color="#7EC8A4" size={120} stroke={11} />
          <div style={{ fontFamily: "Source Code Pro, monospace", fontSize: 11, color: "#444", textAlign: "center" }}>
            {completedCount} / {units.length} units
          </div>
        </div>

        {/* Unit grid — 4 columns of 6 */}
        <div style={{ background: "#111009", border: "1px solid #1e1c1a", borderRadius: 8, padding: "14px 12px" }}>
          <div style={{ fontFamily: "Source Code Pro, monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555", marginBottom: 10 }}>Units</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
            {units.map((unit) => {
              const done = isComplete(unit.id, checked);
              const started = stepsDone(unit.id, checked) > 0;
              return (
                <div key={unit.id} title={unit.label} style={{
                  height: 28,
                  borderRadius: 4,
                  background: done ? unit.color : started ? "#2a2826" : "#1a1816",
                  border: `1px solid ${done ? unit.color : started ? "#3a3835" : "#222"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.3s ease",
                }}>
                  <span style={{
                    fontFamily: "Source Code Pro, monospace",
                    fontSize: 9,
                    color: done ? "#0f0e0c" : started ? "#666" : "#333",
                    fontWeight: done ? 600 : 400,
                  }}>
                    {unit.num}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Countdown */}
        <div style={{ background: "#111009", border: "1px solid #1e1c1a", borderRadius: 8, padding: "14px 16px", textAlign: "center" }}>
          <div style={{ fontFamily: "Source Code Pro, monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555", marginBottom: 6 }}>Exam</div>
          <div style={{ fontFamily: "Source Code Pro, monospace", fontSize: 28, fontWeight: 600, color: daysLeft() <= 7 ? "#c0392b" : "#f0e8d8", lineHeight: 1 }}>{daysLeft()}</div>
          <div style={{ fontFamily: "Source Code Pro, monospace", fontSize: 10, color: "#444", marginTop: 4 }}>days · Apr 4</div>
        </div>

      </div>
    </div>
  );
}

export default function App() {
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem("s65-checked") || "{}"); } catch { return {}; }
  });
  const [expanded, setExpanded] = useState({ u01: true });
  const [unlocked, setUnlocked] = useState(loadUnlocked);
  const [shake, setShake] = useState(false);

  const handleLockClick = () => {
    if (unlocked) {
      sessionStorage.removeItem("s65-unlocked");
      setUnlocked(false);
    } else {
      const input = window.prompt("Password:");
      if (input === null) return;
      if (input === PASSWORD) {
        sessionStorage.setItem("s65-unlocked", "true");
        setUnlocked(true);
      } else {
        setShake(true);
        setTimeout(() => setShake(false), 600);
      }
    }
  };

  const toggle = (key) => {
    if (!unlocked) return;
    setChecked((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try { localStorage.setItem("s65-checked", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const toggleUnit = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  const completedCount = UNITS.filter(u => isComplete(u.id, checked)).length;
  const totalStepsDone = UNITS.reduce((acc, u) => acc + stepsDone(u.id, checked), 0);
  const totalSteps = UNITS.length * STEPS.length;
  const overallPct = Math.round((totalStepsDone / totalSteps) * 100);

  return (
    <div style={{ background: "#0f0e0c", minHeight: "100vh", color: "#e8e0d0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Code+Pro:wght@400;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        .layout { display: grid; grid-template-columns: 1fr 180px; gap: 0 32px; max-width: 1000px; margin: 0 auto; padding: 0 24px; }
        @media (max-width: 780px) { .layout { grid-template-columns: 1fr; } .sidebar { display: none; } }
        .wrap { padding: 48px 0 80px; }
        .eyebrow { font-family: 'Source Code Pro', monospace; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #666; margin-bottom: 8px; }
        h1 { font-family: 'Playfair Display', serif; font-size: clamp(38px, 8vw, 72px); font-weight: 900; line-height: 0.93; margin: 0 0 4px; color: #f0e8d8; letter-spacing: -0.02em; }
        h1 span { color: #7EC8A4; }
        .sub { font-family: 'Source Code Pro', monospace; font-size: 11px; color: #555; margin: 16px 0 36px; letter-spacing: 0.1em; }
        .prog-outer { background: #1e1c18; height: 5px; border-radius: 3px; margin-bottom: 6px; overflow: hidden; }
        .prog-inner { height: 100%; border-radius: 3px; background: linear-gradient(90deg, #E8C547, #7EC8A4, #A78BF5, #F2A65A); transition: width 0.4s ease; }
        .prog-label { font-family: 'Source Code Pro', monospace; font-size: 11px; color: #444; display: flex; justify-content: space-between; margin-bottom: 32px; }
        .card { margin-bottom: 4px; border: 1px solid #1e1c1a; border-radius: 6px; overflow: hidden; transition: border-color 0.2s; }
        .card:hover { border-color: #2e2c28; }
        .card-head { display: flex; align-items: center; gap: 14px; padding: 14px 18px; cursor: pointer; background: #141210; user-select: none; transition: background 0.15s; }
        .card-head:hover { background: #171410; }
        .dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
        .unit-num { font-family: 'Playfair Display', serif; font-size: 19px; font-weight: 700; color: #f0e8d8; flex: 1; }
        .badge { font-family: 'Source Code Pro', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 7px; border-radius: 3px; }
        .badge.complete { background: #1a3a2a; color: #7EC8A4; }
        .badge.inprog { background: #2a2416; color: #9a8434; }
        .step-count { font-family: 'Source Code Pro', monospace; font-size: 11px; color: #444; margin-right: 4px; }
        .chev { font-size: 9px; color: #383530; margin-left: 8px; transition: transform 0.2s; display: inline-block; }
        .chev.open { transform: rotate(180deg); }
        .card-body { background: #0c0b09; border-top: 1px solid #181614; padding: 10px 20px 16px; }
        .step { display: flex; align-items: center; gap: 12px; padding: 9px 0; border-bottom: 1px solid #161412; transition: opacity 0.15s; }
        .step.clickable { cursor: pointer; }
        .step:last-child { border-bottom: none; }
        .step.clickable:hover { opacity: 0.8; }
        .top-bar { display: flex; justify-content: flex-end; padding: 10px 24px; background: #0c0b09; border-bottom: 1px solid #1e1c1a; position: sticky; top: 0; z-index: 50; }
        .lock-btn { background: none; border: 1px solid #2a2824; border-radius: 4px; color: #555; cursor: pointer; font-family: 'Source Code Pro', monospace; font-size: 10px; letter-spacing: 0.15em; padding: 5px 10px; transition: all 0.15s; }
        .lock-btn:hover { border-color: #4a4844; color: #888; }
        .lock-btn.unlocked { color: #7EC8A4; border-color: #2a4a3a; }
        .lock-btn.shake { animation: shake 0.5s ease; }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-4px)} 40%{transform:translateX(4px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
        .step-box { width: 15px; height: 15px; border-radius: 3px; border: 1.5px solid #2e2c28; flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: all 0.15s; font-size: 9px; color: #0f0e0c; font-weight: bold; }
        .step-box.done { border-color: transparent; }
        .step-label { font-size: 13px; color: #b8b0a0; transition: all 0.2s; flex: 1; }
        .step-label.done { color: #3a3835; text-decoration: line-through; text-decoration-color: #2e2c28; }
        .bonus-tag { font-family: 'Source Code Pro', monospace; font-size: 9px; color: #444; margin-left: 6px; }
      `}</style>

      <div className="top-bar">
        <button
          className={`lock-btn ${unlocked ? "unlocked" : ""} ${shake ? "shake" : ""}`}
          onClick={handleLockClick}
          title={unlocked ? "Click to lock" : "Click to unlock editing"}
        >
          {unlocked ? "⊙ editing" : "⊘ locked"}
        </button>
      </div>

      <div className="layout">
        <div className="wrap">
          <div className="eyebrow">Kaplan Series 65</div>
          <h1>Study<br /><span>Log.</span></h1>
          <div className="sub">24 UNITS &nbsp;·&nbsp; 5 STEPS EACH &nbsp;·&nbsp; EXAM APR 4 &nbsp;·&nbsp; {daysLeft()} DAYS</div>

          <div className="prog-outer">
            <div className="prog-inner" style={{ width: `${overallPct}%` }} />
          </div>
          <div className="prog-label">
            <span>{totalStepsDone} of {totalSteps} steps complete · {completedCount} units done</span>
            <span>{overallPct}%</span>
          </div>

          {UNITS.map((unit) => {
            const done = stepsDone(unit.id, checked);
            const complete = isComplete(unit.id, checked);
            const isOpen = !!expanded[unit.id];

            return (
              <div className="card" key={unit.id}>
                <div className="card-head" onClick={() => toggleUnit(unit.id)}>
                  <div className="dot" style={{ background: complete ? unit.color : done > 0 ? "#3a3835" : "#1e1c18" }} />
                  <div className="unit-num">{unit.label}</div>
                  <span className="step-count">{done}/{STEPS.length}</span>
                  {complete && <span className="badge complete">complete</span>}
                  {!complete && done > 0 && <span className="badge inprog">in progress</span>}
                  <span className={`chev ${isOpen ? "open" : ""}`}>▼</span>
                </div>

                {isOpen && (
                  <div className="card-body">
                    {STEPS.map((step) => {
                      const key = `${unit.id}-${step.id}`;
                      const isDone = !!checked[key];
                      return (
                        <div className={`step ${unlocked ? "clickable" : ""}`} key={step.id} onClick={() => toggle(key)}>
                          <div
                            className={`step-box ${isDone ? "done" : ""}`}
                            style={isDone ? { background: unit.color } : {}}
                          >
                            {isDone && "✓"}
                          </div>
                          <span className={`step-label ${isDone ? "done" : ""}`}>
                            {step.label}
                            {step.bonus && <span className="bonus-tag">bonus</span>}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div style={{ marginTop: 52, paddingTop: 22, borderTop: "1px solid #1a1816", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div style={{ fontFamily: "Source Code Pro, monospace", fontSize: 11, color: "#3a3835", lineHeight: 2 }}>
              <div><strong style={{ color: "#7EC8A4" }}>{completedCount}</strong> units complete</div>
              <div><strong style={{ color: "#7EC8A4" }}>{24 - completedCount}</strong> units remaining</div>
              <div style={{ marginTop: 4, fontSize: 10, color: "#2e2c28" }}>STATE SAVED TO LOCALSTORAGE</div>
            </div>
            <div style={{ fontStyle: "italic", fontSize: 12, color: "#3a3835", maxWidth: 200, textAlign: "right", lineHeight: 1.7 }}>
              "Understanding is the<br />only real shortcut."
            </div>
          </div>
        </div>

        <div className="sidebar">
          <Sidebar units={UNITS} checked={checked} completedCount={completedCount} />
        </div>
      </div>
    </div>
  );
}
