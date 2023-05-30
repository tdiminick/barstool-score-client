import React from "react";
import '../css/App.css';

function MlbPlayerStats({gameStats}) {
    
    function getPitcherStats(pitchingStats) {
        const headers = [
            <div key="-1" className="player-stat-line-header">
                <div className="player-name">
                </div>
                <div className="player-stats">
                    <div className="stat">Innings</div>
                    <div className="stat">Earned Runs</div>
                    <div className="stat">Strikeouts</div>
                    <div className="stat">Walks</div>
                </div>
            </div>
        ]
        return headers.concat(pitchingStats.map(stat => (
            <div key={stat.display_name} className="player-stat-line">
                <div className="player-name">
                    {stat.display_name}
                </div>
                <div className="player-stats">
                    <div className="stat">{stat.innings_pitched}</div>
                    <div className="stat">{stat.earned_runs}</div>
                    <div className="stat">{stat.strike_outs}</div>
                    <div className="stat">{stat.walks}</div>
                </div>
            </div>            
        )));
    }

    function getBatterStats(batterStats) {
        const headers = [
            <div key="-1" className="player-stat-line-header">
                <div className="player-name">
                </div>
                <div className="player-stats">
                    <div className="stat">At Bats</div>
                    <div className="stat">Hits</div>
                    <div className="stat">Home Runs</div>
                    <div className="stat">Strike Outs</div>
                </div>
            </div>
        ]
        return headers.concat(batterStats.map(stat => (
            <div key={stat.display_name} className="player-stat-line">
                <div className="player-name">
                    {stat.display_name}
                </div>
                <div className="player-stats">
                    <div className="stat">{stat.at_bats}</div>
                    <div className="stat">{stat.hits}</div>
                    <div className="stat">{stat.home_runs}</div>
                    <div className="stat">{stat.strike_outs}</div>
                </div>
            </div>            
        )));
    }

    function getErrors(fieldingStats) {
        const errors = [];
        fieldingStats.forEach(stat => {
            if (stat.errors > 0) {
                errors.push(`${stat.display_name} (${stat.errors})`)
            }
        });

        let displayStr = "No errors";
        if (errors.length > 0) {
            displayStr = `Errors: ${errors.join()}`;
        }

        return <div className="errors">{displayStr}</div>;
    }

    function statBox(heading, away_abbr, home_abbr, mainFunc, away_main_list, home_main_list, away_error_list, home_error_list) {
        return (
            <div className="playerstats-flexbox">
                <div className="scoreboard-header-section">{heading}</div>
                <div className="team-container">
                    <div className="team-header-container">
                        <div className={`team-header ${away_abbr}`}>{away_abbr}</div>
                    </div>
                    {mainFunc(away_main_list)}
                    {away_error_list ? getErrors(away_error_list): ""}
                </div>
                <div className="divider"></div>
                <div className="team-container">
                    <div className="team-header-container">
                        <div className={`team-header ${home_abbr}`}>{home_abbr}</div>
                    </div>
                    {mainFunc(home_main_list)}
                    {home_error_list ? getErrors(home_error_list): ""}
                </div>
            </div>
        )
    }

    return ( 
        <div className="playerstats-container">
            <div className="stats-header">Player Stats</div>
            {statBox("Batting", gameStats.away_team.abbreviation, gameStats.home_team.abbreviation, getBatterStats, gameStats.away_batters, gameStats.home_batters)}
            {statBox("Pitching", gameStats.away_team.abbreviation, gameStats.home_team.abbreviation, getPitcherStats, gameStats.away_pitchers, gameStats.home_pitchers, gameStats.away_fielding, gameStats.home_fielding)}
        </div>
    )
}

export default MlbPlayerStats;
