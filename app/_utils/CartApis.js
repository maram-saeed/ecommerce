const { default: axiosClient } = require("./axiosClient");

const addToCart = (data) => axiosClient.post('/carts', data);
const getUserCartItems = (email) => axiosClient.get(`/carts?populate[products][populate]=banner?filters[email][$eq]=${email}`);
const deleteCartItem = (id) => axiosClient.delete(`/carts/${id}`);
export default {
    addToCart,
    getUserCartItems,
    deleteCartItem
}