import React from 'react';
import { useEffect,useState } from 'react';
import { fetchFirstGen } from '../services/monsterService';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const Monster = ({int}) => {

  const queryClient =  useQueryClient();
  const allPokemon = queryClient.getQueryData(['firstGen']);
  const selected = allPokemon?.find(p => p.id === int);

  if (!selected) return <p>Seleccione un pokemon</p>;
  
  return (
      <div className='monsterInfo'>
        <h2>{selected.name}</h2>
        <img src={selected.sprites.front_default} alt="frontViewPokemon" />
        <ul>
          {selected.types.map(t => (
            <li key={t.type.name}>
              <img key={t.type.name} src={`/type-icons/${t.type.name}.png`} alt="" />
            </li>
            ))}
        </ul>

      </div>
  )
}


export default Monster

// const [monster,setMonster] = useState(null);

//   useEffect(() =>{
//     fetch(`https://pokeapi.co/api/v2/pokemon/${int}`)
//     .then(response => response.json())
//     .then(data => setMonster(data))  
//   },[int]);

//   const ShowMonster = () =>{
//     let img = '';
//     img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${monster.id}.png`;
    
//     return img;
//   }

  
//   if(monster != null){
//     return (
//       <div className='monsterInfo'>
//         <img src={ShowMonster()} alt=''/>
//         <p>{monster.name}</p>
//         <ul>
//           {monster.types.map(t => (
//             <li key={t.type.name}>
//               <img key={t.type.name} src={`/type-icons/${t.type.name}.png`} alt="" />
//             </li>
//             ))}
//         </ul>
//       </div>
//     )
//   }else{
//     return (
//       <div></div>
//     )
//   }
  
