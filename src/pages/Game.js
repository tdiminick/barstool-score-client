import React from "react";
import '../css/App.css';
import { useParams } from 'react-router-dom';
import Score from '../components/Score';
import Boxscore from '../components/Boxscore';
import TeamStats from '../components/TeamStats';
import NbaPlayerStats from '../components/NbaPlayerStats';
import MlbPlayerStats from "../components/MlbPlayerStats";

function Game() {
    const { game_id } = useParams();
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch(`/game/${game_id}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data.message);
            })
            .catch((err) => {
                console.log('err fetching game data: ', err);
            })
    }, []);

    function getPlayerStats(gameStats) {
        if (gameStats.league === "NBA") {
            return <NbaPlayerStats gameStats={data} />
        } else if (gameStats.league === "MLB") {
            return <MlbPlayerStats gameStats={data} />
        }
    }

    return (
        !data ? "Loading..." : 
            <div className="game-stats">
                <Score gameStats={data} />
                <Boxscore gameStats={data} />
                <TeamStats gameStats={data} />
                {getPlayerStats(data)}
            </div>
    )
}

export default Game;
