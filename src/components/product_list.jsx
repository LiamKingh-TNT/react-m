import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { useTranslation } from 'react-i18next'
import ImageTextSection from './image_text_sction';
function ProductList() {
  const { t:lang } = useTranslation()
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
            <p className="mt-[50vh]"/>
          </div>
        </div>
      
  );
}


export default ProductList;
