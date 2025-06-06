
import './App.css'
import Home from "./pages/home"
import Story from './pages/story';
import Faction from './pages/faction';
import FactionIntro from './pages/faction_intro';
import Rules from './pages/rules';
import { BrowserRouter, Routes, Route, Link } from 'react-router';
import ScrollToTop from './components/ScrollToTop';
import { feedFactions } from './api/fireStore';

//feedFactions();

function App() {

  return (
    <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='story' element={<Story/>}/>
      <Route path='faction' element={<Faction/>}/>
      <Route path='rules' element={<Rules/>}/>
      <Route path='factions'>
        <Route path=':faction_name' element={<FactionIntro/>}/>
      </Route>
    </Routes>
       
    </BrowserRouter>
    
  )
}

export default App
