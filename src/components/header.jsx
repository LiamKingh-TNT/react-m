
import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next'
function Header() {

  const [listIsOpen, setListIsOpen] = useState(false);
  const { t: lang, i18n: setLanguage } = useTranslation()
  const toggleLang = () => {
    const newLang = setLanguage.language === 'en_us' ? 'zh_tw' : 'en_us'
    setLanguage.changeLanguage(newLang)
  }

  return (
      <header className="header fixed top-0 left-0 w-full z-40 border-x-6 bg-[#6ac8eb] h-[100px] px-4">
        <div className="flex items-center justify-center lg:justify-between">
          <div  className="flex items-center justify-center lg:ml-16">
            <img src="/images/main_icon.png" alt="main_icon" className="w-40 h-40 z-40"/>
            <nav className="hidden lg:flex gap-8 text-white text-[20px] font-semibold ">
              <Link to="/products/id/0" className="nav-underline-center select-none">{lang('menu.background')}</Link>
              <Link to="/products/id/1" className="nav-underline-center select-none">{lang('menu.component')}</Link>
              <Link to="/products/id/2" className="nav-underline-center select-none">{lang('menu.rules')}</Link>
            </nav>
            
          </div>
          <button className="hidden  text-white items-center justify-center lg:flex ml-16 text-[20px] nav-underline-center select-none" onClick={toggleLang}>{lang('menu.language')}</button>
          <button className="absolute right-2 bottom-0 text-[20px] w-[30px] h-auto lg:hidden" onClick={() => setListIsOpen(!listIsOpen)}><img src="/images/down-chevron.png"/></button>
          
        </div>
        {listIsOpen && (
          <div className="fixed list top-[100px] left-0 w-screen z-30 text-white text-[25px] py-4 px-6 shadow-md space-y-4 text-center lg:hidden">
            <Link to="/products/id/0" className="block mt-[40px]">{lang('menu.background')}</Link>
            <Link to="/products/id/1" className="block">{lang('menu.component')}</Link>
            <Link to="/products/id/2" className="block">{lang('menu.rules')}</Link>
            <button className="block text-center text-[25px] w-full" onClick={toggleLang}>{lang('menu.language')}</button>
            <br/>
          </div>
        )}
      </header>
  )
}

export default Header