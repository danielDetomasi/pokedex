import React from 'react';
import { useEffect,useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const MonsterEvolutions = ({monsterId}) => {

    const queryClient =  useQueryClient();
    const allPokemon = queryClient.getQueryData(['firstGen']);
    const selected = allPokemon?.find(p => p.id === monsterId);
    const [chainSprite, setChainSprites] = useState([]);

    useEffect(() => {
        if (!selected || !allPokemon) return;

        const fetchEvolutionChain = async () => {
            try {
                const resSpecies = await fetch(selected.species.url);
                const species = await resSpecies.json();

                const resChain = await fetch(species.evolution_chain.url);
                const chain = await resChain.json();

                const getEvolutionNames = (node) => {
                    const names = [node.species.name];
                    node.evolves_to.forEach(e => {
                    names.push(...getEvolutionNames(e));
            });
            return names;
        };

        const names = getEvolutionNames(chain.chain);

        const sprites = names
        .map(name => allPokemon.find(p => p.name === name)?.sprites.front_default)
        .filter(Boolean);

        setChainSprites(sprites);
    } catch (error) {
      console.error('Error fetching evolution chain:', error);
    }};

    fetchEvolutionChain();
    }, [selected, allPokemon]);

    return (
        <div className='evolutionContainer'>
            <h3>Evolution Chain</h3>
            <ul className='evolutionChain'>
                {chainSprite.map(c => (
                  <li className='stage'>
                    <img src={c} alt='fron_defualt'></img>
                  </li>
                ))}    
            </ul>
        </div>
    )
}

export default MonsterEvolutions
