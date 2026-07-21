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

function loadCollapsed() {
  try {
    const raw = localStorage.getItem("s65-formula-collapsed");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function loadRevealed() {
  try {
    const raw = localStorage.getItem("s65-formula-revealed-map");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export default function FormulaSheet() {
  const [query, setQuery] = useState("");
  const [hideMode, setHideMode] = useState(false);
  const [collapsed, setCollapsed] = useState(loadCollapsed);
  const [revealed, setRevealed] = useState(loadRevealed);

  const persistCollapsed = (next) => {
    setCollapsed(next);
    try { localStorage.setItem("s65-formula-collapsed", JSON.stringify(next)); } catch {}
  };
  const persistRevealed = (next) => {
    setRevealed(next);
    try { localStorage.setItem("s65-formula-revealed-map", JSON.stringify(next)); } catch {}
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
    persistCollapsed({ ...collapsed, [s]: !collapsed[s] });
  };

  const toggleReveal = (id) => {
    persistRevealed({ ...revealed, [id]: !revealed[id] });
  };

  const revealAll = () => {
    const next = {};
    for (const f of FORMULAS) next[f.id] = true;
    persistRevealed(next);
    setHideMode(false);
  };

  const hideAll = () => {
    persistRevealed({});
    setHideMode(true);
  };

  const isRevealed = (f) => (hideMode ? !!revealed[f.id] : true);

  return (
    <div className="fs-wrap">
      <style>{`
        .fs-wrap { max-width: 900px; margin: 0 auto; padding: 32px 20px 80px; color: #e8e0d0; font-family: 'Source Code Pro', monospace; }
        .fs-eyebrow { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #666; margin-bottom: 8px; }
        .fs-h1 { font-family: 'Playfair Display', serif; font-size: clamp(32px, 6vw, 56px); font-weight: 900; line-height: 1; margin: 0 0 4px; color: #f0e8d8; letter-spacing: -0.02em; }
        .fs-h1 span { color: #FBBF24; }
        .fs-sub { font-size: 11px; color: #555; margin: 14px 0 24px; letter-spacing: 0.08em; }
        .fs-controls { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-bottom: 24px; }
        .fs-search { flex: 1; min-width: 200px; padding: 10px 12px; background: #141210; border: 1px solid #2a2824; border-radius: 4px; color: #e8e0d0; font-family: inherit; font-size: 12px; }
        .fs-search:focus { outline: none; border-color: #FBBF24; }
        .fs-toggle { background: none; border: 1px solid #2a2824; border-radius: 4px; color: #888; cursor: pointer; font-family: inherit; font-size: 10px; letter-spacing: 0.15em; padding: 9px 14px; text-transform: uppercase; transition: all 0.15s; }
        .fs-toggle:hover { border-color: #4a4844; color: #b8b0a0; }
        .fs-toggle.active { border-color: #FBBF24; color: #FBBF24; background: #1f1a09; }
        .fs-section { margin-bottom: 20px; border: 1px solid #1e1c1a; border-radius: 6px; overflow: hidden; }
        .fs-section-head { display: flex; align-items: center; gap: 12px; padding: 14px 16px; cursor: pointer; background: #141210; user-select: none; transition: background 0.15s; }
        .fs-section-head:hover { background: #171410; }
        .fs-section-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .fs-section-title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #f0e8d8; flex: 1; }
        .fs-section-count { font-size: 10px; color: #444; letter-spacing: 0.15em; text-transform: uppercase; }
        .fs-chev { font-size: 9px; color: #383530; margin-left: 8px; transition: transform 0.2s; display: inline-block; }
        .fs-chev.open { transform: rotate(180deg); }
        .fs-section-body { background: #0c0b09; border-top: 1px solid #181614; padding: 4px 14px 14px; }
        .fs-card { padding: 14px 4px; border-bottom: 1px solid #161412; }
        .fs-card:last-child { border-bottom: none; }
        .fs-name { font-size: 13px; font-weight: 600; color: #f0e8d8; margin-bottom: 8px; line-height: 1.4; }
        .fs-formula { font-family: 'Source Code Pro', monospace; font-size: 13px; color: #FBBF24; background: #1a1712; padding: 10px 12px; border-left: 3px solid #FBBF24; border-radius: 3px; margin-bottom: 8px; line-height: 1.5; word-break: break-word; }
        .fs-meta { font-size: 12px; color: #b8b0a0; margin: 6px 0; line-height: 1.5; }
        .fs-meta strong { color: #f0e8d8; }
        .fs-example { font-size: 11px; color: #888; font-style: italic; margin: 6px 0; line-height: 1.5; }
        .fs-reveal-btn { background: #1a1712; border: 1px dashed #3a3835; color: #666; cursor: pointer; font-family: inherit; font-size: 10px; letter-spacing: 0.15em; padding: 8px 14px; margin-top: 6px; border-radius: 3px; text-transform: uppercase; transition: all 0.15s; width: 100%; }
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
          placeholder="Search by name, section, formula…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
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

            {!isCollapsed && (
              <div className="fs-section-body">
                {items.map((f) => (
                  <div className="fs-card" key={f.id}>
                    <div className="fs-name">{f.name}</div>
                    {isRevealed(f) ? (
                      <>
                        <div className="fs-formula">{f.formula}</div>
                        <div className="fs-meta"><strong>When:</strong> {f.when}</div>
                        {f.memory && (
                          <div className="fs-meta"><strong>Memory:</strong> {f.memory}</div>
                        )}
                        {f.example && (
                          <div className="fs-example"><strong>Example:</strong> {f.example}</div>
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
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
