import Header from "../components/header";
import Footer from "../components/footer"
import RuleContent from "../components/rule_content";

function Rules() {
    return(
        <div className="container mx-auto max-w-none w-full px-0">
            <Header />
            <RuleContent/>
            <img src="./images/rule_background.png" className="fixed z-10 top-0 h-screen w-screen object-cover"/>
            <Footer />
        </div>
    )

}

export default Rules