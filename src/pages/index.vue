<template>
  <div class="home">
    <!-- 条件搜索 -->
    <div class="search">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="项目组">
          <el-select v-model.trim="projectName" filterable placeholder="请选择项目">
            <!-- <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option> -->

            <el-option v-for="(item, index) in projectGroup" :key="index" :value="item.id" :label="item.name">

            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="环境：">
          <!-- <el-input v-model.trim="env" placeholder="请输入env"></el-input> -->
           <el-select v-model.trim="env" placeholder="请选择环境">
             
            <el-option label="全部" value=""></el-option>
            <el-option label="开发环境" value="dev"></el-option>
            <el-option label="测试环境" value="test"></el-option>
            <el-option label="预发布环境" value="beta"></el-option>
            <el-option label="生产环境" value="prod"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="IP：">
          <el-input v-model.trim="IP" placeholder="请输入IP"></el-input>
        </el-form-item>
        <el-form-item label="项目名：">
          <el-input v-model.trim="userName" placeholder="请输入项目名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getValue(true)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 80%" class="table_style" >
      <el-table-column prop="env" label="环境" align="center"></el-table-column>
      <el-table-column prop="ip" label="ip" align="center"></el-table-column>
      <el-table-column prop="project_name" label="项目名" align="center" width="400"></el-table-column>
      <el-table-column prop="name" label="项目组" align="center"></el-table-column>
    </el-table>

    <!--分页-->
    <el-pagination
      :style="{display: (!total ? 'none' : '')}"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 50, 100, 500]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="pagin_style"
    ></el-pagination>
  </div>
</template>


<script>
import Swiper from "swiper";
export default {
  name: "home",
  data() {
    return {
      IP: "",  //项目ip
      userName: "",  //项目名
      env: "",   //环境
      tableData: [],    // 表格数据集合
      projectName: "",    //下拉框选中项目名
      projectGroup: [],   //项目组集合

      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  mounted() {
    // express 接口获取
    this.getValue();
    this.getObjectName();
  },
  methods: {
    // 测试链接数据库,获取数据
    getValue(val) {
      if (val) {
        this.pageNum = 1;
      }
      let obj = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ip: this.IP,
        project_name:  this.userName,
        env: this.env,
        projectGroupId: this.projectName
      };
      this.getData(obj).then(res => {
        if(!res.result) return;
        this.tableData = res.result;
        this.total = res.total;
      });
    },

    // 获取项目组列表数据
    getObjectName() {
      this.getObjectGroupData()
        .then((res) => {
          // debugger
          res.result.unshift({
            id: "",
            name: "全部"
          })
          this.projectGroup = res.result;

        })
    },

    // 查询按钮
    searchBtn() {
      
    },

    /*分页*/
    handleSizeChange(val) {
      this.pageSize = val;
      this.getValue();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getValue();
    }
  }
};
</script>

<style lang="less">
.home {
  text-align: center;
  position: relative;
  height: 100%;
  .search {
    padding: 50px 0;
  }

  .table_style {
    margin: 0 auto;
    // min-height: 529px;
  }
  .pagin_style {
    margin-top: 100px;
    padding-bottom: 50px;
  }
}
</style>
