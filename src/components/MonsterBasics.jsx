import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const MonsterBasics = ({monsterId}) => {

    const queryClient =  useQueryClient();
    const allPokemon = queryClient.getQueryData(['firstGen']);
    const selected = allPokemon?.find(p => p.id === monsterId);

    const [isShiny, setIsShiny] = useState(false);

    const realHeight = selected.height / 10;
    const realWeight = selected.weight / 10;

    const imgNormal = selected.sprites.front_default;
    const imgShiny  = selected.sprites.front_shiny;

    const changeImage = () =>{
        setIsShiny(prev => !prev);
    }

    return (
        <div className='monsterBasics'>
            <div className='spriteContainer'>
                <img src={isShiny ? imgShiny : imgNormal} 
                alt={selected.name} className='monsterSprite' onClick={changeImage}/>
            </div>
        
            <div className='basicInfo'>
                <h4>Types:</h4>
                <ul className='typeList'>
                    {selected.types.map(t => (
                    <li key={t.type.name}>
                        <img key={t.type.name} src={`/type-icons/${t.type.name}.png`} alt={t.type.name}/>
                    </li>
                    ))}
                </ul>

                <div className='measurments'>
                    <p>Height: {realHeight} m</p>
                    <p>Weight: {realWeight} kg</p>
                </div>
            </div> 
        </div>
    )
}

export default MonsterBasics
