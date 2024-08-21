const backendDomain = 'http://localhost:8080/api';

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/signup`,
    method: 'post',
  },
  signIn: {
    url: `${backendDomain}/signin`,
    method: 'post',
  },
  logout_user: {
    url: `${backendDomain}/logout`,
    method: 'get',
  },
  current_user: {
    url: `${backendDomain}/user-details`,
    method: 'get',
  },
  allUsers: {
    url: `${backendDomain}/all-users`,
    method: 'get',
  },
  updateUser: {
    url: `${backendDomain}/update-user`,
    method: 'post',
  },
  uploadProduct: {
    url: `${backendDomain}/upload-product`,
    method: 'post',
  },
  updateProduct: {
    url: `${backendDomain}/update-product`,
    method: 'put',
  },
  products: {
    url: `${backendDomain}/products`,
    method: 'get',
  },
  categoryProduct: {
    url: `${backendDomain}/get-categoryProduct`,
    method: 'get',
  },
  categoryProducts: {
    url: `${backendDomain}/category-products`,
    method: 'post',
  },
  productDetails: {
    url: `${backendDomain}/product-details`,
    method: 'post',
  },
  addToCartProduct: {
    url: `${backendDomain}/add-to-cart`,
    method: 'post',
  },
  addToCartProductCount: {
    url: `${backendDomain}/countAddToCartProduct`,
    method: 'get',
  },
};

export default SummaryApi;
