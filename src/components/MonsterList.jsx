import React from 'react'
import { useEffect, useState} from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchFirstGen } from '../services/monsterService'
import { getTypeGradient } from '../utils/getTypeGradient'

const MonsterList = ({onSelect}) => {
    
    const {data, isLoading, error} = useQuery({
        queryKey: ['firstGen'],
        queryFn: fetchFirstGen,
        staleTime: 60 * 60 * 1000
    })
    
    if (isLoading) return <div>Cargando Pokémon...</div>;
    if (error) return <div>Error al cargar los Pokémon</div>;

    return (
         <div className='monsterList'>
            <ul>
            {data.map(poke => {
                const backgroundStyle = {
                background: getTypeGradient(poke.types),
                // padding: '1rem',
                borderRadius: '1rem',
                color: 'white',
                // display: 'block',
                };

                return (
                <li key={poke.id}>
                    <input
                    type='radio'
                    id={poke.id}
                    name='selection'
                    onChange={() => onSelect(poke.id)}
                    style={{ display: 'none' }} // opcional: ocultar el input si querés solo el label visible
                    />
                    <label htmlFor={poke.id} style={backgroundStyle}>
                    <h2>{poke.id}</h2>
                    <img src={poke.sprites.front_default} alt={poke.name} />
                    <p style={{ textTransform: 'capitalize' }}>{poke.name}</p>
                    </label>
                </li>
                );
            })}
            </ul>
        </div>
    )
}
export default MonsterList

{/* <div className='monsterList'>
            <ul>
            {   data.map(poke =>
                <li key={poke.id}>

                    <input type='radio' id={poke.id} name='selection' onChange={() => onSelect(poke.id)}/>
                    <label htmlFor={poke.id} className={poke.types[0].type.name}>
                        <h2>{poke.id}</h2>
                        <img src={poke.sprites.front_default} alt="" />
                        {<p>{poke.name}</p>}
                    </label>
                               
                </li>
            )}

            </ul>
        </div> */}
