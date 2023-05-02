import './App.css';
import Banner from './Components/Banner';
import Favourite from './Components/Favourite';
import Movies from './Components/Movies';
import Navbar from './Components/Navbar';

import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<><Banner/><Movies/></>} />
        <Route path='/favourites' element={<Favourite/>} />
      </Routes>
    </Router>
    
  );
}

export default App;
