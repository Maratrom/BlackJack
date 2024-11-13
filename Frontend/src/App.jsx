import './App.scss';

import { Route, Routes, NavLink } from 'react-router-dom';
import Home from './Views/Home/Home';
import CreateGame from './Views/CreateGame/CreateGame';
import Game from './Views/Game/Game';


function App() {

  return (
    <>
    <div className='nav'>
      <NavLink to="/create_game"><button>Créer une partie</button></NavLink>
      <NavLink to="/"><button>Home</button></NavLink> 
    </div>
    
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create_game' element={<CreateGame />} />
        <Route path='/game/:id' element={<Game />} />
      </Routes>
    </>
  )
}

export default App
