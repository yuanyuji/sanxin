<template>
  <div class="entry">
    <Cont></Cont>
  </div>
</template>
<script>
import Cont from '../../components/helloworld_main_entry/entryActivity.vue'
export default {
  name:'entry',
  created () {
    this.$store.commit('switch_loading',true);
    this.$http.get('/admin/menu/entry').then(res=>{
      this.$store.commit('switch_loading',false);
      this.$store.commit('update_menu',res.data.data)
    })
  },
  components: {
    Cont
  }
}
</script>

