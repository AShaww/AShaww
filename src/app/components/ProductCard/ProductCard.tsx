import React from "react";
import AddToCart from "../AddToCard";

const ProductCard = () => {
    return (
        <div className='p-6 my-5 bg-slate-600 text-white text-xl hover:bg-slate-400 hover:text-black'>
           <AddToCart />
        </div>
    )
}

export default ProductCard