import axios from '../utils/axios'

function getAll(param) {
  return axios.get('api/goods-info', {
    params: param
  })
}

function getGoodsDetail(param) {
  return axios.get(`api/goods-info/detail/${param.id}`)
}

export default { getAll, getGoodsDetail }
