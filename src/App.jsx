import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";
import { cardsData } from "./data/cards";
import "./App.css";

const difficulties = {
  Easy: { pairs: 4, columns: 4 },
  Medium: { pairs: 6, columns: 4 },
  Hard: { pairs: 8, columns: 4 },
};

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [difficulty, setDifficulty] = useState("Easy");
  const [stage, setStage] = useState(1);
  const [moves, setMoves] = useState(0);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [cards, setCards] = useState([]);

  // 🔊 SOUND REFS (CORRECT WAY)
  const flipSound = useRef(null);
  const matchSound = useRef(null);
  const winSound = useRef(null);

  // Load sounds AFTER mount
  useEffect(() => {
    flipSound.current = new Audio("/sounds/flip.mp3");
    matchSound.current = new Audio("/sounds/match.mp3");
    winSound.current = new Audio("/sounds/win.mp3");
  }, []);

  useEffect(() => {
    startGame();
  }, [difficulty, stage]);

  function startGame() {
    const { pairs } = difficulties[difficulty];
    const selected = shuffle(cardsData).slice(0, pairs);
    const deck = shuffle(
      [...selected, ...selected].map((c, i) => ({
        ...c,
        uid: `${c.id}-${i}`,
      }))
    );

    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  }

  function playSound(sound) {
    if (!sound) return;
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }

  function handleCardClick(card) {
    if (
      flipped.length === 2 ||
      flipped.includes(card.uid) ||
      matched.includes(card.uid)
    )
      return;

    playSound(flipSound.current);
    setFlipped(prev => [...prev, card.uid]);
  }

  useEffect(() => {
    if (flipped.length === 2) {
      setMoves(m => m + 1);

      const [a, b] = flipped;
      const cardA = cards.find(c => c.uid === a);
      const cardB = cards.find(c => c.uid === b);

      if (cardA.id === cardB.id) {
        playSound(matchSound.current);
        setMatched(prev => [...prev, a, b]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  }, [flipped]);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      playSound(winSound.current);
      setTimeout(() => setStage(s => s + 1), 1200);
    }
  }, [matched]);

  return (
    <div className="app">
      <Header
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        stage={stage}
        moves={moves}
      />

      {matched.length === cards.length && cards.length > 0 && (
        <div className="win-banner">
          🎉 Stage {stage} Complete!
          <button onClick={startGame}>Play Again</button>
        </div>
      )}

      <div className="board-wrapper">
        <GameBoard
          cards={cards}
          flipped={[...flipped, ...matched]}
          handleCardClick={handleCardClick}
          columns={difficulties[difficulty].columns}
        />
      </div>

      <ScoreBoard onRestart={startGame} />
    </div>
  );
}
