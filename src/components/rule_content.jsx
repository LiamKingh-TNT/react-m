import BackgroundBlur from "./background_blur"
import { useTranslation } from 'react-i18next'
import TitleText from './title_text'
export default function RuleContent(){
    const { t:lang } = useTranslation();
    const scrollToWithOffset = (id) => {
        const element = document.getElementById(id);
        const offset = -100; // 上移 100px，可根據你的 header 高度調整
      
        if (element) {
          const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      };
    return(
        <div className="content relative z-20 ">
          <div className="flex items-center justify-center h-screen">
           <TitleText
                text={lang('rule.title')}
                fontSize={100}
                strokeWidth={40}
                fill="#3E2F2F"
                strokeColors={["#A0C5CC", "#ffffff", "#A0C5CC"]}
                width={1600}
                height={1200}
            />
          </div>
          <BackgroundBlur/>
          <div id="target" className="md:ml-[15vw] w-full md:w-[75vw] min-h-fit relative z-20 text-white text-[30px] text-start md:px-[8em] border-y-8 border-[#73979F]">
            <TitleText
                text={lang('rule.target.title')}
                fontSize={60}
                strokeWidth={10}
                fill="#3E2F2F"
                strokeColors={["#A0C5CC", "#ffffff", "#A0C5CC"]}
                width={1600}
                height={1200}
            />
            <div className=" w-full h-fit relative z-40">
                <p className="text-[#C4C4C4]">{lang('rule.target.conquer.name')}</p>
                <p className="ml-[5vw]">{lang('rule.target.conquer.desc')}</p>
                <br/>
                <p className="text-[#C4C4C4]">{lang('rule.target.annihilation.name')}</p>
                <p className="ml-[5vw]">{lang('rule.target.annihilation.desc')}</p>
            </div>
          </div>
          <div id="play" className=" md:ml-[15vw] w-full md:w-[75vw] min-h-fit relative z-20 text-white text-[30px] mt-[40vh] text-start md:px-[4em] border-y-8 border-[#73979F]">
            <TitleText
                text={lang('rule.play.title')}
                fontSize={60}
                strokeWidth={10}
                fill="#3E2F2F"
                strokeColors={["#A0C5CC", "#ffffff", "#A0C5CC"]}
                width={1600}
                height={1200}
            />
            <div className=" w-full h-fit relative z-40">
                <p className="text-[#C4C4C4]">{lang('rule.play.init.name')}</p>
                <div className="ml-[5vw] flex flex-col gap-5">
                    <p>{lang('rule.play.init.desc_1')}</p>
                    <p className="md:ml-[5vw]">{lang('rule.play.init.desc_2')}</p>
                    <p className="md:ml-[5vw]">{lang('rule.play.init.desc_3')}</p>
                    <p className="md:ml-[5vw]">{lang('rule.play.init.desc_4')}</p>
                    <p>{lang('rule.play.init.desc_5')}</p>
                    <p>{lang('rule.play.init.desc_6')}</p>
                </div>
                <br/>
                <p className="text-[#C4C4C4]">{lang('rule.play.game.name')}</p>
                <div className="ml-[5vw] flex flex-col gap-5">
                    <p>{lang('rule.play.game.desc_1')}</p>
                    <p>{lang('rule.play.game.desc_2')}</p>
                    <p>{lang('rule.play.game.desc_3')}</p>
                    <table className="table-auto border-collapse w-full text-center">
                        <thead>
                            <tr className="border-b-4">
                            <th>{lang('rule.round')}</th>
                            <th>{lang('rule.action_point')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td>6 {lang('rule.ap')}</td>
                            </tr>
                            <tr>
                            <td>2</td>
                            <td>8 {lang('rule.ap')}</td>
                            </tr>
                            <tr>
                            <td>3</td>
                            <td>10 {lang('rule.ap')}</td>
                            </tr>
                        </tbody>
                        </table>
                    <p>{lang('rule.play.game.desc_4')}</p>
                    <p className="ml-[4vw] font-bold text-[#C4C4C4] text-[35px]">{lang('rule.play.game.desc_5')}</p>
                    <p className="ml-[5vw]">{lang('rule.play.game.desc_6')}</p>
                    <p className="ml-[5vw]">{lang('rule.play.game.desc_7')}</p>
                    <p className="ml-[5vw]">{lang('rule.play.game.desc_8')}</p>
                    <p className="ml-[4vw] font-bold text-[#C4C4C4] text-[35px]">{lang('rule.play.game.desc_9')}</p>
                    <p className="ml-[5vw]">{lang('rule.play.game.desc_10')}</p>
                    <p className="ml-[5vw]">{lang('rule.play.game.desc_11')}</p>
                    <p className="ml-[4vw] font-bold text-[#C4C4C4] text-[35px]">{lang('rule.play.game.desc_12')}</p>
                    <p className="ml-[5vw]">{lang('rule.play.game.desc_13')}</p>
                    <p className="ml-[5vw] text-[#C4C4C4]">{lang('rule.play.game.desc_14')}</p>
                    <p className="ml-[5vw]">{lang('rule.play.game.desc_15')}</p>
                    <p className="ml-[5vw] text-[#C4C4C4]">{lang('rule.play.game.desc_16')}</p>
                    <p className="ml-[5vw]">{lang('rule.play.game.desc_17')}</p>
                    <p className="ml-[5vw] text-[#C4C4C4]">{lang('rule.play.game.desc_18')}</p>
                    <p className="ml-[5vw]">{lang('rule.play.game.desc_19')}</p>
                    <p className="ml-[5vw]">{lang('rule.play.game.desc_20')}</p>
                </div>
            </div>
          </div>
          <p className="mt-[40vh]"/>
          <div className="hidden md:flex flex-col fixed left-0 top-1/2 mt-15 ml-10 -translate-y-1/2 items-center justify-center w-[10vw]">
            <button onClick={()=>scrollToWithOffset("target")} className=" text-white text-[25px]">{lang('rule.target.title')}</button>
            <div className="h-10 w-[2px] bg-gray-300" />
            <button onClick={()=>scrollToWithOffset("play")} className=" text-white text-[25px]">{lang('rule.play.title')}</button>
            <div className="h-10 w-[2px] bg-gray-300" />
            <button onClick={()=>scrollToWithOffset("soldiers")} className=" text-white text-[25px]">{lang('fi.soldiers')}</button>
            <div className="h-10 w-[2px] bg-gray-300" />
            <button onClick={()=>scrollToWithOffset("cards")} className=" text-white text-[25px]">{lang('fi.cards')}</button>
            </div>
        </div>
    )
}