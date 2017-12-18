<template>
<div>
    <h1 class="title">邀请居民 <span @click="open">添加居民</span> <span>短信通知</span></h1>
    <div>
      <el-table v-loading='deleteLoading' ref="multipleTable" tooltip-effect="dark" :data="$store.state.userList" style="width: 100%" @selection-change="handleSelectionChange">

        <el-table-column  type="selection" width="55"></el-table-column>
        
        <el-table-column prop="name" label="居民姓名" width="120"></el-table-column>

        <el-table-column prop="tel" label="联系电话" show-overflow-tooltip></el-table-column>

        <el-table-column prop="sex" label="性别" show-overflow-tooltip></el-table-column>

        <el-table-column prop="age" label="年龄" show-overflow-tooltip></el-table-column>

        <el-table-column prop="send" label="短信通知" show-overflow-tooltip></el-table-column>
        
        <el-table-column prop="info" label="备注信息" show-overflow-tooltip></el-table-column>

        <el-table-column label="操作" width="200">

          <template slot-scope="scope">
              <el-button type="text" size="small">查看详情</el-button>
              <el-button type="text" size="small" @click="open2(scope.row.id)">备注</el-button>
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
import {getCookie} from '../../../../utils/cookies.js'
export default {
  data() {
    return {
      checked: true,
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
    handleSelectionChange(val) {
      this.multipleSelection = val
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
        
    },
    open() {
      this.$alert('<span class="box_info">居民信息</span><input type="text" placeholder="请输入用户名或手机号" class="box_input"><button class="box_btn">查询</button>', '提示信息', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${ action }`
          })
          }
      })
    },
    open2 (row) {
      this.$prompt('请输入要添加的备注', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '备注添加成功！！'
        });
        this.$store.dispatch('remarks', {id: row, val: value})
        this.$store.dispatch('update_userList', this.page)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });       
      });
    }
  }
};
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
