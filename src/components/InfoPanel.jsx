import React from 'react'
import { snakeDetails, ladderDetails } from '../data/exploits'

export default function InfoPanel({ lastEvent }) {
  let title = 'Welcome to Cyber Snakes & Ladders'
  let body =
    'Roll the dice, move across the board, and click any snake or ladder icon to read a short briefing on that attack or defense.'

  const playerName = lastEvent?.player?.name || 'Player';

  if (lastEvent?.type === 'snake') {
    const info = snakeDetails[lastEvent.square]
    if (info) {
      title = `Snake: ${info.title}`
      body = `${info.summary} This was triggered when ${playerName} landed on square ${lastEvent.square}.`
    }
  } else if (lastEvent?.type === 'ladder') {
    const info = ladderDetails[lastEvent.square]
    if (info) {
      title = `Ladder: ${info.title}`
      body = `${info.summary} ${playerName} climbed from ${lastEvent.from} to ${lastEvent.to}.`
    }
  } else if (lastEvent?.type === 'move') {
    title = 'Player moved'
    body = `${playerName} moved to square ${lastEvent.to}.`
  } else if (lastEvent?.type === 'stuck') {
    title = 'Still at the start!'
    body = `${playerName} rolled a ${lastEvent.roll}. You need to roll a 6 to start the game.`
  } else if (lastEvent?.type === 'start') {
    title = 'New Game'
    body = 'All players start off the board. You must roll a 6 to begin moving. The first player to reach square 100 wins!'
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
