import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SummaryApi from '../common';
import VerticalProductCard from '../components/VerticalProductCard';

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.searchProduct.url + query.search);
    const dataRes = await response.json();
    setData(dataRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);
  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-lg text-center">Loading...</p>}
      <p className="text-lg font-semibold my-3 text-center">
        Search Results: {data.length}
      </p>
      {data.length === 0 && !loading && (
        <p className="bg-white text-lg text-center p-4">No Data Found!!!</p>
      )}

      {data.length !== 0 && !loading && (
        <VerticalProductCard loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProduct;
