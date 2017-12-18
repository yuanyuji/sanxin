<template>
  <div>
    <router-view  v-loading="$store.state.loading"></router-view>
  </div>
</template>
<script>
export default {
  name: 'App'
}

</script>
<style>
.el-upload.el-upload--text{
  width: 100%;
  display: block
}
</style>
