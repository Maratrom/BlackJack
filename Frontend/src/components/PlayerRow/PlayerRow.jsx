import './PlayerRow.css'
// import random from '../../assets/random.png'

export default function PlayerRow({ player, turn }) {
    return (
        <tr className={`row${turn === player.order ? " selected" : ""}`}>
            {/* <td className='pp'><img src={player.pp ?? random} className=""/></td> */}
            <th className='id'>{player.id}</th>
            <td className='name'>{player.name}</td>
            <td className='score'>{player.score}</td>
            <td className='order'>{player.order}</td>
        </tr>
    )
}