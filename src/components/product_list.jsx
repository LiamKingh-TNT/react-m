import products from "../assets/books.json";
import { BrowserRouter, Routes, Route, Link } from 'react-router';

function ProductList() {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 content">
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
              12312313221
            </div>
          </div>
        ))}
      </div>
  );
}
function tuncateText(text,length)
{
  return text.length > length ? text.substring(0, length) + "..." : text;
}

export default ProductList;
