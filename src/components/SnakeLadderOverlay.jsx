import React from 'react'
import { snakes, ladders } from '../data/exploits'

function squareToCoords(square) {
  const BOARD_SIZE = 10
  const index = square - 1
  const row = Math.floor(index / BOARD_SIZE) // bottom = 0
  const isEvenRow = row % 2 === 0
  const col = isEvenRow ? index % BOARD_SIZE : BOARD_SIZE - 1 - (index % BOARD_SIZE)

  const x = (col + 0.5) * 10
  const y = 100 - (row + 0.5) * 10

  return { x, y }
}

export default function SnakeLadderOverlay({ highlight }) {
  return (
    <svg
      className="overlay"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="snake-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#fb7185" />
        </filter>
        <filter id="ladder-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#22c55e" />
        </filter>
      </defs>

      {Object.entries(snakes).map(([fromStr, to]) => {
        const from = Number(fromStr)
        const start = squareToCoords(from)
        const end = squareToCoords(to)
        const midX = (start.x + end.x) / 2
        const midY = (start.y + end.y) / 2 + 8

        const active = highlight?.type === 'snake' && highlight.square === from

        return (
          <g key={from} className={`snake-group ${active ? 'snake-active' : ''}`}>
            <path
              d={`M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`}
              stroke="#e11d48"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              className="snake-body"
            />
            {/* Snake Head */}
            <circle cx={start.x} cy={start.y} r="1.5" fill="#e11d48" className="snake-head" />
            <g transform={`translate(${start.x}, ${start.y})`}>
              <circle cx="-0.8" cy="-0.8" r="0.4" fill="white" />
              <circle cx="0.8" cy="-0.8" r="0.4" fill="white" />
              <circle cx="-0.8" cy="-0.8" r="0.2" fill="black" />
              <circle cx="0.8" cy="-0.8" r="0.2" fill="black" />
            </g>
            {/* Snake Tail */}
            <path
              d={`M ${end.x} ${end.y} l -1 -1 l 1 0 z`}
              fill="#e11d48"
              className="snake-tail"
            />
          </g>
        )
      })}

      {Object.entries(ladders).map(([fromStr, to]) => {
        const from = Number(fromStr)
        const start = squareToCoords(from)
        const end = squareToCoords(to)

        const dx = end.x - start.x
        const dy = end.y - start.y
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI
        const length = Math.sqrt(dx * dx + dy * dy)

        const active = highlight?.type === 'ladder' && highlight.square === from
        const ladderWidth = 3
        const numRungs = Math.floor(length / 5)

        return (
          <g
            key={from}
            transform={`translate(${start.x}, ${start.y}) rotate(${angle})`}
            className={`ladder-group ${active ? 'ladder-active' : ''}`}
            filter="url(#ladder-glow)"
          >
            {/* Rails */}
            <rect
              y={-ladderWidth / 2 + 0.5}
              width={length}
              height="0.5"
              fill="#22c55e"
            />
            <rect
              y={ladderWidth / 2 - 1 + 0.5}
              width={length}
              height="0.5"
              fill="#22c55e"
            />
            {/* Rungs */}
            {Array.from({ length: numRungs }).map((_, idx) => (
              <rect
                key={idx}
                x={((idx + 1) * length) / (numRungs + 1)}
                y={-ladderWidth / 2}
                width="0.5"
                height={ladderWidth}
                fill="#22c55e"
              />
            ))}
          </g>
        )
      })}
    </svg>
  )
}
