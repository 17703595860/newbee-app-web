import axios from '../utils/axios'

function getLoginUser() {
  return axios.get('api/user/info')
}

function updateUserInfo(param) {
  return axios.put('api/user/info', param)
}

function login(param) {
  return axios.post('api/user/login', param)
}

function register(param) {
  return axios.post('api/user/register', param)
}

function logout() {
  return axios.post('api/user/logout')
}

export default { login, register, logout, getLoginUser, updateUserInfo }
