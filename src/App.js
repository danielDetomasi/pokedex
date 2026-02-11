import MonsterList from './components/MonsterList';
import Monster from './components/Monster';

import { useState } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';

import './Styles.css';

function App() {

  const [selectID, setSelectID] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>

      <div className="App">
        <MonsterList onSelect={setSelectID}/>
        <Monster id={selectID}/>
      </div>

    </QueryClientProvider>
   
  );
}

export default App;
