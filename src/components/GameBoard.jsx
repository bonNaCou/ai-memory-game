import Card from "./Card";

export default function GameBoard({
  cards,
  flipped,
  handleCardClick,
  columns,
}) {
  return (
    <div
      className="game-board"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {cards.map(card => (
        <Card
          key={card.uid}
          card={card}
          isFlipped={flipped.includes(card.uid)}
          handleClick={() => handleCardClick(card)}
        />
      ))}
    </div>
  );
}
