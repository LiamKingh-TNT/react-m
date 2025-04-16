import Header from "../components/header";
import Footer from "../components/footer"

function Rule(){
    return(
        <div className="container mx-auto max-w-none w-full px-0">
            <Header/>
            <img src="./images/home_cover.png" className="fixed z-0 top-0 h-screen w-screen object-cover"/>
         </div>
    )
}

export default Rule;