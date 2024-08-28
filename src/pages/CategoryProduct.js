import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalProductCard from '../components/VerticalProductCard';
import SummaryApi from '../common';

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListInArray = urlSearch.getAll('category');
  const urlCartegoryListObject = {};
  urlCategoryListInArray.forEach((el) => {
    urlCartegoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCartegoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const [sortBy, setSortBy] = useState('');

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });
    const dataRes = await response.json();

    setData(dataRes?.data || []);
  };

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);
    setFilterCategoryList(arrayOfCategory);

    //format for url change when check box checked
    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });

    navigate('/product-category?' + urlFormat.join(''));
  }, [selectCategory]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);

    if (value === 'asc') {
      setData((prev) => prev.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }
    if (value === 'dsc') {
      setData((prev) => prev.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  useEffect(() => {}, [sortBy]);

  return (
    <div className="container mx-auto p-4">
      {/* Destop verstion */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* left side */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/* Sort by */}
          <div className="text-lg">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Sort by:
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value={'asc'}
                  checked={sortBy === 'asc'}
                  onChange={handleOnChangeSortBy}
                />
                <label>Price - Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value={'dsc'}
                  checked={sortBy === 'dsc'}
                  onChange={handleOnChangeSortBy}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category:
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => {
                return (
                  <div
                    className="flex items-center gap-3"
                    key={categoryName.label + index}
                  >
                    <input
                      type="checkbox"
                      name={'category'}
                      checked={selectCategory[categoryName?.value]}
                      id={categoryName?.value}
                      value={categoryName?.value}
                      onChange={handleSelectCategory}
                    />
                    <label htmlFor={categoryName?.value}>
                      {categoryName?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        {/* right side */}
        <div className="px-4">
          <p className="font-medium text-center text-slate-800 text-lg my-2">
            Search Results: {data.length}
          </p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            {data.length !== 0 && (
              <VerticalProductCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
