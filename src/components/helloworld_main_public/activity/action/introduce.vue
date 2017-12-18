<template>
<div>
    <h1 class="title">基本信息 </h1>
    <div class="info-top-list" style="display: block;width: 100%">
        <div class="info-left">
            <el-upload class="avatar-uploader" action="http://localhost:3000/user/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" style="width:350px"></i>
            </el-upload>
            <p class="img_color">图片格式：jpg\png 图片大小：小于200K 建议尺寸：317*175px</p>
        </div>
        <div class="info-right">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="选择日期">
                    <el-date-picker v-model="startDate" type="date" placeholder="选择日期"  style="width: 670px">
                    </el-date-picker>
                    <el-date-picker v-model="endDate" type="date" placeholder="选择日期"  style="width: 670px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="选择地址" class="demo-input-size">
                    <sort :data="list" @infos="getInfo"></sort>
                </el-form-item>
            </el-form>
        </div>
    </div>
    <div class="upload">
        <div style="height:250px" class="bigbox" v-for="(x, i) in $store.state.arr" :key="i">
            <upload :index="i" :hasSeleted="x.hasSeleted"></upload>
        </div>
    </div>
    <div class="saves"><el-button type="primary" @click="save_publish">保存并发布</el-button></div>
</div>
</template>

<script>
import upload from '../info/upload.vue'
import sort from './introduce_sort/sort.vue'
export default {
  data () {
    return {
      form: {
        name: ''
      },
      imageUrl: '',
      startDate: new Date(),
      list: [],
      endDate:  new Date('2017-12-12'),
      prov: '',
      city: '',
      area: ''
    }
  },
  components: {
      upload,
      sort
  },
  created () {
      this.$http.get('/admin/community/location/root').then(res => {
        this.list = res.data
      })
  },
  methods: {
    getInfo (data) {
        this.prov = data.prov
        this.city = data.city
        this.area = data.area
    },
    save_publish () {
        if (!this.form.name) {
            this.$message('请填写活动名称');
            return;
        }
        if (!this.$store.state.imageurls) {
            this.$message('请至少上传一张图片');
            return;
        }
        this.$http.post('/admin/activity/add', {
            categoryId: 1,
            name: this.form.name,
            imagePath: this.$store.state.imageurls,
            startDate: this.startDate,
            endDate: this.endDate,
            // locationId: "地点id",
            locationName: this.prov + this.city + this.area
        }).then((res) => {
            if (res.data === 'SUCCESS') {
                this.$message({
                    message:'发布成功',
                    onClose:function(){
                        console.log('123')
                    }
                })
            }
        })
    },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
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
};
</script>

<style scoped>
.title{
  font-size:18px;
  color:#212121;
  margin-top: 30px;
  margin-bottom: 19px;
  font-size: 20px;
}
.title span{
  font-size:14px;
  margin-left: 15px;
}
.title span:nth-child(1){
  color:#01b0b9;
}

.avatar-uploader-icon{
    border: solid 1px #ccc;
}
 .avatar-uploader .el-upload {
    border: 1px dashed #ccc;
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
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

.info-top-list{
    height: 220px;
}
.info-left{
    width: 300px;
}
.info-left, .info-right{
    float: left;
}
.info-right{
    margin-left: 48px;
    width: 600px;
    height: 180px;
}
.el-input__inner{
    width: 500px;
    font-size: 14px;
}
.el-date-picker{
    width: 150px;
}
.el-date-editor.el-input.el-input--prefix.el-input--suffix.el-date-editor--date{
    width: 200px!important;
    margin-left: 20px;
}
.el-select{
    width: 125px;
}
.title_son{
    font-size: 16px;
    line-height: 30px;

}
.title_son span{
    margin-left: 15px;  
    font-size: 14px;
}
.title_son .column, .write{
    color:#01b0b9;
}
.img_color{
    color: #ccc;
    font-size: 12px;
    line-height: 35px;
}
.saves{
    text-align: center;
    line-height: 50px;
}
.upload{
  margin-top: 20px;
}
</style>
