import { useState } from "react";
import { CartIcon } from "./cart_icon";
function CartSummery()
{
    const [cartIsOpen, setIsOpen] = useState(false);
    const toggleModel = ()=> setIsOpen(!cartIsOpen);
    return(
        <nav
            onClick={toggleModel}
            className="inline-block absolute top-6 right-2 md:right-6 cursor-pointer"
        >
            <div className="indicator">
                <span className="indicator-item badge badge-primary text-white">5</span>
                <CartIcon size={32} color="currentColor"/>
            </div>
            <p className=" text-xs opacity-60 mt-[-4px]">Shopping Bag</p>
        </nav>
    )
}
export default CartSummery