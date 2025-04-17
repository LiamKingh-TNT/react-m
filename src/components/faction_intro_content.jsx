import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap';
import { InfoBoard } from './info_board';
import TitleText from './title_text'
import BackgroundBlur from './background_blur';
export function FactionIntroContent(faction) {
    const rom_number = ['O','I','II','III','IV','V','VI','VII','VIII','IX','X'];
    const { t:lang } = useTranslation();
    const [selected_trait, SetSelectedTrait] = useState(0);
    const btnRefs = useRef([]);

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
    
    const scrollToWithOffset = (id) => {
        const element = document.getElementById(id);
        const offset = -100; // 上移 100px，可根據你的 header 高度調整
      
        if (element) {
          const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      };
    return(
        <div className="content relative z-20 overflow-x-hidden">
          <div className="flex items-center justify-center h-screen">
            <TitleText
              text={lang(faction.faction.name)}
              fontSize={100}
              strokeWidth={40}
              fill="#3E2F2F"
              strokeColors={["#A0C5CC", "#ffffff", "#A0C5CC"]}
              width={1600}
              height={1200}
            />
          </div>
          <BackgroundBlur/>
            <div id="traits" className="pt-20 relative z-[0] w-[100vw] h-full mt-[0vh] mx-auto md:w-[100vw] overflow-hidden">
              <div className="w-full h-fit">
                <div className="flex items-center justify-center">
                  <TitleText
                    text={lang('fi.traits')}
                    fontSize={80}
                    strokeWidth={30}
                    fill="#3E2F2F"
                    strokeColors={["#A0C5CC", "#ffffff", "#A0C5CC"]}
                    width={1000}
                    height={1000}
                  />
                </div>
                <div className="h-[40vh] w-[73vw] mx-auto md:ml-[20vw] grid grid-cols-[70vw_3vw] grid-rows-4 px-1 py-1">
                    <div className=" bg-[#815A5A]/50 border-8 border-[#73979F] row-span-4 min-h-fit">
                      <TitleText
                        text={lang(faction.faction.traits[selected_trait].name)}
                        fontSize={40}
                        strokeWidth={10}
                        fill="#B5D7D7"
                        strokeColors={["#A0C5CC", "#ffffff", "#A0C5CC"]}
                        width={1000}
                        height={1000}
                        align="left"
                      />
                    
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
              
              <InfoBoard faction={faction.faction} type="lord"/>
              <div className="mt-[200vh] md:mt-[100vh]"/>
              <InfoBoard faction={faction.faction} type="soldier"/>
              <div className="mt-[200vh] md:mt-[100vh]"/>
              <InfoBoard faction={faction.faction} type="card"/>
              <div className="mt-[200vh] md:mt-[150vh]"/>
              <div className="hidden md:flex flex-col fixed left-0 top-1/2 mt-15 ml-10 -translate-y-1/2 items-center justify-center w-[10vw]">
                <button onClick={()=>scrollToWithOffset("traits")} className=" text-white text-[25px]">{lang('fi.traits')}</button>
                <div className="h-10 w-[2px] bg-gray-300" />
                <button onClick={()=>scrollToWithOffset("lords")} className=" text-white text-[25px]">{lang('fi.lords')}</button>
                <div className="h-10 w-[2px] bg-gray-300" />
                <button onClick={()=>scrollToWithOffset("soldiers")} className=" text-white text-[25px]">{lang('fi.soldiers')}</button>
                <div className="h-10 w-[2px] bg-gray-300" />
                <button onClick={()=>scrollToWithOffset("cards")} className=" text-white text-[25px]">{lang('fi.cards')}</button>
              </div>

            </div>
        </div>
    )
}