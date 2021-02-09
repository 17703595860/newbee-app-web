function getLocal(name) {
  let value = localStorage.getItem(name);
  return value ? value : ''
}

function setLocal(name, value) {
  localStorage.setItem(name, value)
}

export default { getLocal, setLocal }
