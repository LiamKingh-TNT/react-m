import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { useState} from 'react'
import { useTranslation } from 'react-i18next'
import TitleText from './title_text'
export function InfoBoard({faction, type="lord"}){
    console.log(faction)
    const { t:lang } = useTranslation();
    const [selected, SetSelected] = useState(0);
    const [info,SetInfo] = useState(0);
    const obj =
        type=='lord'?
        faction.lords:
        type=='soldier'?
        faction.soldiers:
        faction.cards
    return(
        <div  id={`${type}s`} className="h-fit w-[100vw] mt-[250px] mx-auto md:mt-[150px]">
            <div className="flex items-center justify-center">
                <TitleText
                text={lang(`fi.${type}s`)}
                fontSize={80}
                strokeWidth={30}
                fill="#3E2F2F"
                strokeColors={["#A0C5CC", "#ffffff", "#A0C5CC"]}
                width={1000}
                height={1000}
                />
            </div>
            <div className="info_frame min-h-fit md:min-h-[50vh] w-[100vw] relative right-0  md:w-[99vw] grid grid-cols-1 grid-rows-3 md:grid-cols-10 md:grid-rows-5 overflow-visible md:border-y-8">

                <div className="col-span-3 row-span-5 relative overflow-visible z-0">
                <img
                    src={obj[selected].img}
                    className="absolute bottom-0 -top-[30vh] w-auto h-[80vh] object-contain"
                    style={{
                    maskImage: `radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)`,
                    WebkitMaskImage: `radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)`,
                    }}
                />
                </div>

                <div className="col-span-6 row-span-5 flex flex-col items-start pl-1 pt-1">
                <TitleText
                    text={lang(obj[selected].name)}
                    fontSize={40}
                    strokeWidth={10}
                    fill="#B5D7D7"
                    strokeColors={["#A0C5CC", "#ffffff", "#A0C5CC"]}
                    width={1000}
                    height={1000}
                    align="left"
                />
                <div className="text-[25px] min-h-[50vh] md:min-h-[35vh] md:text-[30px] text-white text-left mt-0 z-20">
                    {type=="card"&&(
                        <div className="grid grid-cols-1 w-full h-fit">
                            <p className=" text-white">
                                {lang(obj[selected].desc)}
                            </p>
                            <div className="flex items-start w-full h-fit">
                                <p  className="text-right z-40 text-[#C4C4C4]">{lang('fi.cost')}</p>
                                <p  className="text-left">{lang(obj[selected].cost)}</p>
                            </div>
                        </div>
                    )}
                    {(info===0 && type!="cards")&&(
                    <p className=" text-white">
                        {lang(obj[selected].story)}
                    </p>
                    )}
                    {(info===1 && type!="cards")&&(
                    <div className="grid grid-cols-6 w-full h-fit">
                        <div className="col-span-1 text-right text-[#C4C4C4]">
                        <p>{lang('fi.hp')}</p>
                        <p>{lang('fi.def')}</p>
                        <p>{lang('fi.dex')}</p>
                        <p>{lang('fi.size')}</p>
                        <p>{lang('fi.type')}</p>
                        {type=="soldier"?<p>{lang('fi.cost')}</p>:<></>}
                        </div>
                        <div className="col-span-2 ml-2">
                        <p>{lang(obj[selected].hp)}</p>
                        <p>{lang(obj[selected].def)}</p>
                        <p>{lang(obj[selected].dex)}</p>
                        <p>{lang(obj[selected].size)}</p>
                        <p>{lang(obj[selected].type)}</p>
                        {type=="soldier"?<p>{lang(obj[selected].cost)}</p>:<></>}
                        
                        </div>
                    </div>
                    )}
                    {(info===2 && type!="cards")&&(
                    <div className="flex flex-col w-full h-fit">
                        {obj[selected].skills.map((skill) => (
                        <div key={lang(skill.name)} className="grid grid-cols-5 w-full h-fit ">
                            <div className="col-span-2 text-right text-[#C4C4C4]">
                            <p>{lang(skill.name)}</p>
                            </div>
                            <div className="col-span-3 grid grid-rows-2 ml-2">
                            <p>{lang(skill.desc)}</p>
                            <div className="flex items-start w-full h-fit">
                                <p  className="text-right z-40 text-[#C4C4C4]">{lang('fi.cost')}</p>
                                <p  className="text-left">{lang(skill.cost)}</p>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    )}
                </div>
                </div>
                {type!="card"? <div className="absolute top-80 md:top-1/2 right-0 -translate-y-1/2 flex flex-col space-y-0 z-50">
                    <button onClick={()=>SetInfo(0)} className={`w-16 h-16 bg-[${info==0?"#7FA4AA":"#44646B"}] hover:bg-[#7FA4AA] rounded-l-md flex items-center justify-center`}>
                        <img src="/images/open-book.png" alt="icon" className="w-14 h-auto" />
                    </button>
                    <button onClick={()=>SetInfo(1)} className={`w-16 h-16 bg-[${info==1?"#7FA4AA":"#44646B"}] hover:bg-[#7FA4AA] rounded-l-md flex items-center justify-center`}>
                        <img src="/images/features.png" alt="icon" className="w-14 h-auto" />
                    </button>
                    <button onClick={()=>SetInfo(2)} className={`w-16 h-16 bg-[${info==2?"#7FA4AA":"#44646B"}] hover:bg-[#7FA4AA] rounded-l-md flex items-center justify-center`}>
                        <img src="/images/skill.png" alt="icon" className="w-14 h-auto" />
                    </button>
                </div>:<></>}
                
            </div>
            <div className="w-[60vw] h-fit relative mt-10 left-[30vw] flex flex-wrap items-start justify-start gap-3">
                {obj.map((lord, index) =>{
                    return(
                    <button onClick={()=>SetSelected(index)} className={` w-[6em] h-[6em] hover:border-[#7FA4AA] border-4 border-[${selected==index?"#7FA4AA":"#44646B"}]`}>
                    <img src={lord.head_img} alt="icon" className="w-full h-full" />
                    </button>
                )})}
                </div>
        </div>
    )
}