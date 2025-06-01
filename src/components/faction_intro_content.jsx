import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap';
import { InfoBoard } from './info_board2';
import { ChunkList } from './chunck_list';
import TitleText from './title_text'
import BackgroundBlur from './background_blur';
export function FactionIntroContent(faction) {
    const rom_number = ['O','I','II','III','IV','V','VI','VII','VIII','IX','X'];
    const { t:lang } = useTranslation();
    const [selected_trait, SetSelectedTrait] = useState(0);
    const btnRefs = useRef([]);

    const handleMouseEnter = (index) => {
      gsap.to(btnRefs.current[index], {
        height: '3vw',
        y:'-1vw',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = (index) => {
      gsap.to(btnRefs.current[index], {
        height: '2vw',
        y:'0',
        duration: 0.3,
        ease: 'power2.out',
      });
    };
    
    return(
        <div className="content relative z-20 overflow-x-hidden">
          <div className="flex items-center justify-center  h-[80vh]">
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
          <p className="mt-[10vh]"/>
          <BackgroundBlur/>
            <div  className="pt-20 relative z-[0] w-[100vw] h-full mt-[0vh] mx-auto md:w-[100vw] overflow-hidden">
              <div id="traits" className="w-full h-fit">
                <div className="flex items-center justify-center">
                  <p className="text-[60px] text-[#A0C5CC] font-extrabold">{lang('fi.traits')}</p>
                </div>
                <div className="h-[40vh] w-[73vw] mx-auto md:ml-[20vw] grid grid-cols-8 grid-rows-10 px-1 py-1">
                    {faction.faction.traits.map((trait, index) => {
                      const isActive = selected_trait === index;
                      const bg = isActive ? "bg-[#73979F]" : "bg-[#44646B]";

                      return (
                        <button
                          key={trait.name}
                          ref={(el) => (btnRefs.current[index] = el)}
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={() => handleMouseLeave(index)}
                          onClick={() => SetSelectedTrait(index)}
                          // 这里使用 row-start-1 + 动态 col-start 放到第 1 行第 (index+1) 列
                          className={`
                            row-start-1 
                            col-start-${index + 1} 
                            whitespace-nowrap            /* 禁止换行，保证文字都是横向 */
                            rounded-tl-2xl rounded-tr-2xl 
                            text-[20px]                  /* 根据文字长度适当调小字号 */
                            flex justify-center items-center 
                            px-4 py-2                    /* 内边距，让文字周围留白 */
                            text-white 
                            ${bg}
                          `}
                        >
                          {lang(trait.name)}
                        </button>
                      );
                    })}

                    <div className="bg-[#815A5A]/50 border-8 border-[#73979F] row-start-2 col-span-8 p-4 h-fit min-h-[50vh] z-20">
                      <p className="text-[25px] md:text-[35px] font-extrabold text-[#A0C5CC] mt-2 ml-4">
                        {lang(faction.faction.traits[selected_trait].name)}
                      </p>
                      <p className="text-[20px] md:text-[25px] text-white mt-2 ml-4">
                        {lang(faction.faction.traits[selected_trait].effect)}
                      </p>
                    </div>
                  </div>

              </div>
              
              <InfoBoard faction={faction.faction} type="lord"/>
              <InfoBoard faction={faction.faction} type="soldier"/>
              <InfoBoard faction={faction.faction} type="card"/>
              <ChunkList chunks={["traits","lords","soldiers","cards"]} type={""}/>

            </div>
        </div>
    )
}