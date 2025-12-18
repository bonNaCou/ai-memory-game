export default function Card({ card, isFlipped, handleClick }) {
  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
      onClick={handleClick}
    >
      {isFlipped ? card.emoji : "❓"}
    </div>
  );
}
