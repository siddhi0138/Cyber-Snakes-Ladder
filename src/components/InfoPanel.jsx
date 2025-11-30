import React from 'react'
import { snakeDetails, ladderDetails } from '../data/exploits'

export default function InfoPanel({ lastEvent, currentPlayerName }) {
  let title = 'Welcome to Cyber Snakes & Ladders'
  let body =
    'Roll the dice, move across the board, and click any snake or ladder icon to read a short briefing on that attack or defense.'

  if (lastEvent?.type === 'snake') {
    const info = snakeDetails[lastEvent.square]
    if (info) {
      title = `Snake: ${info.title}`
      body = `${info.summary} This was triggered when ${currentPlayerName} landed on square ${lastEvent.square}.`
    }
  } else if (lastEvent?.type === 'ladder') {
    const info = ladderDetails[lastEvent.square]
    if (info) {
      title = `Ladder: ${info.title}`
      body = `${info.summary} ${currentPlayerName} climbed from ${lastEvent.from} to ${lastEvent.to}.`
    }
  } else if (lastEvent?.type === 'move') {
    title = 'Player moved'
    body = `${currentPlayerName} moved to square ${lastEvent.to}.`
  } else if (lastEvent?.type === 'start') {
    title = 'New Game'
    body =
      'All players start at square 1. First to reach square 100 wins. Landing on a snake shows you a real exploit; landing on a ladder shows a real defense.'
  }

  return (
    <section className="panel">
      <h2>📡 Threat Briefing</h2>
      <div className="panel-card">
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </section>
  )
}
