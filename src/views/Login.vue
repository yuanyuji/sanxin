<template>
  <div class="unload">
    <el-tabs v-model="activeName">
      <el-tab-pane label="登录" name="first">
        <ul class="login">
          <li>
            <label for="user">用户名
              <input type="text" v-model.trim="users" id="user">
            </label>
          </li>
          <li>
            <label for="pwd">密&nbsp;&nbsp;&nbsp;&nbsp;码
              <input type="password" id="pwd" v-model.trim="pwds">
            </label>
          </li>
          <li><button @click="go_login">登录</button></li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="注册" name="second">
        <ul class="registry">
          <li>
            <label for="user_registry">用户名
              <input type="text" v-model.trim="users_registry" id="user_registry">
            </label>
          </li>
          <li>
            <label for="pwd_registry">密&nbsp;&nbsp;&nbsp;&nbsp;码
              <input type="password" id="pwd_registry" v-model.trim="pwds_registry">
            </label>
          </li>
          <li><button @click="go_registry">注册</a></button></li>
        </ul>   
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {setCookie} from '../utils/cookies.js'
export default{
  name: 'unload',
  data () {
    return {
      users: '',
      pwds: '',
      users_registry: '',
      pwds_registry: '',
      loading: false,
      activeName: 'first'
    }
  },
  methods: {
    go_login () { 
      var param = this.$route.params.from || 'publics'
      this.$store.commit('switch_loading', true)
      this.$http.post('/admin/loginUser', {
        users: this.users,
        pwds: this.pwds
      }).then(({data}) => {
        setTimeout(() => {
         if (data.code == '1') {
            setCookie('token', data.token)
            this.$store.commit('update_users', this.users)
            this.$router.push({name: param})
         }else{
            this.$alert(data.msg, '登录信息有误', {
              confirmButtonText: '去注册',
              callback: action => {
                this.users = ''
                this.pwds = ''
                this.$router.push({name: 'unload'});
                this.activeName = 'second'           
              }
            })
            
         }  
          this.$store.commit('switch_loading', false)         
        },100)
       
      })
    },
    go_registry () {
      this.$http.post('/admin/registryUser',{
        users_registry: this.users_registry,
        pwds_registry: this.pwds_registry,
        authorization: "visor",
      }).then(res => {
        this.$router.push({name: 'unload'});
        this.activeName = 'first'
      })
      this.$message('注册成功');
    }
  }
}
</script>
<style scoped>
.login,.registry{
  width: 500px;
  margin: 0 auto
}
.login li,.registry li{
  width: 500px;
  height: 40px;
  line-height: 40px
}
.login li button,.registry li button{
  width: 200px;
  border-width: 0
}
</style>
