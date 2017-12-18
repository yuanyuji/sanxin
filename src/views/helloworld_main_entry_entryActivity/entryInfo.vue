<template>
  <div class="entryInfo">
    <div class="details">
      <h3>活动信息</h3>
      <h4>活动地点：{{list.locationName}}</h4>
      <h4>温馨提示：请携带有效身份证件前往，如身份证</h4>
    </div>
    <div class="sign">
      <el-row>
        <h3>居民报名</h3>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"><div class="txt">姓名*</div></el-col>
        <el-col :span="12"><div class="txt">联系电话*</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"><p><input type="text" placeholder="文本框内容" v-model="username"  required="required" ></p></el-col>
        <el-col :span="12"><p><input type="tel" placeholder="文本框内容" v-model="tel" required="required" ></p></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20"><div class="txt">备注信息</div></el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="24"><p class="remark"><input type="text" placeholder="文本框内容" v-model="info"></p></el-col>
      </el-row>
      <el-row>
        <div class="btn">
          <el-button type="primary" @click="sign">报名</el-button>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
export default{
  name: 'entryInfo',
  data () {
    return {
      list: '',
      username: '',
      tel: '',
      info: ''
    }
  },
  created () {
    this.$http.get('/admin/active').then((res) => {
      this.list = res.data.list[3]
    })
  },
  methods: {
    sign () {
      this.$http.post('/admin/signUser', {
        username: this.username,
        tel: this.tel,
        info: this.info
      }).then((res) => {
        console.log(res)
        if(res.data === 'SUCCESS') {
          this.username = ''
          this.tel = ''
          this.info = ''
          this.$message('报名成功')
        }else{
          if(!this.username){
            this.$message('请填写您的姓名')     
          }else{
            this.$message('请填写您的联系方式')                 
          }
        }
      })
    }
  }
}
</script>
<style scoped>
.btn{
  width: 100%;
  text-align: center;
  margin-top: 40px;
}
h3{
  background-color: #fff;
  line-height: 60px;
}
.el-row[data-v-d5f65be6]{
  margin-bottom: 0
}
p {
  width: 90%;
  height: 30px;
  border: 1px solid #ccc
}
p input{
  border-width: 0;
  line-height: 28px;
  padding-left: 10px;
}
.remark {
  width: 95%;
}
.details {
  background:#ffffff;
  width: 100%;
  height: 142px;
  padding-left: 20px;
}
.details h4{
  font-weight: normal
}
.sign{
  margin-top: 30px;
  width: 100%;
  height: 296px;
  background:#ffffff;  
}
.el-row {
  padding-left: 20px;
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.txt{
  color: #ccc;
  font-size: 14px;
  margin-top: 20px;
  margin-bottom: 5px;  
}
</style>