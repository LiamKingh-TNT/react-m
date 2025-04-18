import { useState, useEffect } from 'react'
import { Link } from "react-router";
import { useTranslation } from 'react-i18next';
import factions from '../assets/factions';

function Filter(){

    const { t: lang } = useTranslation();
    const [selectedGroupe, setSelectedGroupe] = useState(null);

    const groupelist = [
        {id: 'solaris', name: lang('filter.solaris'), img: '/images/solaris_banner.png'},
        {id: 'chaos', name: lang('filter.chaos'), img: '/images/chaos_banner.png'},
        {id: 'selenyx', name: lang('filter.selenyx'), img: '/images/selenyx_banner.png'},
    ]

    const filteredFactions = selectedGroupe
        ? factions.filter(factions => factions.groupe === selectedGroupe)
        : factions;

    return(
        <div className="content relative z-20 mt-10 mb-30 min-h-[60vw]">
            <div className="flex justify-center space-x-6 mb-6">
                {groupelist.map((groupe) => (
                    <div
                        key={groupe.id}
                        onClick={() => setSelectedGroupe(selectedGroupe === groupe.id ? null : groupe.id)}
                        className={`cursor-pointer p-4 rounded-lg transition-all duration-300 w-20 h-20
                                    ${selectedGroupe === groupe.id ? 'opacity-100' : 'opacity-50'}`}
                        style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(99, 99, 99, 0.41)'}}
                    >
                        <img src={groupe.img} alt={groupe.name} className="w-full h-full object-contain mb-4 rounded-md" />
                        <h3 className="text-white text-xl text-center">{lang(groupe.name)}</h3>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 place-items-center w-[60vw] ml-[20vw]">
                {filteredFactions.map((faction) => (
                    <Link
                        to={`/factions/${faction.id}`}
                        key={lang(faction.name)}
                        className="flex flex-col items-center justify-between border p-4 rounded-lg shadow-lg w-36 h-48 md:w-48 md:h-64"
                        style={{
                        backdropFilter: 'blur(10px)',
                        backgroundColor: 'rgba(99, 99, 99, 0.41)',
                        }}
                    >
                        <img
                        src={faction.img}
                        alt={faction.name}
                        className="w-full h-auto max-h-40 object-contain mb-4 rounded-md"
                        />
                        <h2 className="text-white md:text-2xl text-[12px] text-center whitespace-nowrap">
                        {lang(faction.name)}
                        </h2>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Filter;