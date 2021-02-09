import axios from '../utils/axios'

function getAll() {
  return axios.get('api/index-info')
}

export default { getAll }
