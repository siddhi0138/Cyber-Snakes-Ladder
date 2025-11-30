import React, { useEffect, useState } from 'react'
import Intro from './components/Intro.jsx'
import Board from './components/Board.jsx'
import InfoPanel from './components/InfoPanel.jsx'
import Popup from './components/Popup.jsx'
import Dice from './components/Dice.jsx'
import { snakes, ladders, snakeDetails, ladderDetails } from './data/exploits'

const START_POS = 1 // Players start on square 1
const END_POS = 100

const defaultPlayers = [
  { id: 1, name: 'Blue', color: '#00d4ff', position: START_POS },
  { id: 2, name: 'Magenta', color: '#ff4de1', position: START_POS }
]

export default function App() {
  const [screen, setScreen] = useState('intro')
  const [players, setPlayers] = useState(defaultPlayers)
  const [turn, setTurn] = useState(0)
  const [lastEvent, setLastEvent] = useState({ type: 'start' })
  const [popup, setPopup] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)
  const [bgmOn, setBgmOn] = useState(false)
  const [highlight, setHighlight] = useState(null)

  const [playersConfig, setPlayersConfig] = useState({
    players: defaultPlayers
  })

  useEffect(() => {
    const audio = document.getElementById('bgm-audio')
    if (!audio) return
    audio.volume = 0.35
    if (bgmOn) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [bgmOn])

  useEffect(() => {
    if (!autoPlay || gameOver || screen !== 'game') return
    const id = setTimeout(() => {
      const fakeRoll = Math.floor(Math.random() * 6) + 1
      handleRoll(fakeRoll)
    }, 950)
    return () => clearTimeout(id)
  })

  const startGameFromIntro = () => {
    const initialPlayers = playersConfig.players.map((p, idx) => ({
      ...p,
      id: idx + 1,
      position: START_POS
    }))
    setPlayers(initialPlayers)
    setTurn(0)
    setLastEvent({ type: 'start' })
    setPopup(null)
    setGameOver(false)
    setScreen('game')
  }

  const resetBoard = () => {
    setPlayers((prev) => prev.map((p) => ({ ...p, position: START_POS })))
    setTurn(0)
    setLastEvent({ type: 'start' })
    setPopup(null)
    setGameOver(false)
    setHighlight(null)
  }

  const handleRoll = (roll) => {
    if (gameOver || screen !== 'game') return

    setPlayers((prev) => {
      const updated = [...prev]
      const currentIndex = turn % updated.length
      const current = { ...updated[currentIndex] }

      // Rule: Must roll a 6 to start
      if (current.position === START_POS && !current.hasMoved && roll !== 6) {
        setLastEvent({
          type: 'stuck',
          roll,
          player: current,
        })
        // Don't advance turn if player rolls a 6, they get to go again
        if (roll !== 6) {
          setTimeout(() => {
            setTurn((t) => (t + 1) % updated.length)
          }, 150)
        }
        return prev // No position change
      }

      current.hasMoved = true; // Mark player as having moved
      let target = current.position + roll

      if (target > END_POS) {
        setLastEvent({
          type: 'move',
          player: current,
          from: current.position,
          to: current.position,
          roll
        })
        return prev
      }

      let eventType = 'move'
      let popupData = null
      let triggerSquare = target

      if (snakes[target]) {
        const from = target
        triggerSquare = from
        target = snakes[target]
        const info = snakeDetails[from]
        eventType = 'snake'
        popupData = {
          title: `🐍 Snake: ${info?.title || 'Exploit'}`,
          subtitle: `You landed on square ${from} and slid down to ${target}.`,
          description: info?.description,
          cause: info?.cause,
          impact: info?.impact,
          fix: info?.fix
        }
      } else if (ladders[target]) {
        const from = target
        triggerSquare = from
        target = ladders[target]
        const info = ladderDetails[from]
        eventType = 'ladder'
        popupData = {
          title: `🪜 Ladder: ${info?.title || 'Defense'}`,
          subtitle: `You climbed from square ${from} up to ${target}.`,
          description: info?.description,
          cause: info?.cause,
          impact: info?.impact,
          fix: info?.fix
        }
      } else {
        popupData = {
          title: `Move: +${roll}`,
          subtitle: `You moved to square ${target}.`,
          description: 'This move was safe. But the board is full of potential exploits and defenses.',
          cause: '',
          impact: '',
          fix: 'Tip: click on any snake or ladder icon on the board to open its full details.'
        }
      }

      current.position = target
      updated[currentIndex] = current

      setLastEvent({
        type: eventType,
        from: prev[currentIndex].position,
        to: target,
        roll,
        player: current, // *** FIX: Pass the current player with the event ***
        square: triggerSquare
      })

      if (eventType === 'snake' || eventType === 'ladder') {
        setHighlight({ type: eventType, square: triggerSquare })
        setTimeout(() => setHighlight(null), 900)
      } else {
        setHighlight(null)
      }

      setPopup(popupData)

      if (target === END_POS) {
        setGameOver(true)
        setPopup((existing) => ({
          ...(existing || {}),
          title: `🏆 ${current.name} wins!`,
          subtitle: `Reached square ${END_POS}.`,
          description:
            'You successfully navigated the cyber threat landscape by understanding exploits and stacking defenses.',
          impact:
            'In real life, the board never ends. Security is an ongoing process of patching, monitoring, and improving.',
          fix: 'Use what you learned from each card to design better defenses in your own projects.'
        }))
      } else {
        // Rule: Roll again on a 6
        if (roll !== 6) {
          setTurn((t) => (t + 1) % updated.length)
        }
      }

      return updated
    })
  }

  const handleSquareClick = (square, type) => {
    if (type === 'snake') {
      const info = snakeDetails[square]
      setPopup({
        title: `🐍 Snake: ${info?.title || 'Exploit'}`,
        subtitle: `Exploit card at square ${square}`,
        description: info?.description,
        cause: info?.cause,
        impact: info?.impact,
        fix: info?.fix
      })
    } else if (type === 'ladder') {
      const info = ladderDetails[square]
      setPopup({
        title: `🪜 Ladder: ${info?.title || 'Defense'}`,
        subtitle: `Defense card at square ${square}`,
        description: info?.description,
        cause: info?.cause,
        impact: info?.impact,
        fix: info?.fix
      })
    }
  }

  const currentPlayer = players[turn % players.length]

  return (
    <>
      <audio id="bgm-audio" src="/sounds/background-music.mp3" loop style={{ display: 'none' }} />

      {screen === 'intro' ? (
        <Intro
          playersConfig={playersConfig}
          setPlayersConfig={setPlayersConfig}
          onStart={startGameFromIntro}
        />
      ) : (
        <div className="app">
          <header className="app-header">
            <div>
              <h1>Cyber Snakes & Ladders</h1>
              <p className="subtitle">
                Multiplayer board game to teach cybersecurity exploits and defenses.
              </p>
            </div>
            <div className="header-controls">
              <button className="button button-outline" onClick={() => setScreen('intro')}>
                ⬅ Back to intro
              </button>
              <button className="button button-outline" onClick={resetBoard}>
                Reset board
              </button>
              <button
                className={`button button-outline ${bgmOn ? 'button-on' : ''}`}
                onClick={() => setBgmOn((v) => !v)}
              >
                {bgmOn ? '🔊 Mute music' : '🎵 Play music'}
              </button>
              <button
                className={`button button-outline ${autoPlay ? 'button-on' : ''}`}
                onClick={() => setAutoPlay((v) => !v)}
              >
                {autoPlay ? '🤖 Stop auto' : '🤖 Auto play'}
              </button>
            </div>
          </header>

          <main className="layout">
            <Board players={players} onSquareClick={handleSquareClick} highlight={highlight} />
            <section className="right-column">
              <InfoPanel lastEvent={lastEvent} />
              <section className="panel panel-controls">
                <h2>🎲 Turn & Dice</h2>
                <p>
                  Current turn:{' '}
                  <span
                    className="badge"
                    style={{ background: currentPlayer?.color || '#00d4ff', marginLeft: '0.5rem' }}
                  >
                    {currentPlayer?.name || 'Player'}
                  </span>
                </p>
                <Dice onRoll={handleRoll} disabled={gameOver} />
                <p className="hint">
                  Land on a snake or ladder to open a full explanation: description, how it is
                  caused, impact, and how to fix / strengthen it.
                </p>
              </section>
            </section>
          </main>

          <footer className="app-footer">
            <p>
              Teaching tip: after each card appears, pause the game and ask players to share real
              examples of that exploit or defense from news or projects.
            </p>
          </footer>
        </div>
      )}

      {popup && (
        <Popup
          title={popup.title}
          subtitle={popup.subtitle}
          description={popup.description}
          cause={popup.cause}
          impact={popup.impact}
          fix={popup.fix}
          onClose={() => setPopup(null)}
        />
      )}
    </>
  )
}
