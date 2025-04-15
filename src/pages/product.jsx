import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router';
import Products from "../assets/books_reviews.json";
import Header from "../components/header";
import Footer from "../components/footer";
import ProductDetail from "../components/product_detail";

function ProductItem() {
  const { productId } = useParams();
  const product = Products.find(
    (x) => x.ID === Number(productId) // 轉換字串為數字
  );

  console.log("Fetched Product:", product);

  return (
    <div className="container mx-auto main-layout">
      <Header/>
      {product ? (
        <ProductDetail product={product} className="content" />
      ) : (
        <p className="text-center text-red-500">Product not found</p>
      )}
      <Footer />
    </div>
  );
}

export default ProductItem;
