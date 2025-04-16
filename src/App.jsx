
import './App.css'
import Home from "./pages/home"
import Faction from './pages/faction';
import Product from './pages/product';
import { BrowserRouter, Routes, Route, Link } from 'react-router';
import ScrollToTop from './components/ScrollToTop';

function App() {

  return (
    <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='faction' element={<Faction/>}>
      </Route>
    </Routes>
       
    </BrowserRouter>
    
  )
}

export default App
