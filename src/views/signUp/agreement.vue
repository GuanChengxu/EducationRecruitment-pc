<template>
    <div>
      <Header></Header>
      <div class="agree_box">
        <div class="link_box">
          <router-link to="/">首页</router-link>
          >
          <a href="javascript:void(0)">
            {{linkName}}
          </a>
        </div>
        <div class="nr" v-if="!resultData">
          <div class="tle_box">
            <h1>报名须知</h1>
            <router-link :to="{path:'/detail',query:{key:key}}" class="goto">查看报名简章></router-link>
          </div>
          <div class="con_box tsHtml" v-html="notice">
          </div>
          <div class="agree">
            <el-checkbox v-model="checked">我已认真阅读并同意</el-checkbox>
          </div>
          <div class="btn_box">
            <button @click="startSignUp()">开始报名</button>
            <div class="goto" @click="query()">已报名查询></div>
          </div>
        </div>
        <div class="success" v-if="resultData == 'success'">
          <p>
            欢迎您报考本次招聘相关岗位，您的报名已经通过审核，<br/>
            请打印《我的报名表》和《诚信承诺书》参加现场考核，<br/>
            预祝您取得好成绩!
          </p>
          <div class="btn_box clearfix">
            <button class="application fl" v-show="bmData" v-print="'#printMe3'" @click="print()">我的报名表</button>
            <button class="commitment fr" v-show="bmData" v-print="'#printMe2'" @click="print()">诚信承诺书</button>
          </div>
          <span class="download" @click="download('all')">一键下载>></span>
        </div>
        <div class="underReview" v-if="resultData == 'underReview'">
          <img src="@/assets/underReview.png" alt="">
          <p>
            您的报名信息我们正在进行审批，请耐心等待，<br/>
            认真准备考试，预祝您取得好成绩！
          </p>
        </div>
        <div class="destruction" v-if="resultData == 'destruction'">
          <img src="@/assets/destruction.png" alt="">
          <p>
            很遗憾的通知您，您的报名未通过审核，<br/>
            拒绝理由：{{remark}}
          </p>
          <button @click="gotoSignUp()">重新报名</button>
        </div>
      </div>
      <div class="hide">
        <div id="printMe2" v-if="dayin" style="background:#fff;width:80%;margin-left: 16mm">
          <table class="tg" style="width:100%; height:240px;">
            <tr>
              <th class="tg-ltad" style="width: 20%;height:50px;font-size:30px;line-height:50px;text-align:center">报名序号</th>
              <th class="tg-ltad" style="width: 60%;height:50px;font-size:30px;line-height:50px;text-align:center">{{bmData.serialNum}}</th>
              <th class="tg-zohn" style="width: 20%;height:50px;font-size:30px;line-height:50px;text-align:center" rowspan="3">
                <img style="width: 140px;" class="personPhoto" :src="imgUrl" alt="">
              </th>
            </tr>
            <tr>
              <td class="tg-zd5i" style="width: 20%;height:50px;font-size:30px;line-height:50px;text-align:center">报考部门</td>
              <td class="tg-zd5i" style="width: 20%;height:50px;font-size:30px;line-height:50px;text-align:center">{{bmData.unit}}</td>
            </tr>
            <tr>
              <td class="tg-zd5i" style="width: 20%;height:50px;font-size:30px;line-height:50px;text-align:center">报考职位</td>
              <td class="tg-zd5i" style="width: 20%;height:50px;font-size:30px;line-height:50px;text-align:center">{{bmData.subject}}</td>
            </tr>
          </table>
          <p class="title" style="font-size:50px">应聘事业单位诚信承诺书</p>
          <p class="content" style="font-size:30px;line-height: 46px;">
            本人承诺，在报名<span class="name">{{bmData.recruitTheme}}</span>参加过程中，做到以下几点：
          </p>
          <p class="content" style="font-size:30px;line-height: 46px;">
            一、我已仔细阅读《<span class="name">{{bmData.recruitTheme}}简章</span>》，并将及时查询相关招聘信息，认真阅读与应聘岗位相关的各项通知要求，掌握招聘政策、招聘流程、招聘要求。
          </p>
          <p class="content" style="font-size:30px;line-height: 46px;">二、我本人符合《招聘简章》、招聘岗位规定的条件和要求，我所提供的个人信息、证明资料、证件等真实、准确，提供的通讯联系方式畅通有效。</p>
          <p class="content" style="font-size:30px;line-height: 46px;">三、我将自觉遵守事业单位公开招聘的各项规定，诚实守信、严守纪律、服从管理，认真按时履行应聘人员的义务。被列入考察范围后，我将按照招聘单位、招聘单位主管部门或招聘主管机关指定时间和要求，提供证件材料、转调档案、配合考察、参加体检、办理聘用手续、按时报到上班。</p>
          <p class="content" style="font-size:30px;line-height: 46px;">如我违反以上承诺，我将自愿承担取消聘用资格等相应责任。</p>
          <div class="footer"  style="font-size:30px;line-height: 46px;margin-top: 50px;">
            <p class="sign">应聘人员签名：</p>
            <p class="date" style="margin-left:100px;margin-top: 30px;">年  月   日</p>
          </div>
        </div>
        <div id="printMe3" v-if="dayin2" style="background:#fff;margin-left: 5mm">
          <h3 class="bkdw" style="width:90%;min-height:40px;font-size:40px;padding:0;margin:0 0 30px 0;line-height: 50px;text-align: center">{{bmData.recruitTheme}}报名表</h3>
          <div style="display:flex;justify-content: space-between;">
            <span class = "bkdw1" style="height:40px;font-size:20px;">报考单位：{{bmData.unit}}</span>
            <span class = "bkxx" style="height:40px;font-size:20px;position:relative;left:-100px;">报考岗位：{{bmData.subject}}</span>
            <span class = "bkxh" style="height:40px;font-size:20px;position:relative;left:-200px;">报名序号：{{bmData.serialNum}}</span>
            <!-- <span style = "opacity:0" style="height:40px;font-size:20px">1</span> -->
          </div>
          <table class="tg" style="margin-top: 10px;">
            <tr>
              <th class="tg-c3owxm" style="height:40px;font-size:20px;">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</th>
              <th class="tg-c3ow1" style="height:40px;font-size:20px">{{bmData.name}}</th>
              <th class="tg-c3owxb" style="height:40px;font-size:20px">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</th>
              <th class="tg-c3ow2" style="height:40px;font-size:20px">{{bmData.sex == 0?'男':(bmData.sex == 1?'女':'未知')}}</th>
              <th class="tg-c3owzz" style="height:40px;font-size:20px">政治面貌</th>
              <th class="tg-0pky3" colspan="2" style="height:40px;font-size:20px">{{bmData.politicsStatus}}</th>
              <th class="tg-0pky4" colspan="1" rowspan="4">
                <img :src="imgUrl" alt="">
              </th>
            </tr>
            <tr>
              <td class="tg-c3ow" style="height:40px;font-size:20px">民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族</td>
              <td class="tg-c3ow" style="height:40px;font-size:20px">{{bmData.nation}}</td>
              <td class="tg-c3ow" colspan="2" style="height:40px;font-size:20px">身份证号码</td>
              <td class="tg-c3ow" colspan="3" style="height:40px;font-size:20px">{{bmData.idNumber}}</td>
            </tr>
            <tr>
              <td class="tg-c3ow" style="height:40px;font-size:20px">学&nbsp;历&nbsp;性&nbsp;质</td>
              <td class="tg-c3ow" style="height:40px;font-size:20px">{{getNature()}}</td>
              <td class="tg-c3ow" style="height:40px;font-size:20px">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历</td>
              <td class="tg-c3ow" style="height:40px;font-size:20px">{{bmData.certificationInfo.highestEducation}}</td>
              <td class="tg-c3ow" style="height:40px;font-size:20px">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位</td>
              <td class="tg-0pky" style="height:40px;font-size:20px">{{bmData.maxDegree}}</td>
            </tr>
            <tr>
              <td class="tg-c3ow" colspan="2" style="height:40px;font-size:20px">毕业院校及专业</td>
              <td class="tg-c3ow" colspan="4" style="height:40px;font-size:20px;text-align: left;overflow: hidden;">{{getSchool()}}</td>
            </tr>
            <tr>
              <td class="tg-c3ow" style="height:40px;font-size:20px">教师资格证</td>
              <td class="tg-c3ow" style="height:40px;font-size:20px">种&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类</td>
              <td class="tg-c3ow" colspan="2" style="height:40px;font-size:20px;text-align: left;">{{bmData.certificationInfo.kind}}</td>
              <td class="tg-c3ow" style="height:40px;font-size:20px">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</td>
              <td class="tg-0pky" colspan="4" style="height:40px;font-size:20px;text-align: left;">{{bmData.certificationInfo.serialNumber}}</td>
            </tr>
            <tr>
              <td class="tg-c3ow" style="height:40px;font-size:20px">联&nbsp;系&nbsp;方&nbsp;式</td>
              <td class="tg-c3ow" style="height:40px;font-size:20px">手机：</td>
              <td class="tg-c3ow" colspan="2" style="height:40px;font-size:20px;text-align: left;">{{bmData.mobile}}</td>
              <td class="tg-c3ow" style="height:40px;font-size:20px">电子邮箱：</td>
              <td class="tg-0pky" colspan="4" style="height:40px;font-size:20px;text-align: left;">{{bmData.email}}</td>
            </tr>
            <tr>
              <td class="tg-0pky" style="height:40px;font-size:20px">家&nbsp;庭&nbsp;住&nbsp;址</td>
              <td class="tg-0pky" colspan="8" style="height:40px;font-size:20px;text-align: left;overflow: hidden">{{bmData.address}}</td>
            </tr>
            <tr>
              <td class="tg-0pky" style="height:40px;font-size:20px">现工作单位</td>
              <td class="tg-0pky" colspan="8" style="height:40px;font-size:20px;text-align: left;overflow: hidden">{{bmData.currentWorkingUnit}}</td>
            </tr>
            <tr>
              <td class="tg-0pky" style="height:350px;font-size:20px">个人简历<br>（从高中<br>阶段填起）</td>
              <td class="tg-9wq8" colspan="8" style="height:350px;overflow: hidden;text-align: left;vertical-align: top;">
                <p v-for="(item,index) in bmData.resumes" style="font-size:18px;line-height:29.2px;">从{{item.entryTime}}到{{item.dimissionTime}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.work}}</p>
              </td>
            </tr>
            <tr>
              <td class="tg-9wq8" rowspan="5" style="height:40px;font-size:20px;line-height: 32px">家&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;庭<br>主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;要<br>成&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;员</td>
              <td class="tg-c3ow" style="height:40px;font-size:20px">关系</td>
              <td class="tg-c3ow" style="height:40px;font-size:20px">姓名</td>
              <td class="tg-c3ow" colspan="2" style="height:40px;font-size:20px">政治面貌</td>
              <td class="tg-c3ow" colspan="4" style="height:40px;font-size:20px">工作单位及职务</td>
            </tr>
            <tr>
              <td class="tg-0pky" style="height:40px;font-size:20px">{{bmData.familyMembers.length>=1?bmData.familyMembers[0].relation:''}}</td>
              <td class="tg-0pky" style="height:40px;font-size:20px">{{bmData.familyMembers.length>=1?bmData.familyMembers[0].familyMemberName:''}}</td>
              <td class="tg-0pky" colspan="2" style="height:40px;font-size:20px">{{bmData.familyMembers.length>=1?bmData.familyMembers[0].familyMemberPoliticsStatus:''}}</td>
              <td class="tg-0pky" colspan="4" style="height:40px;font-size:20px">{{bmData.familyMembers.length>=1?bmData.familyMembers[0].works:''}}</td>
            </tr>
            <tr>
              <td class="tg-0pky" style="height:40px;font-size:20px">{{bmData.familyMembers.length>=2?bmData.familyMembers[1].relation:''}}</td>
              <td class="tg-0pky" style="height:40px;font-size:20px">{{bmData.familyMembers.length>=2?bmData.familyMembers[1].familyMemberName:''}}</td>
              <td class="tg-0pky" colspan="2" style="height:40px;font-size:20px">{{bmData.familyMembers.length>=2?bmData.familyMembers[1].familyMemberPoliticsStatus:''}}</td>
              <td class="tg-0pky" colspan="4" style="height:40px;font-size:20px">{{bmData.familyMembers.length>=2?bmData.familyMembers[1].works:''}}</td>
            </tr>
            <tr>
              <td class="tg-0pky" style="height:40px;font-size:20px">{{bmData.familyMembers.length>=3?bmData.familyMembers[2].relation:''}}</td>
              <td class="tg-0pky" style="height:40px;font-size:20px">{{bmData.familyMembers.length>=3?bmData.familyMembers[2].familyMemberName:''}}</td>
              <td class="tg-0pky" colspan="2" style="height:40px;font-size:20px">{{bmData.familyMembers.length>=3?bmData.familyMembers[2].familyMemberPoliticsStatus:''}}</td>
              <td class="tg-0pky" colspan="4" style="height:40px;font-size:20px">{{bmData.familyMembers.length>=3?bmData.familyMembers[2].works:''}}</td>
            </tr>
            <tr>
              <td class="tg-0pky" style="height:40px;font-size:20px">{{bmData.familyMembers.length>=4?bmData.familyMembers[3].relation:''}}</td>
              <td class="tg-0pky" style="height:40px;font-size:20px">{{bmData.familyMembers.length>=4?bmData.familyMembers[3].familyMemberName:''}}</td>
              <td class="tg-0pky" colspan="2" style="height:40px;font-size:20px">{{bmData.familyMembers.length>=4?bmData.familyMembers[3].familyMemberPoliticsStatus:''}}</td>
              <td class="tg-0pky" colspan="4" style="height:40px;font-size:20px">{{bmData.familyMembers.length>=4?bmData.familyMembers[3].works:''}}</td>
            </tr>
            <tr>
              <td class="tg-0pky" style="height:100px;font-size:20px">备注</td>
              <td class="tg-0pky" colspan="8" style="height:100px;font-size:20px;line-height: 25px;overflow: hidden;text-align: left;vertical-align: top;">{{bmData.remark}}</td>
            </tr>
            <tr>
              <td class="tg-c3ow" style="height:140px;font-size:20px">审核人员<br>签字<br>（考生不<br>填写）</td>
              <td class="tg-0pky" colspan="8" style="height:180px;font-size:20px;position: relative;">
                <span class="span1">审核人：</span>
                <span class="span2">复核人：</span>
                <span class="span3">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
  import Header from '@/components/header.vue'
  import { getUserId,setUserId,removeUserId } from '@/utils/auth'
  import { autoHeight,validateEmpty } from '@/utils/index'
  import {recruitmentById} from '@/api/detail.js'
  import {startApplyOrQuery,exportPDF,queryTeacherInfo} from '@/api/agreement.js'
  import commen from '@/settings.js'
  export default {
    data() {
      return {
        linkName:'',
        key:null,
        status:null,
        checked:false,//是否同意
        resultData:null,//类型
        notice:'',
        uuid:null,
        remark:'',
        dayin:false,
        dayin2:false,
        bmData:null,
        imgUrl:''
      }
    },
    created() {
      getUserId() ? this.uuid = JSON.parse(getUserId()).uuid : '';
      this.key = this.$route.query.key;
      recruitmentById(this.$route.query.key).then(result => {
        if(result.data.code == 200){
          this.notice = result.data.data.applyNotice
          this.linkName = result.data.data.recruitTheme
          this.status = result.data.data.applyStatus
        }else {
          this.$message({
            message: result.data.msg,
            type: 'error'
          });
        }
      })
    },
    mounted() {

    },
    methods: {
      //开始报名
      startSignUp(){
        if(this.checked){
          if(this.uuid){
            recruitmentById(this.key).then(result => {
              if(result.data.code == 200){
                if(result.data.data.applyStatus != 1){
                  this.$message({
                    message: '该招聘未开始或已结束，请返回列表重新选择',
                    type: 'error'
                  });
                }else{
                  var data = 'recruitId='+this.key+'&userId='+this.uuid;
                  startApplyOrQuery(data).then(res=>{
                    if(res.data.code == 200){
                      if(res.data.data){
                        if(res.data.data.isverify == 1){
                          this.resultData = 'underReview';
                        }else if(res.data.data.isverify == 2){
                          this.resultData = 'success';
                          this.queryInfo(res.data.data.teacherId);
                        }else if(res.data.data.isverify == 3){
                          this.resultData = 'destruction';
                          this.remark = res.data.data.isverifyRemark
                        }else if(res.data.data.isverify == 0){
                          this.$router.push({path:'/startSignUp',query:{key:this.key}})
                        }
                      }else if(res.data.msg == null){
                        this.$router.push({path:'/startSignUp',query:{key:this.key}})
                      }
                    }else {
                      this.$message({
                        message: res.data.msg,
                        type: 'error'
                      });
                    }
                  })
                }
              }else {
                this.$message({
                  message: result.data.msg,
                  type: 'error'
                });
              }
            })
          }else{
            this.$message({
              message: '请先登录',
              type: 'error'
            });
            this.$router.push('/');
          }
        }else {
          this.$message({
            message: '请仔细阅读报名须知并同意',
            type: 'error'
          });
        }
      },
      //已报名查询
      query(){
        recruitmentById(this.key).then(result => {
          if(result.data.code == 200){
            if(result.data.data.queryStatus != 1){
              this.$message({
                message: '该招聘还未到查询时间',
                type: 'error'
              });
            }else{
              var data = 'recruitId='+this.key+'&userId='+this.uuid;
              startApplyOrQuery(data).then(res=>{
                if(res.data.code == 200){
                  if(res.data.data) {
                    if (res.data.data.isverify == 1) {
                      this.resultData = 'underReview';
                    } else if (res.data.data.isverify == 2) {
                      this.resultData = 'success';
                      this.queryInfo(res.data.data.teacherId);
                    } else if (res.data.data.isverify == 3) {
                      this.resultData = 'destruction';
                      this.remark = res.data.data.isverifyRemark
                    }else if(res.data.data.isverify == 0){
                      this.$message({
                        message: '您还未报名,请先报名',
                        type: 'error'
                      });
                    }
                  }else if(res.data.msg == null){
                    this.$message({
                      message: '您还未报名,请先报名',
                      type: 'error'
                    });
                  }
                }else {
                  this.$message({
                    message: res.data.msg,
                    type: 'error'
                  });
                }
              })
            }
          }else {
            this.$message({
              message: result.data.msg,
              type: 'error'
            });
          }
        })
      },
      //预览信息
      queryInfo(data){
        queryTeacherInfo(data).then(res=>{
          if(res.data.code == 200){
            this.bmData = res.data.data;
            this.dayin = true;
            this.dayin2 = true;
            this.imgUrl = commen.baseUrl + res.data.data.photo
          }else {
            this.$message({
              message: '获取报名信息失败，请重试',
              type: 'error'
            });
          }
        })
      },
      //下载
      download(type){
        var data = 'recruitId='+this.key+'&userId='+this.uuid;
        startApplyOrQuery(data).then(res=>{
          if(res.data.code == 200){
            if(res.data.data) {
              if(res.data.data.isverify == 2){
                window.location.href=commen.baseUrl+'/edu/recruitment/exportPDF?teacherId='+res.data.data.teacherId+'&tableInfo='+type;
              }
            }
          }else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        })
      },
      //跳转页面
      gotoSignUp(){
        this.$router.push({path:'/startSignUp',query:{key:this.key}})
      },
      //学历性质
      getNature(){
        if(validateEmpty(this.bmData.certificationInfo.doctorEducationNature)){
          return this.bmData.certificationInfo.doctorEducationNature
        }else if(validateEmpty(this.bmData.certificationInfo.masterEducationNature)){
          return this.bmData.certificationInfo.masterEducationNature
        }else if(validateEmpty(this.bmData.certificationInfo.bachelorEducationNature)){
          return this.bmData.certificationInfo.bachelorEducationNature
        }else if(validateEmpty(this.bmData.certificationInfo.specialtiesEducationNature)){
          return this.bmData.certificationInfo.specialtiesEducationNature
        }
      },
      getSchool(){
        if(validateEmpty(this.bmData.certificationInfo.doctorEducationNature)){
          return this.bmData.certificationInfo.doctorAcademy + '    '+ this.bmData.certificationInfo.doctorEducationNature
        }else if(validateEmpty(this.bmData.certificationInfo.masterEducationNature)){
          return this.bmData.certificationInfo.masterAcademy + '    '+this.bmData.certificationInfo.masterEducationNature
        }else if(validateEmpty(this.bmData.certificationInfo.bachelorEducationNature)){
          return this.bmData.certificationInfo.bachelorAcademy + '    '+this.bmData.certificationInfo.bachelorEducationNature
        }else if(validateEmpty(this.bmData.certificationInfo.specialtiesEducationNature)){
          return this.bmData.certificationInfo.specialtiesAcademy + '    '+this.bmData.certificationInfo.specialtiesEducationNature
        }
      }
    },
    components: {
      Header
    }
  }
</script>

<style lang="scss" scoped>
  .agree_box{
    width: 1080px;
    margin: 0 auto;
    padding-bottom: 40px;
    .link_box{
      margin: 27px 0;
      font-size:18px;
      font-weight:400;
      line-height: 18px;
      color:rgba(51,51,51,1);
      padding-left: 11px;
      border-left: 3px solid #436DF3;
      a{
        display: inline-block;
      }
    }
    .nr{
      .tle_box{
        position: relative;
        margin-top: 7px;
        h1{
          font-size:18px;
          text-align: center;
          font-weight:400;
          color:rgba(51,51,51,1);
        }
        .goto{
          position: absolute;
          right: 0px;
          top: 0px;
          font-size:18px;
          font-weight:400;
          color:rgba(79,121,255,1);
          z-index: 3;
        }
      }
      .con_box{
        width: 100%;
        margin-top: 28px;
        padding: 0 30px;
        white-space: pre-wrap;
      }
      .agree{
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:31px;
        text-align: center;
        margin-top: 75px;
      }
      .btn_box{
        position: relative;
        text-align: center;
        margin-top: 30px;
        button{
          width:124px;
          height:40px;
          background:rgba(79,121,255,1);
          border-radius:5px;
          font-size:20px;
          font-weight:400;
          color:rgba(255,255,255,1);
        }
        .goto{
          position: absolute;
          right: 0px;
          top: 12px;
          font-size:18px;
          font-weight:400;
          color:rgba(79,121,255,1);
          cursor: pointer;
        }
      }
    }
    .destruction{
      padding-top: 110px;
      img{
        width: 140px;
        height: 140px;
        display: block;
        margin: 0 auto;
      }
      p{
        width: 800px;
        font-size:22px;
        font-weight:400;
        color:rgba(101,101,101,1);
        line-height:30px;
        text-align: center;
        margin: 30px auto 47px;
      }
      button{
        display: block;
        margin: 0 auto;
        width:170px;
        height:50px;
        background:rgba(253,183,49,1);
        border:1px solid rgba(251,157,73,1);
        border-radius:10px;
        font-size:21px;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height: 50px;
      }
    }
    .underReview{
      padding-top: 112px;
      text-align: center;
      img{
        display: block;
        margin: 0 auto;
        width: 199px;
        height: 150px;
      }
      p{
        width: 800px;
        font-size:22px;
        font-weight:400;
        color:rgba(101,101,101,1);
        line-height:30px;
        text-align: center;
        margin: 38px auto 24px;
      }
      a{
        display: inline-block;
        font-size:21px;
        font-weight:bold;
        color:rgba(67,109,243,1);
        line-height: 30px;
      }
    }
    .success{
      padding-top: 132px;
      text-align: center;
      p{
        display: block;
        width: 800px;
        margin: 0 auto;
        font-size:21px;
        font-weight:400;
        color:rgba(101,101,101,1);
        line-height:29px;
      }
      .btn_box{
        display: block;
        margin: 37px auto 27px;
        width: 421px;
        .application{
          width:170px;
          height:50px;
          background:rgba(67,109,243,1);
          border-radius:10px;
          font-size:19px;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:50px;
        }
        .commitment{
          width:170px;
          height:50px;
          border:1px solid rgba(67,109,243,1);
          border-radius:10px;
          font-size:19px;
          font-weight:500;
          color:rgba(67,109,243,1);
          line-height:50px;
        }
      }
      span{
        display: inline-block;
        font-size:20px;
        font-weight:bold;
        color:rgba(67,109,243,1);
        line-height:30px;
      }
    }
  }
  .hide{
    position: absolute;
    bottom: -400px;
    transform: scale(.0001,.0001);
    z-index: -100;
  }
  @page{
    size:  auto;   /* auto is the initial value */
    margin: 3mm;  /* this affects the margin in the printer settings */
  }
  html{
    background-color: #FFFFFF;
    margin: 0px;  /* this affects the margin on the html before sending to printer */
  }
  body{
    border: solid 1px blue ;
    margin: 10mm 15mm 10mm 15mm; /* margin you want for the content */
  }
</style>
