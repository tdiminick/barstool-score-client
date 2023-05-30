import React from "react";
import '../css/App.css';
import ScoreCard from '../components/ScoreCard'

function Scoreboard() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/scoreboard")
      .then((res) => res.json())
      .then((data) => {
        setData(data.message)
      })
  }, []);

  return (
    !data ? "Loading..." : 
        data.map((d) => (
            <div className="scoreboard-container" key={d.league}>
                <header className="scoreboard-header">
                    {d.league}
                </header>
                <div className="scoreboard-flexbox">
                    {d.scores.map((s) => (
                        <ScoreCard key={s.game_id} scoreboard={s} />
                    ))}
                </div>
            </div>
        ))
  );
}

export default Scoreboard;
