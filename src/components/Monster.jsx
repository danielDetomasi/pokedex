import React from 'react';
import { useEffect,useState } from 'react';

const Monster = ({int}) => {
  const [monster,setMonster] = useState(null);

  useEffect(() =>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${int}`)
    .then(response => response.json())
    .then(data => setMonster(data))  
  },[int]);

  const ShowMonster = () =>{
    let img = '';
    
    if(monster != null){
      img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${monster.id}.png`;
    }
      
    return img;
  }

  const showTypes = () => {
    let types = '';

    for(let i = 0; i<monster.types.length; i++){
      types += " " + monster.types[i].type.name;
    }

    return types;
  }
  
  if(monster != null){
    return (
      <div className='prueba'>
        <img src={ShowMonster()} alt=''/>
        <p>{monster.name}</p>
        <ul>
          {monster.types.map(t => (
            <li key={t.type.name}>
              <p>{t.type.name}</p>
            </li>
            ))}
        </ul>
      </div>
    )
  }else{
    return (
      <div></div>
    )
  }
  
}


export default Monster
