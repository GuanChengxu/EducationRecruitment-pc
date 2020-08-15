<script src="../../api/startSignUp.js"></script>
<template>
    <div>
      <Header></Header>
      <div class="start_box">
        <div class="link_box">
          <router-link to="/">首页</router-link>
          >
          <a href="javascript:void(0)">
            {{linkName}}
          </a>
        </div>
        <div class="start_con">
          <div class="step_box clearfix">
            <div v-bind:class="stepData==1?'step fl act':'step fl'" @click="changeStepOne()" :style="stepData==2||stepData==3?'cursor:pointer;':''">
              <img class="hui" src="@/assets/hui1.png" alt="">
              <img class="blue" src="@/assets/blue1.png" alt="">
              <span :style="stepData==2||stepData==3?'cursor:pointer;':''">岗位选择</span>
            </div>
            <div class="xian fl"></div>
            <div v-bind:class="stepData==2?'step fl act':'step fl'" @click="changeStepTwo()" :style="stepData==3?'cursor:pointer;':''">
              <img class="hui" src="@/assets/hui2.png" alt="">
              <img class="blue" src="@/assets/blue2.png" alt="">
              <span :style="stepData==3?'cursor:pointer;':''">个人资料</span>
            </div>
            <div class="xian fl"></div>
            <div v-bind:class="stepData==3?'step fl act':'step fl'">
              <img class="hui" src="@/assets/hui3.png" alt="">
              <img class="blue" src="@/assets/blue3.png" alt="">
              <span>社会简历</span>
            </div>
          </div>
          <div class="con_box">
            <div class="con1" v-if="stepData==1">
              <div class="form">
                <div class="label">岗位选择</div>
                <div class="select_box">
                  <el-cascader class="ts3" popper-class="ts4" @change="stationJudge" :options="prepareData" v-model="choseStation" :props="{ expandTrigger: 'hover' }" placeholder="请选择您要报考的岗位"></el-cascader>
                  <p v-show="stationError">*{{stationErrorText}}</p>
                </div>
                <button class="next" @click="nextBtn(2)">下一步</button>
              </div>
            </div>
            <div class="con2" v-if="stepData==2">
              <div class="form">
                <div class="fr_top clearfix">
                  <div class="left fl clearfix">
                    <div class="input_box clearfix fl">
                      <span class="label fl">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>
                      <input class="fl" type="text" v-model="userInfo.name.text" :disabled="userInfo.name.isdisabled" @blur="inputJudge('name')">
                      <span v-show="userInfo.name.error" class="error_box">*{{userInfo.name.errorText}}</span>
                    </div>
                    <div class="select_box clearfix fl">
                      <span class="label fl">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</span>
                      <el-select popper-class="ts5" value-key="id" class="ts6" :disabled="sexSelect.selected.isdisabled" @change="inputJudge('sex')" v-model="sexSelect.selected" placeholder="请选择您的性别">
                        <el-option
                          v-for="item in sexData"
                          :key="item.id"
                          :label="item.name"
                          :value="item">
                        </el-option>
                      </el-select>
                      <span v-show="sexSelect.error" class="error_box">*{{sexSelect.errorText}}</span>
                    </div>
                    <div class="input_box clearfix fl">
                      <span class="label fl">民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族</span>
                      <input class="fl" type="text" v-model="userInfo.nation.text" @blur="inputJudge('nation')">
                      <span v-show="userInfo.nation.error" class="error_box">*{{userInfo.nation.errorText}}</span>
                    </div>
                    <div class="input_box clearfix fl">
                      <span class="label fl">生&nbsp;&nbsp;源&nbsp;&nbsp;地</span>
                      <input class="fl" type="text" v-model="userInfo.origin.text" @blur="inputJudge('origin')">
                      <span v-show="userInfo.origin.error" class="error_box">*{{userInfo.origin.errorText}}</span>
                    </div>
                    <div class="input_box clearfix fl">
                      <span class="label fl">手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机</span>
                      <input class="fl" type="text" v-model="userInfo.phone.text" @blur="inputJudge('phone')">
                      <span v-show="userInfo.phone.error" class="error_box">*{{userInfo.phone.errorText}}</span>
                    </div>
                    <div class="input_box clearfix fl">
                      <span class="label fl">电子邮箱</span>
                      <input class="fl" type="text" v-model="userInfo.mailbox.text" @blur="inputJudge('mailbox')">
                      <span v-show="userInfo.mailbox.error" class="error_box">*{{userInfo.mailbox.errorText}}</span>
                    </div>
                    <div class="input_box clearfix fl">
                      <span class="label fl">身份证号</span>
                      <input class="fl" type="text" :disabled="userInfo.idCard.isdisabled" v-model="userInfo.idCard.text" @blur="inputJudge('idCard')">
                      <span v-show="userInfo.idCard.error" class="error_box">*{{userInfo.idCard.errorText}}</span>
                    </div>
                    <div class="select_box clearfix fl">
                      <span class="label fl">政治面貌</span>
                      <el-select popper-class="ts5" value-key="id" class="ts6" @change="inputJudge('political')" v-model="politicalSelect.selected" placeholder="请选择您的政治面貌">
                        <el-option
                          v-for="item in politicalData"
                          :key="item.id"
                          :label="item.name"
                          :value="item">
                        </el-option>
                      </el-select>
                      <span v-show="politicalSelect.error" class="error_box">*{{politicalSelect.errorText}}</span>
                    </div>
                    <div class="input1_box clearfix fl">
                      <span class="label fl">家庭地址</span>
                      <input class="fl" type="text" v-model="userInfo.address.text" @blur="inputJudge('address')">
                      <span v-show="userInfo.address.error" class="error_box">*{{userInfo.address.errorText}}</span>
                    </div>
                    <div><p class="tle fl">教师资格证</p></div>
                    <div></div>
                    <div class="input_box clearfix fl">
                      <span class="label fl">种&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类</span>
                      <input class="fl" type="text" v-model="userInfo.type.text" @blur="inputJudge('type')">
                      <span v-show="userInfo.type.error" class="error_box">*{{userInfo.type.errorText}}</span>
                    </div>
                    <div class="input_box clearfix fl" style="margin-left: 24px;margin-right: 0px;">
                      <span class="label fl">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</span>
                      <input class="fl" type="text" v-model="userInfo.identifier.text" @blur="inputJudge('identifier')">
                      <span v-show="userInfo.identifier.error" class="error_box">*{{userInfo.identifier.errorText}}</span>
                    </div>
                  </div>
                  <div class="right fl">
                    <FileUpload
                      class="avatar-uploader"
                      :maximum="1"
                      :multiple="false"
                      @input-file="beforeAvatarUpload"
                  　　 >
                      <img v-if="imageUrl" :src="'https://ystwx.yantai.gov.cn/jneduapi2'+imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </FileUpload>
                    <h1>近期正面一寸照片</h1>
                    <p>
                      *尺寸为2.5x3.5cm,大小300K以内
                    </p>
                  </div>
                </div>
                <div class="ft_bottom">
                  <div class="clearfix">
                    <div class="date_box clearfix fl">
                      <span class="label fl">毕业年份</span>
                      <i v-show="!userInfo.graduationTime.text" v-bind:class="is_active?'el-select__caret el-input__icon el-icon-arrow-up is_active':'el-select__caret el-input__icon el-icon-arrow-up'"></i>
                      <el-date-picker
                        v-bind:class="userInfo.graduationTime.text?'ts9 fl':'ts9 fl noxl'"
                        v-model="userInfo.graduationTime.text"
                        type="year"
                        :picker-options="pickerOptions1"
                        @focus="changeIsActive(true)"
                        @blur="changeIsActive(false)"
                        @change="inputJudge('graduationTime')"
                        placeholder="请选择毕业年份">
                      </el-date-picker>
                      <span v-show="userInfo.graduationTime.error" class="error_box">*{{userInfo.graduationTime.errorText}}</span>
                    </div>
                    <div class="select_box clearfix fl">
                      <span class="label fl">最高学位</span>
                      <el-select popper-class="ts5" value-key="id" class="ts10" v-model="eduDegreeSelect.selected" @change="inputJudge('eduDegree')" placeholder="请选择最高学位">
                        <el-option
                          v-for="item in eduDegreeData"
                          :key="item.id"
                          :label="item.name"
                          :value="item">
                        </el-option>
                      </el-select>
                      <span v-show="eduDegreeSelect.error" class="error_box">*{{eduDegreeSelect.errorText}}</span>
                    </div>
                    <div class="select_box clearfix fl" style="margin-right: 0px;">
                      <span class="label fl">最高学历</span>
                      <el-select popper-class="ts5" value-key="id" class="ts10" v-model="educationSelect.selected" @change="choseEducation()" placeholder="请选择最高学历">
                        <el-option
                          v-for="item in educationData"
                          :key="item.id"
                          :label="item.name"
                          :value="item">
                        </el-option>
                      </el-select>
                      <span v-show="educationSelect.error" class="error_box">*{{educationSelect.errorText}}</span>
                    </div>
                  </div>
                  <div class="education_box clearfix" v-for="(item,index) in nEducationSelect">
                    <div class="input_box1 fl clearfix">
                      <span class="label fl">{{item.type}}院校</span>
                      <input class="fl" type="text" v-model="item.school" @blur="educationJudge(index)">
                    </div>
                    <div class="input_box1 fl clearfix">
                      <span class="label fl">{{item.type}}专业</span>
                      <input class="fl" type="text" v-model="item.major" @blur="educationJudge(index)">
                    </div>
                    <div class="select_box1 clearfix fl">
                      <span class="label fl">学历性质</span>
                      <el-select popper-class="ts5" value-key="id" v-model="item.selected" @change="educationJudge(index)" class="ts7" placeholder="请选择您的学历性质">
                        <el-option
                          v-for="item in nEducationData"
                          :key="item.id"
                          :label="item.name"
                          :value="item">
                        </el-option>
                      </el-select>
                    </div>
                    <span v-show="item.error" class="error_box">*{{item.errorText}}</span>
                  </div>
                  <div class="pic_list">
                    <div class="pic_tle clearfix">
                      <span class="tle fl">上传证明材料</span>
                      <span class="p fl">*（选填）请上传您的学历学位证书，教师资格证等证明材料</span>
                    </div>
                    <div class="clearfix">
                      <div class="pic_box fl clearfix">
                        <div class="img fl" v-for="(item,index) in picList" :key="index">
                          <img class="close" @click="removePic(index)" src="@/assets/webx.png" alt="">
                          <img class="pic" :src="'https://ystwx.yantai.gov.cn/jneduapi2'+item.url" alt="">
                        </div>
                        <div class="pic_upload fl" v-if="picList.length<6">
                          <FileUpload
                            class="uploader"
                            :maximum="1"
                            :multiple="false"
                            input-id="file2"
                            @input-file="beforePicUpload"
                            　　 >
                            <img src="@/assets/addpic.png" alt="">
                          </FileUpload>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p class="tips">*以上信息请确保真实有效，一经提交无法修改，请仔细认真填写</p>
              <div class="btn_box">
                <button class="save" :disabled="btn1NOclick" @click="saveUser(false)">保存</button>
                <button class="next" :disabled="btn1NOclick" @click="nextBtn(3)">下一步</button>
              </div>
            </div>
            <div class="con3" v-if="stepData==3">
              <div class="from">
                <div class="input_box clearfix">
                  <span class="label fl">现工作单位</span>
                  <input class="fl" type="text" v-model="workplace" @blur="inputJudge('workplace')">
                  <span v-show="this.workplaceError" class="error_box">*{{this.workplaceErrorText}}</span>
                </div>
                <p class="tle">
                  个人简历（从高中阶段填起）<img @click="addResume()" src="@/assets/add.png" alt="">
                </p>
                <div class="resume_box">
                  <div class="resume clearfix" v-for="(item,index) in resume">
                    <span class="fl">从</span>
                    <el-date-picker
                      v-bind:class="item.startTime?'ts8 fl noxl':'ts8 fl'"
                      v-model="item.startTime"
                      type="month"
                      clearable="false"
                      value-format="yyyy-MM-dd"
                      @change="resumeJudge(index)"
                      :picker-options="pickerOptions0"
                      placeholder="请选择">
                    </el-date-picker>
                    <span class="fl">到</span>
                    <el-date-picker
                      v-model="item.endTime"
                      v-bind:class="item.endTime?'ts8 fl noxl':'ts8 fl'"
                      type="month"
                      clearable="false"
                      value-format="yyyy-MM-dd"
                      @change="resumeJudge(index)"
                      :picker-options="pickerOptions0"
                      placeholder="请选择">
                    </el-date-picker>
                    <input class="fl" type="text" placeholder="工作/学习单位及职务/所学专业" v-model="item.inputText" @blur="resumeJudge(index)">
                    <span v-show="item.error" class="error_box">*{{item.errorText}}</span>
                  </div>
                </div>
                <p class="tle">
                  家庭主要成员<img @click="addPeople()" style="margin-left: 10px" src="@/assets/add.png" alt="">
                </p>
                <div class="people_box">
                  <div class="people clearfix" v-for="(item,index) in peopleData">
                    <span class="fl span1">{{index+1}}&nbsp;&nbsp;关系</span>
                    <input class="input1 fl" type="text" v-model="item.relationship" @blur="peopleJudge(index)">
                    <span class="fl span2">姓名</span>
                    <input class="input1 fl" type="text" v-model="item.name" @blur="peopleJudge(index)">
                    <span class="fl span3">政治面貌</span>
                    <input class="input2 fl" type="text" v-model="item.political" @blur="peopleJudge(index)">
                    <span class="fl span4">工作单位及职务</span>
                    <input class="input3 fl" type="text" v-model="item.work" @blur="peopleJudge(index)">
                    <span v-show="item.error" class="error_box">*{{item.errorText}}</span>
                  </div>
                </div>
                <div class="input_box1 clearfix">
                  <span class="label fl">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</span>
                  <input class="fl" type="text" v-model="remark" @blur="inputJudge('remark')">
                  <span v-show="this.remarkError" class="error_box">*{{this.remarkErrorText}}</span>
                </div>
              </div>
              <p class="tips">*以上信息请确保真实有效，一经提交无法修改，请仔细认真填写</p>
              <div class="btn_box">
                <button class="save" :disabled="btn2NOclick" @click="saveExperience(false)">保存</button>
                <button class="next" :disabled="btn2NOclick" @click="saveExperience(true)">提交</button>
              </div>
            </div>
            <!-- 裁剪图片 -->
            <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
              <div class="cropper-content">
                <div class="cropper" style="text-align:center">
                  <vue-cropper
                    ref="cropper"
                    :img="option.img"
                    :outputSize="option.size"
                    :outputType="option.outputType"
                    :info="true"
                    :full="option.full"
                    :canMove="option.canMove"
                    :canMoveBox="option.canMoveBox"
                    :original="option.original"
                    :autoCrop="option.autoCrop"
                    :fixed="option.fixed"
                    :fixedNumber="option.fixedNumber"
                    :centerBox="option.centerBox"
                    :infoTrue="option.infoTrue"
                    :fixedBox="option.fixedBox"
                  ></vue-cropper>
                </div>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="finish">确认</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Header from '@/components/header.vue'
  import { getUserId } from '@/utils/auth'
  import {saveTeacherInfo,saveSocialResume,applyTeacher,queryRecruitmentSchool,queryRecruitmentJob,avatar} from '@/api/startSignUp.js'
  import {recruitmentById} from '@/api/detail.js'
  import {startApplyOrQuery} from '@/api/agreement.js'
  import {validateEmpty,validateName,validatePhoneNumber,validateEmail,IdentityCodeValid,validateNation,validateEmpty2} from '@/utils/index.js'
  import FileUpload from "vue-upload-component"
  import vueCropper from "@/components/vue-cropper/vue-cropper.vue"
  export default {
    data() {
        return {
          is_active:false,
          btn1NOclick:false,
          btn2NOclick:false,
          btn3NOclick:false,
          btn4NOclick:false,
          pickerOptions0: {
            disabledDate(time) {
              return time.getTime() > Date.now() - 8.64e6
            }
          },
          pickerOptions1: {
            disabledDate(time) {
              return time.getTime() > Date.now() - 8.64e6
            }
          },
          //裁剪图片弹窗
          dialogVisible: false,
          // 裁剪组件的基础配置option
          option: {
            img: "", // 裁剪图片的地址
            info: true, // 裁剪框的大小信息
            outputSize: 1, // 裁剪生成图片的质量
            outputType: "jpeg", // 裁剪生成图片的格式
            canScale: false, // 图片是否允许滚轮缩放
            autoCrop: true, // 是否默认生成截图框
            fixedBox: true, // 固定截图框大小 不允许改变
            fixed: true, // 是否开启截图框宽高固定比例
            fixedNumber: [295, 413], // 截图框的宽高比例
            full: true, // 是否输出原图比例的截图
            canMoveBox: false, // 截图框能否拖动
            original: false, // 上传图片按照原始比例渲染
            centerBox: false, // 截图框是否被限制在图片里面
            infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
          },
          fileKey:'',
          files: [],
          teacherId:null,
          linkName:'',
          key:null,
          stepData:1,//在哪一步
          choseStation:'',//选择的岗位
          stationError:false,
          stationErrorText:'',
          prepareData:[],//学校列表
          jobData:[],
          certificationId:'',
          //性别信息
          sexData:[{
            id:0,
            name:'男'
          },{
            id:1,
            name:'女'
          },{
            id:2,
            name:'未知'
          }],
          sexSelect: {
            selected: {
              id:null,
              name:null,
              isdisabled:false
            },
            error:false,
            errorText:'',
          },
          //政治面貌
          politicalData:[{
            id:0,
            name:'中共党员'
          },{
            id:4,
            name:'预备党员'
          }, {
            id:1,
            name:'共青团员'
          },{
            id:2,
            name:'群众'
          },{
            id:3,
            name:'民主党派'
          }],
          politicalSelect:{
            selected: {
              id:null,
              name:null,
            },
            error:false,
            errorText:'',
          },
          //最高学历
          educationData:[{
            id:0,
            name:'专科'
          },{
            id:1,
            name:'本科'
          },{
            id:2,
            name:'硕士研究生'
          },{
            id:3,
            name:'博士研究生'
          }],
          educationSelect:{
            selected:{
              id:null,
              name:null,
            },
            error:false,
            errorText:'',
          },
          //最高学位
          eduDegreeData:[{
            id:0,
            name:'博士'
          },{
            id:1,
            name:'硕士'
          },{
            id:2,
            name:'学士'
          },{
            id:3,
            name:'无'
          }],
          eduDegreeSelect:{
            selected:{
              id:null,
              name:null,
            },
            error:false,
            errorText:'',
          },
          //学历性质
          nEducationData:[{
            id:0,
            name:'全日制'
          },{
            id:1,
            name:'非全日制'
          }],
          nEducationSelect:[],
          imageUrl:null,//图片地址
          resume:[{
            id:0,
            startTime:null,
            endTime:null,
            inputText:null,
            error:false,
            errorText:'',
          },{
            id:1,
            startTime:null,
            endTime:null,
            inputText:null,
            error:false,
            errorText:'',
          }],//个人简历
          peopleData:[{
            id:0,
            relationship:null,
            name:null,
            political:null,
            work:null,
            error:false,
            errorText:'',
          },{
            id:1,
            relationship:null,
            name:null,
            political:null,
            work:null,
            error:false,
            errorText:'',
          }],//家庭成员
          userInfo:{
            graduationTime:{
              text:null,
              error:false,
              errorText:null,
              isdisabled:false
            },
            name:{
              text:null,
              error:false,
              errorText:null,
              isdisabled:false
            },
            nation:{
              text:null,
              error:false,
              errorText:null
            },
            origin:{
              text:null,
              error:false,
              errorText:null
            },
            phone:{
              text:null,
              error:false,
              errorText:null
            },
            mailbox:{
              text:null,
              error:false,
              errorText:null
            },
            idCard:{
              text:null,
              error:false,
              errorText:null,
              isdisabled:false
            },
            address:{
              text:null,
              error:false,
              errorText:null
            },
            type:{
              text:null,
              error:false,
              errorText:null
            },
            identifier:{
              text:null,
              error:false,
              errorText:null
            },
          },
          //工作单位
          workplace:'',
          workplaceErrorText:'',
          workplaceError:false,
          //备注
          remark:'',
          remarkErrorText:'',
          remarkError:false,
          //用户信息
          userData:{},
          highest:'',
          //证明资料
          picList:[]
        }
    },
    async created() {
      this.key = this.$route.query.key
      getUserId() ? this.userData = JSON.parse(getUserId()) : '';
      await this.getTeacher();
      recruitmentById(this.$route.query.key).then(result => {
        if(result.data.code == 200){
          this.linkName = result.data.data.recruitTheme
          if(result.data.data.applyStatus != 1){
            this.$message({
              message: '该招聘未开始或已结束，请返回列表重新选择',
              type: 'error'
            });
            this.$router.push('/');
          }else {
            var data = 'recruitId='+this.key+'&userId='+this.userData.uuid;
            startApplyOrQuery(data).then(res=>{
              if(res.data.code == 200){
                if(res.data.data){
                  if(res.data.data.isverify == 1){
                    this.$message({
                      message: '您的报名信息正在审核中',
                      type: 'error'
                    });
                    this.$router.push('/');
                  }else if(res.data.data.isverify == 2){
                    this.$message({
                      message: '您的报名信息已通过',
                      type: 'error'
                    });
                    this.$router.push('/');
                  }else if(res.data.data.isverify == 0 || res.data.data.isverify == 3){
                    //岗位
                    var chosearrey=[];
                    chosearrey.push(res.data.data.unitId);
                    chosearrey.push(res.data.data.postId);
                    this.choseStation = chosearrey;
                    var job = {};
                    this.jobData.forEach((v,i)=>{
                      if(v.unitId == this.choseStation[0]){
                        v.children.forEach((v1,i1)=>{
                          if(v1.jobId == this.choseStation[1]){
                            job = v1;
                          }
                        })
                      }
                    })
                    if(job.educationName != '不限'){
                      this.stationError = true;
                      this.stationErrorText = '您选择的岗位学历要求'+job.educationName+'以上';
                    }else {
                      this.stationError = true;
                      this.stationErrorText = '您选择的岗位学历没有限制';
                    }
                    //个人资料
                    this.teacherId = res.data.data.teacherId;
                    this.imageUrl = res.data.data.photo;
                    this.userInfo.name.text = res.data.data.name
                    if(res.data.data.sex == '0'){
                      this.sexSelect.selected = {
                        id:0,
                        name:'男',
                        isdisabled:true
                      };
                    }else if(res.data.data.sex == '1') {
                      this.sexSelect.selected = {
                        id:1,
                        name:'女',
                        isdisabled:true
                      };
                    }else if(res.data.data.sex == '2'){
                      this.sexSelect.selected = {
                        id:2,
                          name:'未知',
                        isdisabled:true
                      }
                    }
                    this.userInfo.nation.text = res.data.data.nation;
                    this.userInfo.origin.text = res.data.data.birthplace;
                    this.userInfo.phone.text = res.data.data.mobile;
                    this.userInfo.mailbox.text = res.data.data.email;
                    this.userInfo.idCard.text = res.data.data.idNumber;
                    this.userInfo.address.text = res.data.data.address;
                    if(res.data.data.maxDegree == '博士'){
                      this.eduDegreeSelect.selected={
                        id:0,
                        name:'博士'
                      }
                    }else if(res.data.data.maxDegree == '硕士'){
                      this.eduDegreeSelect.selected={
                        id:1,
                        name:'硕士'
                      }
                    }else if(res.data.data.maxDegree == '学士'){
                      this.eduDegreeSelect.selected={
                        id:2,
                        name:'学士'
                      }
                    }else if(res.data.data.maxDegree == '无'){
                      this.eduDegreeSelect.selected={
                        id:3,
                        name:'无'
                      }
                    }
                    if(res.data.data.politicsStatus == '中共党员'){
                      this.politicalSelect.selected={
                        id:0,
                        name:'中共党员'
                      }
                    }else if(res.data.data.politicsStatus == '共青团员'){
                      this.politicalSelect.selected={
                        id:1,
                        name:'共青团员'
                      }
                    }else if(res.data.data.politicsStatus == '群众'){
                      this.politicalSelect.selected={
                        id:2,
                        name:'群众'
                      }
                    }else if(res.data.data.politicsStatus == '民主党派'){
                      this.politicalSelect.selected={
                        id:3,
                        name:'民主党派'
                      }
                    }else if(res.data.data.politicsStatus == '预备党员'){
                      this.politicalSelect.selected={
                        id:4,
                        name:'预备党员'
                      }
                    }
                    if(res.data.data.credentials && res.data.data.credentials.length>0){
                      this.picList = res.data.data.credentials;
                    }
                    var time = new Date();
                    time.setFullYear(res.data.data.graduateTime,0,1);
                    this.userInfo.graduationTime.text = time;
                    this.userInfo.type.text = res.data.data.certificationInfo.kind;
                    this.userInfo.identifier.text = res.data.data.certificationInfo.serialNumber;
                    this.certificationId = res.data.data.certificationInfo.certificationId;
                    this.highest = res.data.data.certificationInfo.highestEducation;
                    if(res.data.data.certificationInfo.highestEducation == '专科'){
                      this.educationSelect.selected={
                        id:0,
                        name:'专科'
                      }
                    }else if(res.data.data.certificationInfo.highestEducation == '本科'){
                      this.educationSelect.selected={
                        id:1,
                        name:'本科'
                      }
                    }else if(res.data.data.certificationInfo.highestEducation == '硕士研究生'){
                      this.educationSelect.selected={
                        id:2,
                        name:'硕士研究生'
                      }
                    }else if(res.data.data.certificationInfo.highestEducation == '博士研究生'){
                      this.educationSelect.selected={
                        id:3,
                        name:'博士研究生'
                      }
                    }
                    //博士
                    if(res.data.data.certificationInfo.doctorSpecialty && res.data.data.certificationInfo.doctorAcademy && res.data.data.certificationInfo.doctorEducationNature){
                      this.nEducationSelect.push({
                        id:4,
                        type:'博士',
                        error:false,
                        errorText:'',
                        school:res.data.data.certificationInfo.doctorAcademy,
                        major:res.data.data.certificationInfo.doctorSpecialty,
                        selected:{
                          id:res.data.data.certificationInfo.doctorEducationNature=='全日制'?0:1,
                          name:res.data.data.certificationInfo.doctorEducationNature,
                        }
                      })
                    }
                    //硕士
                    if(res.data.data.certificationInfo.masterAcademy && res.data.data.certificationInfo.masterSpecialty && res.data.data.certificationInfo.masterEducationNature){
                      this.nEducationSelect.push({
                        id:3,
                        type:'硕士',
                        error:false,
                        errorText:'',
                        school:res.data.data.certificationInfo.masterAcademy,
                        major:res.data.data.certificationInfo.masterSpecialty,
                        selected:{
                          id:res.data.data.certificationInfo.masterEducationNature=='全日制'?0:1,
                          name:res.data.data.certificationInfo.masterEducationNature,
                        }
                      })
                    }
                    //本科
                    if(res.data.data.certificationInfo.bachelorAcademy && res.data.data.certificationInfo.bachelorSpecialty && res.data.data.certificationInfo.bachelorEducationNature){
                      this.nEducationSelect.push({
                        id:2,
                        type:'本科',
                        error:false,
                        errorText:'',
                        school:res.data.data.certificationInfo.bachelorAcademy,
                        major:res.data.data.certificationInfo.bachelorSpecialty,
                        selected:{
                          id:res.data.data.certificationInfo.bachelorEducationNature=='全日制'?0:1,
                          name:res.data.data.certificationInfo.bachelorEducationNature,
                        }
                      })
                    }
                    //专科
                    if(res.data.data.certificationInfo.specialtiesAcademy && res.data.data.certificationInfo.specialtiesSpecialty && res.data.data.certificationInfo.specialtiesEducationNature){
                      this.nEducationSelect.push({
                        id:1,
                        type:'专科',
                        error:false,
                        errorText:'',
                        school:res.data.data.certificationInfo.specialtiesAcademy,
                        major:res.data.data.certificationInfo.specialtiesSpecialty,
                        selected:{
                          id:res.data.data.certificationInfo.specialtiesEducationNature=='全日制'?0:1,
                          name:res.data.data.certificationInfo.specialtiesEducationNature,
                        }
                      })
                    }
                    //社会简历
                    this.workplace = res.data.data.currentWorkingUnit;
                    this.remark = res.data.data.remark;
                    if (res.data.data.familyMembers.length > 0) {
                      var familyList = [];
                      res.data.data.familyMembers.forEach((v, i) => {
                        familyList.push({
                          id: i,
                          relationship: v.relation,
                          name: v.familyMemberName,
                          political: v.familyMemberPoliticsStatus,
                          work: v.works
                        });
                      });
                      this.peopleData = familyList;
                    }
                    if (res.data.data.resumes.length > 0) {
                      var resumesList = [];
                      res.data.data.resumes.forEach((v, i) => {
                        resumesList.push({
                          id: i,
                          startTime: v.entryTime,
                          endTime: v.dimissionTime,
                          inputText: v.work,
                          error: false,
                          errorText: ''
                        });
                      });
                      this.resume = resumesList;
                    }
                  }
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
      if(this.userData.name){
        this.userInfo.name.text = this.userData.name;
        this.userInfo.name.isdisabled = true;
      }
      if(this.userData.sex){
        if(this.userData.sex == 0){
          this.sexSelect.selected={
            id:1,
            name:'女',
            isdisabled:true
          }
        }else if(this.userData.sex == 1){
          this.sexSelect.selected={
            id:0,
            name:'男',
            isdisabled:true
          }
        }else {
          this.sexSelect.selected={
            id:2,
            name:'未知',
            isdisabled:true
          }
        }
      }
      if(this.userData.papersnumber){
        this.userInfo.idCard.text = this.userData.papersnumber;
        this.userInfo.idCard.isdisabled = true;
      }
      if(this.userData.mobile){
        this.userInfo.phone.text = this.userData.mobile;
      }
    },
    mounted() {
    },
    methods: {
      //改变箭头样式
      changeIsActive(data){
        this.is_active = data;
      },
      //第三步跳第二个
      changeStepTwo(){
        if(this.stepData == 3){
          this.stepData = 2
        }
      },
      //第三步或者第二步跳第一个
      changeStepOne(){
        if(this.stepData == 3 || this.stepData == 2){
          this.stepData = 1
        }
      },
      //下一步
      nextBtn(num){
        if(num == 2){
          if(this.choseStation == '' || this.choseStation.length<=0){
            this.stationError = true;
            this.stationErrorText = '请选择要报考的岗位';
          }else {
            this.stepData = num;
            var job = '';
            this.jobData.forEach((v,i)=>{
              if(v.unitId == this.choseStation[0]){
                v.children.forEach((v1,i1)=>{
                  if(v1.jobId == this.choseStation[1]){
                    job = v1;
                  }
                })
              }
            })
            if((job.educationName == '本科' && this.educationSelect.selected.name == '专科')||(job.educationName == '硕士研究生' && (this.educationSelect.selected.name == '专科' || this.educationSelect.selected.name == '本科'))||(job.educationName == '博士研究生' && (this.educationSelect.selected.name == '专科' || this.educationSelect.selected.name == '本科' || this.educationSelect.selected.name == '硕士研究生'))){
              this.educationSelect = {
                selected:{
                  id:null,
                  name:null,
                },
                error:false,
                errorText:'',
              };
              this.nEducationSelect = [];
            }
            if(job.educationName == '不限'){
              this.educationData=[{
                id:0,
                name:'专科'
              },{
                id:1,
                name:'本科'
              },{
                id:2,
                name:'硕士研究生'
              },{
                id:3,
                name:'博士研究生'
              }];
            }else if(job.educationName == '专科'){
              this.educationData=[{
                id:0,
                name:'专科'
              },{
                id:1,
                name:'本科'
              },{
                id:2,
                name:'硕士研究生'
              },{
                id:3,
                name:'博士研究生'
              }];
            }else if(job.educationName == '本科'){
              this.educationData=[{
                id:1,
                name:'本科'
              },{
                id:2,
                name:'硕士研究生'
              },{
                id:3,
                name:'博士研究生'
              }];
            }else if(job.educationName == '硕士研究生'){
              this.educationData=[{
                id:2,
                name:'硕士研究生'
              },{
                id:3,
                name:'博士研究生'
              }];
            }else if(job.educationName == '博士研究生'){
              this.educationData=[{
                id:3,
                name:'博士研究生'
              }];
            }
          }
        }else if(num==3){
          this.saveUser(true);
        }
      },
      //岗位判断
      stationJudge(){
        if(this.choseStation == '' || this.choseStation.length<=0){
          this.stationError = true;
          this.stationErrorText = '请选择要报考的岗位';
        }else {
          var job = {};
          this.jobData.forEach((v,i)=>{
            if(v.unitId == this.choseStation[0]){
              v.children.forEach((v1,i1)=>{
                if(v1.jobId == this.choseStation[1]){
                  job = v1;
                }
              })
            }
          })
          if(job.educationName != '不限'){
            this.stationError = true;
            this.stationErrorText = '您选择的岗位学历要求'+job.educationName+'以上';
          }else {
            this.stationError = true;
            this.stationErrorText = '您选择的岗位学历没有限制';
          }
        }
      },
      //input判断
      inputJudge(type,){
        switch (type) {
          case 'name':
            if(!validateEmpty(this.userInfo.name.text)){
              this.userInfo.name.errorText = '请输入姓名'
              this.userInfo.name.error = true
            }else if(!validateName(this.userInfo.name.text)){
              this.userInfo.name.errorText = '请输入正确格式的姓名'
              this.userInfo.name.error = true
            }else {
              this.userInfo.name.errorText = null
              this.userInfo.name.error = false
            }
            break;
          case 'sex':
            if(!validateEmpty(this.sexSelect.selected.name)){
              this.sexSelect.errorText = '请选择性别'
              this.sexSelect.error = true
            }else {
              this.sexSelect.errorText = null
              this.sexSelect.error = false
            }
            break;
          case 'nation':
            if(!validateEmpty(this.userInfo.nation.text)){
              this.userInfo.nation.errorText = '请填写民族'
              this.userInfo.nation.error = true
            }else if(!validateNation(this.userInfo.nation.text)){
              this.userInfo.nation.errorText = '请输入正确格式的民族'
              this.userInfo.nation.error = true
            } else {
              this.userInfo.nation.errorText = null
              this.userInfo.nation.error = false
            }
            break;
          case 'origin':
            if(!validateEmpty(this.userInfo.origin.text)){
              this.userInfo.origin.errorText = '请填写生源地'
              this.userInfo.origin.error = true
            }else {
              this.userInfo.origin.errorText = null
              this.userInfo.origin.error = false
            }
            break;
          case 'phone':
            if(!validateEmpty(this.userInfo.phone.text)){
              this.userInfo.phone.errorText = '请输入手机号'
              this.userInfo.phone.error = true
            }else if(!validatePhoneNumber(this.userInfo.phone.text)){
              this.userInfo.phone.errorText = '请输入正确格式的手机号'
              this.userInfo.phone.error = true
            }else {
              this.userInfo.phone.errorText = null
              this.userInfo.phone.error = false
            }
            break;
          case 'mailbox':
            if(!validateEmpty(this.userInfo.mailbox.text)){
              this.userInfo.mailbox.errorText = '请输入电子邮箱'
              this.userInfo.mailbox.error = true
            }else if(!validateEmail(this.userInfo.mailbox.text)){
              this.userInfo.mailbox.errorText = '请输入正确格式的电子邮箱'
              this.userInfo.mailbox.error = true
            }else {
              this.userInfo.mailbox.errorText = null
              this.userInfo.mailbox.error = false
            }
            break;
          case 'idCard':
            if(!validateEmpty(this.userInfo.idCard.text)){
              this.userInfo.idCard.errorText = '请输入身份证号'
              this.userInfo.idCard.error = true
            }else if(!IdentityCodeValid(this.userInfo.idCard.text)){
              this.userInfo.idCard.errorText = '请输入正确格式的身份证号'
              this.userInfo.idCard.error = true
            }else {
              this.userInfo.idCard.errorText = null
              this.userInfo.idCard.error = false
            }
            break;
          case 'address':
            if(!validateEmpty(this.userInfo.address.text)){
              this.userInfo.address.errorText = '请输入家庭地址'
              this.userInfo.address.error = true
            }else {
              this.userInfo.address.errorText = null
              this.userInfo.address.error = false
            }
            break;
          case 'political':
            if(!validateEmpty(this.politicalSelect.selected.name)){
              this.politicalSelect.errorText = '请选择政治面貌'
              this.politicalSelect.error = true
            }else {
              this.politicalSelect.errorText = null
              this.politicalSelect.error = false
            }
            break;
          case 'type':
            if(!validateEmpty(this.userInfo.type.text)){
              this.userInfo.type.errorText = '请填写教师资格证种类'
              this.userInfo.type.error = true
            }else {
              this.userInfo.type.errorText = null
              this.userInfo.type.error = false
            }
            break;
          case 'identifier':
            if(!validateEmpty(this.userInfo.identifier.text)){
              this.userInfo.identifier.errorText = '请填写教师资格证编号'
              this.userInfo.identifier.error = true
            }else {
              this.userInfo.identifier.errorText = null
              this.userInfo.identifier.error = false
            }
            break;
          case 'eduDegree':
            if(!validateEmpty(this.eduDegreeSelect.selected.name)){
              this.eduDegreeSelect.errorText = '请选择最高学位'
              this.eduDegreeSelect.error = true
            }else {
              this.eduDegreeSelect.errorText = null
              this.eduDegreeSelect.error = false
            }
            break;
          case 'workplace':
            if(!validateEmpty(this.workplace)){
              this.workplaceErrorText = '请填写先工作单位,没有请填写无'
              this.workplaceError = true
            }else {
              this.workplaceErrorText = null
              this.workplaceError = false
            }
          case 'remark':
            if(!validateEmpty(this.remark)){
              this.remarkErrorText = '请填写备注,没有请填写无'
              this.remarkError = true
            }else {
              this.remarkErrorText = null
              this.remarkError = false
            }
          case 'graduationTime':
            if(!validateEmpty2(this.userInfo.graduationTime.text)){
              this.userInfo.graduationTime.errorText = '请选择毕业年份'
              this.userInfo.graduationTime.error = true
            }else {
              this.userInfo.graduationTime.errorText = null
              this.userInfo.graduationTime.error = false
            }
          default:
            break;
        }
      },
      //选择学历
      choseEducation(){
        if(!validateEmpty(this.educationSelect.selected.name)){
          this.educationSelect.errorText = '请选择最高学历'
          this.educationSelect.error = true
        }else {
          this.educationSelect.errorText = null
          this.educationSelect.error = false
        }
        if(this.educationSelect.selected.name == '专科'){
          this.nEducationSelect=[{
            id:1,
            type:'专科',
            error:false,
            errorText:'',
            school:null,
            major:null,
            selected:{
              id:null,
              name:null,
            }
          }];
        }else if(this.educationSelect.selected.name == '本科'){
          this.nEducationSelect=[{
            id:2,
            type:'本科',
            error:false,
            errorText:'',
            school:null,
            major:null,
            selected:{
              id:null,
              name:null,
            }
          }];
        }else if(this.educationSelect.selected.name == '硕士研究生'){
          this.nEducationSelect=[{
            id:3,
            type:'硕士',
            error:false,
            errorText:'',
            school:null,
            major:null,
            selected:{
              id:null,
              name:null,
            }
          },{
            id:2,
            type:'本科',
            error:false,
            errorText:'',
            school:null,
            major:null,
            selected:{
              id:null,
              name:null,
            }
          }];
        }else if(this.educationSelect.selected.name == '博士研究生'){
          this.nEducationSelect=[{
            id:4,
            type:'博士',
            error:false,
            errorText:'',
            school:null,
            major:null,
            selected:{
              id:null,
              name:null,
            }
          },{
            id:3,
            type:'硕士',
            error:false,
            errorText:'',
            school:null,
            major:null,
            selected:{
              id:null,
              name:null,
            }
          },{
            id:2,
            type:'本科',
            error:false,
            errorText:'',
            school:null,
            major:null,
            selected:{
              id:null,
              name:null,
            }
          }];
        }
      },
      //判断学历
      educationJudge(num){
        if(!validateEmpty(this.nEducationSelect[num].school) || !validateEmpty(this.nEducationSelect[num].major) || !validateEmpty(this.nEducationSelect[num].selected.name)){
          this.nEducationSelect[num].errorText = '请填写完整的学历信息'
          this.nEducationSelect[num].error = true
        }else {
          this.nEducationSelect[num].errorText = null
          this.nEducationSelect[num].error = false
        }

      },
      //判断家庭成员
      peopleJudge(num){
        if(validateEmpty(this.peopleData[num].relationship) || validateEmpty(this.peopleData[num].name) || validateEmpty(this.peopleData[num].political) || validateEmpty(this.peopleData[num].work)){
          if(!validateEmpty(this.peopleData[num].relationship) || !validateEmpty(this.peopleData[num].name) || !validateEmpty(this.peopleData[num].political) || !validateEmpty(this.peopleData[num].work)){
            this.peopleData[num].error = true;
            this.peopleData[num].errorText = '请填写完整的该成员信息';
          }else if(this.peopleData[num].relationship.length>4){
            this.peopleData[num].error = true;
            this.peopleData[num].errorText = '关系最多为四个字,请检查是否含有空格';
          }else if(this.peopleData[num].political.length>4){
            this.peopleData[num].error = true;
            this.peopleData[num].errorText = '政治面貌最多为四个字,请检查是否含有空格';
          }else {
            this.peopleData[num].error = false;
            this.peopleData[num].errorText = '';
          }
        }else {
          this.peopleData[num].error = false;
          this.peopleData[num].errorText = '';
        }
      },
      //判断个人简历
      resumeJudge(num){
        if(validateEmpty(this.resume[num].startTime) || validateEmpty(this.resume[num].endTime) || validateEmpty(this.resume[num].inputText)) {
          if(!validateEmpty(this.resume[num].startTime) || !validateEmpty(this.resume[num].endTime) || !validateEmpty(this.resume[num].inputText)){
            this.resume[num].error = true;
            this.resume[num].errorText = '请填写完整的个人简历';
            return false;
          }else if (new Date(this.resume[num].startTime) > new Date(this.resume[num].endTime)) {
            this.resume[num].error = true;
            this.resume[num].errorText = '开始时间不能大于结束时间';
            return false;
          } else {
            this.resume[num].error = false;
            this.resume[num].errorText = '';
          }
        }else {
          this.resume[num].error = false;
          this.resume[num].errorText = '';
        }
      },
      //添加个人简历
      addResume(){
        this.resume.push({
          id:this.resume.length,
          startTime:null,
          endTime:null,
          inputText:null,
          error:null,
          errorText:null
        })
      },
      //添加家庭成员
      addPeople(){
        if(this.peopleData.length < 4){
          this.peopleData.push({
            id:this.peopleData.length,
            relationship:null,
            name:null,
            political:null,
            work:null,
            error:null,
            errorText:null
          })
        }
      },
      //保存个人资料 和 下一步
      saveUser(pddata){
        var postData = true;
        if(this.choseStation == '' || this.choseStation.length<=0){
          this.stationError = true;
          this.stationErrorText = '请选择要报考的岗位';
          postData = false;
        }
        if(!validateEmpty(this.userInfo.name.text)){
          this.userInfo.name.errorText = '请输入姓名'
          this.userInfo.name.error = true
          postData = false;
        }else if(!validateName(this.userInfo.name.text)){
          this.userInfo.name.errorText = '请输入正确格式的姓名'
          this.userInfo.name.error = true
          postData = false;
        }
        if(!validateEmpty(this.sexSelect.selected.name)){
          this.sexSelect.errorText = '请选择性别'
          this.sexSelect.error = true
          postData = false;
        }
        if(!validateEmpty(this.userInfo.nation.text)){
          this.userInfo.nation.errorText = '请填写民族'
          this.userInfo.nation.error = true
          postData = false;
        }else if(!validateNation(this.userInfo.nation.text)){
          this.userInfo.nation.errorText = '请输入正确格式的民族'
          this.userInfo.nation.error = true
          postData = false;
        }
        if(!validateEmpty(this.userInfo.origin.text)){
          this.userInfo.origin.errorText = '请填写生源地'
          this.userInfo.origin.error = true
          postData = false;
        }
        if(!validateEmpty(this.userInfo.phone.text)){
          this.userInfo.phone.errorText = '请输入手机号'
          this.userInfo.phone.error = true
          postData = false;
        }else if(!validatePhoneNumber(this.userInfo.phone.text)){
          this.userInfo.phone.errorText = '请输入正确格式的手机号'
          this.userInfo.phone.error = true
          postData = false;
        }
        if(!validateEmpty(this.userInfo.mailbox.text)){
          this.userInfo.mailbox.errorText = '请输入电子邮箱'
          this.userInfo.mailbox.error = true
          postData = false;
        }else if(!validateEmail(this.userInfo.mailbox.text)){
          this.userInfo.mailbox.errorText = '请输入正确格式的电子邮箱'
          this.userInfo.mailbox.error = true
          postData = false;
        }
        if(!validateEmpty(this.userInfo.idCard.text)){
          this.userInfo.idCard.errorText = '请输入身份证号'
          this.userInfo.idCard.error = true
          postData = false;
        }else if(!IdentityCodeValid(this.userInfo.idCard.text)){
          this.userInfo.idCard.errorText = '请输入正确格式的身份证号'
          this.userInfo.idCard.error = true
          postData = false;
        }
        if(!validateEmpty(this.userInfo.address.text)){
          this.userInfo.address.errorText = '请输入家庭地址'
          this.userInfo.address.error = true
          postData = false;
        }
        if(!validateEmpty(this.politicalSelect.selected.name)){
          this.politicalSelect.errorText = '请选择政治面貌'
          this.politicalSelect.error = true
          postData = false;
        }
        if(!validateEmpty(this.userInfo.type.text)){
          this.userInfo.type.errorText = '请填写教师资格证种类'
          this.userInfo.type.error = true
          postData = false;
        }
        if(!validateEmpty(this.userInfo.identifier.text)){
          this.userInfo.identifier.errorText = '请填写教师资格证编号'
          this.userInfo.identifier.error = true
          postData = false;
        }
        if(!validateEmpty2(this.userInfo.graduationTime.text)){
          this.userInfo.graduationTime.errorText = '请选择毕业年份'
          this.userInfo.graduationTime.error = true
          postData = false;
        }
        if(!validateEmpty(this.educationSelect.selected.name)){
          this.educationSelect.errorText = '请选择最高学历'
          this.educationSelect.error = true
          postData = false;
        }
        if(!validateEmpty(this.eduDegreeSelect.selected.name)){
          this.eduDegreeSelect.errorText = '请选择最高学位'
          this.eduDegreeSelect.error = true
          postData = false;
        }
        if(!validateEmpty(this.imageUrl)){
          this.$message({
            message: '请上传图片',
            type: 'error'
          });
          postData = false;
        }
        if(this.educationSelect.selected.name != '不限'){
          this.nEducationSelect.forEach((v,i)=>{
            if(v.error || !validateEmpty(v.school) || !validateEmpty(v.major) || !validateEmpty(v.selected.name)){
              this.nEducationSelect[i].errorText = '请填写完整的学历信息'
              this.nEducationSelect[i].error = true
              postData = false;
            }
          })
        }
        if(postData){
          this.btn1NOclick = true;
          var data = {
            certificationInfo:{},
            credentials:[]
          };
          data.teacherId=this.teacherId;
          data.userId=this.userData.uuid;
          data.recruitId=this.key;
          data.photo=this.imageUrl;
          data.unitId=this.choseStation[0];
          // data.subject=this.choseStation[1];
          data.name=this.userInfo.name.text;
          data.sex=this.sexSelect.selected.id;
          data.nation=this.userInfo.nation.text;
          data.birthplace=this.userInfo.origin.text;
          data.mobile=this.userInfo.phone.text;
          data.email=this.userInfo.mailbox.text;
          data.idNumber=this.userInfo.idCard.text;
          data.address=this.userInfo.address.text;
          data.maxDegree=this.eduDegreeSelect.selected.name;
          data.politicsStatus=this.politicalSelect.selected.name;
          data.certificationInfo.kind=this.userInfo.type.text;
          data.certificationInfo.serialNumber=this.userInfo.identifier.text
          data.certificationInfo.highestEducation=this.educationSelect.selected.name
          data.graduateTime=new Date(this.userInfo.graduationTime.text).getFullYear();
          this.jobData.forEach((v,i)=>{
            if(v.unitId == this.choseStation[0]){
              v.children.forEach((v1,i1)=>{
                if(v.jobId == this.choseStation[1]){
                  data.postId=v1.jobId;
                }
              })
            }
          })
          switch(this.educationSelect.selected.name){
            case '专科':
              this.nEducationSelect.forEach((v,i)=>{
                if(v.id == 1){
                  data.certificationInfo.specialtiesAcademy=v.school
                  data.certificationInfo.specialtiesSpecialty=v.major
                  data.certificationInfo.specialtiesEducationNature=v.selected.name
                }
              })
              break;
            case '本科':
              this.nEducationSelect.forEach((v,i)=>{
                if(v.id == 2){
                  data.certificationInfo.bachelorAcademy=v.school
                  data.certificationInfo.bachelorSpecialty=v.major
                  data.certificationInfo.bachelorEducationNature=v.selected.name
                }
              })
              break;
            case '硕士研究生':
              this.nEducationSelect.forEach((v,i)=>{
                if(v.id == 2){
                  data.certificationInfo.bachelorAcademy=v.school
                  data.certificationInfo.bachelorSpecialty=v.major
                  data.certificationInfo.bachelorEducationNature=v.selected.name
                }
                if(v.id == 3){
                  data.certificationInfo.masterAcademy=v.school
                  data.certificationInfo.masterSpecialty=v.major
                  data.certificationInfo.masterEducationNature=v.selected.name
                }
              })
              break;
            case '博士研究生':
              this.nEducationSelect.forEach((v,i)=>{
                if(v.id == 2){
                  data.certificationInfo.bachelorAcademy=v.school
                  data.certificationInfo.bachelorSpecialty=v.major
                  data.certificationInfo.bachelorEducationNature=v.selected.name
                }
                if(v.id == 3){
                  data.certificationInfo.masterAcademy=v.school
                  data.certificationInfo.masterSpecialty=v.major
                  data.certificationInfo.masterEducationNature=v.selected.name
                }
                if(v.id == 4){
                  data.certificationInfo.doctorAcademy=v.school
                  data.certificationInfo.doctorSpecialty=v.major
                  data.certificationInfo.doctorEducationNature=v.selected.name
                }
              })
              break;
            default:
              break;
          }
          this.picList.forEach((v,i)=>{
            data.credentials.push({
              url:v.url,
              teacherId:this.teacherId
            })
          })
          saveTeacherInfo(data).then(res=>{
            this.btn1NOclick = false;
            if(res.data.code == 200){
              if(pddata){
                this.stepData = 3;
                this.teacherId = res.data.data;
              }else {
                this.teacherId = res.data.data;
                // this.$router.push('/')
                this.$message({
                  message: '保存成功',
                  type: 'success'
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
      },
      //保存个人经历 和 报名
      saveExperience(pddata){
        var resumepd = true;
        var peoplepd = true;
        var savepd = true;
        var data = {
          teacherId:this.teacherId,
          currentWorkingUnit:'',
          remark:'',
          familyMembers:[],
          resumes:[]
        };
        if(!validateEmpty(this.workplace)){
          this.workplaceErrorText = '请填写先工作单位,没有请填写无'
          this.workplaceError = true
          savepd = false
        }else {
          data.currentWorkingUnit = this.workplace;
        }
        if(!validateEmpty(this.remark)){
          this.remarkErrorText = '请填写备注,没有请填写无'
          this.remarkError = true
          savepd = false
        }else {
          data.remark = this.remark;
        }
        this.resume.forEach((v,i)=>{
          if(validateEmpty(v.startTime) || validateEmpty(v.endTime) || validateEmpty(v.inputText)) {
            if(!validateEmpty(v.startTime) || !validateEmpty(v.endTime) || !validateEmpty(v.inputText)){
              this.resume[i].error = true;
              this.resume[i].errorText = '请填写完整的个人简历';
              savepd = false;
              resumepd = false;
              return false;
            }else if (new Date(v.startTime) > new Date(v.endTime)) {
              this.resume[i].error = true;
              this.resume[i].errorText = '开始时间不能大于结束时间';
              savepd = false;
              resumepd = false;
              return false;
            } else {
              data.resumes.push({
                entryTime: v.startTime,
                dimissionTime: v.endTime,
                work: v.inputText
              })
            }
          }
        })
        if(resumepd){
          if(data.resumes.length<2){
            this.$message({
              message: '请至少填写两条个人简历',
              type: 'error'
            })
            savepd = false;
            return false
          }
        }
        if(resumepd){
          this.peopleData.forEach((v,i)=>{
            if(validateEmpty(v.relationship) || validateEmpty(v.name) || validateEmpty(v.political) || validateEmpty(v.work)){
              if(!validateEmpty(v.relationship) || !validateEmpty(v.name) || !validateEmpty(v.political) || !validateEmpty(v.work)){
                this.peopleData[i].error = true;
                this.peopleData[i].errorText = '请填写完整的该成员信息';
                savepd = false;
                peoplepd = false;
                return false
              }else if(v.relationship.length>4){
                this.peopleData[i].error = true;
                this.peopleData[i].errorText = '关系最多为四个字,请检查是否含有空格';
                savepd = false;
                peoplepd = false;
                return false
              }else if(v.political.length>4){
                this.peopleData[i].error = true;
                this.peopleData[i].errorText = '政治面貌最多为四个字,请检查是否含有空格';
                savepd = false;
                peoplepd = false;
                return false
              }else {
                data.familyMembers.push({
                  relation:v.relationship,
                  familyMemberName:v.name,
                  familyMemberPoliticsStatus:v.political,
                  works:v.work
                })
              }
            }
          })
          if(peoplepd){
            if(data.familyMembers.length<1){
              this.$message({
                message: '请至少填写一条家庭成员',
                type: 'error'
              })
              savepd = false;
              return false
            }
          }
        }
        if(savepd){
          this.btn2NOclick = true;
          data.teacherId = this.teacherId;
          if(pddata){
            applyTeacher(data).then(res=>{
              this.btn2NOclick = false;
              if(res.data.code == 200){
                this.$router.push({path:'/signUpSuccess',query:{name:this.linkName}})
              }else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              }
            })
          }else {
            saveSocialResume(data).then(res => {
              this.btn2NOclick = false;
              if(res.data.code == 200){
                this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                // this.$router.push('/')
              }else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              }
            })
          }
        }
      },
      //上传图片限制
      async beforeAvatarUpload(newFile, oldFile, prevent) {
        const that = this;
        if(newFile && !oldFile){
          const isJPG = newFile.type === 'image/jpeg' || newFile.type === 'image/png' || newFile.type === 'image/jpeg';
          const isLt3k = newFile.size / 1024 / 1024 < 20;
          if (!isJPG) {
            this.$message.error('上传头像图片只能是 jpg、jpeg和png 格式!');
          }
          if (!isLt3k) {
            this.$message.error('上传头像图片大小不能超过 20M!');
          }
          if(isJPG && isLt3k){
            var reader = new FileReader();
            reader.readAsDataURL(newFile.file);
            reader.onload = function(e){
              that.option.img = e.target.result
              that.fileKey = newFile.id
              that.dialogVisible = true
            };
          }
        }
      },
      //上传证明材料
      beforePicUpload(newFile, oldFile, prevent){
        const that = this;
        if(newFile && !oldFile){
          const isJPG = newFile.type === 'image/jpeg' || newFile.type === 'image/png' || newFile.type === 'image/jpeg';
          const isLt3k = newFile.size / 1024 / 1024 < 20;
          if (!isJPG) {
            this.$message.error('上传头像图片只能是 jpg、jpeg和png 格式!');
          }
          if (!isLt3k) {
            this.$message.error('上传头像图片大小不能超过 20M!');
          }
          if(isJPG && isLt3k){
            var imgData = new FormData();
            imgData.append('file',newFile.file)
            avatar(imgData).then(res=>{
              if(res.data.code == 200){
                this.picList.push({url:res.data.imgUrl});
              }else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              }
            })
          }
        }
      },
      //删除上传证明材料
      removePic(num){
        this.picList.splice(num,1);
      },
      // 点击裁剪，这一步是可以拿到处理后的地址
      finish() {
        this.$refs.cropper.getCropData((data) => {
          var arr = data.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
          while(n--){
            u8arr[n] = bstr.charCodeAt(n);
          }
          let theBlob = new Blob([u8arr],{type:mime})
          theBlob.lastModidiedDate = new Date();
          theBlob.name = this.fileKey;
          // var fileData = new File([u8arr], this.fileKey, {type:mime});
          var imgData = new FormData();
          imgData.append('file',theBlob)
          avatar(imgData).then(res=>{
            if(res.data.code == 200){
              this.imageUrl = res.data.imgUrl;
              this.dialogVisible = false;
            }else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          })
        })
      },
      close(){
        this.dialogVisible = false
      },
      //获取招聘岗位
      async getTeacher(){
        var jobList = [];
        var jobCopy = [];
        var data = 'recruitId='+this.$route.query.key;
        await queryRecruitmentSchool(data).then(result =>{
          if(result.data.code == 200){
            result.data.data.forEach((v,i)=>{
              jobList.push({
                value:v.unitId,
                label:v.unitName,
                children:[]
              })
            })
            jobCopy=result.data.data;
            jobList.forEach((item,index)=>{
              var jobdata = 'recruitId='+this.$route.query.key+'&unitId='+item.value
              queryRecruitmentJob(jobdata).then(res=>{
                if(res.data.code == 200){
                  res.data.data.forEach((v,i)=>{
                    jobList[index].children.push({
                      value:v.jobId,
                      label:v.subjectName,
                    })
                  })
                  this.prepareData = jobList;
                  jobCopy[index].children = res.data.data;
                  this.jobData = jobCopy;
                  this.$forceUpdate;
                }else {
                  this.$message({
                    message: res.data.msg,
                    type: 'error'
                  });
                }
              })
            })
          }else {
            this.$message({
              message: result.data.msg,
              type: 'error'
            });
          }
        })
      }
    },
    components: {
      Header,
      FileUpload,
      vueCropper
    }
  }
</script>

<style lang="scss" scoped>
  .start_box{
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
    .start_con{
      padding-top: 14px;
      .step_box{
        width: 855px;
        margin: 0 auto;
        .step {
          position: relative;
          img {
            width: 195px;
            height: 50px;
          }
          .hui {
            display: block;
          }
          .blue {
            display: none;
          }
          span{
            position: absolute;
            left: 68px;
            top: 10px;
            display: inline-block;
            font-size:21px;
            font-weight:400;
            color:#999999;
            line-height:30px;
            cursor: default;
          }
          &.act {
            .hui {
              display: none;
            }
            .blue {
              display: block;
            }
            span{
              color: #436DF3;
            }
          }
        }
        .xian{
          width: 135px;
          height: 2px;
          margin-top: 24px;
          background-color: #EBEBEB;
        }
      }
      .con_box{
        .con1{
          padding-top: 100px;
          .form{
            width: 370px;
            margin: 0 auto;
            .label{
              font-size:16px;
              font-weight:400;
              color:rgba(51,51,51,1);
              line-height: 16px;
              margin-bottom: 16px;
            }
            .select_box{
              position: relative;
              width: 370px;
              p{
                position: absolute;
                top: 45px;
                left: 0px;
                width: 370px;
                font-size:14px;
                font-weight:400;
                color:rgba(255,57,57,1);
                line-height: 24px;
                margin: 0 auto;
              }
            }
            .next{
              display: block;
              margin: 124px auto 50px;
              width:140px;
              height:44px;
              background:rgba(67,109,243,1);
              border-radius:5px;
              font-size:20px;
              font-weight:400;
              color:rgba(255,255,255,1);
              line-height: 44px;
            }
          }
        }
        .con2{
          padding-top: 64px;
          .form{
            width: 783px;
            margin: 0 auto;
            .fr_top{
              .left{
                width: 606px;
                div:nth-child(2n){
                  margin-right: 0px;
                }
                .input_box{
                  position: relative;
                  margin-right: 22px;
                  margin-bottom: 15px;
                  .label{
                    width: 81px;
                    height: 30px;
                    line-height: 30px;
                    font-size:16px;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                  }
                  input{
                    width:210px;
                    height:30px;
                    border:1px solid rgba(200,205,209,1);
                    border-radius:3px;
                    padding: 0px 5px;
                    font-size:16px;
                    font-weight:400;
                    color:#333333;
                    line-height:30px;
                    &:focus{
                      border: 1px solid #409EFF;
                    }
                  }
                  .error_box{
                    position: absolute;
                    width: 211px;
                    height: 15px;
                    left: 81px;
                    top: 100%;
                    font-size:12px;
                    font-weight:400;
                    color:rgba(255,51,51,1);
                    line-height: 15px;
                  }
                }
                .input1_box{
                  position: relative;
                  width: 100%;
                  margin-right: 22px;
                  margin-bottom: 15px;
                  .label{
                    width: 81px;
                    height: 30px;
                    line-height: 30px;
                    font-size:16px;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                  }
                  input{
                    width:calc(100% - 81px);
                    height:30px;
                    border:1px solid rgba(200,205,209,1);
                    border-radius:3px;
                    padding: 0px 5px;
                    font-size:16px;
                    font-weight:400;
                    color:#333333;
                    line-height:30px;
                    &:focus{
                      border: 1px solid #409EFF;
                    }
                  }
                  .error_box{
                    position: absolute;
                    width: 211px;
                    height: 15px;
                    left: 81px;
                    top: 100%;
                    font-size:12px;
                    font-weight:400;
                    color:rgba(255,51,51,1);
                    line-height: 15px;
                  }
                }
                .select_box{
                  position: relative;
                  margin-right: 22px;
                  margin-bottom: 15px;
                  .label{
                    width: 81px;
                    height: 30px;
                    line-height: 30px;
                    font-size:16px;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                  }
                  .error_box{
                    position: absolute;
                    width: 211px;
                    height: 15px;
                    left: 81px;
                    top: 100%;
                    font-size:12px;
                    font-weight:400;
                    color:rgba(255,51,51,1);
                    line-height: 15px;
                  }
                }
                .tle{
                  display: block;
                  width: 100%;
                  font-size:16px;
                  font-weight:400;
                  color:rgba(102,102,102,1);
                  line-height:16px;
                  padding: 5px 0 18px;
                }
              }
              .right{
                margin-left: 34px;
                width: 143px;
                .avatar-uploader{
                  width: 145px;
                  height: 202px;
                  line-height: 195px;
                  border:1px solid rgba(200,205,209,1);
                  border-radius:3px;
                  text-align: center;
                  i{
                    display: block;
                    width: 100%;
                    font-size: 34.9px;
                    line-height: 200px;
                    color: #DFDFDF;
                  }
                  .avatar{
                    max-width: 100%;
                    max-height: 100%;
                    border: none;
                  }
                }
                h1{
                  font-size:16px;
                  font-weight:400;
                  color:rgba(102,102,102,1);
                  line-height:18px;
                  margin: 8px 0 6px;
                }
                p{
                  font-size:16px;
                  font-weight:400;
                  color:rgba(255,51,51,1);
                  line-height:18px;
                  word-break:break-all;
                }
              }
            }
            .ft_bottom{
              .select_box{
                position: relative;
                margin-right: 22px;
                margin-bottom: 15px;
                .label{
                  width: 81px;
                  height: 30px;
                  line-height: 30px;
                  font-size:16px;
                  font-weight:400;
                  color:rgba(102,102,102,1);
                }
                .error_box{
                  position: absolute;
                  width: 165px;
                  height: 15px;
                  left: 81px;
                  top: 100%;
                  font-size:12px;
                  font-weight:400;
                  color:rgba(255,51,51,1);
                  line-height: 15px;
                }
              }
              .date_box{
                position: relative;
                margin-right: 22px;
                margin-bottom: 15px;
                .el-select__caret{
                  position: absolute;
                  right: 0;
                  top: 0px;
                  color: #C0C4CC;
                  font-size: 14px;
                  line-height: 30px;
                  -webkit-transition: -webkit-transform .3s;
                  transition: -webkit-transform .3s;
                  transition: transform .3s;
                  transition: transform .3s, -webkit-transform .3s;
                  transition: transform .3s,-webkit-transform .3s;
                  -webkit-transform: rotateZ(180deg);
                  transform: rotateZ(180deg);
                  cursor: pointer;
                  z-index: 1;
                  &.is_active{
                    -webkit-transform: rotateZ(0);
                    transform: rotateZ(0);
                  }
                }
                .label{
                  width: 81px;
                  height: 30px;
                  line-height: 30px;
                  font-size:16px;
                  font-weight:400;
                  color:rgba(102,102,102,1);
                }
                .error_box{
                  position: absolute;
                  width: 165px;
                  height: 15px;
                  left: 81px;
                  top: 100%;
                  font-size:12px;
                  font-weight:400;
                  color:rgba(255,51,51,1);
                  line-height: 15px;
                }
              }
              .education_box{
                position: relative;
                .input_box1{
                  position: relative;
                  margin-right: 20px;
                  margin-bottom: 15px;
                  .label{
                    width: 81px;
                    height: 30px;
                    line-height: 30px;
                    font-size:16px;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                  }
                  input{
                    width:159px;
                    height:30px;
                    border:1px solid rgba(200,205,209,1);
                    border-radius:3px;
                    padding: 0px 5px;
                    font-size:16px;
                    font-weight:400;
                    color:#333333;
                    line-height: 30px;
                    &:focus{
                      border: 1px solid #409EFF;
                    }
                  }
                }
                .select_box1{
                  position: relative;
                  margin-bottom: 15px;
                  .label{
                    width: 81px;
                    height: 30px;
                    line-height: 30px;
                    font-size:16px;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                  }
                }
                .error_box{
                  position: absolute;
                  width: calc(100% - 81px);
                  height: 15px;
                  left: 81px;
                  top: 30px;
                  font-size:12px;
                  font-weight:400;
                  color:rgba(255,51,51,1);
                  line-height: 15px;
                }
              }
              .pic_list{
                .pic_tle{
                  display: block;
                  margin-bottom: 15px;
                  .tle{
                    font-size:16px;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    line-height: 26px;
                  }
                  .p{
                    font-size:14px;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                    line-height: 26px;
                  }
                }
                .pic_box{
                  .img{
                    position: relative;
                    width: 150px;
                    height: 100px;
                    margin-bottom: 10px;
                    margin-right: 10px;
                    cursor: pointer;
                    .pic{
                      width: 150px;
                      height: 100px;
                    }
                    .close{
                      position: absolute;
                      right: 0px;
                      top: 0px;
                      width: 14px;
                      height: 14px;
                      z-index: 3;
                    }
                  }
                }
                .pic_upload{
                  width: 150px;
                  height: 100px;
                  margin-bottom: 10px;
                  margin-right: 10px;
                  position: relative;
                  background-color: #F5F5F5;
                  text-align: center;
                  .uploader{
                    width: 150px;
                    height: 100px;
                    line-height: 100px;
                    cursor: pointer;
                  }
                  img{
                    display: inline-block;
                    width: 42px;
                    height: 42px;
                  }
                }
              }
            }
          }
          .tips{
            width: 783px;
            margin: 13px auto 98px;
            font-size:16px;
            font-weight:400;
            color:rgba(255,51,51,1);
            line-height:26px;
          }
          .btn_box{
            text-align: center;
            .save{
              width:124px;
              height:40px;
              background:rgba(255,255,255,1);
              border:1px solid rgba(79,121,255,1);
              border-radius:5px;
              font-size:20px;
              font-weight:400;
              color:rgba(79,121,255,1);
              line-height: 40px;
              text-align: center;
              margin-right: 38px;
            }
            .next{
              width:124px;
              height:40px;
              background:rgba(79,121,255,1);
              border-radius:5px;
              font-size:20px;
              font-weight:400;
              color:rgba(255,255,255,1);
              line-height: 40px;
              text-align: center;
            }
          }
        }
        .con3{
          .from{
            width: 902px;
            margin: 0 auto;
            padding-top: 62px;
            .input_box{
              position: relative;
              margin-bottom: 15px;
              .label{
                width: 98px;
                height: 30px;
                line-height: 30px;
                font-size:16px;
                font-weight:400;
                color:rgba(51,51,51,1);
              }
              input{
                width:804px;
                height:30px;
                border:1px solid rgba(200,205,209,1);
                border-radius:3px;
                padding: 0px 5px;
                font-size:16px;
                font-weight:400;
                color:#333333;
                line-height:30px;
                &:focus{
                  border: 1px solid #409EFF;
                }
              }
              .error_box{
                position: absolute;
                width: 804px;
                height: 15px;
                left: 98px;
                top: 100%;
                font-size:12px;
                font-weight:400;
                color:rgba(255,51,51,1);
                line-height: 15px;
              }
            }
            .resume_box{
              padding-top: 9px;
              margin-bottom: 12px;
              .resume{
                position: relative;
                margin-bottom: 15px;
                span{
                  display: block;
                  width: 27px;
                  font-size:16px;
                  font-weight:400;
                  color:rgba(51,51,51,1);
                  line-height:30px;
                }
                .ts8{
                  margin-right: 14px;
                }
                input{
                  margin-left: 7px;
                  width:581px;
                  height:30px;
                  border:1px solid rgba(200,205,209,1);
                  border-radius:3px;
                  padding: 0px 10px;
                  font-size:16px;
                  font-weight:400;
                  color:#333333;
                  line-height:30px;
                  &:focus{
                    border: 1px solid #409EFF;
                  }
                  &::-webkit-input-placeholder{color:#C0C4CC}
                  &:-ms-input-placeholder{color:#C0C4CC}
                  &::-ms-input-placeholder{color:#C0C4CC}
                  &::placeholder{color:#C0C4CC}
                }
                .error_box{
                  position: absolute;
                  width: 840px;
                  height: 15px;
                  left: 0px;
                  top: 100%;
                  font-size:12px;
                  font-weight:400;
                  color:rgba(255,51,51,1);
                  line-height: 15px;
                }
              }
            }
            .tle{
              font-size:16px;
              font-weight:400;
              color:rgba(51,51,51,1);
              line-height:26px;
              img{
                width: 15px;
                height: 14px;
                cursor: pointer
              }
            }
            .people_box{
              padding-top: 7px;
              .people{
                position: relative;
                margin-bottom: 15px;
                span{
                  height: 30px;
                  font-size:16px;
                  font-weight:400;
                  color:rgba(51,51,51,1);
                  line-height:30px;
                }
                input{
                  height: 30px;
                  line-height: 30px;
                  border:1px solid rgba(200,205,209,1);
                  border-radius:3px;
                  margin-right: 25px;
                  padding: 0px 10px;
                  font-size:16px;
                  font-weight:400;
                  color:#333333;
                  &:focus{
                    border: 1px solid #409EFF;
                  }
                }
                .span1{
                  width: 62px;
                }
                .span2{
                  width: 42px;
                }
                .span3{
                  width: 76px;
                }
                .span4{
                  width: 129px;
                }
                .input1{
                  width: 104px;
                }
                .input2{
                  width: 90px;
                }
                .input3{
                  width: 219px;
                  margin-right: 0px;
                }
                .error_box{
                  position: absolute;
                  width: 840px;
                  height: 15px;
                  left: 0px;
                  top: 100%;
                  font-size:12px;
                  font-weight:400;
                  color:rgba(255,51,51,1);
                  line-height: 15px;
                }
              }
            }
            .input_box1{
              position: relative;
              margin-bottom: 15px;
              .label{
                width: 62px;
                height: 30px;
                line-height: 30px;
                font-size:16px;
                font-weight:400;
                color:rgba(51,51,51,1);
              }
              input{
                width:840px;
                height:30px;
                border:1px solid rgba(200,205,209,1);
                border-radius:3px;
                padding: 0px 5px;
                font-size:16px;
                font-weight:400;
                color:#333333;
                line-height:30px;
                &:focus{
                  border: 1px solid #409EFF;
                }
              }
              .error_box{
                position: absolute;
                width: 840px;
                height: 15px;
                left: 62px;
                top: 100%;
                font-size:12px;
                font-weight:400;
                color:rgba(255,51,51,1);
                line-height: 15px;
              }
            }
          }
          .tips{
            width: 902px;
            margin: 13px auto 70px;
            font-size:14px;
            font-weight:400;
            color:rgba(255,51,51,1);
            line-height:26px;
          }
          .btn_box{
            text-align: center;
            .save{
              width:124px;
              height:40px;
              background:rgba(255,255,255,1);
              border:1px solid rgba(79,121,255,1);
              border-radius:5px;
              font-size:20px;
              font-weight:400;
              color:rgba(79,121,255,1);
              line-height: 40px;
              text-align: center;
              margin-right: 38px;
            }
            .next{
              width:124px;
              height:40px;
              background:rgba(79,121,255,1);
              border-radius:5px;
              font-size:20px;
              font-weight:400;
              color:rgba(255,255,255,1);
              line-height: 40px;
              text-align: center;
            }
          }
        }
      }
    }
  }
  .cropper-content {
    .cropper {
      width: auto;
      height: 300px;
    }
  }
</style>
