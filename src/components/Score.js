import React from "react";
import '../css/App.css';
import { prettyDate } from '../utils.js';

function Score({gameStats}) {
    let awayScore = 0, homeScore = 0;

    if (gameStats.league === "MLB") {
        awayScore = gameStats.away_batter_totals.runs;
        homeScore = gameStats.home_batter_totals.runs;
    } else if (gameStats.league === "NBA") {
        awayScore = gameStats.away_totals.points;
        homeScore = gameStats.home_totals.points;
    }

    // these could each be their own components, depends on how granular you want to get
    // for this challenge, just stopping here
    const getTeamScoreCard = (abbr, full_name) => {
        return (
            <div className={`team-name ${abbr}`}>
                {abbr}
                <div className="subtitle">
                    {full_name}
                </div>
            </div>
        )
    }

    const getEventInfo = (league, date) => {
        return (
            <div className="game-state">
                <div className="league">
                    {league}
                </div>
                <div className="date">
                    {prettyDate(date)}
                </div>
            </div>            
        )
    }

    // if I had an api guide, could implement period/inning states
    const getGameState = () => {
        return (
            <div className="game-state">
                Final
            </div>
        )
    }

    return ( 
        <div className="scorebox-container">
            <div className="flexbox">
                {getTeamScoreCard(gameStats.away_team.abbreviation, gameStats.away_team.full_name)}
                {getEventInfo(gameStats.league, gameStats.event_information.start_date_time)}
                {getTeamScoreCard(gameStats.home_team.abbreviation, gameStats.home_team.full_name)}
            </div>
            <div className="flexbox">
                <div className="score">
                    {awayScore}
                </div>
                {getGameState()}
                <div className="score">
                    {homeScore}
                </div>
            </div>
        </div>
    )
}

export default Score;
