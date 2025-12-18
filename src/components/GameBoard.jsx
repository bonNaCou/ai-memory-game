import Card from "./Card";

function GameBoard({ cards, flipped, handleCardClick }) {
  return (
    <div className="grid">
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          isFlipped={flipped.includes(index)}
          handleClick={() => handleCardClick(index)}
        />
      ))}
    </div>
  );
}

export default GameBoard;
