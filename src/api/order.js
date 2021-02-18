import axios from '../utils/axios'

function getAll() {
  return axios.get('api/order')
}

function getAllPage(param) {
  return axios.get('api/order/page', {
    params: param
  })
}

function getOrder(orderNo) {
  return axios.get(`api/order/${orderNo}`)
}

function generateOrder(param) {
  return axios.post('api/order/generateOrder', param)
}

function paySuccess(param) {
  return axios.get('api/order/paySuccess', {
    params: param
  })
}

function updateOrderStatus(param) {
  return axios.put('api/order/updateOrderStatus', param)
}

export default { getAll, getAllPage, getOrder, generateOrder, paySuccess, updateOrderStatus }
