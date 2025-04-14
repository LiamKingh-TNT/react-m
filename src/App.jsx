
import './App.css'
import Home from "./pages/home"
import Product from './pages/product';
import { BrowserRouter, Routes, Route, Link } from 'react-router';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='products'>
          <Route path='category/:categoryName' element={<Home/>}/>
          <Route path='id/:productId' element={<Product/>}/> 
        </Route>
      </Routes>
       
    </BrowserRouter>
    
  )
}

export default App
