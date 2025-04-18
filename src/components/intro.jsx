import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ImageTextSection from './image_text_sction';
import factions from '@/assets/factions'
import BackgroundBlur from './background_blur';
import TitleText from './title_text'
function Intro() {
  const { t:lang } = useTranslation();
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((index - 1 + factions.length) % factions.length)
  const next = () => setIndex((index + 1) % factions.length)
  const prev_faction = factions[((index - 1 + factions.length) % factions.length)]
  const next_faction = factions[((index + 1) % factions.length)]
  const faction = factions[index]
  console.log(factions);
  return (
        <div className="content relative z-20 ">
          <div className="flex items-center justify-center h-screen">
            <TitleText
              text={lang('title')}
              fontSize={100}
              strokeWidth={40}
              fill="#3E2F2F"
              strokeColors={["#A0C5CC", "#ffffff", "#A0C5CC"]}
              width={1600}
              height={1200}
            />
          </div>
          <BackgroundBlur/>
          <div className="pt-20 relative z-[0] w-[100vw] h-full mt-[0vh] mx-auto md:w-[90vw] overflow-hidden">
            <ImageTextSection
              imgSrc="/images/lords.png"
              text={lang("home.brief_story")}
            />
            
            <div className="flex flex-col justify-center items-center px-6">
              <p className="title text-[60px] text-white mt-[40vh]">{lang("home.how_to_play")}</p>
            </div>
           
            <ImageTextSection
              imgSrc="/images/components.png"
              text={lang("home.brief_tutorial")}
              reverse={true}
              containerClassName="md:mt-[-20vh]"
              img_gradient = {[60, 80]}
            />
            <div className="flex flex-col items-center justify-center h-screen mt-[30vh]">
              <p className="text-white text-[60px]">{lang("home.factions")}</p>
              <div 
                className="flex items-center justify-center gap-4 mt-0 md:gap-16 w-full px-4"
                style={
                    {
                      WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 60%)',
                      WebkitMaskSize: '100% 100%',
                      WebkitMaskRepeat: 'no-repeat'
                    }
                }
                >
                <img src={prev_faction.img} className="w-[150px] opacity-70 cursor-pointer" onClick={() => prev()} />

                <img src={faction.img} className="w-[200px] md:w-[300px]" />

                <img src={next_faction.img} className="w-[150px] opacity-70 cursor-pointer" onClick={() => next()} />
              </div>
              <div className="grid grid-cols-[10vw_40vw_10vw] justify-items-center mt-5">
                <button className='left_arrow'><img src="/images/arrow.png" onClick={() => prev()} className="transform scale-x-[-1]"/></button>
                <div className=" bg-black border-r-6 border-l-6 pl-5 pr-5 border-[#666666] w-full text-center">
                  <p className="text-[#B5D7D7] text-[60px]">{lang(faction.name)}</p>
                </div>
                <button className="right_arrow"><img src="/images/arrow.png" onClick={() => next()} className="transform scale-x-[1]"/></button>
              </div>
            </div>
            <p className="mt-[20vh]"/>
          </div>
        </div>
      
  );
}


export default Intro;
