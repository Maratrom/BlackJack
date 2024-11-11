import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateGame from '../../hooks/useCreateGame';

import './CreateGame.css';

export default function CreateGame() {
    const [gameName, setGameName] = useState('');
    const [players, updatePlayers] = useState([""]);
    const [nbPlayers, setNbPlayers] = useState(1);
    const [playersEmpty, setPlayersEmpty] = useState(true);
    const navigate = useNavigate();

    const { createGame } = useCreateGame();

    useEffect(() => {
        playersHasEmpty();
    }, [players]);
    
    function sliderChange(newValue) {
        setNbPlayers(newValue);
        if (newValue < players.length) {
            updatePlayers(oldPlayers => {
                return oldPlayers.filter((_, i) => i !== newValue - 1)
            })
        } else if (newValue > players.length) {
            updatePlayers(oldPlayers => [...oldPlayers, ""])
        }
    }
    
    function playersHasEmpty() {
        for (const player of players) {
            if (!player) {
                setPlayersEmpty(true)
                return
            }
        }
        setPlayersEmpty(false)
    }

    async function handleCreateGame() {
        try {
            const response = await createGame({ name: gameName, players: players });
            navigate(`/game/${response.data.id}`);
        } catch (error) {
            console.error("Error on game creation : ", error);
        }
    }

    return(
        <>
            <h1>New Game Creation</h1>

            <label className='input-game-label'>
                Game name
                <input 
                    type='text' 
                    placeholder='Game name' 
                    value={gameName} 
                    onChange={(e) => {setGameName(e.target.value)}} className='input-game'></input>
            </label>

            <label className='input-game-label'>
                How many players ?  {nbPlayers} 
                <input 
                    type='range' 
                    min={1} max={10} step={1} 
                    value={nbPlayers} 
                    onChange={(e) => {sliderChange(e.target.value)}}
                />
            </label>

            <div className="inputs">
                {players.map((_, index) => (
                    <label key={index} className='input-player-label'>
                        Player {index + 1}
                        <input 
                            type='text' 
                            placeholder={`Player ${index + 1}`} 
                            value={players[index]} 
                            onChange={(e) => {updatePlayers(players.map((p, i) => i === index ? e.target.value : p))}} className='input-player'/>
                    </label>
                ))}
            </div>
            <button disabled={!gameName || playersEmpty} onClick={handleCreateGame}>Start Game</button>
            
        </>
    )
}