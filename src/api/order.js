import axios from '../utils/axios'

function getAll() {
  return axios.get('api/order')
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

export default { getAll, getOrder, generateOrder, paySuccess }
