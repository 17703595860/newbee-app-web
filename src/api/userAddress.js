import axios from '../utils/axios'

function getAll() {
  return axios.get('api/user-address')
}

function addUserAddress(param) {
  return axios.post('api/user-address', param)
}

function updateUserAddress(param) {
  return axios.put('api/user-address', param)
}

function deleteUserAddress(id) {
  return axios.delete(`api/user-address/${id}`)
}

function clearUserAddress() {
  return axios.delete('api/user-address/clear')
}

export default { getAll, addUserAddress, updateUserAddress, deleteUserAddress, clearUserAddress }
