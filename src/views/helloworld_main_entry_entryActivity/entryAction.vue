<template>
<div class="entryAction">
    <div>
      <el-table v-loading='deleteLoading' ref="multipleTable" tooltip-effect="dark" :data="$store.state.userList">
        
        <el-table-column prop="name" label="居民姓名"></el-table-column>

        <el-table-column prop="tel" label="联系电话" show-overflow-tooltip></el-table-column>
        
        <el-table-column prop="info" label="备注信息" show-overflow-tooltip></el-table-column>

        <el-table-column prop="time" label="报名时间" show-overflow-tooltip></el-table-column>        

        <el-table-column label="操作" width="200">

          <template slot-scope="scope">
              <el-button type="text" size="small" @click="deleteRow(scope.row.id)">删除</el-button>
          </template>

        </el-table-column>

      </el-table>
    </div>
    <p>
        <el-pagination background layout="prev, pager, next" :total="100" @current-change="handleCurrentChange">>
        </el-pagination>
    </p>
</div>
</template>

<script>
import {getCookie} from '../../utils/cookies.js'
export default {
  data() {
    return {
      page: 1,
      deleteLoading: false
    }
  },
  created () {
    this.$store.dispatch('update_userList', 1)
  },
  methods: {
    handleCurrentChange (page) {
      this.$store.dispatch('update_userList', page)
      this.page = page
    },
    deleteRow(row) {
      let _this = this
      this.deleteLoading = true
      this.$http.post('/admin/deleteResident', {
        id: row,
        token: getCookie('token')
      }).then(res=>{
        this.deleteLoading = false
        if (res.data.code === 1001) {
          this.$msgbox({
            title: '消息',
            message: res.data.message,
            showCancelButton: true,
            confirmButtonText: '重新登陆',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if(action=='confirm'){
                _this.$router.push({
                  name:'unload',
                  params:{
                    from: this.$route.name
                  }
                })
              }
              done()
            }
          });
          return;
        }
        console.log(res.data)
        if (res.data == 'SUCCESS') {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('update_userList', this.page)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          }); 
        }else{
          this.$message('你没有删除权限');
        }
    })
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 18px;
  color: #212121;
  margin-top: 30px;
  margin-bottom: 19px;
  font-size: 20px;
}
.title span {
  font-size: 14px;
  margin-left: 15px;
}
.title span:nth-child(1) {
  color: #01b0b9;
}
p {
  text-align: right;
  margin-top: 10px;
}
</style>
