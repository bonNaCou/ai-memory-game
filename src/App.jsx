import { useEffect, useState } from "react";
import GameBoard from "./components/GameBoard";
import cardsData from "./data/cards";
import "./styles/index.css";

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function App() {
  const [cards, setCards] = useState(() => shuffle(cardsData));
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [moves, setMoves] = useState(0);

  const handleCardClick = (index) => {
    if (
      isChecking ||
      flippedCards.includes(index) ||
      matchedCards.includes(index)
    ) {
      return;
    }

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      setMoves((m) => m + 1);
    }
  };

  useEffect(() => {
    if (flippedCards.length !== 2) return;

    const [first, second] = flippedCards;

    if (cards[first].emoji === cards[second].emoji) {
      setMatchedCards((prev) => [...prev, first, second]);
      setFlippedCards([]);
      setIsChecking(false);
    } else {
      setTimeout(() => {
        setFlippedCards([]);
        setIsChecking(false);
      }, 900);
    }
  }, [flippedCards, cards]);

  const resetGame = () => {
    setCards(shuffle(cardsData));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setIsChecking(false);
  };

  const hasWon = matchedCards.length === cards.length;

  return (
    <div className="app">
      <h1>AI Memory Game 🎮</h1>
      <p>Moves: {moves}</p>

      {hasWon && (
        <div className="win">
          <h2>🎉 You Win!</h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}

      <GameBoard
        cards={cards}
        flipped={[...flippedCards, ...matchedCards]}
        handleCardClick={handleCardClick}
      />

      <button onClick={resetGame} className="reset">
        Restart Game
      </button>
    </div>
  );
}

export default App;
