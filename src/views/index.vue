<template>
  <div>
    <Header></Header>
    <div class="index_img">
      <div class="indeximg_box">
        <h1 class="fl">
          欢迎进入<br/>
          烟台市教育系统事业单位<br/>
          公开招聘网上报名系统<br/>
        </h1>
        <img class="fr" src="@/assets/banner_img.png" alt="">
      </div>
    </div>
    <div class="index_con">
      <div class="indexcon_box">
        <div class="title">
          <img src="@/assets/gonggao.png" alt="">
          招聘信息
        </div>
        <div class="content">
          <el-table :data="tableData" class="ts_1">
            <template slot="empty">
              <div style="height:92px;line-height:92px;">暂无招聘信息</div>
            </template>
            <el-table-column prop="recruitTheme" label="主题" width="500">
              <template slot-scope="scope">
                <span v-bind:class="scope.row.applyStatus==1?'blue':'black'" @click="gotoLink(scope.row)">
                  {{scope.row.recruitTheme}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="applyStartTime" label="报名时间" width="400">
              <template slot-scope="scope">
                <span class="black_time">
                  {{changeTimeFormat(scope.row)}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="applyStatus" label="报名" width="180">
              <template slot-scope="scope">
                <span v-bind:class="scope.row.applyStatus==1?'goto':'end'" @click="gotoLink(scope.row)">
                  {{scope.row.applyStatus == 1?'去报名':(scope.row.applyStatus == 2?'已结束':'未开始')}}
                </span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange"
            class="ts_2"
            layout="prev, pager, next"
            :page-size="6"
            :total="totalData">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="index_footer">
      <div class="indexft_box clearfix">
        <p class="fl">按照国家一体化在线政务服务平台建设有关要求，教师招聘系统已对接山东省统一身份认证平台。 已在“烟台一手通”或“山东省统一政务服务门户”注册且完成实名认证的用户可以直接登录报名。未注册或未实名认证的用户，为不影响报名，请尽快下载安装“烟台一手通”或登录“山东省统一政务服务门户”注册并完成实名认证。 目前 ，烟台市已有烟台市政府门户网站、烟台市政务服务平台、烟台“互联 网+公安”政务服务平台 、烟台市住房公积金网上营业厅、烟台市社会保险个人网上服务系统、 烟台人才热线等20多个系统接入了山东省统一身份认证平台。</p>
        <img class="fr" src="@/assets/qrcode.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/header.vue'
  import {recruitmentInfo} from '@/api/index.js'
  export default {
    data () {
      return {
        pageSize:6,
        pageNum:1,
        totalData:0,
        //招聘列表
        tableData:[]
      }
    },
    created() {
      this.getData();
    },
    mounted() {
    },
    methods: {
      //获取数据
      getData(){
        var data = 'pageNum='+this.pageNum+'&pageSize='+this.pageSize;
        recruitmentInfo(data).then(result => {
          if(result.data.code == 200){
            this.tableData = result.data.rows;
            this.totalData = result.data.total;
          }else {
            this.$message({
              message: result.data.msg,
              type: 'error'
            });
          }
        });
      },
      //分页切换
      handleCurrentChange(val) {
        this.pageNum = val;
        this.getData();
      },
      gotoLink(row){
        if(row.applyStatus == 1){
          this.$router.push({path:'/agreement',query:{key:row.applyId}})
        }
      },
      //时间类型转化
      changeTimeFormat(row){
        var returnData = '';
        var yearStart = row.applyStartTime ? new Date(row.applyStartTime.replace(/-/g,"/")).getFullYear() : '';
        var yearEnd = row.applyEndTime ? new Date(row.applyEndTime.replace(/-/g,"/")).getFullYear() : '';
        var monthStart = row.applyStartTime ? new Date(row.applyStartTime.replace(/-/g,"/")).getMonth()+1 : '';
        var monthEnd = row.applyEndTime ? new Date(row.applyEndTime.replace(/-/g,"/")).getMonth()+1 : '';
        var dayStart = row.applyStartTime ? new Date(row.applyStartTime.replace(/-/g,"/")).getDate() : '';
        var dayEnd = row.applyEndTime ? new Date(row.applyEndTime.replace(/-/g,"/")).getDate() : '';
        if(row.applyStartTime && row.applyEndTime){
          if(yearStart == yearEnd){
            returnData=yearStart+'年'+monthStart+'月'+dayStart+'日-'+monthEnd+'月'+dayEnd+'日';
          }else {
            returnData=yearStart+'年'+monthStart+'月'+dayStart+'日-'+yearEnd+'年'+monthEnd+'月'+dayEnd+'日';
          }
        }
        return returnData
      }
    },
    components: {
      Header
    }
  }
</script>

<style lang="scss" scoped>
  .index_img{
    background: url("../assets/banner-bj.png");
    background-size: 1920px 350.5px;
    background-repeat: no-repeat;
    background-color: #4F79FF;
    background-position: center;
    height: 350.5px;
    .indeximg_box{
      width: 1080px;
      margin: 0 auto;
      h1{
        font-size:42px;
        font-weight:bold;
        color:rgba(255,255,255,1);
        line-height:52px;
        padding-top: 89px;
      }
      img{
        margin-top: 40px;
        margin-right: 87px;
      }
    }
  }
  .index_con{
    background-color: #ffffff;
    .indexcon_box{
      width: 1080px;
      margin: 0 auto;
      .title{
        font-size:24px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:24px;
        margin-left: 15px;
        padding: 18px 0;
        img{
          width: 31px;
          height: 30px;
          vertical-align: sub;
        }
      }
      .content{
        padding-bottom: 38px;
        .blue{
          font-size:18px;
          font-weight:400;
          color:rgba(80,126,255,1);
          line-height:24px;
          padding-left: 50px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          cursor: pointer;
        }
        .black{
          font-size:18px;
          font-weight:400;
          color:rgba(51,51,51,1);
          line-height:24px;
          padding-left: 50px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .black_time{
          display: block;
          text-align: center;
          font-size:18px;
          font-weight:400;
          color:rgba(51,51,51,1);
          line-height:24px;
        }
        .goto{
          display: block;
          text-align: center;
          font-size:18px;
          font-weight:400;
          color:rgba(80,126,255,1);
          line-height:24px;
          cursor: pointer;
        }
        .end{
          display: block;
          text-align: center;
          font-size:18px;
          font-weight:400;
          color:rgba(51,51,51,1);
          line-height:24px;
        }
      }
    }
  }
  .index_footer{
    background-color: #EFEFEF;
    .indexft_box{
      width: 1080px;
      margin: 0 auto;
      padding: 26px 0 34px;
      p{
        width: 902px;
        font-size:16px;
        font-weight:400;
        color:rgba(83,83,83,1);
        line-height:24px;
      }
      img{
        width: 119px;
        height: 116px;
      }
    }
  }
</style>

