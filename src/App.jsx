import { useState } from "react";
import GameBoard from "./components/GameBoard";
import cardsData from "./data/cards";
import "./styles/index.css";

function App() {
  const [cards] = useState(
    cardsData.sort(() => Math.random() - 0.5)
  );
  const [flipped, setFlipped] = useState([]);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index)) return;
    setFlipped([...flipped, index]);
  };

  return (
    <div className="app">
      <h1>AI Memory Quest 🎮</h1>
      <GameBoard
        cards={cards}
        flipped={flipped}
        handleCardClick={handleCardClick}
      />
    </div>
  );
}

export default App;
