import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlayerTable from '../../components/PlayerTable/PlayerTable';
import useGetGame from '../../hooks/useGetGame';
import usePatchGame from '../../hooks/usePatchGame';
import usePatchPlayer from '../../hooks/usePatchPlayer';

import dice0 from '../../assets/dices/dice0.png';
import dice1 from '../../assets/dices/dice1.gif';
import dice2 from '../../assets/dices/dice2.gif';
import dice3 from '../../assets/dices/dice3.gif';
import dice4 from '../../assets/dices/dice4.gif';
import dice5 from '../../assets/dices/dice5.gif';
import dice6 from '../../assets/dices/dice6.gif';

import './Game.scss';


export default function Game() {
    const { id } = useParams();

    const { getGame } = useGetGame();

    const [game, setGame] = useState();
    const [result, setResult] = useState(0);
    const [animeEnded, setAnimationEnded] = useState(true);
    const [bestScore, setBestScore] = useState(0);
    
    const { patchPlayer } = usePatchPlayer();
    const { patchGame } = usePatchGame();

    let hasFetched = false;
    const dices = [dice0, dice1, dice2, dice3, dice4, dice5, dice6]

    useEffect(() => {
        async function retrieveGame() {
            let retrievedGame = await getGame(id);
            if (retrievedGame) {
                await setGame(retrievedGame);
            }
        }
        if (!hasFetched) {
            retrieveGame();
            hasFetched = true;
        }
    }, []);

    useEffect(() => {
        if (game && game.players && game.players.length > 0) {
            setBestScore(Math.max(...game.players.map(player => player.score <= 21 ? player.score : 0)));
        }
    }, [game])

    useEffect(() => {
        if (result !== 0) {
            const timeout = setTimeout(async () => {
                setAnimationEnded(true);
                const newScore = game.players[game.turn].score + result;  

                try {
                    await patchPlayer({score: newScore}, game.players[game.turn].id);
                    setGame((oldGame) => {
                        return {
                            ...oldGame,
                            players: oldGame.players.map((player, index) =>
                                index === oldGame.turn ? { ...player, score: newScore } : player
                            ),
                        };
                    });
                } catch (error) {
                    console.error(error)
                }

                if (newScore >= 21) {
                    endTurn();
                }
                if (newScore <= 21 && newScore > bestScore) {
                    setBestScore(newScore);
                }

                setResult(0);

            }, 3030); // GIF duration: 3030ms

            return () => clearTimeout(timeout);
        }
      }, [result]);
      

    function throwDices() {
        setAnimationEnded(false)
        const addScore = Math.floor(Math.random() * 6 ) + 1
        setResult(addScore);
    }

    async function endTurn() {
        try {
            await setGame(await patchGame({turn: game.turn + 1}, game.id));
        } catch (error) {
            console.error(error);
        }
        endGame()
    }

    async function endGame() {
        if (game.turn == game.players.length - 1) {
            try {
                await setGame(await patchGame({ended: true}, game.id));
            } catch (error) {
                console.error(error);
            }
        }
    }
    
    return(
        <>
            {game && (
                <div className='game'>
                    <h1>BLACK JACK</h1>
                    <h2>{game.name}</h2>
                    <h2>Best score : {bestScore}</h2>
                    <button onClick={() => throwDices()} disabled={game.ended || !animeEnded}>Throw dices</button>
                    <button onClick={() => endTurn()} disabled={game.ended || !animeEnded}>End Turn</button>
                    <div hidden={!game.ended}>
                        <h1>Game finished !</h1>
                        <p>Winners are :</p>
                        {game.players.filter(player => player.score === bestScore).map(player => <p key={player.id}>{player.name}</p>)}
                    </div>
                    <div className='playground'>
                        <img src={dices[result]} className={`throw`}/>                  
                        <PlayerTable players={game.players} turn={game.turn}/>
                    </div>
                </div>
            )}
        </>
    )
}