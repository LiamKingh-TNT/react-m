
import Header from '@/components/header'
import Footer from '@/components/footer'
import Intro from '@/components/intro'
import CartSummery from '@/components/cart_summery'
function MainPage() {
  return (
    <div className="container mx-auto max-w-none w-full px-0">
      <Header/>
      <CartSummery />
      <Intro />
      <img src="./images/home_cover.png" className="fixed z-0 top-0 h-screen w-screen object-cover"/>
      <Footer />
    </div>
  )
}

export default MainPage
