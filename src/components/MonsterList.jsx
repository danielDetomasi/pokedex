import React from 'react'
import { useEffect, useState} from 'react'
import Monster from './Monster'

const MonsterList = ({onSelect}) => {

    const [firstGen, setFirstGen] = useState([])
 
    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokedex/2')
        .then(response => response.json())
        .then(data => setFirstGen(data.pokemon_entries))
    },[])

    const ShowMonsterImg = (int) =>{
        let img
        img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${int}.png`
        return img
    }


  return (
    <div className='monsterList'>
        <ul>
            {firstGen.map(poke =>
                <li key={poke.entry_number}>
                    <input type='radio' id={poke.entry_number} name='selection' onChange={() => onSelect(poke.entry_number)}/>
                    <label for={poke.entry_number}>
                        <h2>{poke.entry_number}</h2>
                        <img src={ShowMonsterImg(poke.entry_number)} alt="" />
                        <p>{poke.pokemon_species.name}</p>
                    </label>
                               
                </li>
            )}

        </ul>
      
    </div>
  )
}

export default MonsterList
