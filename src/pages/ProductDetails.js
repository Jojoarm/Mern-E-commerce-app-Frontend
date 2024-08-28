import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar } from 'react-icons/fa';
import { FaStarHalf } from 'react-icons/fa';
import displayNIGCurrency from '../helpers/displayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: '',
    brandName: '',
    category: '',
    productImage: [],
    description: '',
    price: '',
    sellingPrice: '',
  });

  const [loading, setLoading] = useState(false);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState('');

  const [zoomImageCordinate, setZoomImageCordinate] = useState({ x: 0, y: 0 });
  const [zoomImage, setZoomImage] = useState(false);

  const { fetchUserAddToCartCount } = useContext(Context);
  const navigate = useNavigate();

  const params = useParams();

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataResponse = await response.json();
    setData(dataResponse.data);
    setActiveImage(dataResponse?.data.productImage[0]);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      // console.log('cordinate', left, top, width, height);
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomImageCordinate({
        x,
        y,
      });
    },
    [zoomImageCordinate]
  );

  const handleZoomOutImage = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCartCount();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCartCount();
    navigate('/cart');
  };

  return (
    <div className="container mx-auto p-4">
      <div className=" min-h-[200px] flex flex-col lg:flex-row gap-4 ">
        {/* product Image */}

        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          {loading ? (
            <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-300 animate-pulse"></div>
          ) : (
            <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-300 relative p-2">
              <img
                src={activeImage}
                alt={activeImage}
                className="h-full w-full object-scale-down mix-blend-multiply"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleZoomOutImage}
              />
              {/* product zoom */}
              {zoomImage && (
                <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-300 p-1 -right-[510px] top-0">
                  <div
                    className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: `${zoomImageCordinate.x * 100}% ${
                        zoomImageCordinate.y * 100
                      }%`,
                    }}
                  ></div>
                </div>
              )}
            </div>
          )}

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((imageUrl, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-300 rounded animate-pulse"
                      key={imageUrl + index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imageUrl, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-300 rounded"
                      key={imageUrl}
                    >
                      <img
                        src={imageUrl}
                        alt={imageUrl}
                        className="h-full w-full object-scale-down mix-blend-multiply p-1 cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(imageUrl)}
                        onClick={() => handleMouseEnterProduct(imageUrl)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-300 animate-pulse rounded-full inline-block h-6 lg:h-8 w-full"></p>
            <p className="bg-slate-300 animate-pulse h-6 lg:h-8  text-2xl lg:text-4xl font-medium w-full "></p>
            <p className="capitalize text-slate-500 bg-slate-300 animate-pulse h-6 lg:h-8  w-full"></p>
            <div className="text-yellow-500 flex items-center gap-1 bg-slate-300 animate-pulse w-full h-6 lg:h-8 "></div>
            <div className="flex gap-2 text-2xl lg:text-3xl font-medium my-1">
              <p className="text-red-600 bg-slate-300 animate-pulse h-6"></p>
              <p className="text-slate-400 line-through bg-slate-300 animate-pulse h-6"></p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button className="h-6 lg:h-8  bg-slate-300 animate-pulse w-full"></button>
              <button className="h-6 lg:h-8  bg-slate-300 animate-pulse w-full"></button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1 h-6 lg:h-8  bg-slate-300 animate-pulse w-full"></p>
              <p className="h-10 lg:h-12 bg-slate-300 animate-pulse"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data?.productName}
            </h2>
            <p className="capitalize text-slate-500">{data?.category}</p>
            <div className="text-yellow-500 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex gap-2 text-2xl lg:text-3xl font-medium my-1">
              <p className="text-red-600">
                {displayNIGCurrency(data?.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {displayNIGCurrency(data?.price)}
              </p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button
                onClick={(e) => handleBuyProduct(e, data?._id)}
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white"
              >
                Order
              </button>
              <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font medium text-white bg-red-600 hover:bg-white hover:text-red-600"
                onClick={(e) => handleAddToCart(e, data?._id)}
              >
                Add To Cart
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1">Desciption:</p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {data.category && (
        <CategoryWiseProductDisplay
          category={data?.category}
          heading={'Recommended Products'}
        />
      )}
    </div>
  );
};

export default ProductDetails;
