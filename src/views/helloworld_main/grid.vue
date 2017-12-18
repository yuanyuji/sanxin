<template>
  <div>
    {{this.$route.params.brand}}
  </div>
</template>
<script>
export default {
  name: 'grip',
  created(){
    this.$store.commit('switch_loading',true);
    this.$http.get('/admin/menu/grid').then(res=>{
      this.$store.commit('switch_loading',false);
      this.$store.commit('update_menu',res.data.data)
    })
  }
}
</script>