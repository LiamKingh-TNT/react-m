import { useState, useRef, useEffect } from 'react'
import { Link } from "react-router";
import { useTranslation } from 'react-i18next';
import factions_en from "../assets/language/en_us.json";
import factions_zh from "../assets/language/zh_tw.json";

function Filter(){

    const { t: lang, i18n } = useTranslation();
    const [factions, setFactions] = useState([]);

    useEffect(()=>{
        if(i18n.language === 'en_us'){
            setFactions(factions_en.factions);
        } else if(i18n.language === 'zh_tw'){
            setFactions(factions_zh.factions);
        }
    }, [i18n.language]);

    return(
        <div className="content relative z-20 my-30">
            <div className="flex flex-wrap justify-center items-center gap-6">
                {factions.map((faction) => (
                    <div key={lang(faction.name)} className="border p-4 rounded-lg shadow-lg"
                     style={{ 
                            backdropFilter: 'blur(10px)',
                            backgroundColor: 'rgba(99, 99, 99, 0.41)'
                        }}>
                        <img src={faction.img} alt={faction.name} className="w-full h-64 object-cover mb-4 rounded-md" />
                        <h2 className="text-[#B5D7D7] text-3xl font-bold text-center">{faction.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Filter;