import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';

const MonsterBasics = ({monsterId}) => {

    const queryClient =  useQueryClient();
    const allPokemon = queryClient.getQueryData(['firstGen']);
    const selected = allPokemon?.find(p => p.id === monsterId);

    const realHeight = selected.height / 10;
    const realWeight = selected.weight / 10;

    return (
        <div className='monsterBasics'>
            <div className='spriteContainer'>
                <img src={selected.sprites.front_default} alt="frontViewPokemon" className='monsterSprite'/>
            </div>
        
            <ul className='typeList'>
                {selected.types.map(t => (
                <li key={t.type.name}>
                    <img key={t.type.name} src={`/type-icons/${t.type.name}.png`} alt={t.type.name} />
                </li>
                ))}
            </ul>

            <div className='measurments'>
                <p>Height: {realHeight} m</p>
                <p>Weight: {realWeight} kg</p>
            </div>
            
        </div>
    )
}

export default MonsterBasics
