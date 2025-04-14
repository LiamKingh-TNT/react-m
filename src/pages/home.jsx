
import Header from '@/components/header'
import Footer from '@/components/footer'
import ProductList from '@/components/product_list'
import CartSummery from '@/components/cart_summery'
function MainPage() {

  return (
    <div className="container mx-auto max-w-none w-full px-0">
      <Header/>
      <CartSummery />
      <ProductList />
      <img src="./images/home_cover.png" className="fixed z-0 top-0"/>
      <Footer />
    </div>
  )
}

export default MainPage
