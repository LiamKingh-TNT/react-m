
import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { useTranslation } from 'react-i18next'

function ProductList() {
  const { t:lang } = useTranslation()
  return (
        <div className="content relative z-20 ">
          <div className="flex items-center justify-center h-screen">
            <p className="text-[#3E2F2F] z-50 mt-[-10vh] title overflow-visible text-[8vw] font-extrabold" data-storke={lang('title2')}>{lang('title2')}</p>
          </div>
          <div className="background pt-20 relative z-[0] w-[100vw] h-full mt-[0vh] mx-auto backdrop-blur-md shadow-md md:w-[90vw] overflow-hidden">
            <div className="brief_desc w-full h-[80vh]">
              <img
                src="/images/Lords.png"
                alt="masked"
                className="h-full w-full object-contain"
                style={{
                  maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 75%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 80%)'
                }}
              />
            </div>
          </div>
        </div>
      
  );
}


export default ProductList;
