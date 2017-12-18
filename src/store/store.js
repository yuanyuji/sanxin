import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../src/http/axios.js'
Vue.use(Vuex)
let store = new Vuex.Store({
  state: {
    users: '',
    loading: false,
    menu: [],
    meta: '社区生日会',
    imageurls: '',
    index: '',
    arr: [{'hasSeleted': false}],
    userList: []
  },
  mutations: {
    update_users (state, data) {
      state.users = data
    },
    switch_loading (state, data) {
      state.loading = data
    },
    update_menu (state, data) {
      state.menu = data;
    },
    meta_name (state, data) {
      state.meta = data
    },
    imageurl (state, data){
      state.imageurls = data
    },
    add_img (state) {
      state.arr.push({
        'hasSeleted': true
      })
    },
    del_img (state, data) {
      state.index = data
      state.arr.splice(state.index, 1)
    },
    update_userList (state, data) {
      state.userList = data
    }
  },
  actions: {
    update_userList ({commit}, pagesize) {
      axios.post('/admin/getUserList', {
        pageSize: pagesize,
        count: 10
      }).then((res) => {
        commit('update_userList', res.data)
      })
    },
    remarks ({commit}, data) {
      axios.post('/admin/getRemarks', {
        val: data.val,
        id: data.id
      }).then((res) => {
        // commit('update_userList', res.data)
      })
    }
  }
})

export { store }