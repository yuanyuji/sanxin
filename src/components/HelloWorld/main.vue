<template>
  <el-main>
    <el-row class="top_menu">
      <el-col :span="12">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#fff"
          text-color="#555"
          active-text-color="#ffd04b">
          <el-menu-item index="1" v-for="(v, i) in tit" :key="i" :index="v.index.toString()">
            <router-link :to="{name: v.path, params:{brand: v.name}}">{{v.name}}</router-link>
          </el-menu-item>
        </el-menu>     
      </el-col>
      <el-col :span="12" class="right">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#fff"
          text-color="#555"
          active-text-color="#ffd04b">
          <el-menu-item index="1">
            <el-badge value="42" class="item">
              <i class="el-icon-bell"></i>
            </el-badge>
          </el-menu-item>
          <el-menu-item index="2">
            <el-badge value="42" class="item">
              <i class="el-icon-message"></i>
            </el-badge>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-info"></i>{{$store.state.users}}</template>
            <el-menu-item index="2-1">管理员 张久</el-menu-item>
            <el-menu-item index="2-2">管理员 王三</el-menu-item>
            <el-menu-item index="2-3" @click="loginout">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
    <router-view>
    </router-view>
  </el-main>
</template>
<script>
import { delCookie } from '../../utils/cookies.js'
export default {
  name: "main",
  data () {
    return {
      tit:[
        {
          name: '一口式受理平台',
          path: 'entry',
          index: 1
        },
        {
          name: '网格化管理平台',
          path: 'grid',
          index: 2          
        },
        {
          name: '公众服务平台',
          path: 'publics',
          index: 3          
        }
      ]
    }
  },
  methods: {
    loginout () {
      delCookie('token')
      this.$router.push({name: 'unload'})
    }
  }
}
</script>
<style scoped>
.right{
  background: #fff
}
.el-main{
  padding: 0;
  background: #eee
}
.right ul[role='menubar']{
  float: right;
}
.top_menu {
  box-shadow: 0 3px 3px #ccc
}
.router-link-active{
  background: skyblue;
  color: #fff!important;
}
.el-menu-item a{
  display: inline-block;
}
</style>
