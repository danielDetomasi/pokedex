import React from 'react';
import { fetchFirstGen } from '../services/monsterService';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import MonsterHeader from './MonsterHeader';
import MonsterMoves from './MonsterMoves';
import MonsterBasics from './MonsterBasics';
import MonsterStats from './MonsterStats';
import MonsterEvolutions from './MonsterEvolutions';
import MonsterFlavorText from './MonsterFlavorText';
import { getTypeGradientPastel } from '../utils/getTypeGradientPastel';

const Monster = ({id}) => {

  const queryClient =  useQueryClient();
  const allPokemon = queryClient.getQueryData(['firstGen']);
  const selected = allPokemon?.find(p => p.id === id);

  // const primaryType = selected.types?.[0].type.name;
  // const bgColor = pastelPokemonTypes[primaryType] || "#D3D3D3";

  if (!selected) return <p>Seleccione un pokemon</p>;

  const backgroundStyle = getTypeGradientPastel(selected.types)
  
  return (
    
      <div className='monsterContainer'>

        <MonsterHeader id={selected.id} name={selected.name}/>
      
        <div className='monsterInfo'>

          <div className='topSection' style={{background: backgroundStyle}}>
            <MonsterBasics monsterId={selected.id}/>
            <MonsterFlavorText monsterId={selected.id}/>
          </div>
          
          <div className='bottomSection' style={{background: backgroundStyle}}>
            <MonsterStats monsterId={selected.id}/>
            <MonsterEvolutions monsterId={selected.id}/>
          </div>
          
          <div className='sideSection' style={{background: backgroundStyle}}>
            <MonsterMoves monsterId={selected.id}/>
          </div>
        </div>
      </div>
  )
}

export default Monster;