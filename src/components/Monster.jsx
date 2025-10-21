import React from 'react';
import { fetchFirstGen } from '../services/monsterService';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import MonsterHeader from './MonsterHeader';
import MonsterMoves from './MonsterMoves';
import MonsterBasics from './MonsterBasics';
import MonsterStats from './MonsterStats';
import MonsterEvolutions from './MonsterEvolutions';
import MonsterFlavorText from './MonsterFlavorText';

const Monster = ({int}) => {

  const queryClient =  useQueryClient();
  const allPokemon = queryClient.getQueryData(['firstGen']);
  const selected = allPokemon?.find(p => p.id === int);

  if (!selected) return <p>Seleccione un pokemon</p>;
  
  return (
    
      <div className='monsterContainer'>

        <MonsterHeader id={selected.id} name={selected.name}/>
      
        <div className='monsterInfo'>

          <div className='topSection'>
            <MonsterBasics monsterId={selected.id}/>
            <MonsterFlavorText monsterId={selected.id}/>
          </div>
          
          <div className='bottomSection'>
            <MonsterStats monsterId={selected.id}/>
            <MonsterEvolutions monsterId={selected.id}/>
          </div>
          
          <div className='sideSection'>
            <MonsterMoves monsterId={selected.id}/>
          </div>
        </div>
      </div>
  )
}

export default Monster;