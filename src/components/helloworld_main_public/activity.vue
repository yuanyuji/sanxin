<template>
  <div class="activity">
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>......</el-breadcrumb-item>
        <el-breadcrumb-item>{{$store.state.meta}}<i class="el-icon-arrow-right"></i></el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <div class="tab-btn">
        <router-link to='/admin/menu/publics/info'><el-button>信息管理</el-button></router-link>
        <router-link to="/admin/menu/publics/action"><el-button>活动管理</el-button></router-link>
      </div>
    </el-row>
    <div class="message">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default{
  name: 'activity'
}
</script>
<style scoped>
.router-link-exact-active.router-link-active .el-button.el-button--default{
  background: #01b0b9!important;
  color: #fff!important
}
.message{
  margin-top: 30px;
  background:#ffffff;
  width: 100%;
  height:1028px;
}
.message h1{
  line-height: 80px;
  margin-left: 20px;
  font-family: MicrosoftYaHei;
  font-size: 18px;
  color: #212121;
}
.tab-btn{
  text-align: center
}
.tab-btn .el-button.el-button--primary{
  background:#01b0b9;
  border-radius:8px;
  width:172px;
  height:44px;
}
.tab-btn .el-button.el-button--default{
  border:1px solid #979797;
  border-radius:8px;
  width:170px;
  height:42px;
}
.el-breadcrumb{
  padding-left: 20px;
  line-height: 40px;
}

</style>

