import axios from '../utils/axios'

function getAll() {
  return axios.get('api/category')
}

export default { getAll }
