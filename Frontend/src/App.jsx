import './App.css';

import { Route, Routes, NavLink } from 'react-router-dom';
import Home from './Views/Home/Home';
import CreateGame from './Views/CreateGame/CreateGame';
import Game from './Views/Game/Game';


function App() {

  return (
    <>
    <button><NavLink to="/create_game">Créer une partie</NavLink></button>
    <button><NavLink to="/">Home</NavLink></button> 
    
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create_game' element={<CreateGame />} />
        <Route path='/game/:id' element={<Game />} />
      </Routes>
    </>
  )
}

export default App
