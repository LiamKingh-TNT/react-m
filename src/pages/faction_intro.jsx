import Header from "../components/header";
import Footer from "../components/footer"
import { FactionIntroContent } from "../components/faction_intro_content";
import factions from '@/assets/factions'

function Faction() {

    return(
        <div className="container mx-auto max-w-none w-full px-0">
            <Header />
            <FactionIntroContent 
                faction={factions[0]}
            />
            <img src="./images/faction_background.png" className="fixed z-0 top-0 h-screen w-screen object-cover"/>
            <Footer />
        </div>
    )

}

export default Faction