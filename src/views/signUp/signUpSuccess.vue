<template>
    <div>
      <Header></Header>
      <div class="success_box">
        <div class="link_box">
          <router-link to="/">首页</router-link>
          >
          <a href="javascript:void(0)">
            {{linkName}}
          </a>
        </div>
        <div class="con_box">
          <img src="@/assets/success.png" alt="">
          <p>
            您的报名信息已经提交成功，我们会及时进行审批，<br/>
            请您耐心等待，认真准备考试，预祝您取得好成绩！
          </p>
          <span>正在审批中</span>
        </div>
      </div>
    </div>
</template>

<script>
  import Header from '@/components/header.vue'
  export default {
    data() {
        return {
          linkName:''
        }
    },
    created() {
      this.linkName = this.$route.query.name;
    },
    mounted() {
    },
    methods: {},
    components: {
      Header
    }
  }
</script>

<style lang="scss" scoped>
  .success_box {
    width: 1080px;
    margin: 0 auto;
    .link_box {
      margin: 27px 0;
      font-size: 18px;
      font-weight: 400;
      line-height: 18px;
      color: rgba(51, 51, 51, 1);
      padding-left: 11px;
      border-left: 3px solid #436DF3;
      a {
        display: inline-block;
      }
    }
    .con_box{
      padding-top: 123px;
      img{
        display: block;
        width: 140px;
        height: 140px;
        margin: 0 auto;
      }
      p{
        text-align: center;
        font-size:22px;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:30px;
        margin: 27px auto 32px;
      }
      span{
        display: block;
        margin: 0 auto;
        width:170px;
        height:50px;
        border:1px solid rgba(40,120,255,1);
        border-radius:10px;
        font-size:21px;
        font-weight:500;
        color:rgba(67,110,243,1);
        line-height:48px;
        text-align: center;
      }
    }
  }
</style>
