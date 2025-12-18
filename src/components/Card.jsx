function Card({ card, handleClick, isFlipped }) {
  return (
    <div className="card" onClick={handleClick}>
      {isFlipped ? card.emoji : "❓"}
    </div>
  );
}

export default Card;
