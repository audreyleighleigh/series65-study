import { useState } from "react";

const ACTIVITIES = [
  { id: "voice",  label: "Voice Study" },
  { id: "qbank1", label: "QBank Q1" },
  { id: "qbank2", label: "QBank Q2" },
];

const UNITS = Array.from({ length: 24 }, (_, i) => ({
  id: `u${String(i + 1).padStart(2, "0")}`,
  num: i + 1,
  label: `Unit ${String(i + 1).padStart(2, "0")}`,
}));

const STORAGE_KEY = "s65-reps";
const FORMULA_STORAGE_KEY = "s65-formula-reps";

function loadReps() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveReps(reps) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reps));
  } catch {}
}

function loadFormulaReps() {
  try {
    const raw = localStorage.getItem(FORMULA_STORAGE_KEY);
    return raw ? JSON.parse(raw) : { count: 0, lastAt: null };
  } catch {
    return { count: 0, lastAt: null };
  }
}

function saveFormulaReps(f) {
  try {
    localStorage.setItem(FORMULA_STORAGE_KEY, JSON.stringify(f));
  } catch {}
}

function keyFor(unitId, activityId) {
  return `${unitId}-${activityId}`;
}

function formatShortDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function RepTracker() {
  const [reps, setReps] = useState(loadReps);
  const [formulaReps, setFormulaReps] = useState(loadFormulaReps);

  const persist = (next) => {
    setReps(next);
    saveReps(next);
  };

  const incrementFormula = () => {
    const next = { count: formulaReps.count + 1, lastAt: new Date().toISOString() };
    setFormulaReps(next);
    saveFormulaReps(next);
  };
  const decrementFormula = () => {
    if (formulaReps.count <= 0) return;
    const next = { count: formulaReps.count - 1, lastAt: formulaReps.lastAt };
    setFormulaReps(next);
    saveFormulaReps(next);
  };

  const increment = (unitId, activityId) => {
    const k = keyFor(unitId, activityId);
    const current = reps[k] || { count: 0, lastAt: null };
    persist({
      ...reps,
      [k]: { count: current.count + 1, lastAt: new Date().toISOString() },
    });
  };

  const decrement = (unitId, activityId) => {
    const k = keyFor(unitId, activityId);
    const current = reps[k];
    if (!current || current.count <= 0) return;
    persist({
      ...reps,
      [k]: { count: current.count - 1, lastAt: current.lastAt },
    });
  };

  const cellFor = (unitId, activityId) => reps[keyFor(unitId, activityId)] || { count: 0, lastAt: null };

  const unitTotal = (unitId) =>
    ACTIVITIES.reduce((acc, a) => acc + (cellFor(unitId, a.id).count || 0), 0);

  const activityTotal = (activityId) =>
    UNITS.reduce((acc, u) => acc + (cellFor(u.id, activityId).count || 0), 0);

  const grandTotal = UNITS.reduce((acc, u) => acc + unitTotal(u.id), 0);

  return (
    <div className="rp-wrap">
      <style>{`
        .rp-wrap { max-width: 780px; margin: 0 auto; padding: 32px 20px 80px; color: #e8e0d0; font-family: 'Source Code Pro', monospace; }
        .rp-eyebrow { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #666; margin-bottom: 8px; }
        .rp-h1 { font-family: 'Playfair Display', serif; font-size: clamp(32px, 6vw, 56px); font-weight: 900; line-height: 1; margin: 0 0 4px; color: #f0e8d8; letter-spacing: -0.02em; }
        .rp-h1 span { color: #F97316; }
        .rp-sub { font-size: 11px; color: #555; margin: 14px 0 24px; letter-spacing: 0.08em; line-height: 1.6; }
        .rp-total-banner { background: #111009; border: 1px solid #1e1c1a; border-radius: 6px; padding: 14px 18px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
        .rp-total-label { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #666; }
        .rp-total-num { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #F97316; line-height: 1; }
        .rp-grid { background: #111009; border: 1px solid #1e1c1a; border-radius: 6px; overflow: hidden; }
        .rp-row { display: grid; grid-template-columns: 60px repeat(3, 1fr) 44px; align-items: stretch; border-bottom: 1px solid #1a1816; }
        .rp-row:last-child { border-bottom: none; }
        .rp-row.rp-header { background: #141210; }
        .rp-row.rp-footer { background: #141210; border-top: 1px solid #2a2824; }
        .rp-unit-label { padding: 12px 8px 12px 14px; font-size: 11px; color: #b8b0a0; letter-spacing: 0.05em; align-self: center; }
        .rp-header .rp-unit-label { font-size: 9px; color: #666; letter-spacing: 0.15em; text-transform: uppercase; }
        .rp-col-label { padding: 12px 6px; font-size: 9px; color: #666; letter-spacing: 0.15em; text-transform: uppercase; text-align: center; align-self: center; }
        .rp-cell { padding: 8px 6px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; border-left: 1px solid #1a1816; position: relative; }
        .rp-cell.zero { opacity: 0.5; }
        .rp-plus { background: none; border: 1px solid #2a2824; border-radius: 4px; color: #e8e0d0; font-family: inherit; font-size: 15px; font-weight: 600; padding: 4px 12px; cursor: pointer; transition: all 0.15s; min-width: 48px; line-height: 1; }
        .rp-plus:hover { border-color: #F97316; color: #F97316; background: #1f1509; }
        .rp-plus.hot { border-color: #F97316; color: #F97316; }
        .rp-count { font-family: 'Source Code Pro', monospace; font-weight: 700; font-size: 12px; letter-spacing: 0.05em; }
        .rp-date { font-size: 8px; color: #555; letter-spacing: 0.05em; margin-top: 1px; min-height: 10px; }
        .rp-minus { position: absolute; top: 4px; right: 4px; background: none; border: 1px solid #2a2824; border-radius: 3px; color: #666; font-size: 12px; font-weight: 600; cursor: pointer; padding: 1px 6px; line-height: 1; transition: all 0.15s; }
        .rp-minus:hover:not(:disabled) { color: #c0392b; border-color: #c0392b; }
        .rp-minus:disabled { opacity: 0.25; cursor: not-allowed; }
        .rp-total-cell { padding: 12px 6px; text-align: center; align-self: center; border-left: 1px solid #1a1816; font-family: 'Source Code Pro', monospace; font-weight: 700; font-size: 12px; color: #F97316; }
        .rp-footer .rp-total-cell { color: #F97316; font-size: 13px; }
        .rp-hint { font-size: 10px; color: #444; text-align: center; margin-top: 20px; font-style: italic; }
        .rp-formula-card { background: #111009; border: 1px solid #1e1c1a; border-radius: 6px; padding: 16px 18px; margin-bottom: 24px; display: flex; align-items: center; gap: 16px; }
        .rp-formula-left { flex: 1; min-width: 0; }
        .rp-formula-title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #f0e8d8; line-height: 1.2; margin-bottom: 4px; }
        .rp-formula-sub { font-size: 10px; color: #666; letter-spacing: 0.12em; text-transform: uppercase; }
        .rp-formula-date { font-size: 10px; color: #555; margin-top: 6px; letter-spacing: 0.05em; }
        .rp-formula-right { display: flex; align-items: center; gap: 8px; }
        .rp-formula-count { font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 700; color: #FBBF24; line-height: 1; min-width: 44px; text-align: right; }
        .rp-formula-plus { background: none; border: 1px solid #FBBF24; border-radius: 4px; color: #FBBF24; font-family: inherit; font-size: 20px; font-weight: 600; padding: 6px 14px; cursor: pointer; transition: all 0.15s; line-height: 1; }
        .rp-formula-plus:hover { background: #1f1a09; }
        .rp-formula-minus { background: none; border: 1px solid #2a2824; border-radius: 4px; color: #666; font-family: inherit; font-size: 14px; padding: 6px 10px; cursor: pointer; line-height: 1; }
        .rp-formula-minus:hover { color: #c0392b; border-color: #c0392b; }
        .rp-formula-minus:disabled { opacity: 0.3; cursor: not-allowed; }
        @media (max-width: 500px) {
          .rp-row { grid-template-columns: 52px repeat(3, 1fr) 38px; }
          .rp-unit-label { padding: 10px 4px 10px 10px; font-size: 10px; }
          .rp-col-label { font-size: 8px; padding: 10px 2px; }
          .rp-plus { padding: 4px 6px; min-width: 36px; font-size: 13px; }
          .rp-cell { padding: 6px 3px; }
        }
      `}</style>

      <div className="rp-eyebrow">Study Iteration</div>
      <h1 className="rp-h1">Reps<span>.</span></h1>
      <div className="rp-sub">
        VOICE STUDY · QBANK Q1 · QBANK Q2 · TAP TO LOG · SAVED LOCALLY
      </div>

      <div className="rp-total-banner">
        <div>
          <div className="rp-total-label">Total Reps</div>
          <div className="rp-total-num">{grandTotal}</div>
        </div>
        <div style={{ textAlign: "right", fontSize: 10, color: "#666", letterSpacing: "0.08em", lineHeight: 1.6 }}>
          {ACTIVITIES.map(a => (
            <div key={a.id}>{a.label.toUpperCase()}: <strong style={{ color: "#F97316" }}>{activityTotal(a.id)}</strong></div>
          ))}
        </div>
      </div>

      <div className="rp-formula-card">
        <div className="rp-formula-left">
          <div className="rp-formula-title">Formula Sheet Rewrite</div>
          <div className="rp-formula-sub">Daily rewrite · memorize the sheet</div>
          <div className="rp-formula-date">
            {formulaReps.lastAt
              ? `Last done ${formatShortDate(formulaReps.lastAt)}`
              : "Not started yet"}
          </div>
        </div>
        <div className="rp-formula-right">
          <button
            className="rp-formula-minus"
            onClick={decrementFormula}
            disabled={formulaReps.count === 0}
            title="Undo one rewrite"
          >
            −
          </button>
          <div className="rp-formula-count">{formulaReps.count}</div>
          <button
            className="rp-formula-plus"
            onClick={incrementFormula}
            title="Log a rewrite"
          >
            +1
          </button>
        </div>
      </div>

      <div className="rp-grid">
        <div className="rp-row rp-header">
          <div className="rp-unit-label">Unit</div>
          {ACTIVITIES.map(a => (
            <div key={a.id} className="rp-col-label">{a.label}</div>
          ))}
          <div className="rp-col-label">Σ</div>
        </div>

        {UNITS.map(u => (
          <div className="rp-row" key={u.id}>
            <div className="rp-unit-label">{u.num}</div>
            {ACTIVITIES.map(a => {
              const c = cellFor(u.id, a.id);
              const isZero = c.count === 0;
              return (
                <div className={`rp-cell ${isZero ? "zero" : ""}`} key={a.id}>
                  <button
                    className="rp-minus"
                    onClick={() => decrement(u.id, a.id)}
                    disabled={isZero}
                    title="Undo one rep"
                  >
                    −
                  </button>
                  <button
                    className={`rp-plus ${isZero ? "" : "hot"}`}
                    onClick={() => increment(u.id, a.id)}
                  >
                    {isZero ? "+" : c.count}
                  </button>
                  <div className="rp-date">{formatShortDate(c.lastAt)}</div>
                </div>
              );
            })}
            <div className="rp-total-cell">{unitTotal(u.id)}</div>
          </div>
        ))}

        <div className="rp-row rp-footer">
          <div className="rp-unit-label">Σ</div>
          {ACTIVITIES.map(a => (
            <div key={a.id} className="rp-total-cell">{activityTotal(a.id)}</div>
          ))}
          <div className="rp-total-cell">{grandTotal}</div>
        </div>
      </div>

      <div className="rp-hint">Tap a cell to +1. Tap the − in a corner to undo.</div>
    </div>
  );
}
