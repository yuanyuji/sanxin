<template>
  <div>
    <el-row>
      <el-col :span="6">责任人</el-col>
      <el-col :span="6">
        <el-dropdown>
          <span class="el-dropdown-link">
            选择责任人<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>张三</el-dropdown-item>
            <el-dropdown-item>李四</el-dropdown-item>
            <el-dropdown-item>王五</el-dropdown-item>
            <el-dropdown-item>高六</el-dropdown-item>  
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="6">责任人单位</el-col>
      <el-col :span="6">
        <el-dropdown>
          <span class="el-dropdown-link">
            选择责任人单位<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>百度</el-dropdown-item>
            <el-dropdown-item>联想</el-dropdown-item>
            <el-dropdown-item>搜狐</el-dropdown-item>          
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <div class="grid-content bg-purple-light">
          <input type="text" value="18502019218">
        </div>
      </el-col>
      <el-col :span="13">
        <div class="grid-content bg-purple">
          <input type="text" value="百度">
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">温馨提示</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-light">
          <input type="text" value="请输入文字" class="text">
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div style="height:250px" class="bigbox" v-for="(x, i) in $store.state.arr" :key="i">
        <upload :index="i" :hasSeleted="x.hasSeleted"></upload>
        <div class="saves"><el-button type="primary" @click="save_publish">保存并发布</el-button></div>
      </div>
    </el-row>
  </div>
</template>
<script>
import upload from '../../components/helloworld_main_public/activity/info/upload.vue'
export default{
  name: 'info',
  components: {
    upload
  }
}
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 1040px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #ccc!important;
}
.avatar {
  width: 1046px;
  height: 178px;
  display: block;
}
.el-row {
  margin-bottom: 20px;
  margin: 0 20px
}
.el-col {
  border-radius: 4px;
}
.bg-purple {
  height: 32px;
  margin-left: 43px
}
.bg-purple-light {
  height: 32px;
}
.bg-purple-light input,.bg-purple input{
  width: 100%;
  height: 100%;
  border-width: 0;
  background: #e0e0e0;
  padding-left: 10px;
  border-radius: 5px;
  border: 1px solid #ccc
}
.text{
  background: #fff!important
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-dropdown{
  float: right;
  margin-right: 20px
}
.el-col.el-col-24{
  height: 40px;
  line-height: 40px;
}
cite{
  color: #f00
}
</style>

