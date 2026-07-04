import { useState } from "react";

import { CONCEPTS, ORIGINS } from "./data";


const allQuestions = CONCEPTS.flatMap(c =>
  c.quiz.map(q => ({ ...q, category: c.category, conceptTitle: c.title, color: c.color }))
);

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

const fmtDate = () => new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });

const scoreColor = (pct) => {
  if (pct == null) return "#444";
  if (pct >= 80) return "#34D399";
  if (pct >= 60) return "#E8C547";
  return "#FF6B6B";
};

const getAvg = (runs) => {
  if (!runs || runs.length === 0) return null;
  return Math.round(runs.reduce((s, r) => s + r.pct, 0) / runs.length);
};

const getRecentAvg = (runs, n = 3) => {
  if (!runs || runs.length === 0) return null;
  const recent = runs.slice(0, n);
  return Math.round(recent.reduce((s, r) => s + r.pct, 0) / recent.length);
};

const daysSince = (ts) => {
  if (!ts) return null;
  return Math.floor((Date.now() - ts) / (1000 * 60 * 60 * 24));
};

const STALE_THRESHOLDS = { weak: 3, medium: 7, strong: 14 };

const getStudyState = (runs) => {
  if (!runs || runs.length === 0) {
    return { tier: "untouched", avg: null, days: null, stale: true, priority: 2 };
  }
  const avg = getRecentAvg(runs);
  const mostRecent = runs[0]?.ts;
  const days = daysSince(mostRecent);
  const tier = avg < 60 ? "weak" : avg < 80 ? "medium" : "strong";
  const threshold = STALE_THRESHOLDS[tier];
  const stale = days === null || days >= threshold;
  let priority;
  if (tier === "weak" && stale) priority = 0;
  else if (tier === "weak") priority = 1;
  else if (tier === "medium" && stale) priority = 3;
  else if (tier === "strong" && stale) priority = 4;
  else priority = 5;
  return { tier, avg, days, stale, priority };
};

export default function StudyGuide() {
  const [mode, setMode] = useState("home");
  const [activeCard, setActiveCard] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // quiz
  const [quizSection, setQuizSection] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  // progress — persisted in localStorage
  const [progress, setProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("s65_progress")) || { sectionHistory: {}, fullQuizHistory: [] };
    } catch { return { sectionHistory: {}, fullQuizHistory: [] }; }
  });

  const concept = CONCEPTS[activeCard];
  const currentQ = quizQuestions[quizIndex];
  const pct = quizQuestions.length > 0 ? Math.round((score / quizQuestions.length) * 100) : 0;

  const startQuiz = (sectionId = null) => {
    const c = sectionId ? CONCEPTS.find(x => x.id === sectionId) : null;
    const pool = sectionId
      ? c.quiz.map(q => ({ ...q, category: c.category, conceptTitle: c.title, color: c.color }))
      : allQuestions;
    setQuizSection(sectionId);
    setQuizQuestions(shuffle(pool));
    setQuizIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setWrongAnswers([]);
    setQuizStarted(true);
  };

  const saveResult = (sectionId, finalScore, total) => {
    const p = Math.round((finalScore / total) * 100);
    const entry = { date: fmtDate(), ts: Date.now(), score: finalScore, total, pct: p };
    setProgress(prev => {
      const next = { sectionHistory: { ...prev.sectionHistory }, fullQuizHistory: [...prev.fullQuizHistory] };
      if (sectionId) {
        next.sectionHistory[sectionId] = [entry, ...(next.sectionHistory[sectionId] || [])].slice(0, 30);
      } else {
        next.fullQuizHistory = [entry, ...next.fullQuizHistory].slice(0, 30);
      }
      localStorage.setItem("s65_progress", JSON.stringify(next));
      return next;
    });
  };

  const handleAnswer = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === currentQ.answer) setScore(s => s + 1);
    else setWrongAnswers(w => [...w, { ...currentQ, chosen: i }]);
  };

  const nextQuestion = () => {
    if (quizIndex + 1 >= quizQuestions.length) {
      saveResult(quizSection, score, quizQuestions.length);
      setFinished(true);
    } else {
      setQuizIndex(q => q + 1);
      setSelected(null);
    }
  };

  const resetQuiz = () => startQuiz(quizSection);
  const exitQuiz = () => { setQuizStarted(false); setFinished(false); };

  const navTo = (m) => {
    setMode(m);
    setFlipped(false);
    if (m !== "quiz") exitQuiz();
  };

  const NAV = [["home", "Overview"], ["flashcards", "Cards"], ["quiz", "Quiz"], ["origins", "Origins"], ["progress", "Progress"]];

  return (
    <div style={{ minHeight: "100vh", background: "#09090f", color: "#ede9e0", fontFamily: "'Georgia', 'Times New Roman', serif", WebkitTapHighlightColor: "transparent" }}>

      {/* NAV */}
      <div style={{ borderBottom: "1px solid #1a1a26", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0c0c14", position: "sticky", top: 45, zIndex: 10 }}>
        <div style={{ display: "none" }}>
          <span style={{ fontSize: 10, letterSpacing: 3, color: "#444", textTransform: "uppercase" }}>Series 65</span>
        </div>
        <div style={{ display: "flex", gap: 4, width: "100%" }}>
          {NAV.map(([m, label]) => (
            <button key={m} onClick={() => navTo(m)}
              style={{ flex: 1, padding: "9px 4px", background: mode === m ? "#ede9e0" : "transparent", color: mode === m ? "#09090f" : "#555", border: `1px solid ${mode === m ? "#ede9e0" : "#2a2a3a"}`, borderRadius: 3, cursor: "pointer", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", fontFamily: "inherit", transition: "all 0.15s", touchAction: "manipulation", minHeight: 40 }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* HOME */}
      {mode === "home" && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "36px 16px", paddingBottom: "max(36px, env(safe-area-inset-bottom))" }}>
          <div style={{ marginBottom: 36 }}>
            <p style={{ fontSize: 11, letterSpacing: 4, color: "#444", textTransform: "uppercase", margin: "0 0 10px" }}>Series 65</p>
            <h1 style={{ fontSize: 28, fontWeight: "normal", margin: "0 0 8px", lineHeight: 1.3 }}>{CONCEPTS.length} concepts · {allQuestions.length} questions</h1>
          </div>

          {(() => {
            const ranked = CONCEPTS.map((c, i) => ({ c, i, state: getStudyState(progress.sectionHistory[c.id]) }))
              .filter(x => x.state.priority < 5)
              .sort((a, b) => {
                if (a.state.priority !== b.state.priority) return a.state.priority - b.state.priority;
                if (a.state.avg !== null && b.state.avg !== null) return a.state.avg - b.state.avg;
                return (b.state.days ?? 0) - (a.state.days ?? 0);
              })
              .slice(0, 6);
            if (ranked.length === 0) return null;
            const tagFor = (s) => {
              if (s.tier === "untouched") return { label: "not started", color: "#888", bg: "#1a1a26" };
              if (s.tier === "weak" && s.stale) return { label: "weak · stale", color: "#FF6B6B", bg: "#2a1418" };
              if (s.tier === "weak") return { label: "weak", color: "#FF6B6B", bg: "#2a1418" };
              if (s.tier === "medium" && s.stale) return { label: "review", color: "#E8C547", bg: "#2a2410" };
              if (s.tier === "strong" && s.stale) return { label: "refresh", color: "#7EC8A4", bg: "#13261d" };
              return { label: "", color: "#666", bg: "#1a1a26" };
            };
            return (
              <div style={{ marginBottom: 36 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                  <div style={{ fontSize: 9, letterSpacing: 3, color: "#888", textTransform: "uppercase" }}>Study next</div>
                  <div style={{ fontSize: 10, color: "#444" }}>weak first · stale flagged</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {ranked.map(({ c, i, state }) => {
                    const tag = tagFor(state);
                    return (
                      <div key={c.id} onClick={() => { setActiveCard(i); setMode("flashcards"); setFlipped(false); }}
                        style={{ padding: "12px 16px", background: "#0f0f18", border: "1px solid #1a1a26", borderLeft: `3px solid ${c.color}`, borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 12, touchAction: "manipulation" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#141420"}
                        onMouseLeave={e => e.currentTarget.style.background = "#0f0f18"}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 8, letterSpacing: 2, color: "#444", textTransform: "uppercase", marginBottom: 3 }}>{c.category}</div>
                          <div style={{ fontSize: 13, fontWeight: "bold", color: c.color, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                          {state.avg !== null && (
                            <span style={{ fontSize: 12, fontWeight: "bold", color: scoreColor(state.avg) }}>{state.avg}%</span>
                          )}
                          {state.days !== null && (
                            <span style={{ fontSize: 10, color: "#555" }}>{state.days === 0 ? "today" : `${state.days}d`}</span>
                          )}
                          <span style={{ fontSize: 9, letterSpacing: 1, color: tag.color, background: tag.bg, padding: "3px 7px", borderRadius: 3, textTransform: "uppercase", fontWeight: "bold" }}>{tag.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 14 }}>All concepts</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 36 }}>
            {CONCEPTS.map((c, i) => {
              const runs = progress.sectionHistory[c.id];
              const a = getAvg(runs);
              return (
                <div key={c.id} onClick={() => { setActiveCard(i); setMode("flashcards"); setFlipped(false); }}
                  style={{ padding: "18px", background: "#0f0f18", border: "1px solid #1a1a26", borderLeft: `3px solid ${c.color}`, borderRadius: 6, cursor: "pointer", touchAction: "manipulation" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#141420"}
                  onMouseLeave={e => e.currentTarget.style.background = "#0f0f18"}>
                  <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 6 }}>{c.category}</div>
                  <div style={{ fontSize: 14, fontWeight: "bold", color: c.color, marginBottom: 8 }}>{c.title}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "#333" }}>{c.quiz.length}q</span>
                    {a !== null
                      ? <span style={{ fontSize: 13, fontWeight: "bold", color: scoreColor(a) }}>{a}%</span>
                      : <span style={{ fontSize: 11, color: "#2a2a2a" }}>not yet</span>}
                  </div>
                  {a !== null && (
                    <div style={{ height: 3, background: "#1a1a26", borderRadius: 2, marginTop: 8 }}>
                      <div style={{ height: 3, background: scoreColor(a), borderRadius: 2, width: `${a}%` }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ padding: "20px", background: "#0f0f18", border: "1px solid #1a1a26", borderRadius: 6 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 10 }}>Memory stack</div>
            <div style={{ fontSize: 13, color: "#666", lineHeight: 1.9 }}>
              Strongest encoding: <span style={{ color: "#ede9e0" }}>spatial + visual</span> (warehouse, vending machine, rental unit).<br />
              Secondary: <span style={{ color: "#ede9e0" }}>narrative</span> — Grant → Exercise → Sale for ISO questions.<br />
              Numbers to own cold: <span style={{ color: "#ede9e0" }}>10% affiliate · 1yr/2yr ISO · $83.33 conversion math</span>
            </div>
          </div>
        </div>
      )}

      {/* FLASHCARDS */}
      {mode === "flashcards" && (
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "36px 16px", paddingBottom: "max(36px, env(safe-area-inset-bottom))" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <span style={{ fontSize: 11, color: "#444" }}>{activeCard + 1} of {CONCEPTS.length}</span>
            <div style={{ display: "flex", gap: 6 }}>
              {CONCEPTS.map((c, i) => (
                <div key={i} onClick={() => { setActiveCard(i); setFlipped(false); }}
                  style={{ width: 8, height: 8, borderRadius: "50%", background: i === activeCard ? c.color : "#222", cursor: "pointer", touchAction: "manipulation" }} />
              ))}
            </div>
          </div>

          <div onClick={() => setFlipped(f => !f)}
            style={{ background: "#0f0f18", border: `1px solid ${flipped ? concept.color + "55" : "#1a1a26"}`, borderLeft: `4px solid ${concept.color}`, borderRadius: 10, padding: "32px", minHeight: 280, cursor: "pointer", transition: "border-color 0.3s", userSelect: "none", touchAction: "manipulation" }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 6 }}>{concept.category}</div>
            <div style={{ fontSize: 20, fontWeight: "bold", color: concept.color, marginBottom: 24 }}>{concept.title}</div>

            {!flipped ? (
              <div>
                <div style={{ fontSize: 14, color: "#666", fontStyle: "italic", lineHeight: 1.8, marginBottom: 20 }}>"{concept.analogy}"</div>
                <div style={{ fontSize: 10, color: "#333", letterSpacing: 2, textTransform: "uppercase" }}>tap to see the rule →</div>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: "#555", textTransform: "uppercase", marginBottom: 8 }}>The Rule</div>
                  <div style={{ fontSize: 15, color: "#ede9e0", lineHeight: 1.7, fontWeight: "bold" }}>{concept.rule}</div>
                </div>
                <div style={{ padding: "14px 16px", background: "#14130a", border: "1px solid #2a2800", borderRadius: 6 }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: "#E8C547", textTransform: "uppercase", marginBottom: 8 }}>⚠ Watch out</div>
                  <div style={{ fontSize: 13, color: "#888", lineHeight: 1.7 }}>{concept.watch}</div>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 18, justifyContent: "space-between" }}>
            <button onClick={() => { setActiveCard(n => Math.max(0, n - 1)); setFlipped(false); }} disabled={activeCard === 0}
              style={{ padding: "12px 18px", background: "transparent", color: activeCard === 0 ? "#2a2a2a" : "#666", border: `1px solid ${activeCard === 0 ? "#1a1a1a" : "#2a2a3a"}`, borderRadius: 4, cursor: activeCard === 0 ? "default" : "pointer", fontFamily: "inherit", fontSize: 12, touchAction: "manipulation", minHeight: 48 }}>
              ← prev
            </button>
            <button onClick={() => { setMode("quiz"); startQuiz(concept.id); }}
              style={{ padding: "12px 18px", background: concept.color, color: "#09090f", border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: "bold", touchAction: "manipulation", minHeight: 48 }}>
              quiz me
            </button>
            <button onClick={() => { setActiveCard(n => Math.min(CONCEPTS.length - 1, n + 1)); setFlipped(false); }} disabled={activeCard === CONCEPTS.length - 1}
              style={{ padding: "12px 18px", background: "transparent", color: activeCard === CONCEPTS.length - 1 ? "#2a2a2a" : "#666", border: `1px solid ${activeCard === CONCEPTS.length - 1 ? "#1a1a1a" : "#2a2a3a"}`, borderRadius: 4, cursor: activeCard === CONCEPTS.length - 1 ? "default" : "pointer", fontFamily: "inherit", fontSize: 12, touchAction: "manipulation", minHeight: 48 }}>
              next →
            </button>
          </div>
        </div>
      )}

      {/* QUIZ LAUNCHER */}
      {mode === "quiz" && !quizStarted && (
        <div style={{ maxWidth: 660, margin: "0 auto", padding: "36px 16px", paddingBottom: "max(36px, env(safe-area-inset-bottom))" }}>

          {/* Full quiz */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 12 }}>Full Quiz</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px", background: "#0f0f18", border: "1px solid #1a1a26", borderRadius: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>All Sections</div>
                <div style={{ fontSize: 12, color: "#555" }}>{allQuestions.length} questions · shuffled</div>
                {progress.fullQuizHistory.length > 0 && (
                  <div style={{ fontSize: 12, marginTop: 5, display: "flex", gap: 12 }}>
                    <span style={{ color: scoreColor(progress.fullQuizHistory[0].pct) }}>last: {progress.fullQuizHistory[0].pct}%</span>
                    <span style={{ color: scoreColor(getAvg(progress.fullQuizHistory)) }}>avg: {getAvg(progress.fullQuizHistory)}%</span>
                  </div>
                )}
              </div>
              <button onClick={() => startQuiz(null)}
                style={{ padding: "13px 22px", background: "#ede9e0", color: "#09090f", border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: "bold", touchAction: "manipulation", minHeight: 48, flexShrink: 0 }}>
                Start →
              </button>
            </div>
          </div>

          {/* Section quizzes */}
          <div>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 12 }}>By Section</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {CONCEPTS.map(c => {
                const runs = progress.sectionHistory[c.id];
                const a = getAvg(runs);
                return (
                  <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", background: "#0f0f18", border: "1px solid #1a1a26", borderLeft: `3px solid ${c.color}`, borderRadius: 6 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: "bold", color: c.color, marginBottom: 3 }}>{c.title}</div>
                      <div style={{ fontSize: 11, color: "#444", display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <span>{c.quiz.length}q</span>
                        {a !== null && <span style={{ color: scoreColor(a) }}>avg {a}%</span>}
                        {runs && <span style={{ color: "#2a2a2a" }}>{runs.length} run{runs.length !== 1 ? "s" : ""}</span>}
                      </div>
                    </div>
                    <button onClick={() => startQuiz(c.id)}
                      style={{ padding: "10px 14px", background: "transparent", color: c.color, border: `1px solid ${c.color}44`, borderRadius: 5, cursor: "pointer", fontFamily: "inherit", fontSize: 12, touchAction: "manipulation", minHeight: 44, flexShrink: 0 }}>
                      Quiz →
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* QUIZ ACTIVE */}
      {mode === "quiz" && quizStarted && !finished && (
        <div style={{ maxWidth: 660, margin: "0 auto", padding: "36px 16px", paddingBottom: "max(36px, env(safe-area-inset-bottom))" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 11, color: "#444" }}>{quizIndex + 1} / {quizQuestions.length}</span>
            <span style={{ fontSize: 11, color: "#444" }}>
              {quizSection ? CONCEPTS.find(c => c.id === quizSection)?.title : "Full Quiz"} · <span style={{ color: "#34D399" }}>{score}</span>
            </span>
          </div>

          {/* progress bar */}
          <div style={{ height: 2, background: "#1a1a26", borderRadius: 1, marginBottom: 32 }}>
            <div style={{ height: 2, background: "#ede9e0", borderRadius: 1, width: `${((quizIndex + 1) / quizQuestions.length) * 100}%`, transition: "width 0.3s" }} />
          </div>

          <div style={{ marginBottom: 10, fontSize: 10, letterSpacing: 3, color: currentQ.color, textTransform: "uppercase" }}>{currentQ.category} — {currentQ.conceptTitle}</div>
          <div style={{ fontSize: 19, fontWeight: "bold", marginBottom: 28, lineHeight: 1.5 }}>{currentQ.q}</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {currentQ.options.map((opt, i) => {
              let bg = "#0f0f18", border = "#1a1a26", col = "#ede9e0";
              if (selected !== null) {
                if (i === currentQ.answer) { bg = "#0a1f12"; border = "#34D399"; col = "#34D399"; }
                else if (i === selected) { bg = "#1f0a0a"; border = "#FF6B6B"; col = "#FF6B6B"; }
                else { col = "#333"; }
              }
              return (
                <div key={i} onClick={() => handleAnswer(i)}
                  style={{ padding: "16px", background: bg, border: `1px solid ${border}`, borderRadius: 6, cursor: selected !== null ? "default" : "pointer", color: col, fontSize: 15, transition: "all 0.15s", lineHeight: 1.5, touchAction: "manipulation", minHeight: 52 }}
                  onMouseEnter={e => { if (selected === null) e.currentTarget.style.borderColor = "#333"; }}
                  onMouseLeave={e => { if (selected === null) e.currentTarget.style.borderColor = "#1a1a26"; }}>
                  {opt}
                </div>
              );
            })}
          </div>

          {selected !== null && (
            <div style={{ marginTop: 18 }}>
              <div style={{ padding: "16px", background: "#0a0f1a", border: "1px solid #1a2a3a", borderRadius: 6, marginBottom: 12 }}>
                <div style={{ fontSize: 9, letterSpacing: 2, color: "#60A5FA", textTransform: "uppercase", marginBottom: 8 }}>Why</div>
                <div style={{ fontSize: 13, color: "#888", lineHeight: 1.7 }}>{currentQ.explain}</div>
              </div>
              <button onClick={nextQuestion}
                style={{ width: "100%", padding: "16px", background: "#ede9e0", color: "#09090f", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 15, fontWeight: "bold", fontFamily: "inherit", touchAction: "manipulation", minHeight: 52 }}>
                {quizIndex + 1 >= quizQuestions.length ? "See results →" : "Next →"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* RESULTS */}
      {mode === "quiz" && finished && (
        <div style={{ maxWidth: 660, margin: "0 auto", padding: "36px 16px", paddingBottom: "max(48px, env(safe-area-inset-bottom))" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            {quizSection && (
              <div style={{ fontSize: 10, letterSpacing: 3, color: CONCEPTS.find(c => c.id === quizSection)?.color, textTransform: "uppercase", marginBottom: 8 }}>
                {CONCEPTS.find(c => c.id === quizSection)?.title}
              </div>
            )}
            <div style={{ fontSize: 72, fontWeight: "bold", color: scoreColor(pct), lineHeight: 1 }}>{pct}%</div>
            <div style={{ fontSize: 13, color: "#555", marginTop: 12 }}>
              {score} / {quizQuestions.length} · {pct >= 80 ? "Solid. Keep the pressure on." : pct >= 60 ? "Getting there. Review the misses below." : "Rough session — that's data. Review and retry."}
            </div>
          </div>

          {wrongAnswers.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 9, letterSpacing: 3, color: "#FF6B6B", textTransform: "uppercase", marginBottom: 14 }}>Missed — {wrongAnswers.length}</div>
              {wrongAnswers.map((w, i) => (
                <div key={i} style={{ padding: "18px", background: "#0f0f18", border: "1px solid #1f0a0a", borderRadius: 8, marginBottom: 10 }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: w.color, textTransform: "uppercase", marginBottom: 8 }}>{w.conceptTitle}</div>
                  <div style={{ fontSize: 14, fontWeight: "bold", marginBottom: 12, lineHeight: 1.5 }}>{w.q}</div>
                  <div style={{ fontSize: 12, color: "#FF6B6B", marginBottom: 4 }}>You chose: {w.options[w.chosen]}</div>
                  <div style={{ fontSize: 12, color: "#34D399", marginBottom: 12 }}>Correct: {w.options[w.answer]}</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7, borderTop: "1px solid #1a1a26", paddingTop: 12 }}>{w.explain}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={resetQuiz}
              style={{ flex: 1, padding: "14px", background: "#ede9e0", color: "#09090f", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: "bold", fontFamily: "inherit", touchAction: "manipulation", minHeight: 52 }}>
              Try again
            </button>
            <button onClick={exitQuiz}
              style={{ flex: 1, padding: "14px", background: "transparent", color: "#666", border: "1px solid #2a2a3a", borderRadius: 6, cursor: "pointer", fontSize: 13, fontFamily: "inherit", touchAction: "manipulation", minHeight: 52 }}>
              {quizSection ? "← Sections" : "← Overview"}
            </button>
          </div>
        </div>
      )}

      {/* PROGRESS */}
      {mode === "progress" && (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "36px 16px", paddingBottom: "max(48px, env(safe-area-inset-bottom))" }}>

          {/* Full quiz history */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 14 }}>Full Quiz History</div>
            {progress.fullQuizHistory.length === 0 ? (
              <div style={{ padding: "18px", background: "#0f0f18", border: "1px solid #1a1a26", borderRadius: 6, fontSize: 13, color: "#333" }}>
                No full quizzes yet — go take one.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {progress.fullQuizHistory.map((run, i) => (
                  <div key={i} style={{ padding: "14px 16px", background: "#0f0f18", border: "1px solid #1a1a26", borderRadius: 6 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: "#555" }}>{run.date}</span>
                      <span style={{ fontSize: 18, fontWeight: "bold", color: scoreColor(run.pct) }}>{run.pct}%</span>
                      <span style={{ fontSize: 12, color: "#444" }}>{run.score}/{run.total}</span>
                    </div>
                    <div style={{ height: 4, background: "#1a1a26", borderRadius: 2 }}>
                      <div style={{ height: 4, background: scoreColor(run.pct), borderRadius: 2, width: `${run.pct}%`, transition: "width 0.6s" }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Per-section */}
          <div>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 14 }}>By Section</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {CONCEPTS.map(c => {
                const runs = progress.sectionHistory[c.id] || [];
                const a = getAvg(runs);
                return (
                  <div key={c.id} style={{ background: "#0f0f18", border: "1px solid #1a1a26", borderLeft: `3px solid ${c.color}`, borderRadius: 6, overflow: "hidden" }}>
                    {/* header */}
                    <div style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: a !== null ? 10 : 0 }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: "bold", color: c.color }}>{c.title}</div>
                          <div style={{ fontSize: 11, color: "#333", marginTop: 3 }}>
                            {runs.length === 0 ? "Not attempted" : `${runs.length} run${runs.length !== 1 ? "s" : ""} · avg ${a}%`}
                          </div>
                        </div>
                        {a !== null && (
                          <div style={{ fontSize: 24, fontWeight: "bold", color: scoreColor(a), lineHeight: 1 }}>{a}%</div>
                        )}
                      </div>
                      {a !== null && (
                        <div style={{ height: 4, background: "#1a1a26", borderRadius: 2 }}>
                          <div style={{ height: 4, background: scoreColor(a), borderRadius: 2, width: `${a}%`, transition: "width 0.6s" }} />
                        </div>
                      )}
                    </div>

                    {/* individual runs */}
                    {runs.length > 0 && (
                      <div style={{ borderTop: "1px solid #141420", padding: "10px 16px", display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {runs.map((run, i) => (
                          <div key={i} style={{ padding: "4px 9px", background: "#09090f", border: `1px solid ${scoreColor(run.pct)}33`, borderRadius: 4, fontSize: 11, display: "flex", gap: 6, alignItems: "center" }}>
                            <span style={{ color: "#444" }}>{run.date}</span>
                            <span style={{ fontWeight: "bold", color: scoreColor(run.pct) }}>{run.pct}%</span>
                            <span style={{ color: "#2a2a2a" }}>{run.score}/{run.total}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ORIGINS */}
      {mode === "origins" && (
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "36px 16px", paddingBottom: "max(36px, env(safe-area-inset-bottom))" }}>
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 11, letterSpacing: 4, color: "#444", textTransform: "uppercase", margin: "0 0 10px" }}>Origins</p>
            <h1 style={{ fontSize: 24, fontWeight: "normal", margin: "0 0 8px", lineHeight: 1.3 }}>Why these rules exist</h1>
            <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: 0 }}>
              The stories behind the rules — the abuses, scandals, and historical events that prompted each requirement. Stories are mnemonic scaffolding; the dollar amounts and timelines are what get tested.
            </p>
          </div>

          {ORIGINS.map(topic => (
            <div key={topic.id} style={{ marginBottom: 32 }}>
              <div style={{ padding: "20px 22px", background: "#0f0f18", border: "1px solid #1a1a26", borderLeft: `3px solid ${topic.color}`, borderRadius: 6, marginBottom: 14 }}>
                <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 8 }}>Big picture</div>
                <div style={{ fontSize: 16, fontWeight: "bold", color: topic.color, marginBottom: 12 }}>{topic.title}</div>
                <div style={{ fontSize: 13, color: "#aaa", lineHeight: 1.8 }}>{topic.bigPicture}</div>
              </div>

              {topic.rules.map((r, i) => (
                <div key={i} style={{ padding: "18px 20px", background: "#0c0c14", border: "1px solid #1a1a26", borderRadius: 6, marginBottom: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: "#ede9e0", marginBottom: 10 }}>{r.name}</div>
                  <div style={{ fontSize: 13, color: "#888", lineHeight: 1.8, marginBottom: 12 }}>{r.story}</div>
                  {r.mnemonic && (
                    <div style={{ padding: "10px 14px", background: "#14130a", border: "1px solid #2a2800", borderRadius: 4 }}>
                      <span style={{ fontSize: 9, letterSpacing: 2, color: "#E8C547", textTransform: "uppercase", marginRight: 8 }}>Mnemonic</span>
                      <span style={{ fontSize: 13, color: "#bbb", fontStyle: "italic" }}>{r.mnemonic}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
