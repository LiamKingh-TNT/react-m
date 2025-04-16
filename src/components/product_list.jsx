import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ImageTextSection from './image_text_sction';
import factions from '@/assets/factions'
function ProductList() {
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
            <p className="text-[#3E2F2F] z-50 mt-[-10vh] title overflow-visible text-[8vw] font-extrabold" data-storke={lang('title2')}>{lang('title2')}</p>
          </div>
          <div className="background pt-20 relative z-[0] w-[100vw] h-full mt-[0vh] mx-auto backdrop-blur-md shadow-md md:w-[90vw] overflow-hidden">
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
              <p className="text-white text-[60px]">{lang("home.faction")}</p>
              <div className="flex items-center justify-center gap-4 mt-0 md:gap-16 w-full px-4">
                <img src={next_faction.img} className="w-[150px] opacity-70 cursor-pointer" />

                <img src={faction.img} className="w-[200px] md:w-[300px]" />

                <img src={prev_faction.img} className="w-[150px] opacity-70 cursor-pointer" />
              </div>
              <p className="text-white text-[60px]">{lang(faction.name)}</p>
            </div>
            <p className="mt-[50vh]"/>
          </div>
        </div>
      
  );
}


export default ProductList;
