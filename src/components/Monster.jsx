import React from 'react';
import { useEffect,useState } from 'react';
import { fetchFirstGen } from '../services/monsterService';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const Monster = ({int}) => {

  const queryClient =  useQueryClient();
  const allPokemon = queryClient.getQueryData(['firstGen']);
  const selected = allPokemon?.find(p => p.id === int);
  const [flavorText,setFlavorText] = useState([]);
  const [chainSprite, setChainSprites] = useState([]);

  useEffect(() => {
    if (!selected || !allPokemon) return;

    // 1️⃣ Obtener información de especie
    fetch(selected.species.url)
      .then(res => res.json())
      .then(species => {
        const englishTexts = species.flavor_text_entries.find(
        entry => entry.language.name === 'en'
      );
      setFlavorText(englishTexts);

        // 2️⃣ Obtener la cadena evolutiva
        return fetch(species.evolution_chain.url);
      })
      .then(res => res.json())
      .then(chain => {
        // Función recursiva para obtener todos los nombres de la cadena evolutiva
        const getEvolutionNames = (node) => {
          const names = [node.species.name];
          node.evolves_to.forEach(e => {
            names.push(...getEvolutionNames(e));
          });
          return names;
        };

        const names = getEvolutionNames(chain.chain);

        // 3️⃣ Buscar los sprites en los datos cacheados
        const imgs = names
          .map(name => allPokemon.find(p => p.name === name)?.sprites.front_default)
          .filter(Boolean);

        setChainSprites(imgs);
      });
  }, [selected, allPokemon]);

  console.log(flavorText)

  if (!selected) return <p>Seleccione un pokemon</p>;
  
  return (
    
      <div className='monsterInfo'>
        
        <h1>{selected.id} {selected.name}</h1>
        <img src={selected.sprites.front_default} alt="frontViewPokemon" />
        <ul>
          {selected.types.map(t => (
            <li key={t.type.name}>
              <img key={t.type.name} src={`/type-icons/${t.type.name}.png`} alt="" />
            </li>
            ))}
        </ul>
        <p>{(flavorText.flavor_text ?? '').replace(/[\f\n\r\t]+/g, ' ')}</p>

        <ul>
          {chainSprite.map(c => (
            <li>
              <img src={c} alt='fron_defualt'></img>
            </li>
          ))}
          
        </ul>
        {/* <ul>
          {selected.moves.map(m =>(
            <li key={m.move.name}>{m.move.name}</li>
          ))}
          
        </ul> */}

        
        

      </div>
  )
}

export default Monster;


//   useEffect(() => {
//   if (selected && selected.species?.url) {
//     fetch(selected.species.url)
//       .then(r => r.json())
//       .then(data => {
//         setFlavorText(data.flavor_text_entries[0]);

//         if (data.evolution_chain?.url) {
//           fetch(data.evolution_chain.url)
//             .then(r => r.json())
//             .then(chainData => setEvolution(chainData))
//         }

//       })
//   }
// }, [selected]);
