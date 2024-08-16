import React from 'react';
import CategoryProductList from '../components/CategoryProductList';
import BannerProducts from '../components/BannerProducts';

const Home = () => {
  return (
    <div>
      <CategoryProductList />
      <BannerProducts />
    </div>
  );
};

export default Home;
