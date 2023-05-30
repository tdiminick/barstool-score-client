import React from "react";
import '../css/App.css';

function NbaPlayerStats({gameStats}) {
    
    function getTeamStats(stats) {
        const headers = [
            <div className="player-stat-line-header">
                <div className="player-name">
                </div>
                <div className="player-stats">
                    <div className="stat">Minutes</div>
                    <div className="stat">Points</div>
                    <div className="stat">Assists</div>
                    <div className="stat">Rebounds</div>
                </div>
            </div>
        ]
        return headers.concat(stats.map(stat => (
            <div key={stat.display_name} className="player-stat-line">
                <div className="player-name">
                    {stat.display_name + ` (${stat.position})`}
                </div>
                <div className="player-stats">
                    <div className="stat">{stat.minutes}</div>
                    <div className="stat">{stat.points}</div>
                    <div className="stat">{stat.assists}</div>
                    <div className="stat">{stat.defensive_rebounds + stat.offensive_rebounds}</div>
                </div>
            </div>            
        )));
    }

    return ( 
        <div className="playerstats-container">
            <div className="stats-header">Player Stats</div>
            <div className="playerstats-flexbox">
                <div className="team-container">
                    <div className="team-header-container">
                        <div className={`team-header ${gameStats.away_team.abbreviation}`}>{gameStats.away_team.abbreviation}</div>
                    </div>
                    {getTeamStats(gameStats.away_stats)}
                </div>
                <div className="divider"></div>
                <div className="team-container">
                    <div className="team-header-container">
                        <div className="team-header">{gameStats.home_team.abbreviation}</div>
                    </div>
                    {getTeamStats(gameStats.home_stats)}
                </div>
            </div>
        </div>
    )
}

export default NbaPlayerStats;
