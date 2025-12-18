export default function ScoreBoard({ onRestart }) {
  return (
    <button className="restart-btn" onClick={onRestart}>
      Restart Game
    </button>
  );
}
