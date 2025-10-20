import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';

const MonsterMoves = ({monsterId}) => {

    const queryClient =  useQueryClient();
    const allPokemon = queryClient.getQueryData(['firstGen']);
    const selected = allPokemon?.find(p => p.id === monsterId);

    const formatMoveName =((name)=>{
        return name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    })

    return (
        <div>
            <h3>Moves</h3>

            {<ul className='monsterMoves'>
                {selected.moves.map(m =>(
                  <li key={m.move.name}>{formatMoveName(m.move.name)}</li>
                ))}  
            </ul>}
        </div>
    )
}

export default MonsterMoves
