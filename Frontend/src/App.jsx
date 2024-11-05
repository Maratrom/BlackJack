import './App.css';

import { Route, Routes } from 'react-router-dom';
import Home from './Views/Home/Home';
import CreateGame from './Views/CreateGame/CreateGame';


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create_game' element={<CreateGame />} />
      </Routes>
    </>
  )
}

export default App
