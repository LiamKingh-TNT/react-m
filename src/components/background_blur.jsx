import { useState, useEffect } from 'react'
export default function BackgroundBlur(){
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
    return(
    <div className="pt-20 fixed z-[0] w-[100vw] h-[100vh] top-0 ml-[5vw] backdrop-blur-md shadow-md md:w-[90vw] overflow-hidden"
               style={{
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                backgroundColor: 'rgba(0,0,0,0.2)'
              }}
    />
)}