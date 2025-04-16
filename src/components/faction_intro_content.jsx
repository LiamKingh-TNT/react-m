import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
export function FactionIntroContent(faction) {
    
    const { t:lang } = useTranslation();
    const [blur, setBlur] = useState(0);
    
    useEffect(() => {
    const handleScroll = () => {
        const y = window.scrollY;
        const maxBlur = 5;
        const maxScroll = window.innerHeight / 2; // 半個螢幕高度
        const blurValue = Math.min((y / maxScroll) * maxBlur,maxBlur);
        setBlur(blurValue);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    console.log(faction)
    return(
        <div className="content relative z-20 ">
          <div className="flex items-center justify-center h-screen">
            <p className="text-[#3E2F2F] z-50 mt-[-10vh] title overflow-visible text-[8vw] font-extrabold" data-storke={lang(faction.faction.name)}>{lang(faction.faction.name)}</p>
          </div>
          <div className="pt-20 fixed z-[0] w-[100vw] h-[100vh] top-0 ml-[5vw] backdrop-blur-md shadow-md md:w-[90vw] overflow-hidden"
               style={{
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                backgroundColor: 'rgba(0,0,0,0.2)'
              }}
          />
          <div className="pt-20 relative z-[0] w-[100vw] h-full mt-[0vh] mx-auto md:w-[90vw] overflow-hidden">
        </div>
        </div>
    )
}