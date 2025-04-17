import Header from "../components/header";
import Footer from "../components/footer"
import { FactionIntroContent } from "../components/faction_intro_content";
import factions from '@/assets/factions'
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router';

function FactionIntro() {
    const {faction_name} = useParams();
    const index = factions.findIndex(item => item.id === faction_name);
    console.log(faction_name);

    return(
        <div className="container mx-auto max-w-none w-full px-0">
            <Header />
            <FactionIntroContent 
                faction={factions[index]}
            />
            {console.log(factions[index].backgound_img)}
            <img src={factions[index].background_img} className="fixed z-10 top-0 h-screen w-screen object-cover"/>
            <Footer />
        </div>
    )

}

export default FactionIntro