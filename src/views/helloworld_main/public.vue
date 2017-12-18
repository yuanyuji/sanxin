<template>
  <el-main>
    <activity></activity>
  </el-main>
</template>
<script>
import activity from '../../components/helloworld_main_public/activity.vue'
export default {
  name: 'public',
  components: {
    activity
  },
  created () {
    this.$store.commit('switch_loading',true);
    this.$http.get('/admin/menu/publics').then(res=>{
        this.$store.commit('switch_loading',false);
        this.$store.commit('update_menu',res.data.data)
    })
  }
}
</script>

<style scoped>

</style>
