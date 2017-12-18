<template>
<div class="active-box">
    <el-tabs type="border-card">        
        <el-tab-pane label="活动介绍">
            <introduce></introduce>
        </el-tab-pane>
        <el-tab-pane label="邀请居民">
            <invitation></invitation>            
        </el-tab-pane>
        <el-tab-pane label="居民报名">
            <signUp></signUp>
        </el-tab-pane>
        <el-tab-pane label="活动总结">
            <summarys></summarys>
        </el-tab-pane>
    </el-tabs>
</div>
  
</template>

<script>
import introduce from '../../components/helloworld_main_public/activity/action/introduce.vue';
import invitation from '../../components/helloworld_main_public/activity/action/invitation.vue';
import signUp from '../../components/helloworld_main_public/activity/action/signUp.vue';
import summarys from '../../components/helloworld_main_public/activity/action/summary.vue'
export default {
  components: {
    introduce,
    invitation,
    signUp,
    summarys
  }
};
</script>

<style scoped >
.active-box{
    margin: 10px;
    padding: 20px;
    background: #fff;
}

.el-tabs--border-card>.el-tabs__content{
  padding: 0
}
.title{
  font-size:18px;
  color:#212121;
  padding-left: 43px;
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
ul{
  height: 30px;
  margin-top: 10px;
}
li{
  width: 100%;
}
li .el-col{
  text-align: center;
}
ol li{
  border-bottom: solid 1px #ccc;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 30px;
}
.el-pagination{
  float: right;
}
</style>
