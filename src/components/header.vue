<template>
  <div class="he_box">
    <div class="bgColor clearfix">
      <div class="title fl">
        <router-link to="/">
          烟台市教育系统事业单位公开招聘
        </router-link>
      </div>
      <div class="login_box fr">
        <span class="noLogin" v-if="!isLogin" @click="signIn">登录/注册</span>
        <div v-if="isLogin" class="isLogin clearfix">
          <span class="name fl">
            <img src="@/assets/user.png" alt="">
            {{userInfo.name}}
          </span>
          <span class="signOut fl" @click="signOut">
            退出
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getUserId,setUserId,removeUserId } from '@/utils/auth'
  import { getUserInfoByTicket } from '@/api/index'
  export default {
    data () {
      return {
        isLogin:false,
        userInfo:null
      }
    },
    created() {

    },
    mounted() {
      getUserId() ? this.isLogin = true : this.isLogin = false;
      getUserId() ? this.userInfo = {name:JSON.parse(getUserId()).name} : '';
      getUserId() ? console.log(JSON.parse(getUserId())) : '';
      if(this.$route.query.ticket && !this.isLogin) {
        getUserInfoByTicket({ticket:this.$route.query.ticket}).then(res=>{
          if(res.data.code == 200){
            if (res.data.data.authlevel < 1) {
              this.$alert("请进入山东省统一认证平台补全信息", "提示", {
                confirmButtonText: "确定",
                callback: action => {
                  window.location.href =
                    "http://zwfw.sd.gov.cn/sfzw/front/user/index.do";
                }
              });
            }else {
              setUserId(res.data.data)
              this.userInfo = {
                name: res.data.data.name,
              }
              this.isLogin = true
            }
          }else{
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        })
      }
    },
    updated() {
    },
    methods: {
      signIn(){
        // window.location.href = 'http://zwfw.sd.gov.cn/JIS/front/login.do?uuid=aVFlgZQZXICb&gotourl=test&type=1';
        window.location.href = 'http://zwfw.sd.gov.cn/JIS/front/login.do?uuid=aVFlgZQZXICb&gotourl=11&type=1';
      },
      signOut(){
        removeUserId();
        this.userInfo = null;
        this.isLogin = false;
        this.$router.push({path:'/'})
      }
    },
  }
</script>

<style lang="scss" scoped>
  .he_box{
    background-color: #1D4ABD;
    .bgColor{
      width: 1080px;
      margin: 0 auto;
      .title{
        a{
          font-size:18px;
          height: 80px;
          line-height: 80px;
          font-weight:400;
          color:rgba(254,254,254,1);
        }
      }
      .login_box{
        .noLogin{
          font-size:18px;
          height: 80px;
          line-height: 80px;
          font-weight:400;
          color:rgba(254,254,254,1);
          cursor: pointer;
        }
        .isLogin{
          .name{
            font-size:18px;
            height: 80px;
            line-height: 80px;
            font-weight:400;
            color:rgba(254,254,254,1);
            img{
              width: 20px;
              height: 22px;
              vertical-align: sub;
            }
          }
          .signOut{
            font-size:18px;
            height: 80px;
            line-height: 80px;
            font-weight:400;
            color:rgba(254,254,254,1);
            margin-left: 17px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
