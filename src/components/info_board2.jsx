import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import TitleText from './title_text'

export function InfoBoard({ faction, type = "lord" }) {
  console.log(faction)
  const { t: lang } = useTranslation();
  const [selected, SetSelected] = useState(0);
  const [info, SetInfo] = useState(0);

  const obj =
    type === 'lord' ?
      faction.lords :
      type === 'soldier' ?
        faction.soldiers :
        faction.cards;

  return (
    <div id={`${type}s`} className="h-fit w-[100vw] mt-[250px] mx-auto md:mt-[150px]">
      <div className="flex items-center justify-center">
        <p className="text-[60px] font-extrabold text-[#A0C5CC]">{lang(`fi.${type}s`)}</p>
      </div>
      <div className="info_frame min-h-[50vh] w-[100vw] relative right-0  md:w-[99vw] grid grid-cols-1 grid-rows-3 md:grid-cols-10 md:grid-rows-5 overflow-visible md:border-y-8">

        <div className="col-span-3 row-span-5 relative overflow-visible z-0 mt-20">
          <img
            src={obj[selected].img}
            className="absolute md:left-40 bottom-0 -top-[30vh] w-auto h-[80vh] object-contain"
            style={{
              maskImage: `radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)`,
              WebkitMaskImage: `radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)`,
            }}
          />
        </div>

        <div className="h-[50vh] col-span-6 row-span-5 flex flex-col items-start pl-1 pt-1 md:ml-20 overflow-visible">
          <p className="text-[40px] font-extrabold text-[#A0C5CC]">
            {lang(obj[selected].name, {
              defaultValue: lang(
                type === "lord" ? 'defaultLord' :
                type === "soldier" ? 'defaultSoldier' :
                  'defaultCard'
              )
            })}
          </p>

          <div className="text-[25px] min-h-[50vh] md:ml-10 md:min-h-[35vh] md:text-[30px] text-white text-left mt-0 z-20">

            <div className="grid grid-cols-2 w-full h-fit">
              <div className="grid grid-cols-6 w-full h-fit">
                <div className="col-span-2 text-right text-[#C4C4C4]">
                  <p>{lang('fi.hp')}</p>
                  <p>{lang('fi.def')}</p>
                  <p>{lang('fi.dex')}</p>
                  <p>{lang('fi.size')}</p>
                  <p>{lang('fi.type')}</p>
                  {type === "soldier" ? <p>{lang('fi.cost')}</p> : <></>}
                </div>
                <div className="col-span-4 ml-2">
                  <p>{lang(obj[selected].hp)}</p>
                  <p>{lang(obj[selected].def)}</p>
                  <p>{lang(obj[selected].dex)}</p>
                  <p>{lang(obj[selected].size)}</p>
                  <p>{lang(obj[selected].type)}</p>
                  {type === "soldier" ? <p>{lang(obj[selected].cost)}</p> : <></>}
                </div>
              </div>

              {/* ★★★ 下面这段是“技能列表”，做了 key 与 img src 的修正 ★★★ */}
              <div key={selected} className="flex w-full h-fit">
                <div className="flex flex-wrap gap-4">
                  {(obj[selected]?.skills ?? []).map((skill, skillIndex) => {
                    // ① 先给每个 skill 一个唯一 key：包含 selected、skill.name、skillIndex
                    const uniqueKey = `${selected}-${skill.name}-${skillIndex}`;

                    // ② 默认图标路径
                    const defaultIcon = "/images/skill.png";
                    // skill.icon 如果空字符串、undefined、null，就用 defaultIcon
                    const iconSrc = skill.icon ? skill.icon : defaultIcon;

                    return (
                      <div
                        key={uniqueKey}
                        className="relative group flex-shrink-0 flex flex-col items-center w-24"
                      >
                        {/* 仅在 iconSrc 非空时才渲染 img，避免传空 src */}
                        {iconSrc && (
                          <img
                            src={iconSrc}
                            alt={lang(skill.name, { defaultValue: lang("nullSkill") })}
                            className="w-16 h-16 object-contain cursor-pointer"
                          />
                        )}

                        {/* 固定显示技能名，超过宽度自动换行 */}
                        <p className="mt-1 text-[20px] text-white text-center break-words">
                          {lang(skill.name, { defaultValue: lang("nullSkill") })}
                        </p>

                        {/* Tooltip：鼠标悬停时显示详情 */}
                        <div
                          className="
                            absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
                            hidden group-hover:block
                            bg-black bg-opacity-75 text-white text-xs
                            p-2 rounded-lg w-56 z-50
                          "
                        >
                          <p className="font-bold leading-tight text-[20px]">
                            {lang(skill.name, { defaultValue: lang("nullSkill") })}
                          </p>
                          <p className="mt-1 leading-snug  text-[15px]">
                            {lang(skill.desc, { defaultValue: lang("nullSkillDesc") })}
                          </p>
                          <p className="mt-1 text-right text-[#C4C4C4] text-[15px]">
                            {lang("fi.cost")} {skill.cost ?? 0}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* ★★★ 技能列表结束 ★★★ */}

            </div>
          </div>
        </div>

      </div>

      {/* 底部小按钮，切换 selected */}
      <div className="w-[60vw] h-fit relative mt-10 left-[30vw] flex flex-wrap items-start justify-start gap-3">
        {obj.map((lord, index) => {
          return (
            <button
              key={`thumb-${index}`}
              onClick={() => SetSelected(index)}
              className={`
                w-[6em] h-[6em]
                hover:border-[#7FA4AA]
                border-4 border-[${selected === index ? "#7FA4AA" : "#44646B"}]
              `}
            >
              <img src={lord.head_img} alt="icon" className="w-full h-full" />
            </button>
          );
        })}
      </div>
    </div>
  )
}
