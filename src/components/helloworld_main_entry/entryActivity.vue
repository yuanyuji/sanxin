<template>
<div>
  <el-row>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>......</el-breadcrumb-item>
      <el-breadcrumb-item>{{$store.state.meta}}<i class="el-icon-arrow-right"></i></el-breadcrumb-item>
    </el-breadcrumb>
  </el-row>
  <el-row>
    <h3>活动列表</h3>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, idx) in list" :key="idx">
        <h4>
          <p>“ {{ item.name }} ”</p>
          <p>社区第{{arr[idx]}}届生日派对</p>
          <p>活动时间：{{item.startDate.slice(0,10)}}</p>
        </h4>
      </el-carousel-item>
    </el-carousel>
  </el-row>
  <el-row>
    <div class="tab-btn">
      <router-link to='/admin/menu/entry/entryInfo'><el-button>活动信息与报名</el-button></router-link>
      <router-link to="/admin/menu/entry/entryAction"><el-button>人员管理</el-button></router-link>
    </div>
  </el-row>
  <el-row>
    <router-view></router-view>
  </el-row>
</div>
</template>
<script>
export default{
  name: 'entryAction',
  data () {
    return {
      list: '',
      arr: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一']
    }
  },
  created () {
    this.$http.get('/admin/active').then((res) => {
      this.list = res.data.list
    })
  }
}
</script>
<style scoped>
.el-carousel__item.is-active.el-carousel__item--card.is-in-stage{
  background: skyblue;
}
.el-carousel__item.is-active.el-carousel__item--card.is-in-stage p{
  color: #fff;
}
.router-link-exact-active.router-link-active .el-button.el-button--default{
  background: #01b0b9!important;
  color: #fff!important
}
.el-carousel__item h4 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: auto;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item h4[data-v-d7692460]{
  line-height: 30px!important;
  text-align: center
}
h3{
  line-height: 90px;
  padding-left: 20px;
  background: #fff
}
.el-carousel.el-carousel--card{
  background:#ffffff;
  width:100%;
  height:231px;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.el-breadcrumb{
  padding-left: 20px;
  line-height: 40px;
}
.tab-btn{
  text-align: center;
  line-height: 100px;
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
</style>