<template>
    <div>
      <Header></Header>
      <div class="detail_box">
        <div class="link_box">
          <router-link to="/">首页</router-link>
          >
          <a href="javascript:void(0)" @click="gotoLink()">
            {{linkName}}
          </a>
          >
          <a href="javascript:void(0)" v-show="linkName">
            招生简章
          </a>
        </div>
        <div class="detail">
          <div class="con tsHtml" v-html="content"></div>
        </div>
      </div>
    </div>
</template>

<script>
  import Header from '@/components/header.vue'
  import {recruitmentById} from '@/api/detail.js'
  export default {
    data() {
        return {
          content:'',
          linkName:'',
          key:null,
          status:null,
        }
    },
    created() {
      this.key = this.$route.query.key
      recruitmentById(this.$route.query.key).then(result => {
        if(result.data.code == 200){
          this.content = result.data.data.recruitmentBrochure
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
      gotoAgree(){
        this.$router.push({path:'/agreement',query:{key:this.key}})
      },
      gotoLink(){
        this.$router.push({path:'/agreement',query:{key:this.key}})
      },
    },
    components: {
      Header
    }
  }
</script>

<style lang="scss" scoped>
  .detail_box{
    width: 1080px;
    margin: 0 auto;
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
    .detail{
      padding-bottom: 40px;
      .con{
        font-size: 16px;
        font-weight: 400;
        color: #333;
        line-height: 30px;
        white-space: pre-wrap;
      }
      button{
        display: block;
        width: 124px;
        height: 40px;
        background: #4f79ff;
        border-radius: 5px;
        font-size: 20px;
        font-weight: 400;
        color: #fff;
        margin: 50px auto 0;
      }
    }
  }
</style>
