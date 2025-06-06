import { useState } from 'react'
import { Link } from "react-router"
import { useTranslation } from 'react-i18next'
import factions from '../assets/factions'

function Filter(){
  const { t: lang } = useTranslation()
  const [selectedGroupe, setSelectedGroupe] = useState(null)
  const [hoverGroupe, setHoverGroupe] = useState(null)

  const groupelist = [
    {id: 'solaris', name: 'filter.solaris', img: '/images/solaris_banner.png'},
    {id: 'chaos',   name: 'filter.chaos',   img: '/images/chaos_banner.png'},
    {id: 'selenyx', name: 'filter.selenyx', img: '/images/selenyx_banner.png'},
  ]

  const filteredFactions = selectedGroupe
    ? factions.filter(f => f.groupe === selectedGroupe)
    : factions

  return (
    <div className="content relative z-20 mt-10 mb-30 min-h-[60vw]">
      <div className="flex justify-center space-x-6 mb-6">
        {groupelist.map((groupe) => (
          <div
            key={groupe.id}
            onClick={() =>
              setSelectedGroupe(selectedGroupe === groupe.id ? null : groupe.id)
            }
            onMouseEnter={() => setHoverGroupe(groupe.id)}
            onMouseLeave={() => setHoverGroupe(null)}
            className={`
              cursor-pointer p-4 rounded-lg transition-all duration-300
              ${selectedGroupe === groupe.id ? 'w-35 h-35' : 'w-30 h-30'}
              ${hoverGroupe === groupe.id ? 'bg-[#f8bfbfa1]' : 'bg-[#e997975f]'}
            `}
            style={{
              backdropFilter: 'blur(10px)'
            }}
          >
            <img
              src={groupe.img}
              alt={lang(groupe.name)}
              className="w-full h-full object-contain mb-4 rounded-md"
            />
            <h3 className="text-white text-xl text-center">
              {lang(groupe.name)}
            </h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 place-items-center w-[60vw] ml-[20vw]">
        {filteredFactions.map((f) => (
          <Link
            to={`/factions/${f.id}`}
            key={f.id}
            className="flex flex-col items-center justify-between border p-4 rounded-lg shadow-lg w-36 h-48 md:w-48 md:h-64 bg-[#6363635d] hover:bg-[#ababab5d]"
            style={{
              backdropFilter: 'blur(10px)'
            }}
          >
            <img
              src={f.img}
              alt={f.name}
              className="w-full h-auto max-h-40 object-contain mb-4 rounded-md"
            />
            <h2 className="text-white md:text-[20px] text-[12px] text-center whitespace-nowrap">
              {lang(f.name)}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Filter
