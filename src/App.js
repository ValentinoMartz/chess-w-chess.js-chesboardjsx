import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";

const container = {
  marginTop: "2rem",
  display: "flex",
  justifyContent: "space-around",
  alignItem: "center",
};

function App() {
  const [fen, setFen] = useState("start");

  let game = new useRef(null);

  useEffect(() => {
    game.current = new Chess();
  }, []);

  const onDrop = ({ sourceSquare, targetSquare }) => {
    let move = game.current.move({
      from: sourceSquare,
      to: targetSquare,
    });
    if (move === null) return;

    setFen(game.current.fen());
  };

  const resetGame = () => {
    game.current.clear();
    game.current.reset();
    setFen("start");
  };

  return (
    <>
      {game.current && game.current.isGameOver() ? (
        <div style={{ textAlign: "center" }}>
          <h1>Game Over</h1>
          <button onClick={resetGame}>Play Again</button>
        </div>
      ) : (
        <span style={{ textAlign: "center" }}>
          <h1>Game</h1>
        </span>
      )}
      <div className="App" style={container}>
        <Chessboard position={fen} onDrop={onDrop} />
      </div>
    </>
  );
}

export default App;
