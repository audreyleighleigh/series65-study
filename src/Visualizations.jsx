import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const POSITIONS = [
  { id: "lc", label: "Long Call" },
  { id: "sc", label: "Short Call" },
  { id: "lp", label: "Long Put" },
  { id: "sp", label: "Short Put" },
];

function payoff(pos, S, K, P) {
  if (pos === "lc") return Math.max(S - K, 0) - P;
  if (pos === "sc") return P - Math.max(S - K, 0);
  if (pos === "lp") return Math.max(K - S, 0) - P;
  if (pos === "sp") return P - Math.max(K - S, 0);
  return 0;
}

function formatDollar(v) {
  if (v === "Unlimited") return "Unlimited";
  return "$" + v.toFixed(0);
}

function OptionsPayoffExplorer() {
  const [position, setPosition] = useState("lc");
  const [strike, setStrike] = useState(50);
  const [premium, setPremium] = useState(3);

  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const K = strike;
  const P = premium;
  const isCall = position === "lc" || position === "sc";
  const breakEven = isCall ? K + P : K - P;

  let maxGain, maxLoss;
  if (position === "lc") { maxGain = "Unlimited"; maxLoss = P * 100; }
  else if (position === "sc") { maxGain = P * 100; maxLoss = "Unlimited"; }
  else if (position === "lp") { maxGain = (K - P) * 100; maxLoss = P * 100; }
  else { maxGain = P * 100; maxLoss = (K - P) * 100; }

  useEffect(() => {
    if (!canvasRef.current) return;

    const lo = Math.max(0, K - 30);
    const hi = K + 30;
    const points = [];
    for (let S = lo; S <= hi; S += 1) points.push({ x: S, y: payoff(position, S, K, P) });

    const lineBase = "#e8e0d0";
    const gainColor = "#7EC8A4";
    const lossColor = "#FF6B6B";
    const gridColor = "#1e1c1a";
    const zeroLineColor = "#2e2c28";
    const axisColor = "#8a8272";
    const surface = "#141210";
    const cream = "#e8e0d0";

    const data = {
      datasets: [{
        label: "P/L",
        data: points,
        borderColor: lineBase,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0,
        segment: {
          borderColor: (ctx) => {
            const a = ctx.p0.parsed.y;
            const b = ctx.p1.parsed.y;
            if (a >= 0 && b >= 0) return gainColor;
            if (a <= 0 && b <= 0) return lossColor;
            return lineBase;
          },
        },
        fill: { target: { value: 0 } },
        backgroundColor: (c) => {
          const { ctx, chartArea } = c.chart;
          if (!chartArea) return "rgba(126, 200, 164, 0.08)";
          const g = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          g.addColorStop(0, "rgba(126, 200, 164, 0.14)");
          const zeroY = c.chart.scales.y.getPixelForValue(0);
          const stop = (zeroY - chartArea.top) / (chartArea.bottom - chartArea.top);
          g.addColorStop(Math.min(Math.max(stop, 0), 1), "rgba(126, 200, 164, 0)");
          g.addColorStop(Math.min(Math.max(stop, 0), 1), "rgba(255, 107, 107, 0)");
          g.addColorStop(1, "rgba(255, 107, 107, 0.14)");
          return g;
        },
      }],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: "index" },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: surface,
          titleColor: cream,
          bodyColor: cream,
          borderColor: "#2a2824",
          borderWidth: 1,
          titleFont: { family: "Source Code Pro, monospace", size: 11 },
          bodyFont: { family: "Source Code Pro, monospace", size: 12 },
          padding: 10,
          callbacks: {
            title: (items) => "Stock $" + items[0].parsed.x.toFixed(0),
            label: (item) => "P/L: $" + (item.parsed.y * 100).toFixed(0) + " / contract",
          },
        },
      },
      scales: {
        x: {
          type: "linear",
          min: lo,
          max: hi,
          title: {
            display: true,
            text: "Stock price at expiration",
            color: axisColor,
            font: { family: "Source Code Pro, monospace", size: 10 },
          },
          grid: { color: gridColor },
          ticks: {
            color: axisColor,
            font: { family: "Source Code Pro, monospace", size: 10 },
          },
        },
        y: {
          title: {
            display: true,
            text: "P/L per share",
            color: axisColor,
            font: { family: "Source Code Pro, monospace", size: 10 },
          },
          grid: {
            color: (c) => (c.tick.value === 0 ? zeroLineColor : gridColor),
            lineWidth: (c) => (c.tick.value === 0 ? 1.5 : 1),
          },
          ticks: {
            color: axisColor,
            font: { family: "Source Code Pro, monospace", size: 10 },
          },
        },
      },
    };

    if (chartRef.current) {
      chartRef.current.data = data;
      chartRef.current.options.scales.x.min = lo;
      chartRef.current.options.scales.x.max = hi;
      chartRef.current.update();
    } else {
      chartRef.current = new Chart(canvasRef.current, { type: "line", data, options });
    }

    return () => {};
  }, [position, K, P]);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  return (
    <div className="vz-section">
      <div className="vz-section-head">
        <div className="vz-section-dot" style={{ background: "#A78BFA" }} />
        <div className="vz-section-title">Options Payoff Explorer</div>
      </div>

      <div className="vz-posrow">
        {POSITIONS.map(p => (
          <button
            key={p.id}
            className={`vz-posbtn ${position === p.id ? "active" : ""}`}
            onClick={() => setPosition(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="vz-sliders">
        <div className="vz-slider">
          <label className="vz-slider-label">Strike</label>
          <input
            type="range"
            min="20"
            max="80"
            step="1"
            value={strike}
            onChange={(e) => setStrike(parseFloat(e.target.value))}
          />
          <span className="vz-slider-value">${strike}</span>
        </div>
        <div className="vz-slider">
          <label className="vz-slider-label">Premium</label>
          <input
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={premium}
            onChange={(e) => setPremium(parseFloat(e.target.value))}
          />
          <span className="vz-slider-value">${premium}</span>
        </div>
      </div>

      <div className="vz-stats">
        <div className="vz-stat">
          <div className="vz-stat-label">Break-even</div>
          <div className="vz-stat-value" style={{ color: "#f0e8d8" }}>
            ${breakEven.toFixed(2).replace(/\.00$/, "")}
          </div>
        </div>
        <div className="vz-stat">
          <div className="vz-stat-label">Max gain</div>
          <div className="vz-stat-value" style={{ color: "#7EC8A4" }}>
            {maxGain === "Unlimited" ? "Unlimited" : formatDollar(maxGain)}
          </div>
        </div>
        <div className="vz-stat">
          <div className="vz-stat-label">Max loss</div>
          <div className="vz-stat-value" style={{ color: "#FF6B6B" }}>
            {maxLoss === "Unlimited" ? "Unlimited" : formatDollar(maxLoss)}
          </div>
        </div>
      </div>

      <div className="vz-chart-wrap">
        <canvas ref={canvasRef} role="img" aria-label="Profit and loss line versus stock price at expiration" />
      </div>

      <div className="vz-caption">Per-share P/L at expiration. Contract multiplier = 100.</div>
    </div>
  );
}

export default function Visualizations() {
  return (
    <div className="vz-wrap">
      <style>{`
        .vz-wrap { max-width: 780px; margin: 0 auto; padding: 32px 20px 80px; color: #e8e0d0; font-family: 'Source Code Pro', monospace; }
        .vz-eyebrow { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #666; margin-bottom: 8px; }
        .vz-h1 { font-family: 'Playfair Display', serif; font-size: clamp(32px, 6vw, 56px); font-weight: 900; line-height: 1; margin: 0 0 4px; color: #f0e8d8; letter-spacing: -0.02em; }
        .vz-h1 span { color: #A78BFA; }
        .vz-sub { font-size: 11px; color: #555; margin: 14px 0 36px; letter-spacing: 0.08em; }

        .vz-section { margin-bottom: 48px; }
        .vz-section-head { display: flex; align-items: baseline; gap: 12px; padding: 8px 0 14px; border-bottom: 1px solid #1e1c1a; margin-bottom: 20px; }
        .vz-section-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; align-self: center; }
        .vz-section-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #f0e8d8; letter-spacing: -0.01em; }

        .vz-posrow { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; margin-bottom: 20px; }
        .vz-posbtn { background: none; border: 1px solid #2a2824; border-radius: 4px; color: #888; cursor: pointer; font-family: inherit; font-size: 10px; letter-spacing: 0.12em; padding: 10px 6px; text-transform: uppercase; transition: all 0.15s; }
        .vz-posbtn:hover { border-color: #4a4844; color: #b8b0a0; }
        .vz-posbtn.active { border-color: #A78BFA; color: #A78BFA; background: #1a172a; }

        .vz-sliders { display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px; padding: 16px 18px; background: #111009; border: 1px solid #1e1c1a; border-radius: 6px; }
        .vz-slider { display: flex; align-items: center; gap: 14px; }
        .vz-slider-label { font-size: 11px; color: #8a8272; letter-spacing: 0.15em; text-transform: uppercase; width: 68px; flex-shrink: 0; }
        .vz-slider input[type="range"] { flex: 1; -webkit-appearance: none; appearance: none; height: 4px; background: #1e1c1a; border-radius: 2px; outline: none; cursor: pointer; }
        .vz-slider input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 16px; height: 16px; background: #A78BFA; border-radius: 50%; cursor: pointer; border: 2px solid #0f0e0c; box-shadow: 0 0 0 1px #A78BFA; }
        .vz-slider input[type="range"]::-moz-range-thumb { width: 16px; height: 16px; background: #A78BFA; border-radius: 50%; cursor: pointer; border: 2px solid #0f0e0c; box-shadow: 0 0 0 1px #A78BFA; }
        .vz-slider-value { font-family: 'Source Code Pro', monospace; font-size: 13px; color: #A78BFA; font-weight: 600; min-width: 48px; text-align: right; }

        .vz-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-bottom: 24px; }
        .vz-stat { background: #111009; border: 1px solid #1e1c1a; border-radius: 6px; padding: 14px 14px; }
        .vz-stat-label { font-size: 10px; color: #666; letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 6px; }
        .vz-stat-value { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; line-height: 1.1; }

        .vz-chart-wrap { position: relative; width: 100%; height: 280px; background: #0c0b09; border: 1px solid #1e1c1a; border-radius: 6px; padding: 14px 12px; }
        .vz-caption { font-size: 10px; color: #555; margin-top: 12px; letter-spacing: 0.05em; font-style: italic; text-align: center; }

        @media (max-width: 500px) {
          .vz-posrow { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .vz-stats { grid-template-columns: 1fr; }
          .vz-slider-label { width: 60px; }
        }
      `}</style>

      <div className="vz-eyebrow">Series 65 Interactive</div>
      <h1 className="vz-h1">Visual<span>.</span></h1>
      <div className="vz-sub">TAP TO EXPLORE · MORE COMING</div>

      <OptionsPayoffExplorer />
    </div>
  );
}
