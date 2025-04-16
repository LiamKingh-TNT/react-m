import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useTranslation } from 'react-i18next'
function Header() {

  const [listIsOpen, setListIsOpen] = useState(false);
  const { t: lang, i18n: setLanguage } = useTranslation()
  const toggleLang = () => {
    const newLang = setLanguage.language === 'en_us' ? 'zh_tw' : 'en_us'
    setLanguage.changeLanguage(newLang)
  }
  
  const menuRef = useRef(null)
  useEffect(() => {
    const el = menuRef.current
    if (!el) return
  
    if (listIsOpen) {
      el.style.display = 'block'
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        { height: el.scrollHeight, opacity: 1, duration: 0.5, ease: 'power2.out' }
      )
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          el.style.display = 'none'
        }
      })
    }
  }, [listIsOpen])

  return (
      <header className="header fixed top-0 left-0 w-full z-40 border-x-6 bg-[#6ac8eb] h-[100px] px-4">
        <div className="flex items-center justify-center md:justify-between">
          <div  className="flex items-center justify-center md:ml-16">
            <Link to="/">
            <img src="/images/main_icon.png" alt="main_icon" className="w-40 h-40 relative z-[50]" />
            </Link>
            <nav className="hidden ml-5 md:flex gap-8 text-white text-[20px] ">
              <Link to="/products/id/0" className="nav-underline-center select-none">{lang('menu.background')}</Link>
              <Link to="/faction" className="nav-underline-center select-none">{lang('menu.component')}</Link>
              <Link to="/products/id/2" className="nav-underline-center select-none">{lang('menu.rules')}</Link>
            </nav>
            
          </div>
          <button className="hidden  text-white items-center justify-center md:flex ml-16 text-[20px] nav-underline-center select-none" onClick={toggleLang}>{lang('menu.language')}</button>
          <button
            onClick={() => setListIsOpen(!listIsOpen)}
            className={`
              absolute right-2 bottom-0 w-[30px] h-auto md:hidden
              transition-opacity duration-500
              ${listIsOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            `}
          >
            <img src="/images/down-chevron.png" className="w-full h-auto" />
          </button>
          
        </div>
          <div 
          ref={menuRef}
          style={{ height: 0, opacity: 0, overflow: 'hidden', display: 'none' }}
          className="fixed list top-[100px] left-0 w-screen z-30 text-white text-[25px] py-4 px-6 shadow-md space-y-4 text-center md:hidden"
          >
            <Link to="/products/id/0" className="block mt-[40px]">{lang('menu.background')}</Link>
            <Link to="/products/id/1" className="block">{lang('menu.component')}</Link>
            <Link to="/products/id/2" className="block">{lang('menu.rules')}</Link>
            <button className="block text-center text-[25px] w-full" onClick={toggleLang}>{lang('menu.language')}</button>
            <button className="absolute right-2 bottom-0 text-[20px] w-[30px] h-auto md:hidden" onClick={() => setListIsOpen(!listIsOpen)}><img src="/images/down-chevron.png" className="transform scale-y-[-1] right-0"/></button>
            <br/>
          </div>
      </header>
  )
}

export default Header