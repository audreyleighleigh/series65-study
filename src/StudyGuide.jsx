import { useState } from "react";

const CONCEPTS = [
  {
    id: "yields",
    category: "Bonds",
    title: "The Yield Hierarchy",
    color: "#E8C547",
    analogy: "Your bond is a rental unit locked at $600/mo. Market rent jumps to $800. Your unit is worth less as an asset — nobody pays full price for a below-market lease.",
    rule: "For premium bonds: YTC < YTM < Current Yield < Nominal Yield",
    watch: "Nominal yield never changes. It's baked in at issuance. Current yield = annual interest ÷ current price.",
    quiz: [
      {
        q: "A bond trades at a premium. Which yield is highest?",
        options: ["YTC", "YTM", "Current Yield", "Nominal Yield"],
        answer: 3,
        explain: "Nominal yield is fixed at issuance. For premium bonds, you overpaid — so every other yield is lower."
      },
      {
        q: "Current yield is defined as:",
        options: ["Coupon ÷ Face Value", "Annual Interest ÷ Current Price", "Coupon ÷ YTM", "Face Value ÷ Market Price"],
        answer: 1,
        explain: "Annual interest divided by current market price. The earnings figure is a trap — use dividends, not earnings."
      },
      {
        q: "GHI pays $0.50 quarterly dividend, market price $40. Current yield?",
        options: ["10%", "1.25%", "5%", "15%"],
        answer: 2,
        explain: "$0.50 × 4 = $2 annual dividend. $2 ÷ $40 = 5%. Earnings are irrelevant — that's for P/E ratio."
      }
    ]
  },
  {
    id: "stockdiv",
    category: "Equities",
    title: "Stock Dividends & Splits",
    color: "#4ECDC4",
    analogy: "Same pizza, more slices. A warehouse redrawn into more units — same square footage, more doors, each worth less. The ex-date owner gets the new slices.",
    rule: "Total position value never changes. Shares ↑, price per share ↓ proportionally.",
    watch: "The ex-date owner receives the dividend — not someone who buys on or after the ex-date.",
    quiz: [
      {
        q: "100 shares @ $25. Company declares 25% stock dividend. Result?",
        options: ["100 shares @ $25", "125 shares @ $25", "125 shares @ $20", "100 shares @ $20"],
        answer: 2,
        explain: "100 × 1.25 = 125 shares. Total value stays $2,500, so price adjusts: $2,500 ÷ 125 = $20."
      },
      {
        q: "100 shares @ $25. Company does a 2-for-1 stock split. Result?",
        options: ["50 shares @ $50", "200 shares @ $12.50", "200 shares @ $25", "100 shares @ $12.50"],
        answer: 1,
        explain: "2-for-1 doubles shares, halves price. 200 × $12.50 = $2,500. Same total value."
      }
    ]
  },
  {
    id: "affiliates",
    category: "Regulations",
    title: "Affiliate Status & Rule 144",
    color: "#FF6B6B",
    analogy: "Married couples share a storage unit. The building rule: if your combined unit holds 10%+ of the building's total stuff, you need a permit to move anything out. Both names on the lease = combined count.",
    rule: "Spouses' ownership aggregates. Combined ≥ 10% = affiliate = Form 144 required to sell.",
    watch: "It doesn't matter that he only owns 2% individually. 9% + 2% = 11% ≥ 10%.",
    quiz: [
      {
        q: "Wife owns 9%, husband owns 2% and wants to sell. Which is true?",
        options: ["Not an affiliate, no Form 144", "Affiliate, must file Form 144", "Not an affiliate, must file Form 144", "Affiliate, no Form 144 needed"],
        answer: 1,
        explain: "Spouses aggregate: 9% + 2% = 11% ≥ 10% threshold. He's an affiliate and must file Form 144 before selling."
      }
    ]
  },
  {
    id: "isos",
    category: "Tax",
    title: "ISOs vs NQSOs",
    color: "#A78BFA",
    analogy: "Grant = key to a locked door. Exercise = walking through. Sale = cashing out. The IRS shows up differently at each stage depending on option type.",
    rule: "ISO: no ordinary tax at exercise (but AMT applies). Taxed only at sale. NQSO: taxed as ordinary income at exercise — payroll, wages, employer deduction.",
    watch: "ISO favorable treatment LOST if sold before 1yr from exercise OR 2yrs from grant. AMT still hits at exercise.",
    quiz: [
      {
        q: "Which statement about ISOs is FALSE?",
        options: [
          "Long-term gain if holding period satisfied",
          "Exercise does not create taxable income",
          "Favorable treatment lost if sold < 1yr/exercise or < 2yr/grant",
          "Exercise creates income for AMT purposes"
        ],
        answer: 1,
        explain: "B is false — exercise DOES create AMT income, even though it's not regular taxable income. The question was an 'except' trap."
      }
    ]
  },
  {
    id: "bonds_features",
    category: "Bonds",
    title: "Bond Features & Borrowing Cost",
    color: "#F97316",
    analogy: "Convertible = hidden lottery ticket. Investor accepts lower coupon because they might get equity upside. Callable = issuer's get-out-of-jail card. Investor demands more yield to compensate.",
    rule: "Features that benefit investor → issuer pays less. Features that benefit issuer → issuer pays more.",
    watch: "For CONVERTIBLE bonds specifically: call protection is most valuable when the STOCK PRICE is rising — not when rates fall.",
    quiz: [
      {
        q: "Which feature lets a corporation borrow at the lowest interest rate?",
        options: ["Zero-coupon", "Cumulative", "Callable", "Convertible"],
        answer: 3,
        explain: "Convertible gives investors equity upside — they accept a lower coupon in exchange. Callable benefits the issuer, so investors demand MORE yield to compensate."
      },
      {
        q: "Unsecured long-term corporate debt is called a:",
        options: ["Collateral trust bond", "Mortgage bond", "Debenture", "Equipment trust certificate"],
        answer: 2,
        explain: "Debenture = no collateral, backed only by creditworthiness. The others have physical backing: real estate, securities, or equipment."
      },
      {
        q: "Call protection on a convertible bond is most valuable when:",
        options: ["Rates are rising", "Rates are stable", "The underlying stock price is rising", "Rates are falling"],
        answer: 2,
        explain: "Convertibles track stock price more than rates. Rising stock = company wants to call it back before you convert. Protection lets you ride the appreciation."
      },
      {
        q: "Convertible bond at $1,000 par, convertible at $83.33/share. Conversion ratio?",
        options: ["1.2 shares", "2 shares", "12 shares", "8 shares"],
        answer: 2,
        explain: "$1,000 ÷ $83.33 = 12 shares. Formula: par value ÷ conversion price = conversion ratio."
      }
    ]
  },
  {
    id: "discount",
    category: "Bonds",
    title: "Discount vs Interest-Bearing",
    color: "#34D399",
    analogy: "Two vending machines: Discount machine — put in $97, get $100 at the end (gap is your return). Interest machine — put in $100, it pays you coins along the way AND returns $100.",
    rule: "Pays explicit interest → NOT a discount instrument. Return baked into price gap → discount instrument.",
    watch: "GNMA pays monthly (mirrors mortgage payments). T-bills, zero-coupon, commercial paper = discount. Jumbo CDs = interest-bearing.",
    quiz: [
      {
        q: "Which is UNLIKELY to be issued at a discount?",
        options: ["Zero-coupon bond", "Commercial paper", "Treasury bill", "Jumbo CD"],
        answer: 3,
        explain: "Jumbo CDs pay explicit interest on top of your deposit. Discount instruments bake the return into the price gap — CDs don't work that way."
      },
      {
        q: "Which does NOT pay interest semiannually?",
        options: ["Treasury note", "Public utility bond", "GNMA", "Treasury bond"],
        answer: 2,
        explain: "GNMA passes through mortgage payments — homeowners pay monthly, so GNMA pays monthly. Everything else listed pays semiannually."
      }
    ]
  },
  {
    id: "municipal",
    category: "Regulations",
    title: "Municipal Securities & Tax Equivalence",
    color: "#60A5FA",
    analogy: "Municipal = government address on the envelope. State, city, toll authority — all count. A private company with 'full faith and credit' language is still just a corporate bond.",
    rule: "Muni = government issuer only. Tax-equiv yield = corporate yield × (1 - tax rate).",
    watch: "Munis pay less but are tax-free federally. The formula finds the muni yield that nets the same after-tax income.",
    quiz: [
      {
        q: "Which is NOT a municipal security?",
        options: ["NJ Turnpike revenue bond", "City of Atlanta library bond", "Illinois Tool Company debt", "State of Texas GO bond"],
        answer: 2,
        explain: "Illinois Tool Company is a private corporation. Municipal = government issuer only — state, city, or government authority."
      },
      {
        q: "Client in 35% bracket owns 7% corporate bonds. Equivalent muni yield?",
        options: ["7.00%", "9.45%", "2.45%", "4.55%"],
        answer: 3,
        explain: "7% × (1 - 0.35) = 7% × 0.65 = 4.55%. The muni pays less but tax-free income nets the same after-tax result."
      }
    ]
  },
  {
    id: "sovereign",
    category: "Global",
    title: "Sovereign Debt & Bond Sensitivity",
    color: "#F472B6",
    analogy: "Sovereign = a country's name on the bond. Longer maturity = more exposure to rate changes, like being locked into a lease for 30 years vs 5. CDs don't get repriced because they're not traded.",
    rule: "Sovereign debt = national government issuer. Longer maturity = more interest rate sensitive. CDs = least sensitive (not traded).",
    watch: "The CD question: even a nearly-mature Treasury bond gets marked to market. A CD sitting at the bank does not.",
    quiz: [
      {
        q: "An investor in sovereign debt would most likely buy:",
        options: ["Sweden 2.5s of 2032", "European Central Bank debt", "Bank of the United States bonds", "Bonds backed by gold sovereigns"],
        answer: 0,
        explain: "Sweden is a sovereign nation. ECB is an institution, not a country. 'Bank of the United States' doesn't exist. Gold sovereigns are coins."
      },
      {
        q: "Which is LEAST likely to be impacted by interest rate changes?",
        options: ["A bank CD maturing in 5 years", "A laddered bond portfolio", "A convertible preferred stock", "A Treasury bond issued 25 years ago with 30-yr maturity"],
        answer: 0,
        explain: "CDs aren't traded on exchanges so they don't get repriced when rates move. Bonds — even nearly-mature ones — are marked to market continuously."
      }
    ]
  }
];

const allQuestions = CONCEPTS.flatMap(c =>
  c.quiz.map(q => ({ ...q, category: c.category, conceptTitle: c.title, color: c.color }))
);

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function StudyGuide() {
  const [mode, setMode] = useState("home");
  const [activeCard, setActiveCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [quizQuestions] = useState(() => shuffle(allQuestions));
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const concept = CONCEPTS[activeCard];
  const currentQ = quizQuestions[quizIndex];

  const handleAnswer = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === currentQ.answer) setScore(s => s + 1);
    else setWrongAnswers(w => [...w, { ...currentQ, chosen: i }]);
  };

  const nextQuestion = () => {
    if (quizIndex + 1 >= quizQuestions.length) setFinished(true);
    else { setQuizIndex(q => q + 1); setSelected(null); }
  };

  const resetQuiz = () => {
    setQuizIndex(0); setSelected(null); setScore(0);
    setFinished(false); setWrongAnswers([]);
  };

  const pct = Math.round((score / quizQuestions.length) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "#09090f", color: "#ede9e0", fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* Sub-nav */}
      <div style={{ borderBottom: "1px solid #1a1a26", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0c0c14" }}>
        <div style={{ fontSize: 10, letterSpacing: 4, color: "#444", textTransform: "uppercase" }}>
          Series 65 · Today's Misses
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[["home", "Overview"], ["flashcards", "Flashcards"], ["quiz", "Quiz"]].map(([m, label]) => (
            <button key={m} onClick={() => { setMode(m); setFlipped(false); }}
              style={{ padding: "6px 14px", background: mode === m ? "#ede9e0" : "transparent", color: mode === m ? "#09090f" : "#555", border: `1px solid ${mode === m ? "#ede9e0" : "#2a2a3a"}`, borderRadius: 3, cursor: "pointer", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontFamily: "inherit", transition: "all 0.15s" }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* HOME */}
      {mode === "home" && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 28px" }}>
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 11, letterSpacing: 4, color: "#444", textTransform: "uppercase", margin: "0 0 12px" }}>Built from your session today</p>
            <h1 style={{ fontSize: 32, fontWeight: "normal", margin: "0 0 16px", lineHeight: 1.3 }}>8 concepts. {allQuestions.length} questions.</h1>
            <p style={{ fontSize: 14, color: "#555", maxWidth: 520, lineHeight: 1.8, margin: 0 }}>
              Each card includes the spatial analogy that works for how you think. When stuck under exam pressure, go back to the physical space.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14, marginBottom: 48 }}>
            {CONCEPTS.map((c, i) => (
              <div key={c.id} onClick={() => { setActiveCard(i); setMode("flashcards"); setFlipped(false); }}
                style={{ padding: "22px", background: "#0f0f18", border: "1px solid #1a1a26", borderLeft: `3px solid ${c.color}`, borderRadius: 6, cursor: "pointer", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#141420"}
                onMouseLeave={e => e.currentTarget.style.background = "#0f0f18"}>
                <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 8 }}>{c.category}</div>
                <div style={{ fontSize: 15, fontWeight: "bold", color: c.color, marginBottom: 6 }}>{c.title}</div>
                <div style={{ fontSize: 11, color: "#444" }}>{c.quiz.length} question{c.quiz.length !== 1 ? "s" : ""}</div>
              </div>
            ))}
          </div>

          <div style={{ padding: "24px", background: "#0f0f18", border: "1px solid #1a1a26", borderRadius: 6 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 12 }}>Your memory stack</div>
            <div style={{ fontSize: 13, color: "#666", lineHeight: 1.9 }}>
              Strongest encoding: <span style={{ color: "#ede9e0" }}>spatial + visual</span> (warehouse, vending machine, rental unit).<br />
              Secondary: <span style={{ color: "#ede9e0" }}>narrative</span> — try building a character who walks through Grant → Exercise → Sale for ISO questions.<br />
              Numbers to own cold: <span style={{ color: "#ede9e0" }}>10% affiliate threshold · 1yr/2yr ISO holding · $83.33 conversion price math</span>
            </div>
          </div>
        </div>
      )}

      {/* FLASHCARDS */}
      {mode === "flashcards" && (
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <span style={{ fontSize: 11, color: "#444" }}>{activeCard + 1} of {CONCEPTS.length}</span>
            <div style={{ display: "flex", gap: 6 }}>
              {CONCEPTS.map((c, i) => (
                <div key={i} onClick={() => { setActiveCard(i); setFlipped(false); }}
                  style={{ width: 7, height: 7, borderRadius: "50%", background: i === activeCard ? c.color : "#222", cursor: "pointer", transition: "all 0.2s" }} />
              ))}
            </div>
          </div>

          <div onClick={() => setFlipped(f => !f)}
            style={{ background: "#0f0f18", border: `1px solid ${flipped ? concept.color + "55" : "#1a1a26"}`, borderLeft: `4px solid ${concept.color}`, borderRadius: 10, padding: "36px", minHeight: 300, cursor: "pointer", transition: "border-color 0.3s", userSelect: "none" }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 6 }}>{concept.category}</div>
            <div style={{ fontSize: 21, fontWeight: "bold", color: concept.color, marginBottom: 28 }}>{concept.title}</div>

            {!flipped ? (
              <div>
                <div style={{ fontSize: 14, color: "#666", fontStyle: "italic", lineHeight: 1.8, marginBottom: 24 }}>"{concept.analogy}"</div>
                <div style={{ fontSize: 10, color: "#333", letterSpacing: 2, textTransform: "uppercase" }}>tap to see the rule →</div>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: "#555", textTransform: "uppercase", marginBottom: 10 }}>The Rule</div>
                  <div style={{ fontSize: 15, color: "#ede9e0", lineHeight: 1.7, fontWeight: "bold" }}>{concept.rule}</div>
                </div>
                <div style={{ padding: "14px 18px", background: "#14130a", border: "1px solid #2a2800", borderRadius: 6 }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: "#E8C547", textTransform: "uppercase", marginBottom: 8 }}>⚠ Watch out</div>
                  <div style={{ fontSize: 13, color: "#888", lineHeight: 1.7 }}>{concept.watch}</div>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "space-between" }}>
            <button onClick={() => { setActiveCard(i => Math.max(0, i - 1)); setFlipped(false); }} disabled={activeCard === 0}
              style={{ padding: "10px 22px", background: "transparent", color: activeCard === 0 ? "#2a2a2a" : "#666", border: `1px solid ${activeCard === 0 ? "#1a1a1a" : "#2a2a3a"}`, borderRadius: 4, cursor: activeCard === 0 ? "default" : "pointer", fontFamily: "inherit", fontSize: 12 }}>
              ← prev
            </button>
            <button onClick={() => setMode("quiz")}
              style={{ padding: "10px 22px", background: concept.color, color: "#09090f", border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: "bold" }}>
              quiz me
            </button>
            <button onClick={() => { setActiveCard(i => Math.min(CONCEPTS.length - 1, i + 1)); setFlipped(false); }} disabled={activeCard === CONCEPTS.length - 1}
              style={{ padding: "10px 22px", background: "transparent", color: activeCard === CONCEPTS.length - 1 ? "#2a2a2a" : "#666", border: `1px solid ${activeCard === CONCEPTS.length - 1 ? "#1a1a1a" : "#2a2a3a"}`, borderRadius: 4, cursor: activeCard === CONCEPTS.length - 1 ? "default" : "pointer", fontFamily: "inherit", fontSize: 12 }}>
              next →
            </button>
          </div>
        </div>
      )}

      {/* QUIZ */}
      {mode === "quiz" && !finished && (
        <div style={{ maxWidth: 660, margin: "0 auto", padding: "48px 28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}>
            <span style={{ fontSize: 11, color: "#444" }}>{quizIndex + 1} / {quizQuestions.length}</span>
            <span style={{ fontSize: 11, color: "#444" }}>Score: <span style={{ color: "#34D399" }}>{score}</span></span>
          </div>

          <div style={{ marginBottom: 10, fontSize: 10, letterSpacing: 3, color: currentQ.color, textTransform: "uppercase" }}>{currentQ.category} — {currentQ.conceptTitle}</div>
          <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 32, lineHeight: 1.5 }}>{currentQ.q}</div>

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
                  style={{ padding: "15px 18px", background: bg, border: `1px solid ${border}`, borderRadius: 6, cursor: selected !== null ? "default" : "pointer", color: col, fontSize: 14, transition: "all 0.15s", lineHeight: 1.5 }}
                  onMouseEnter={e => { if (selected === null) e.currentTarget.style.borderColor = "#333"; }}
                  onMouseLeave={e => { if (selected === null) e.currentTarget.style.borderColor = "#1a1a26"; }}>
                  {opt}
                </div>
              );
            })}
          </div>

          {selected !== null && (
            <div style={{ marginTop: 20 }}>
              <div style={{ padding: "16px 18px", background: "#0a0f1a", border: "1px solid #1a2a3a", borderRadius: 6, marginBottom: 14 }}>
                <div style={{ fontSize: 9, letterSpacing: 2, color: "#60A5FA", textTransform: "uppercase", marginBottom: 8 }}>Why</div>
                <div style={{ fontSize: 13, color: "#888", lineHeight: 1.7 }}>{currentQ.explain}</div>
              </div>
              <button onClick={nextQuestion}
                style={{ width: "100%", padding: "14px", background: "#ede9e0", color: "#09090f", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 14, fontWeight: "bold", fontFamily: "inherit" }}>
                {quizIndex + 1 >= quizQuestions.length ? "See results" : "Next →"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* RESULTS */}
      {mode === "quiz" && finished && (
        <div style={{ maxWidth: 660, margin: "0 auto", padding: "48px 28px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 72, fontWeight: "bold", color: pct >= 80 ? "#34D399" : pct >= 60 ? "#E8C547" : "#FF6B6B", lineHeight: 1 }}>{pct}%</div>
            <div style={{ fontSize: 13, color: "#555", marginTop: 12 }}>
              {score} / {quizQuestions.length} correct · {pct >= 80 ? "Solid. Keep the pressure on." : pct >= 60 ? "Getting there. Review the misses below." : "Rough session — that's data. Review and retry."}
            </div>
          </div>

          {wrongAnswers.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 9, letterSpacing: 3, color: "#FF6B6B", textTransform: "uppercase", marginBottom: 16 }}>Missed — {wrongAnswers.length} question{wrongAnswers.length !== 1 ? "s" : ""}</div>
              {wrongAnswers.map((w, i) => (
                <div key={i} style={{ padding: "20px", background: "#0f0f18", border: "1px solid #1f0a0a", borderRadius: 8, marginBottom: 10 }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: w.color, textTransform: "uppercase", marginBottom: 8 }}>{w.conceptTitle}</div>
                  <div style={{ fontSize: 14, fontWeight: "bold", marginBottom: 12, lineHeight: 1.5 }}>{w.q}</div>
                  <div style={{ fontSize: 12, color: "#FF6B6B", marginBottom: 4 }}>You chose: {w.options[w.chosen]}</div>
                  <div style={{ fontSize: 12, color: "#34D399", marginBottom: 14 }}>Correct: {w.options[w.answer]}</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7, borderTop: "1px solid #1a1a26", paddingTop: 14 }}>{w.explain}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={resetQuiz}
              style={{ flex: 1, padding: "14px", background: "#ede9e0", color: "#09090f", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: "bold", fontFamily: "inherit" }}>
              Try again
            </button>
            <button onClick={() => setMode("home")}
              style={{ flex: 1, padding: "14px", background: "transparent", color: "#666", border: "1px solid #2a2a3a", borderRadius: 6, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>
              Back to overview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
