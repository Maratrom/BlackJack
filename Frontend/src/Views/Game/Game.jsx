import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlayerTable from '../../components/PlayerTable/PlayerTable';
import useGetGame from '../../hooks/useGetGame';
import usePatchPlayer from '../../hooks/usePatchPlayer';

import dice1 from '../../assets/dices/dice1.gif';
import dice2 from '../../assets/dices/dice2.gif';
import dice3 from '../../assets/dices/dice3.gif';
import dice4 from '../../assets/dices/dice4.gif';
import dice5 from '../../assets/dices/dice5.gif';
import dice6 from '../../assets/dices/dice6.gif';


export default function Game() {
    const { id } = useParams();

    const { getGame } = useGetGame();

    const [game, setGame] = useState();
    const [turn, setTurn] = useState(1);
    const [result, setResult] = useState();
    const [anime, setAnimationEnded] = useState(false);
    
    const { patchPlayer } = usePatchPlayer();

    const dices = [dice1, dice2, dice3, dice4, dice5, dice6]

    useEffect(() => {
        async function retrieveGame() {
            const game = await getGame(id);
            if (game) {
                setGame(game);
            }
        }
        retrieveGame();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
          setAnimationEnded(true);
        }, 5050);
      
        return () => clearTimeout(timeout);
      }, [result]);
      

    function throwDices() {
        const newScore = Math.floor(Math.random() * 6 ) + 1
        setResult(newScore);
        console.log("newScore")
        console.log(newScore)
        setGame((oldGame) => {
            return {
                ...oldGame,
                players: oldGame.players.map((player, index) =>
                    index === turn - 1 ? { ...player, score: newScore } : player
                ),
            };
        });
        const response = patchPlayer({score: newScore}, game.players[turn - 1].id);
        setTurn(turn + 1);
        endGame();
    }

    function endGame() {
        if (turn == game.players.length) {
            console.log(`TERMINÉ`);
        }
    }

    // async function sendData(data, id) {
    //     try {
    //         const response = await patchPlayer(`http://localhost:8000/api/player/${id}`, data);
    //         console.log(response.data);
    //     } catch(error) {
    //         console.error(error);
    //     }
    // }

    return(
        <>
            {game && (
                <>
                    <h1>BLACK JACK</h1>
                    <h2>{game.name}</h2>
                    <h2>{game.score}</h2>
                    <button onClick={() => throwDices()}>Throw dices</button>
                    <span>Result: </span><span hidden={!anime}>{result}</span>
                    <img src={dices[result - 1]} alt="" />{/* PLAY ONCE DANS GIMP */}                    
                    <PlayerTable players={game.players} turn={turn}/>
                </>
            )}
        </>
    )
}