import { useState } from "react";
import './PlayerTable.css'

import PlayerRow from '../PlayerRow/PlayerRow'

export default function PlayerTable({ players, turn }) {
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
                    {players.map((player) => (
                        <PlayerRow player={player} key={player.order} turn={turn}/>
                    ))}
                </tbody>
            </table>
        </>

    )
}