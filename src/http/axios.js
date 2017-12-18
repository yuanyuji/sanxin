import Vue from 'vue'
import axios from 'axios'

let http = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.prototype.$http = http
export default http