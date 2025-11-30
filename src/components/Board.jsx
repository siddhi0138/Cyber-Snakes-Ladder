import React, { useEffect, useRef, useState } from 'react'
import { snakes, ladders, snakeDetails, ladderDetails } from '../data/exploits'
import SnakeLadderOverlay from './SnakeLadderOverlay.jsx'

const BOARD_SIZE = 10

function getSquareInfo(num) {
  if (snakes[num]) {
    const info = snakeDetails[num]
    return { type: 'snake', icon: info?.icon || '⚠', title: info?.title || 'Snake' }
  }
  if (ladders[num]) {
    const info = ladderDetails[num]
    return { type: 'ladder', icon: info?.icon || '🛡', title: info?.title || 'Ladder' }
  }
  return null
}

export default function Board({ players, onSquareClick, highlight }) {
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        console.warn('Background music could not be played automatically.')
      })
    }
  }, [])

  // NOTE: You will need to add a music file at `public/sounds/background-music.mp3`
  const backgroundMusicSrc = '/sounds/background-music.mp3';


  const squares = []

  for (let row = BOARD_SIZE - 1; row >= 0; row--) {
    const rowSquares = []
    for (let col = 0; col < BOARD_SIZE; col++) {
      const index = row * BOARD_SIZE + (row % 2 === 0 ? col + 1 : BOARD_SIZE - col)
      rowSquares.push(index)
    }
    squares.push(...rowSquares)
  }

  return (
    <section className="board-wrapper">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src={backgroundMusicSrc} loop muted={false} />
      <div className="board">
        <div className="board-grid">
          {squares.map((num) => {
            const info = getSquareInfo(num)
            const playersHere = players.filter((p) => p.position === num)

            const isHighlighted =
              highlight && highlight.square === num && (highlight.type === info?.type)

            return (
              <button
                key={num}
                className={`square ${
                  info?.type === 'snake'
                    ? 'square-snake'
                    : info?.type === 'ladder'
                    ? 'square-ladder'
                    : ''
                } ${isHighlighted ? 'square-highlight' : ''}`}
                onClick={() => info && onSquareClick(num, info.type)}
                title={info ? info.title : `Square ${num}`}
              >
                <div className="square-number">{num}</div>
                {info && (
                  <div className="square-tag">
                    <span className="square-icon">{info.icon}</span>
                  </div>
                )}
                <div className="square-players">
                  {playersHere.map((p) => (
                    <span
                      key={p.id}
                      className="token"
                      style={{ background: p.color }}
                      title={p.name}
                    >
                      {p.name[0]}
                    </span>
                  ))}
                </div>
              </button>
            )
          })}
        </div>
        <SnakeLadderOverlay highlight={highlight} />
      </div>
    </section>
  )
}
