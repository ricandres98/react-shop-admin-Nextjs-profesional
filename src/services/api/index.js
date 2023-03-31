const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  auth: {
    login: `${API}/api/${VERSION}/auth/login`,
    profile: `${API}/api/${VERSION}/auth/profile`,
    refreshToken: `${API}/api/${VERSION}/auth/refresh-token`,
  },
  products: {
    getProducts: (limit, offset) =>
      `${API}/api/${VERSION}/products?limit=${limit}&offset=${offset}`,
    getProduct: (id) => `${API}/api/${VERSION}/products/${id}`,
    addProduct: `${API}/api/${VERSION}/products`,
    deleteProduct: (id) => `${API}/api/${VERSION}/products/${id}`,
    updateProduct: (id) => `${API}/api/${VERSION}/products/${id}`,
  },
  users: {
    listAll: `${API}/api/${VERSION}/users`,
    getUser: (id) => `${API}/api/${VERSION}/users/${id}`,
    isAvailable: `${API}/api/${VERSION}/is-available`,
  },
};

export default endPoints;
