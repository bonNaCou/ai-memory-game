import "./Header.css";

export default function Header({ difficulty, setDifficulty, stage, moves }) {
  return (
    <div className="header">
      <h1>AI Memory Game 🎮</h1>
      <p className="subtitle">Match all cards using the fewest moves</p>

      <div className="header-bar">
        <span>🎯 Moves: {moves}</span>
        <span>🏆 Stage: {stage}</span>

        <select
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>
    </div>
  );
}
