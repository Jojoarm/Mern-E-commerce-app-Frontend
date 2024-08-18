import React from 'react';
import CategoryProductList from '../components/CategoryProductList';
import BannerProducts from '../components/BannerProducts';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';

const Home = () => {
  return (
    <div>
      <CategoryProductList />
      <BannerProducts />

      <HorizontalCardProduct category={'airpods'} heading={'Top Airpods'} />
      <HorizontalCardProduct category={'watches'} heading={'Top Watches'} />

      <VerticalCardProduct category={'mobiles'} heading={'Mobiles'} />
      <VerticalCardProduct category={'mouse'} heading={'Mouse'} />
      <VerticalCardProduct
        category={'refrigerators'}
        heading={'Refrigerators'}
      />
      <VerticalCardProduct category={'televisions'} heading={'Televisions'} />
      <VerticalCardProduct
        category={'camera'}
        heading={'Camera & Photography'}
      />
      <VerticalCardProduct category={'earphones'} heading={'Wired Earphones'} />
      <VerticalCardProduct
        category={'speakers'}
        heading={'Bluetooth Speakers'}
      />
      <VerticalCardProduct category={'trimmers'} heading={'Trimmers'} />
    </div>
  );
};

export default Home;
