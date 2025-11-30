// src/components/Intro.jsx
import React from "react";
import SnakeLadderOverlay from "./SnakeLadderOverlay";
import { allSnakes, allLadders } from "../data/exploits";

export default function Intro({ playersConfig, setPlayersConfig, onStart }) {
  const handlePlayerCountChange = (e) => {
    const count = Number(e.target.value);

    setPlayersConfig((prev) => {
      const nextPlayers = [...prev.players];
      const defaults = [
        { name: "Blue", color: "#00d4ff" },
        { name: "Magenta", color: "#ff4de1" },
        { name: "Green", color: "#22c55e" },
        { name: "Orange", color: "#f97316" },
      ];

      while (nextPlayers.length < count) {
        const idx = nextPlayers.length;
        nextPlayers.push({
          id: idx + 1,
          position: 0, // All players start at position 0
          ...defaults[idx],
        });
      }

      while (nextPlayers.length > count) {
        nextPlayers.pop();
      }

      return { ...prev, players: nextPlayers };
    });
  };

  const handleNameChange = (idx, value) => {
    setPlayersConfig((prev) => {
      const players = prev.players.map((p, i) =>
        i === idx
          ? {
              ...p,
              name: value,
            }
          : p
      );
      return { ...prev, players };
    });
  };

  const threats = [
    {
      key: "SQL Injection",
      label: "SQL Injection",
      info: "Tamper with DB queries using untrusted input.",
    },
    {
      key: "XSS",
      label: "Cross-Site Scripting",
      info: "Inject JS into pages viewed by other users.",
    },
    {
      key: "CredStuff",
      label: "Credential Stuffing",
      info: "Reuse leaked passwords to hijack accounts.",
    },
    {
      key: "MitM",
      label: "Man-in-the-Middle",
      info: "Intercept and modify traffic in transit.",
    },
    {
      key: "RCE",
      label: "Remote Code Exec",
      info: "Exploit a bug to run code on a server.",
    },
    {
      key: "PrivEsc",
      label: "Privilege Escalation",
      info: "Turn basic access into full admin control.",
    },
    {
      key: "ZeroTrust",
      label: "Zero Trust",
      info: "Defend by verifying every request.",
    },
    {
      key: "SupplyChain",
      label: "Supply Chain",
      info: "Poison dependencies or build pipelines.",
    },
  ];

  return (
    <>
      {/* INLINE STYLES – everything lives in this file */}
      <style>{`
        :root {
          color-scheme: dark;
        }
        body {
          margin: 0;
          background: radial-gradient(circle at top, #111827 0, #020617 55%);
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .intro-root {
          max-width: 1120px;
          margin: 0 auto;
          padding: 1.8rem 1.5rem 2.5rem;
          color: #f9fafb;
          position: relative;
          overflow: hidden;
        }
        .intro-layout {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 2.5rem;
          align-items: flex-start;
        }
        .intro-left-title {
          padding-right: 1rem;
        }
        .intro-title {
          margin: 0 0 0.4rem;
          font-size: clamp(2.1rem, 3vw, 2.7rem);
          letter-spacing: 0.08em;
          line-height: 1.1;
          color: #e0f2fe;
        }
        .intro-subtitle {
          margin: 0;
          color: #9ca3af;
          font-size: 0.95rem;
        }
        .intro-subtitle span {
          color: #38bdf8;
        }

        .intro-card,
        .intro-panel {
          background: radial-gradient(circle at top left, #020617, #020617 60%, #020617 100%);
          border-radius: 18px;
          border: 1px solid rgba(55, 65, 81, 0.9);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.55);
          padding: 1rem 1.1rem;
        }
        .intro-card + .intro-card {
          margin-top: 1rem;
        }

        .intro-card h2 {
          margin: 0 0 0.7rem;
          font-size: 1.1rem;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .intro-card h2 span {
          font-size: 1.2rem;
        }

        /* Game setup */
        .field-label {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.86rem;
          margin-top: 0.4rem;
        }
        .select,
        .input {
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.85);
          background: #020617;
          color: #e5e7eb;
          padding: 0.45rem 0.8rem;
          font-size: 0.9rem;
          width: 100%;
        }
        .select:focus,
        .input:focus {
          outline: none;
          border-color: #38bdf8;
          box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.45);
        }
        .players-form {
          margin-top: 0.8rem;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }
        .player-row {
          display: flex;
          align-items: center;
          gap: 0.55rem;
        }
        .player-badge {
          width: 26px;
          height: 26px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
          color: #020617;
          box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.9);
        }
        .button-primary {
          border-radius: 999px;
          border: none;
          padding: 0.55rem 1.4rem;
          margin-top: 1rem;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          background: linear-gradient(90deg, #22d3ee, #3b82f6, #a855f7);
          color: #020617;
          box-shadow: 0 18px 40px rgba(56, 189, 248, 0.4);
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }
        .button-primary:hover {
          filter: brightness(1.05);
        }

        /* Right column panels */
        .panel-title-line {
          margin: 0 0 0.6rem;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          letter-spacing: 0.04em;
        }
        .panel-title-line span {
          font-size: 1.1rem;
        }
        .panel-body-list {
          margin: 0.2rem 0 0.2rem;
          padding-left: 1.1rem;
          font-size: 0.9rem;
          color: #d1d5db;
        }
        .panel-body-list li + li {
          margin-top: 0.15rem;
        }

        .pill-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
          margin-top: 0.65rem;
        }
        .pill {
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.7);
          padding: 0.35rem 0.65rem;
          font-size: 0.8rem;
          display: inline-flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.25rem;
          background: radial-gradient(circle at top left, #020617, #020617 70%, #020617 100%);
          color: #e5e7eb;
        }
        .pill-label {
          font-weight: 500;
        }
        .pill-info {
          color: #9ca3af;
        }

        .mini-section {
          margin-top: 0.8rem;
          padding-top: 0.65rem;
          border-top: 1px solid rgba(31, 41, 55, 0.9);
        }
        .mini-section-title {
          margin: 0 0 0.2rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #e5e7eb;
        }
        .mini-text {
          margin: 0;
          font-size: 0.82rem;
          color: #9ca3af;
        }

        @media (max-width: 900px) {
          .intro-layout {
            grid-template-columns: minmax(0, 1fr);
          }
          .intro-left-title {
            padding-right: 0;
          }
        }
      `}</style>

      <div className="intro-root">
        {/* BACKGROUND VISUAL */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            zIndex: -1,
            opacity: 0.3,
            filter: 'blur(5px)',
          }}
        >
          <SnakeLadderOverlay />
        </div>
        {/* PAGE HEADER */}
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <h1 className="intro-title">Cyber Snakes &amp; Ladders</h1>
          <p className="intro-subtitle">
            A multiplayer board game to explore{' '}
            <span>real-world cyber exploits &amp; defenses</span>.
          </p>
        </div>

        <div className="intro-layout">
          {/* LEFT COLUMN – game setup */}
          <div>
            <div className="intro-card">
              <h2>
                <span>🎮</span> Game Setup
              </h2>

              <label className="field-label">
                Number of players
                <select
                  className="select"
                  value={playersConfig.players.length}
                  onChange={handlePlayerCountChange}
                >
                  <option value={2}>2 Players</option>
                  <option value={3}>3 Players</option>
                  <option value={4}>4 Players</option>
                </select>
              </label>

              <div className="players-form">
                {playersConfig.players.map((p, idx) => (
                  <div key={p.id} className="player-row">
                    <span
                      className="player-badge"
                      style={{ background: p.color }}
                    >
                      P{idx + 1}
                    </span>
                    <input
                      className="input"
                      value={p.name}
                      placeholder={`Player ${idx + 1} name`}
                      onChange={(e) => handleNameChange(idx, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center' }}>
                <button className="button-primary" onClick={onStart}>
                  ▶ Start Game
                </button>
              </div>
            </div>
            
            <section className="intro-panel" style={{ marginTop: "1.1rem" }}>
              <div className="panel-title-line">
                <span>⚔️</span>
                <strong>Threat Landscape</strong>
              </div>
              <div className="pill-row">
                {threats.map((t) => (
                  <div key={t.key} className="pill">
                    <span className="pill-label">{t.label}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN – concepts / threat landscape */}
          
          <div style={{ marginTop: '0' }}>
            <section className="intro-panel">
              <div className="panel-title-line">
                <span>📘</span>
                <strong>How to Play</strong>
              </div>
              <ul className="panel-body-list">
                <li>🎲 Roll the dice and move your token across the board.</li>
                <li>🪜 Landing on a ladder means a security defense boosts you.</li>
                <li>🐍 Landing on a snake means a real cyber exploit pulls you back.</li>
                <li>🏆 First player to reach square 100 wins the cyber race.</li>
              </ul>
            </section>

            <section className="intro-panel" style={{ marginTop: '1.1rem' }}>
              <div className="panel-title-line">
                <span></span>
                <span>🧠</span>
                <strong>Key Concepts</strong>
              </div>

              <div className="mini-section" style={{ borderTop: 'none' }}>
                <p className="mini-section-title">🐍 What's a Snake? (Exploits)</p>
                <p className="mini-text">
                  Represent real cyber attacks such as SQL Injection, XSS, credential stuffing, MitM,
                  and supply-chain attacks.
                </p>
              </div>

              <div className="mini-section">
                <p className="mini-section-title">🪜 What's a Ladder? (Defenses)</p>
                <p className="mini-text">
                  Represent security controls like MFA, validation &amp; encoding, network
                  segmentation, monitoring, and zero-trust.
                </p>
              </div>

              <div className="mini-section">
                <p className="mini-section-title">🗺️ Board Mapping</p>
                <p className="mini-text">
                  Every special square has an icon. Click it during the game to open a full
                  explanation: description, cause, impact, and fix.
                </p>
              </div>

              <div className="mini-section">
                <p className="mini-section-title">💡 Facilitator Tip</p>
                <p className="mini-text">
                  After each event, pause and ask: “Where have we seen this in the real world?”
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
