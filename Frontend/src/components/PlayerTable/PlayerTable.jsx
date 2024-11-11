import { useState } from "react";
import './PlayerTable.css'

import PlayerRow from '../PlayerRow/PlayerRow'

export default function PlayerTable({ players, turn }) {
    const [template, setTemplate] = useState([]);

    for (const player in players) {
        template.push(<PlayerRow key={player.id} player={player} />);
    }


    return (
        <>
            <table className="player-table">
                <thead>
                    <tr>
                        {/* <th></th> */}
                        <th>ID</th>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Order</th>
                    </tr>
                </thead>
                <tbody>
                    {players.sort((p1, p2) => p1.order - p2.order).map((player) => (
                        <PlayerRow player={player} key={player.order} turn={turn}/>
                    ))}
                </tbody>
            </table>
        </>

    )
}