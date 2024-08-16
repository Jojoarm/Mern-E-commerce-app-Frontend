import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const Products = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch(SummaryApi.products.url, {
      method: SummaryApi.products.method,
    });
    const dataResponse = await response.json();
    setProducts(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* All products */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {products.map((product, index) => {
          return (
            <AdminProductCard
              data={product}
              key={index + 'products'}
              fetchData={fetchProducts}
            />
          );
        })}
      </div>

      {/* Upload product component */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchProducts}
        />
      )}
    </div>
  );
};

export default Products;
