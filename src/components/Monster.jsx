import React from 'react'

const Monster = (number, name, picture) => {
  return (
    <div>
      <h1>$`{name} #{number}`</h1>
      <img src={picture} alt="monsterImg" />
    </div>
  )
}

export default Monster
