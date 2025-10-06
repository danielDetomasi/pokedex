import React from 'react'
import { useEffect, useState} from 'react'
import Monster from './Monster'

const MonsterList = () => {

    const [firstGen, setFirstGen] = useState([])
 
    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokedex/2')
        .then(response => response.json())
        .then(data => setFirstGen(data.pokemon_entries))
    },[])

    const ShowMonster = (int) =>{
        let text;

        for(let i = 0; i<firstGen.length; i++){
            if(firstGen[i].entry_number == int)
            text = firstGen[i].pokemon_species.name
        }

        return text;

    };

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
                    <input type='radio' id={poke.entry_number} name='selection'/>
                    <label for={poke.entry_number}>
                        <h2>{poke.entry_number}</h2>
                        <img src={ShowMonsterImg(poke.entry_number)} alt="" />
                        <p>{ShowMonster(poke.entry_number)}</p> 
                    </label>
                               
                </li>
            )}

        </ul>
      
    </div>
  )
}

export default MonsterList
