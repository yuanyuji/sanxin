<template>
  <el-container>
    <menus></menus>
    <mains></mains>  
  </el-container>
</template>
<script>
import menus from '../components/HelloWorld/menus.vue'
import mains from '../components/HelloWorld/main.vue'

export default {
  name: "Hello",
  components: {
    menus: menus,
    mains: mains
  }
};
</script>
<style scoped>
.el-menu.el-menu-vertical-demo{
  width: 279px;
  height: 1218px
}

</style>
