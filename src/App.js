import logo from './logo.svg';

import MonsterList from './components/MonsterList';
import './Styles.css';
import Monster from './components/Monster';
import { useState } from 'react';

function App() {

  const [selectID, setSelectID] = useState(null);

  return (
    <div className="App">
      <MonsterList onSelect={setSelectID}/>

      <Monster int={selectID}/>
    </div>
  );
}

export default App;
