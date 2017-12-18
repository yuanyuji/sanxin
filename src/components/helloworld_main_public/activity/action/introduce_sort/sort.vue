<template>
  <div class="el-row">
        <el-col :span='6'>
            <el-select v-model="province" placeholder="请选择省" @change="changeProv">
                <el-option v-for="(v, i) in data" :key="i" :value="v.name"></el-option>
            </el-select>
        </el-col>
       <el-col :span='6'>
            <el-select 
                v-model="city" 
                placeholder="请选择市"
                @change="changeCity">
                    <el-option 
                    v-for="(v, i) in cityList" 
                    :key="i" :value="v.name"
                    ></el-option>
            </el-select>
        </el-col>
         <el-col :span='6'>
            <el-select v-model="area" placeholder="请选择区" @change="changeArea">
                <el-option v-for="(v, i) in areaList" :key="i" :value="v"></el-option>
            </el-select>
        </el-col>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {
      province: '',
      city: '',
      cityList: '',
      area: '',
      areaList: '',
      door: ''
    };
  },
  methods: {
    collInfo () {
        if (this.province && this.city && this.area){
            this.$emit('infos', {
                prov: this.province,
                city: this.city,
                area: this.area
            })
        }
    },
    changeProv (val) {
        this.data.forEach((item, index) => {
            if(item.name == val) {
                this.cityList = item.city
            }
        });
        this.city = ''
        this.area = ''
    },
    changeCity (val) {       
        this.cityList.forEach((item, index) => {
            if(item.name == val) {
                this.areaList = item.area
            }
        })
        this.area = ''
    },
    changeArea (val) {
        this.area = val
        this.collInfo()
    }
  }
}
</script>
<style scoped>
.el-col.el-col-6{
    margin-left: 10px!important
}
</style>
