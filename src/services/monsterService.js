export const fetchFirstGen = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokedex/2');
    const data = await res.json();

    const detailed = data.pokemon_entries.map(entry => 
        fetch(`https://pokeapi.co/api/v2/pokemon/${entry.pokemon_species.name}`)
        .then(res => res.json())
    );

    const detailedData = await Promise.all(detailed);
        
    return detailedData;
}