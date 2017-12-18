<template>
  <el-row class="tac">
    <el-col :span="24">
      <div class="community">
        <h1>三鑫智慧社区</h1>
        <h3>公共管理平台</h3>
        <dl>
          <dt class="manage">
            <img src="../../static/img/1.jpg" alt="">
          </dt>
          <dd class="user">管理员 {{$store.state.users}}</dd>
        </dl>
      </div>
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#29282e"
      text-color="#fff">
      <div v-for="(item, index) in $store.state.menu" :key="index" >
        <el-submenu v-if="item.submenus" :index="index.toString()">
          <template slot="title">{{item.name}}</template>
          <div v-for="(item_sub, index_sub) in item.submenus" :key="index_sub" >

            <el-submenu v-if="item_sub.submenus" :index="index+'-'+index_sub">
              <template slot="title">{{item_sub.name}}</template>

              <div v-for="(item_sub_sub, index_sub_sub) in item_sub.submenus" :key="index_sub_sub">                              
                <el-submenu v-if="item_sub_sub.submenus" :index="index+'-'+index_sub+'-'+index_sub_sub">
                  <template slot="title">{{item_sub_sub.name}}</template>
                </el-submenu>

                <el-menu-item v-if="!item_sub_sub.submenus" :index="index+'-'+index_sub+'-'+index_sub_sub" @click="change_route(item_sub_sub.type,item_sub_sub.id,item_sub_sub.name)">
                  {{item_sub_sub.name}}
                </el-menu-item>
              </div>

            </el-submenu>

            <el-menu-item v-if="!item_sub.submenus" :index="index+'-'+index_sub">
              {{item_sub.name}}
            </el-menu-item>
          </div>
        </el-submenu>

        <el-menu-item v-if="!item.submenus" :index="index.toString()">
          {{item.name}}
        </el-menu-item>
      </div>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'menus',
  data () {
    return {

    }
  },
  methods: {
    change_route(type,id,name){
      console.log(name)
      this.$router.push({
        name:type,
        params:{
          id:id
        }
      })
      this.$store.commit('meta_name', name)
    }
  }
}
</script>
<style scoped>
.community {
  text-align: center
}
.community h1{
  margin: 20px 0;
  font-family: 'JLinXin';
  font-size: 24px;
  color: #ffffff;  
}
.community h3{
  font-family:'Jxixinkai';
  font-size:18px;
  color:#ffffff;
  font-weight: normal
}
.manage{
  margin-top: 20px
}
.manage img{
  background:#d8d8d8;
  border:5px solid #ffffff;
  width:71px;
  height:71px;
  border-radius:100%;
}
.user{
  font-family:PingFangSC-Regular;
  font-size:14px;
  color:#ffffff;
}
</style>
