import React, { useContext } from 'react';
import scrollTop from '../helpers/scrollTop';
import { Link } from 'react-router-dom';
import displayNIGCurrency from '../helpers/displayCurrency';
import Context from '../context';
import addToCart from '../helpers/addToCart';

const VerticalProductCard = ({ loading, data = [] }) => {
  const { fetchUserAddToCartCount } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCartCount();
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-center md:gap-8 overflow-x-scroll scrollbar-none transition-all">
      {loading ? (
        <p>Loading...</p>
      ) : (
        data.map((product, index) => {
          return (
            <Link
              to={'/product/' + product?._id}
              className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow"
              key={product + index}
              onClick={scrollTop}
            >
              <div className="bg-slate-300 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                <img
                  src={product.productImage[0]}
                  alt={product.productImage[0]}
                  className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                />
              </div>

              <div className="p-2 grid gap-3">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                  {product?.productName}
                </h2>
                <p className="capitalize text-slate-500">{product?.category}</p>
                <div className="">
                  <p className="text-red-600 font-medium">
                    {displayNIGCurrency(product?.sellingPrice)}
                  </p>
                  <p className="text-slate-500 line-through">
                    {displayNIGCurrency(product?.price)}
                  </p>
                </div>
                <button
                  className="text-sm bg-red-500 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
                  onClick={(e) => handleAddToCart(e, product?._id)}
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default VerticalProductCard;
