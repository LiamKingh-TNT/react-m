import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { useState } from 'react';

function ProductDetail({ product }) {  // 解構 props 取得 product
  if (!product) {
    return <p className="text-red-500">No product data available.</p>;
  }
  
  const [qty, setQty] = useState(product.stock > 0? 1: 0);

  return (
    
    <div className="pt-4 h-fit w-fit px-3 lg:px-4 text-white grid grid-cols-2 text-left gap-4">
      <img src={product.cover} className="" alt={product.title} />
      <div className="text-left"> 
        <p className="text-[30px]">Title : {product.title}</p>
        <p className="text-[24px]">Author : {product.author}</p>
        <p className="text-[24px]">Summary :</p>
        <p className="text-[16px]">{product.summary}</p>
        <p className="text-[18px]">Price: {product.price}</p>
        <p className="text-[18px]">Stock: {product.stock}</p>
        
        <p>
          <span>status</span> : {product.stock > 0? "In Stock" : "Unavailable."}
        </p>
        <div className="flex items-center gap-2">
          <span className="font-bold">Qty :</span>
          <button className="text-black btn rounded-full" onClick={() => qty-10>=1? setQty(qty-10): setQty(qty)}>-10</button>
          <button className="text-black btn rounded-full" onClick={() => qty-1>=1? setQty(qty-1): setQty(qty)}>-1</button>
          <select className="select select-bordered w-20 bg-[#111818] text-white"
                defaultValue={product.stock > 0? 1 : 0}
                value={qty}
                onChange={ event => setQty(event.target.value)}
          >
            {
              Array(product.stock).keys().map((x) =>(
                <option key={x+1} value={x+1}>
                  {x+1}
                </option>
              ))
            }
          </select>
          <button className="text-black btn rounded-full" onClick={() => qty+1<=product.stock? setQty(qty+1): setQty(product.stock)}>+1</button>
          <button className="text-black btn rounded-full" onClick={() => qty+10<=product.stock? setQty(qty+10): setQty(product.stock)}>+10</button>
        </div>
        <p>
          <span className="font-bold">Total Price</span>:{product.price * qty}
        </p>
        <br/>
        <Link to="/" className="text-blue-400">
            Back
        </Link>
      </div>
    </div>
  );
}



export default ProductDetail;
