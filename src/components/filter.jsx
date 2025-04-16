import { useState, useEffect } from 'react'
import { Link } from "react-router";
import { useTranslation } from 'react-i18next';
import factions from '../assets/factions';

function Filter(){

    const { t: lang } = useTranslation();

    return(
        <div className="content relative z-20 my-30">
            <div className="grid grid-cols-3 gap-6 place-items-center w-[60vw] ml-[20vw]">
                {factions.map((faction) => (
                    <div key={lang(faction.name)} className="border p-4 rounded-lg shadow-lg w-fit h-fit"
                     style={{ 
                            backdropFilter: 'blur(10px)',
                            backgroundColor: 'rgba(99, 99, 99, 0.41)'
                        }}>
                        <img src={faction.img} alt={faction.name} className="w-full h-64 object-contain mb-4 rounded-md" />
                        <h2 className="text-[#B5D7D7] text-3xl text-center">{lang(faction.name)}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Filter;