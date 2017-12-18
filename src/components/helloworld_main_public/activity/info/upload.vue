<template>
  <div style="height:600px">
      <el-col :span="24" >
        <span>请输入栏目名称</span>
        <el-button type="text">编辑</el-button>
        <el-button type="text" @click="add_column">添加栏目</el-button>
        <span>预览</span>
        <cite v-if="hasSeleted" @click="del_column">删除</cite>
        <el-upload
          class="avatar-uploader"
          action="http://localhost:3000/user/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p class="img_color">图片格式：jpg\png 图片大小：小于200K 建议尺寸：宽度大于800px</p>
      </el-col>
  </div>  
</template>
<script>
export default{
  props: ['index', 'hasSeleted'],
  data () {
    return {
      imageUrl: ''
    }
  },
  methods: {
    add_column () {
      console.log(222)
      this.$store.commit('add_img')
    },
    del_column (idx) {
      this.$store.commit('del_img', this.index)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.$store.commit('imageurl', this.imageUrl)
    },
    beforeAvatarUpload(file) {
      const isPIC = (file.type === 'image/png' || file.type === 'image/jpeg')
      const isPNG = file.type === 'image/png';      
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isPIC) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isPIC && isLt2M;
    }
  }
}
</script>
<style scoped>

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 90%;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #ccc!important;
}
.img_color{
  color: #ccc;
  font-size: 14px;
  line-height: 35px;
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
