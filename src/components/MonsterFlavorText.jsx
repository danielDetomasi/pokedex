import React from 'react'
import { useEffect,useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const MonsterFlavorText = ({monsterId}) => {

    const queryClient =  useQueryClient();
    const allPokemon = queryClient.getQueryData(['firstGen']);
    const selected = allPokemon?.find(p => p.id === monsterId);

    const [flavorText,setFlavorText] = useState([]);

    const cleanText = flavorText?.flavor_text?.replace(/[\f\n\r\t]+/g, ' ');

    useEffect(() => {
        if (!selected) return;

        const fetchFlavorText = async () => {
        try {
            const res = await fetch(selected.species.url);
            const species = await res.json();

            const englishEntry = species.flavor_text_entries.find(
                entry => entry.language.name === 'en'
            );

            setFlavorText(englishEntry);
        } catch (error) {
            console.error('Error fetching flavor text:', error);
        }};

        fetchFlavorText();
    }, [selected]);

    return (
        <div className='flavorContainer'>
            <h3>Description</h3>
            <p className='monsterDesc'>{cleanText}</p>
        </div>
    )
}

export default MonsterFlavorText
