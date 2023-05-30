import React from "react";
import '../css/App.css';

function Boxscore({gameStats}) {

    const boxscoreHeaders = [""];
    const awayLine = [gameStats.away_team.abbreviation]
    const homeLine = [gameStats.home_team.abbreviation]
    let finalScoreIndex;

    // fill in headers/away scores
    gameStats.away_period_scores.forEach((s, idx) => {
        boxscoreHeaders.push((++idx).toString());
        awayLine.push(s);
    })
    // fill in home scores
    gameStats.home_period_scores.forEach((s, idx) => {
        homeLine.push(s);
    })

    // league specific columns
    if (gameStats.league === "MLB") {
        finalScoreIndex = boxscoreHeaders.length;
        boxscoreHeaders.push("R");
        boxscoreHeaders.push("H");
        boxscoreHeaders.push("E");
        boxscoreHeaders.push(""); // game state
        awayLine.push(gameStats.away_batter_totals.runs);
        awayLine.push(gameStats.away_batter_totals.hits);
        awayLine.push(gameStats.away_errors);
        awayLine.push(""); // would be the count if I had examples of what that json looks like
        homeLine.push(gameStats.home_batter_totals.runs);
        homeLine.push(gameStats.home_batter_totals.hits);
        homeLine.push(gameStats.home_errors);
        homeLine.push("Final"); // would be the inning/game state (only know what completed look like)
    }
    if (gameStats.league === "NBA") {
        finalScoreIndex = boxscoreHeaders.length;
        boxscoreHeaders.push("T");
        boxscoreHeaders.push(""); // game state
        awayLine.push(gameStats.away_totals.points);
        awayLine.push(""); // would be the time left in the period if I had examples of what that json looks like
        homeLine.push(gameStats.home_totals.points);
        homeLine.push("Final"); // would be the period/game state (only know what completed look like)
    }

    const getClassNameForCell = (idx, abbr, boldColumnList) => {
        // check if start index - use abbr for class name to color cell
        if (idx === 0) {
            return `${abbr} bold`;
        }

        // check if index is the final score or last column
        if (boldColumnList.includes(idx)) {
            return "bold";
        }
        // if (idx === finalScoreIndex || idx === lastIndex) {
        //     return "bold";
        // }
    }

    return (
        <div className="boxscore-wrapper">
        <table className="boxscore">
            <thead>
                <tr>
                    {boxscoreHeaders.map((header, idx) => (
                        <th key={header + idx}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
            <tr>
                {awayLine.map((a, idx) => (
                    <td className={getClassNameForCell(idx, a, [awayLine.length - 1, finalScoreIndex])} key={idx}>{a}</td>
                ))}
            </tr>
            <tr>
                {homeLine.map((h, idx) => (
                    <td className={getClassNameForCell(idx, h, [homeLine.length - 1, finalScoreIndex])} key={idx}>{h}</td>
                ))}
            </tr>
            </tbody>
        </table>
        </div>
    );
}

export default Boxscore;
