import { toast } from 'react-toastify';
import SummaryApi from '../common';

const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();
  const response = await fetch(SummaryApi.addToCartProduct.url, {
    method: SummaryApi.addToCartProduct.method,
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ productId: id }),
  });

  const resData = await response.json();

  if (resData.success) {
    toast.success(resData.message);
  }
  if (resData.error) {
    toast.error(resData.message);
  }
};

export default addToCart;
