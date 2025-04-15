
import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t:lang } = useTranslation()
    return (
        <footer className="footer relative z-50 w-full min-h-screen text-[#C4C4C4] flex flex-col items-center gap-15 md:justify-between">
          <img src="/images/main_icon.png" className="w-[120px] h-auto md:w-[240px]"/>
          <p className="relative text-[8vw] font-jersey text-[#778F98] z-10 lg: text-[5vw]">
              {lang('title')}
          </p>
          <div className="flex items-center gap-8 text-white text-sm font-semibold">
            <img src="/images/phone-receiver-silhouette.png" className="w-[6vw] h-auto lg:w-[3vw]"/>
            <p className="text-[#C4C4C4]  text-[4vw] lg:text-[1.5vw] ">(03)7660-4512  (This is Fake)</p>
          </div>
          <div className="flex items-center gap-8 text-white text-sm font-semibold">
            <img src="/images/email.png" className="w-[6vw] h-auto lg:w-[3vw]"/>
            <p className="text-[#C4C4C4] text-[4vw] lg:text-[1.5vw]">TheThroneofDelusion@gmail.com</p>
          </div>
          <div className="flex gap-8 text-white text-sm font-semibold">
            <Link to="/products/id/1"><img src="/images/facebook.png" className="w-[30px] h-auto md:w-[40px]"/></Link>
            <Link to="/products/id/0"><img src="/images/twitter.png" className="w-[30px] h-auto md:w-[40px]"/></Link>
            <Link to="/products/id/0"><img src="/images/instagram.png" className="w-[30px] h-auto md:w-[40px]"/></Link>
          </div>
          <p className="text-[#C4C4C4] text-[4vw] lg:text-[1vw]">Copyright © 2025 Liam & EXE. All rights reserved.</p>
          
        </footer>
    )
  }
  
  export default Footer