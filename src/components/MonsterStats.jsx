import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';

const MonsterStats = ({monsterId}) => {

    const queryClient =  useQueryClient();
    const allPokemon = queryClient.getQueryData(['firstGen']);
    const selected = allPokemon?.find(p => p.id === monsterId);

    return (
        <div>
            <h3>Stats</h3>
            <ul>
                {selected.stats.map(s => (
                <li key={s.stat.name} className="stat-item">
                    <span className="stat-name">{s.stat.name.charAt(0).toUpperCase() + s.stat.name.slice(1)}</span>
                    <div className="stat-bar-container">
                        <div className="stat-bar-fill" style={{ width: `${(s.base_stat / 150) * 100}%` }}/>
                    </div>
                    <span className="stat-value">{s.base_stat}</span>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default MonsterStats