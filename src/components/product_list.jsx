import products from "../assets/books.json";
import { BrowserRouter, Routes, Route, Link } from 'react-router';

function ProductList() {
  return (
        <div className="content relative z-20 ">
          <div className="flex items-center justify-center h-screen">
            <p className="text-[#3E2F2F] text-[30px] z-50 mt-[-10vh] title overflow-visible md:text-[120px]" data-storke="-The Throne of Delusion-">-The Throne of Delusion-</p>
          </div>
          <div className="background pt-20 relative z-[0] w-[100vw] h-full mt-[0vh] mx-auto backdrop-blur-md shadow-md md:w-[90vw] overflow-hidden">


          
            <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
              {products.map(product => (
                <div key={product.ID} className="pt-4 h-fit px-3 lg:px-4 text-white grid grid-cols-2 text-left gap-4">
                  <img src={product.cover} className=""/>
                  <div className="text-left"> 
                    <p className="text-[15px]">Title : {product.title}</p>
                    <p className="text-[12px]">Author : {product.author}</p>
                      <p className="text-[12px]">Summary :</p>
                      <p className="text-[8px]">{tuncateText(product.summary, 80)}</p>
                    <p className="text-[12px]">Price: {product.price}</p>
                    <p className="text-[12px]">Stock: {product.stock}</p>
                    <Link to={`/products/id/${product.ID}`} className="product-link text-blue-400">
                      See More...
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      
  );
}
function tuncateText(text,length)
{
  return text.length > length ? text.substring(0, length) + "..." : text;
}

export default ProductList;
