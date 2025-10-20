import React from 'react'

const MonsterHeader = ({id,name}) => {

    const formattedId = `#${String(id).padStart(3, '0')}`;
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

    return (
      <div className='monsterHeader'>
        <span className='monsterId'>{formattedId}</span>
        <h1 className='monsterName'>{formattedName}</h1>
      </div>
    )
}

export default MonsterHeader
