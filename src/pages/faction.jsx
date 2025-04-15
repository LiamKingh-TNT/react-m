import Header from "../components/header";
import Filter from "../components/filter";
import Footer from "../components/footer"

function Faction() {

    return(
        <div className="container mx-auto max-w-none w-full px-0">
            <Header />
            <Filter />
            <img src="./images/faction_background.png" className="fixed z-0 top-0 h-screen w-screen object-cover"/>
            <Footer />
        </div>
    )

}

export default Faction