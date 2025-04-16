
import './App.css'
import Home from "./pages/home"
import Story from './pages/story';
import Faction from './pages/faction';
import FactionIntro from './pages/faction_intro';
import Rule from './pages/rule';
import { BrowserRouter, Routes, Route, Link } from 'react-router';
import ScrollToTop from './components/ScrollToTop';

function App() {

  return (
    <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='story' element={<Story/>}/>
      <Route path='faction' element={<Faction/>}/>
      <Route path='faction_intro' element={<FactionIntro/>}/>
      <Route path='rule' element={<Rule/>}/>
    </Routes>
       
    </BrowserRouter>
    
  )
}

export default App
