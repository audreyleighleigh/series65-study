import { useState, useMemo } from "react";

const STORAGE_KEY = "s65-journal-entries";

function loadEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {}
}

function formatDate(iso) {
  const d = new Date(iso);
  const opts = { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" };
  return d.toLocaleString(undefined, opts);
}

function preview(text, len = 120) {
  const stripped = text.replace(/\s+/g, " ").trim();
  return stripped.length > len ? stripped.slice(0, len) + "…" : stripped;
}

export default function SessionJournal() {
  const [entries, setEntries] = useState(loadEntries);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState({});

  const persist = (next) => {
    setEntries(next);
    saveEntries(next);
  };

  const addEntry = () => {
    const text = draft.trim();
    if (!text) return;
    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      text,
    };
    persist([entry, ...entries]);
    setDraft("");
  };

  const deleteEntry = (id) => {
    if (!confirm("Delete this entry?")) return;
    persist(entries.filter(e => e.id !== id));
  };

  const toggleExpand = (id) => {
    setExpanded(p => ({ ...p, [id]: !p[id] }));
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter(e => e.text.toLowerCase().includes(q));
  }, [entries, query]);

  return (
    <div className="j-wrap">
      <style>{`
        .j-wrap { max-width: 900px; margin: 0 auto; padding: 32px 20px 80px; color: #e8e0d0; font-family: 'Source Code Pro', monospace; }
        .j-eyebrow { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #666; margin-bottom: 8px; }
        .j-h1 { font-family: 'Playfair Display', serif; font-size: clamp(32px, 6vw, 56px); font-weight: 900; line-height: 1; margin: 0 0 4px; color: #f0e8d8; letter-spacing: -0.02em; }
        .j-h1 span { color: #60A5FA; }
        .j-sub { font-size: 11px; color: #555; margin: 14px 0 24px; letter-spacing: 0.08em; line-height: 1.6; }
        .j-composer { background: #111009; border: 1px solid #1e1c1a; border-radius: 6px; padding: 14px; margin-bottom: 28px; }
        .j-textarea { width: 100%; min-height: 100px; padding: 10px 12px; background: #0c0b09; border: 1px solid #2a2824; border-radius: 4px; color: #e8e0d0; font-family: inherit; font-size: 12px; line-height: 1.6; resize: vertical; }
        .j-textarea:focus { outline: none; border-color: #60A5FA; }
        .j-composer-actions { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }
        .j-hint { font-size: 10px; color: #444; letter-spacing: 0.08em; }
        .j-save { background: none; border: 1px solid #60A5FA; border-radius: 4px; color: #60A5FA; cursor: pointer; font-family: inherit; font-size: 10px; letter-spacing: 0.15em; padding: 8px 18px; text-transform: uppercase; transition: all 0.15s; }
        .j-save:hover { background: #0e1a2a; }
        .j-save:disabled { opacity: 0.3; cursor: not-allowed; }
        .j-search { width: 100%; padding: 10px 12px; margin-bottom: 20px; background: #141210; border: 1px solid #2a2824; border-radius: 4px; color: #e8e0d0; font-family: inherit; font-size: 12px; }
        .j-search:focus { outline: none; border-color: #60A5FA; }
        .j-empty { text-align: center; padding: 40px 20px; color: #444; font-size: 12px; }
        .j-entry { background: #111009; border: 1px solid #1e1c1a; border-radius: 6px; margin-bottom: 10px; overflow: hidden; }
        .j-entry-head { display: flex; align-items: center; gap: 12px; padding: 12px 14px; cursor: pointer; background: #141210; user-select: none; }
        .j-entry-head:hover { background: #171410; }
        .j-entry-date { font-size: 11px; color: #888; letter-spacing: 0.05em; white-space: nowrap; }
        .j-entry-preview { font-size: 11px; color: #666; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-left: 4px; }
        .j-chev { font-size: 9px; color: #383530; transition: transform 0.2s; display: inline-block; }
        .j-chev.open { transform: rotate(180deg); }
        .j-entry-body { background: #0c0b09; border-top: 1px solid #181614; padding: 14px 18px; }
        .j-entry-text { font-size: 12px; color: #b8b0a0; line-height: 1.7; white-space: pre-wrap; word-break: break-word; }
        .j-entry-actions { margin-top: 12px; padding-top: 10px; border-top: 1px solid #1e1c1a; text-align: right; }
        .j-delete { background: none; border: none; color: #555; cursor: pointer; font-family: inherit; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; padding: 4px 8px; }
        .j-delete:hover { color: #c0392b; }
      `}</style>

      <div className="j-eyebrow">Series 65 Study</div>
      <h1 className="j-h1">Journal<span>.</span></h1>
      <div className="j-sub">
        {entries.length} {entries.length === 1 ? "ENTRY" : "ENTRIES"} · SAVED LOCALLY · SEARCHABLE
      </div>

      <div className="j-composer">
        <textarea
          className="j-textarea"
          placeholder="How did today's study go? What did you nail? What still feels shaky? Anything you want to revisit next session?"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <div className="j-composer-actions">
          <div className="j-hint">Freeform. Timestamped on save.</div>
          <button
            className="j-save"
            onClick={addEntry}
            disabled={!draft.trim()}
          >
            Save Entry
          </button>
        </div>
      </div>

      {entries.length > 0 && (
        <input
          className="j-search"
          type="text"
          placeholder={`Search ${entries.length} entries…`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}

      {entries.length === 0 && (
        <div className="j-empty">
          No entries yet. After a study session, jot down what you got, what you missed, and what to revisit — you'll spot patterns over time.
        </div>
      )}

      {entries.length > 0 && filtered.length === 0 && (
        <div className="j-empty">No entries match "{query}"</div>
      )}

      {filtered.map((e) => {
        const isOpen = !!expanded[e.id];
        return (
          <div className="j-entry" key={e.id}>
            <div className="j-entry-head" onClick={() => toggleExpand(e.id)}>
              <div className="j-entry-date">{formatDate(e.createdAt)}</div>
              {!isOpen && <div className="j-entry-preview">{preview(e.text)}</div>}
              <span className={`j-chev ${isOpen ? "open" : ""}`}>▼</span>
            </div>
            {isOpen && (
              <div className="j-entry-body">
                <div className="j-entry-text">{e.text}</div>
                <div className="j-entry-actions">
                  <button className="j-delete" onClick={() => deleteEntry(e.id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
