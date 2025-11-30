import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Dice from './components/Dice';
import ThreatBriefing from './components/ThreatBriefing'; // Assuming you have this component
import { snakes, ladders } from './data/exploits';

const Game = ({ initialPlayers }) => {
  const [players, setPlayers] = useState(initialPlayers);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [winner, setWinner] = useState(null);
  const [isDiceDisabled, setIsDiceDisabled] = useState(false);
  const [highlight, setHighlight] = useState(null);
  const [gameMessage, setGameMessage] = useState('');

  const currentPlayer = players[currentPlayerIndex];

  useEffect(() => {
    setGameMessage(`${currentPlayer.name}'s turn to roll!`);
  }, [currentPlayerIndex, currentPlayer.name]);

  const handleRoll = (diceValue) => {
    setIsDiceDisabled(true);
    setHighlight(null); // Clear previous highlight
    setGameMessage(`${currentPlayer.name} rolled a ${diceValue}!`);

    const newPosition = currentPlayer.position + diceValue;

    // Move player after a short delay
    setTimeout(() => {
      movePlayer(currentPlayerIndex, newPosition);
    }, 500);
  };

  const movePlayer = (playerIndex, position) => {
    const playerToMove = players[playerIndex];
    let finalPosition = position;

    // Check for win condition
    if (finalPosition >= 100) {
      finalPosition = 100;
      setPlayers((prevPlayers) =>
        prevPlayers.map((p) => (p.id === playerToMove.id ? { ...p, position: finalPosition } : p))
      );
      setWinner(playerToMove);
      setGameMessage(`${playerToMove.name} wins! 🎉`);
      setIsDiceDisabled(true);
      return;
    }

    // Check for snakes or ladders
    const snakeTarget = snakes[finalPosition];
    const ladderTarget = ladders[finalPosition];

    let landedOn = null;

    if (snakeTarget) {
      landedOn = { type: 'snake', from: finalPosition, to: snakeTarget };
      finalPosition = snakeTarget;
    } else if (ladderTarget) {
      landedOn = { type: 'ladder', from: finalPosition, to: ladderTarget };
      finalPosition = ladderTarget;
    }

    // Update player position
    setPlayers((prevPlayers) =>
      prevPlayers.map((p) => (p.id === playerToMove.id ? { ...p, position: finalPosition } : p))
    );

    // If landed on a snake or ladder, set the highlight
    if (landedOn) {
      // *** FIX: Set highlight with the CURRENT player, BEFORE advancing the turn ***
      setHighlight({
        type: landedOn.type,
        square: landedOn.from,
        player: playerToMove, // Correctly use the player who just moved
      });
      setGameMessage(
        `${playerToMove.name} landed on a ${landedOn.type}! Moving from ${landedOn.from} to ${landedOn.to}.`
      );
    }

    // Wait for animations/reading time, then advance to the next player
    setTimeout(() => {
      advanceTurn();
    }, 1500);
  };

  const advanceTurn = () => {
    setHighlight(null); // Clear highlight when turn advances
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    setIsDiceDisabled(false);
  };

  // This is a placeholder for your briefing component.
  // You should have a component that renders this information.
  const renderBriefing = () => {
    if (!highlight) return null;
    // Assuming you have a ThreatBriefing component that takes these props
    return (
      <ThreatBriefing
        player={highlight.player}
        square={highlight.square}
        type={highlight.type}
      />
    );
  };

  return (
    <div className="game-container">
      <div className="game-board-area">
        <Board players={players} highlight={highlight} onSquareClick={() => {}} />
      </div>
      <div className="game-controls-area">
        <h2>{gameMessage}</h2>
        <Dice onRoll={handleRoll} disabled={isDiceDisabled || !!winner} />
        {renderBriefing()}
        {winner && (
          <div className="winner-panel">
            <h3>Game Over!</h3>
            <p>{winner.name} is the winner!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;