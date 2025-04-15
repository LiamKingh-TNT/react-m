
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
            <div className="brief_desc w-full h-[80vh] grid grid-cols-1 md:grid-cols-2">
              <img
                src="/images/lords.png"
                alt="masked"
                className="h-full w-full object-contain"
                style={{
                  maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 60%)',
                  WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 60%)'
                }}
              />
              <div className="flex flex-col justify-center items-start px-6">
                <p className="text-white text-xl">
                  12325456
                </p>
              </div>
            </div>
            <br/>
            <br/>
          </div>
        </div>
      
  );
}


export default ProductList;
