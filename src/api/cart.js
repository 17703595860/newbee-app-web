import axios from '../utils/axios'

function getAll() {
  return axios.get('api/shop-cart')
}

function getAllPage(param) {
  return axios.get('api/shop-cart/page', {
    params: param
  })
}

function cartSure(param) {
  return axios.get('api/shop-cart/cart-sure', {
    params: param
  })
}

function addCart(param) {
  return axios.post('api/shop-cart', param)
}

function updateCart(param) {
  return axios.put('api/shop-cart', param)
}

function deleteCart(cartId) {
  return axios.delete(`api/shop-cart/${cartId}`)
}

function clearCart() {
  return axios.delete('api/shop-cart/clear')
}

export default { getAll, getAllPage, addCart, updateCart, deleteCart, clearCart, cartSure }
