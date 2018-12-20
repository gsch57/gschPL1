import ES6Promise from 'es6-promise'
import axios from 'axios'

ES6Promise.polyfill()

export default() => {

  return axios.create({
    baseURL: `http://localhost:8081`,
    timeout: 10000,
    withCredentials: true
  })
}