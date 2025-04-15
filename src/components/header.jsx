
import { BrowserRouter, Routes, Route, Link } from 'react-router';
function Header() {

  return (
      <header className="header fixed top-0 left-0 w-full z-40 border-x-6 bg-[#6ac8eb] h-[100px] px-4">
        <div className="flex items-center justify-center md:justify-between">
          <div  className="flex items-center justify-center md:ml-16">
            <img src="/images/main_icon.png" alt="main_icon" className="w-40 h-40"/>
            <nav className="hidden md:flex gap-8 text-white text-[20px] font-semibold ">
              <Link to="/products/id/0" className="nav-underline-center select-none">Background Story</Link>
              <Link to="/products/id/1" className="nav-underline-center select-none">Game Component</Link>
              <Link to="/products/id/2" className="nav-underline-center select-none">Game Rules</Link>
            </nav>
          </div>
        </div>
      </header>
  )
}

export default Header