import { useState, useMemo } from "react";
import { FORMULAS } from "./data";

const SECTION_ORDER = [
  "Options",
  "Order Types",
  "Taxes",
  "Portfolio Analysis",
  "Descriptive Statistics",
  "Bond Pricing & Yields",
  "Convertibles & Parity",
  "Tax-Equivalent Yields",
  "Margin",
  "Fundamental Analysis",
  "Fund Pricing",
];

const SECTION_COLORS = {
  "Options": "#A78BFA",
  "Order Types": "#7EC8A4",
  "Taxes": "#F97316",
  "Portfolio Analysis": "#FBBF24",
  "Descriptive Statistics": "#60A5FA",
  "Bond Pricing & Yields": "#E8C547",
  "Convertibles & Parity": "#7C3AED",
  "Tax-Equivalent Yields": "#F97316",
  "Margin": "#FF6B6B",
  "Fundamental Analysis": "#7EC8A4",
  "Fund Pricing": "#EC4899",
};

function groupBySection(formulas) {
  const map = {};
  for (const f of formulas) {
    (map[f.section] ||= []).push(f);
  }
  return map;
}

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function FormulaSheet() {
  const [query, setQuery] = useState("");
  const [hideMode, setHideMode] = useState(false);
  const [collapsed, setCollapsed] = useState(() => loadJson("s65-formula-collapsed", {}));
  const [revealed, setRevealed] = useState(() => loadJson("s65-formula-revealed-map", {}));
  const [showNotes, setShowNotes] = useState(() => loadJson("s65-formula-shownotes", false));
  const [peeked, setPeeked] = useState(() => loadJson("s65-formula-peeked", {}));

  const persist = (key, value, setter) => {
    setter(value);
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FORMULAS;
    return FORMULAS.filter(f =>
      f.name.toLowerCase().includes(q) ||
      f.section.toLowerCase().includes(q) ||
      f.formula.toLowerCase().includes(q) ||
      (f.when && f.when.toLowerCase().includes(q))
    );
  }, [query]);

  const grouped = useMemo(() => groupBySection(filtered), [filtered]);
  const visibleSections = SECTION_ORDER.filter(s => grouped[s] && grouped[s].length > 0);

  const toggleSection = (s) => {
    persist("s65-formula-collapsed", { ...collapsed, [s]: !collapsed[s] }, setCollapsed);
  };
  const toggleReveal = (id) => {
    persist("s65-formula-revealed-map", { ...revealed, [id]: !revealed[id] }, setRevealed);
  };
  const togglePeek = (id) => {
    persist("s65-formula-peeked", { ...peeked, [id]: !peeked[id] }, setPeeked);
  };
  const toggleShowNotes = () => {
    persist("s65-formula-shownotes", !showNotes, setShowNotes);
  };

  const revealAll = () => {
    const next = {};
    for (const f of FORMULAS) next[f.id] = true;
    persist("s65-formula-revealed-map", next, setRevealed);
    setHideMode(false);
  };
  const hideAll = () => {
    persist("s65-formula-revealed-map", {}, setRevealed);
    setHideMode(true);
  };

  const isRevealed = (f) => (hideMode ? !!revealed[f.id] : true);
  const notesVisible = (f) => showNotes || !!peeked[f.id];

  return (
    <div className="fs-wrap">
      <style>{`
        .fs-wrap { max-width: 780px; margin: 0 auto; padding: 32px 20px 80px; color: #e8e0d0; font-family: 'Source Code Pro', monospace; }
        .fs-eyebrow { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #666; margin-bottom: 8px; }
        .fs-h1 { font-family: 'Playfair Display', serif; font-size: clamp(32px, 6vw, 56px); font-weight: 900; line-height: 1; margin: 0 0 4px; color: #f0e8d8; letter-spacing: -0.02em; }
        .fs-h1 span { color: #FBBF24; }
        .fs-sub { font-size: 11px; color: #555; margin: 14px 0 24px; letter-spacing: 0.08em; }

        .fs-controls { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-bottom: 32px; }
        .fs-search { flex: 1; min-width: 200px; padding: 10px 12px; background: #141210; border: 1px solid #2a2824; border-radius: 4px; color: #e8e0d0; font-family: inherit; font-size: 12px; }
        .fs-search:focus { outline: none; border-color: #FBBF24; }
        .fs-toggle { background: none; border: 1px solid #2a2824; border-radius: 4px; color: #888; cursor: pointer; font-family: inherit; font-size: 10px; letter-spacing: 0.15em; padding: 9px 14px; text-transform: uppercase; transition: all 0.15s; white-space: nowrap; }
        .fs-toggle:hover { border-color: #4a4844; color: #b8b0a0; }
        .fs-toggle.active { border-color: #FBBF24; color: #FBBF24; background: #1f1a09; }

        .fs-section { margin-bottom: 42px; }
        .fs-section-head { display: flex; align-items: baseline; gap: 12px; cursor: pointer; user-select: none; padding: 8px 0 14px; border-bottom: 1px solid #1e1c1a; margin-bottom: 8px; }
        .fs-section-head:hover .fs-section-title { color: #fff; }
        .fs-section-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; align-self: center; }
        .fs-section-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #f0e8d8; flex: 1; letter-spacing: -0.01em; transition: color 0.15s; }
        .fs-section-count { font-size: 10px; color: #444; letter-spacing: 0.15em; text-transform: uppercase; }
        .fs-chev { font-size: 9px; color: #383530; margin-left: 4px; transition: transform 0.2s; display: inline-block; }
        .fs-chev.open { transform: rotate(180deg); }

        .fs-row { padding: 12px 0 12px; border-bottom: 1px solid #161412; }
        .fs-row:last-child { border-bottom: none; }
        .fs-row-head { display: flex; align-items: baseline; gap: 12px; }
        .fs-name { font-size: 13px; font-weight: 600; color: #f0e8d8; flex: 1; line-height: 1.4; letter-spacing: 0.01em; }
        .fs-peek { background: none; border: none; color: #444; cursor: pointer; font-family: inherit; font-size: 16px; padding: 0 4px; line-height: 1; transition: color 0.15s; align-self: center; }
        .fs-peek:hover { color: #FBBF24; }
        .fs-peek.on { color: #FBBF24; }

        .fs-formula { font-family: 'Source Code Pro', monospace; font-size: 14px; color: #FBBF24; padding: 6px 0 0 14px; line-height: 1.6; word-spacing: 0.05em; word-break: break-word; }

        .fs-notes { padding: 8px 0 2px 14px; }
        .fs-meta { font-size: 11px; color: #8a8272; margin: 4px 0; line-height: 1.6; }
        .fs-meta strong { color: #b8b0a0; font-weight: 600; }
        .fs-example { font-size: 10px; color: #6a6252; font-style: italic; margin: 4px 0; line-height: 1.6; }
        .fs-example strong { color: #8a8272; font-style: normal; font-weight: 600; }

        .fs-reveal-btn { background: #1a1712; border: 1px dashed #3a3835; color: #666; cursor: pointer; font-family: inherit; font-size: 10px; letter-spacing: 0.15em; padding: 8px 14px; margin: 6px 0 0 14px; border-radius: 3px; text-transform: uppercase; transition: all 0.15s; }
        .fs-reveal-btn:hover { border-color: #FBBF24; color: #FBBF24; }

        .fs-empty { text-align: center; padding: 40px; color: #444; font-size: 12px; }
      `}</style>

      <div className="fs-eyebrow">Series 65 Reference</div>
      <h1 className="fs-h1">Formulas<span>.</span></h1>
      <div className="fs-sub">
        {FORMULAS.length} FORMULAS · {SECTION_ORDER.length} SECTIONS · SAVED LOCALLY
      </div>

      <div className="fs-controls">
        <input
          className="fs-search"
          type="text"
          placeholder="Search…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className={`fs-toggle ${showNotes ? "active" : ""}`}
          onClick={toggleShowNotes}
        >
          {showNotes ? "Notes On" : "Notes Off"}
        </button>
        <button
          className={`fs-toggle ${hideMode ? "active" : ""}`}
          onClick={() => (hideMode ? revealAll() : hideAll())}
        >
          {hideMode ? "Reveal All" : "Quiz Mode"}
        </button>
      </div>

      {visibleSections.length === 0 && (
        <div className="fs-empty">No formulas match "{query}"</div>
      )}

      {visibleSections.map((section) => {
        const items = grouped[section];
        const isCollapsed = !!collapsed[section];
        const color = SECTION_COLORS[section] || "#f0e8d8";

        return (
          <div className="fs-section" key={section}>
            <div className="fs-section-head" onClick={() => toggleSection(section)}>
              <div className="fs-section-dot" style={{ background: color }} />
              <div className="fs-section-title">{section}</div>
              <div className="fs-section-count">{items.length}</div>
              <span className={`fs-chev ${!isCollapsed ? "open" : ""}`}>▼</span>
            </div>

            {!isCollapsed && items.map((f) => {
              const revealed = isRevealed(f);
              const showThisNotes = notesVisible(f);
              return (
                <div className="fs-row" key={f.id}>
                  <div className="fs-row-head">
                    <div className="fs-name">{f.name}</div>
                    {revealed && (
                      <button
                        className={`fs-peek ${peeked[f.id] ? "on" : ""}`}
                        onClick={() => togglePeek(f.id)}
                        title={peeked[f.id] ? "Hide notes" : "Show notes"}
                      >
                        {peeked[f.id] ? "−" : "+"}
                      </button>
                    )}
                  </div>

                  {revealed ? (
                    <>
                      <div className="fs-formula">{f.formula}</div>
                      {showThisNotes && (
                        <div className="fs-notes">
                          <div className="fs-meta"><strong>When:</strong> {f.when}</div>
                          {f.memory && (
                            <div className="fs-meta"><strong>Memory:</strong> {f.memory}</div>
                          )}
                          {f.example && (
                            <div className="fs-example"><strong>Example:</strong> {f.example}</div>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      className="fs-reveal-btn"
                      onClick={() => toggleReveal(f.id)}
                    >
                      Reveal
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
