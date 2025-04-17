import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap';
export function FactionIntroContent(faction) {
    const rom_number = ['O','I','II','III','IV','V','VI','VII','VIII','IX','X'];
    const { t:lang } = useTranslation();
    const [blur, setBlur] = useState(0);
    const [selected_trait, SetSelectedTrait] = useState(0);
    const [selected_lord, SetSelectedLord] = useState(0);
    const [lord_info,SetLordInfo] = useState(0);
    const btnRefs = useRef([]);
    btnRefs.current = []; // 清空避免重複
    

    const handleMouseEnter = (index) => {
      gsap.to(btnRefs.current[index], {
        width: '4vw',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = (index) => {
      gsap.to(btnRefs.current[index], {
        width: '3vw',
        duration: 0.3,
        ease: 'power2.out',
      });
    };
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
    const scrollToWithOffset = (id) => {
        const element = document.getElementById(id);
        const offset = -100; // 上移 100px，可根據你的 header 高度調整
      
        if (element) {
          const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      };
    console.log(faction)
    return(
        <div className="content relative z-20 overflow-x-hidden">
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
            <div className="pt-20 relative z-[0] w-[100vw] h-full mt-[0vh] mx-auto md:w-[100vw] overflow-hidden">
              <div className="w-full h-fit">
                <div className="flex items-center justify-center">
                    <p id="traits" className="text-[#3E2F2F] z-50 mt-[-10vh] title overflow-visible text-[8vw] font-extrabold" data-storke={lang('fi.traits')}>{lang('fi.traits')}</p>
                </div>
                <div className="h-[40vh] w-[73vw] mx-auto md:ml-[20vw] grid grid-cols-[70vw_3vw] grid-rows-4">
                    <div className=" bg-[#815A5A]/50 border-8 border-[#73979F] row-span-4 min-h-fit">
                      <p className="text-[#3E2F2F] z-50 ml-5 title overflow-visible text-[30px] md:text-[60px] font-extrabold" data-storke={lang(faction.faction.traits[selected_trait].name)}>{lang(faction.faction.traits[selected_trait].name)}</p>
                      <p className="text-[20px] md:text-[30px] text-white ml-10">{lang(faction.faction.traits[selected_trait].effect)}</p>
                    </div>
                    {
                    faction.faction.traits.map((trait, index) => {
                      const isActive = selected_trait === index;
                      const bg = isActive ? "bg-[#73979F]" : "bg-[#44646B]";
                      return (
                        <button
                          key={trait.name}
                          ref={(el) => (btnRefs.current[index] = el)}
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={() => handleMouseLeave(index)}
                          onClick={() => SetSelectedTrait(index)}
                          className={`rounded-br-2xl rounded-tr-2xl text-[30px] flex text-center justify-center items-center px-4 py-2 text-white ${bg}`}
                          style={{ width: '3vw' }}
                        >
                          {rom_number[index + 1]}
                        </button>
                      );
                    })}
                </div> 
              </div>
              <div className="h-fit w-[100vw] mt-[250px] mx-auto md:mt-[150px]">
                    <div className="flex items-center justify-center">
                      <p id="lords" className="text-[#3E2F2F] z-50 mt-[-10vh] title overflow-visible text-[8vw] font-extrabold" data-storke={lang('fi.lords')}>{lang('fi.lords')}</p>
                    </div>
                    <div className="info_frame max-h-fit min-h-[50vh] w-[100vw] absolute right-0 mr-[16px] md:w-[85vw] grid grid-cols-1 grid-rows-3 md:grid-cols-10 md:grid-rows-5 overflow-visible md:border-y-8">

                      <div className="col-span-3 row-span-5 relative overflow-visible">
                        <img
                          src={faction.faction.lords[selected_lord].img}
                          className="absolute bottom-0 -top-[30vh] w-auto h-[80vh] object-contain"
                          style={{
                            maskImage: `radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)`,
                            WebkitMaskImage: `radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)`,
                          }}
                        />
                      </div>

                      <div className="col-span-6 row-span-5 flex flex-col items-start pl-1 pt-1">
                        <p className="text-[#B5D7D7] z-50 title text-[40px] font-extrabold" data-storke={lang(faction.faction.lords[selected_lord].name)}>
                            {lang(faction.faction.lords[selected_lord].name)}
                        </p>
                        <div className="text-[30px] text-white text-left mt-5">
                          {lord_info===0 &&(
                            <p className="text-[30px] text-white">
                              {lang(faction.faction.lords[selected_lord].story)}
                            </p>
                          )}
                          {lord_info===1&&(
                            <div className="grid grid-cols-5 w-full h-fit">
                              <div className="col-span-2 text-right text-[#C4C4C4]">
                                <p>{lang('fi.hp')}</p>
                                <p>{lang('fi.def')}</p>
                                <p>{lang('fi.dex')}</p>
                                <p>{lang('fi.size')}</p>
                                <p>{lang('fi.type')}</p>
                              </div>
                              <div className="col-span-3 ml-2">
                                <p>{lang(faction.faction.lords[selected_lord].hp)}</p>
                                <p>{lang(faction.faction.lords[selected_lord].def)}</p>
                                <p>{lang(faction.faction.lords[selected_lord].dex)}</p>
                                <p>{lang(faction.faction.lords[selected_lord].size)}</p>
                                <p>{lang(faction.faction.lords[selected_lord].type)}</p>
                                
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="absolute top-80 md:top-1/2 right-0 -translate-y-1/2 flex flex-col space-y-0 z-50">
                        <button onClick={()=>SetLordInfo(0)} className={`w-16 h-16 bg-[${lord_info==0?"#44646B":"#7FA4AA"}] rounded-l-md flex items-center justify-center`}>
                          <img src="/images/open-book.png" alt="icon" className="w-14 h-auto" />
                        </button>
                        <button onClick={()=>SetLordInfo(1)} className={`w-16 h-16 bg-[${lord_info==1?"#44646B":"#7FA4AA"}] rounded-l-md flex items-center justify-center`}>
                          <img src="/images/features.png" alt="icon" className="w-14 h-auto" />
                        </button>
                        <button onClick={()=>SetLordInfo(2)} className={`w-16 h-16 bg-[${lord_info==2?"#44646B":"#7FA4AA"}] rounded-l-md flex items-center justify-center`}>
                          <img src="/images/skill.png" alt="icon" className="w-14 h-auto" />
                        </button>
                      </div>
                    </div>
              </div>
              <div className="mt-[100vh]"/>
              <div className="hidden md:flex flex-col fixed left-0 top-1/2 mt-15 ml-10 -translate-y-1/2 items-center justify-center w-[10vw]">
                <button onClick={()=>scrollToWithOffset("traits")} className=" text-white text-[25px]">{lang('fi.traits')}</button>
                <div className="h-10 w-[2px] bg-gray-300" />
                <button onClick={()=>scrollToWithOffset("lords")} className=" text-white text-[25px]">{lang('fi.lords')}</button>
                <div className="h-10 w-[2px] bg-gray-300" />
                <button onClick={()=>scrollToWithOffset("traits")} className=" text-white text-[25px]">{lang('fi.traits')}</button>
                <div className="h-10 w-[2px] bg-gray-300" />
                <button onClick={()=>scrollToWithOffset("traits")} className=" text-white text-[25px]">{lang('fi.traits')}</button>
              </div>

            </div>
        </div>
    )
}