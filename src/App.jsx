
import './App.css'
import Home from "./pages/home"
import Faction from './pages/faction';
import Product from './pages/product';
import { BrowserRouter, Routes, Route, Link } from 'react-router';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='faction' element={<Faction/>}>
        </Route>
      </Routes>
       
    </BrowserRouter>
    
  )
}

export default App
