export default function RuleContent(){
    return(
        <div className="content relative z-20 ">
          <div className="flex items-center justify-center h-screen">
            <p className="text-[#3E2F2F] z-50 mt-[-10vh] title overflow-visible text-[8vw] font-extrabold" data-storke={lang('title2')}>{lang('title2')}</p>
          </div>
          <div className="pt-20 fixed z-[0] w-[100vw] h-[100vh] top-0 ml-[5vw] backdrop-blur-md shadow-md md:w-[90vw] overflow-hidden"
               style={{
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                backgroundColor: 'rgba(0,0,0,0.2)'
              }}
          />
        </div>
    )
}