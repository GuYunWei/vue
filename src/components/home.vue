<template>
  <div style="height:100%;">
    <div v-transfer-dom>
      <actionsheet class="menuList" :menus="menus" v-model="showMenu" @on-click-menu="changeSystem"></actionsheet>
    </div>
    <drawer
      width="200px;"
      :show.sync="drawerVisibility"
      :show-mode="'overlay'"
      :placement="'left'"
      :drawer-style="{width: '200px'}">

      <!-- drawer content -->
      <div slot="drawer" class="sideMenu">
        <div>
          <blur :blur-amount=10 :url="url" style="height:210px">
            <p class="center"><img :src="url"></p>
            <p class="groupname">{{ groupName }}</p>
            <p class="username">{{ userName }}</p>
          </blur>
        </div>
        <group>
          <!-- <cell class="home" title="主页" link="/home" @click.native="drawerVisibility = false">
          </cell> -->
          <cell class="plans" title="轮灌计划" link="/plans" @click.native="drawerVisibility = false">
          </cell>
          <cell class="compile" title="轮灌编制" link="/compile" @click.native="drawerVisibility = false">
          </cell>
          <cell class="irrigate" title="田间补灌" link="/irrigate" @click.native="drawerVisibility = false">
          </cell>
          <!-- <cell class="setting" title="设置" link="/setting" @click.native="drawerVisibility = false">
          </cell> -->
        </group>
        <group class="exit">
          <x-button type="warn" @click.native="logout">退出登录</x-button>
        </group>
      </div>

      <!-- main content -->
      <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
        <x-header slot="header"
         style="width:100%;position:absolute;left:0;top:0;z-index:100;"
         :left-options="leftOptions"
         :right-options="rightOptions"
         :transition="headerTransition"
         @on-click-more="onClickMore">
          <span v-if="route.path === '/' || route.path === '/home'" slot="overwrite-left" @click="drawerVisibility = !drawerVisibility">
            <x-icon type="navicon" size="35" class="leftMenu"></x-icon>
          </span>
          <swiper v-if="isShowSwiper" class="sysSwiper" :list="sysList" v-model="curIndex" direction="horizontal" :min-moving-distance="20" height="40px" :show-dots="false" @on-index-change="changeSystem"></swiper>
          <span v-if="!isShowSwiper">设置</span>
        </x-header>
        
        <!-- children-component -->
        <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
          <router-view @message="getSysByUserId" ref="children" class="router-view"></router-view>
        </transition>
            
      </view-box>
    </drawer>
  </div>
</template>

<script>
import { Group, Grid, GridItem, Cell, CellFormPreview, Drawer, Actionsheet, ViewBox, XInput, XButton, XHeader, XTable, Loading, TransferDom, Swiper, Blur, Scroller } from 'vux'
import { mapState, mapActions } from 'vuex'
import axios from "axios"
import Tool from "@/utils/Tool"
import { URL } from "@/utils/API"


export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    Grid,
    GridItem,
    Cell,
    CellFormPreview,
    Drawer,
    ViewBox,
    XInput,
    XButton,
    XHeader,
    XTable,
    Loading,
    Swiper,
    Blur,
    Scroller,
    Actionsheet
  },
  created(){
    const curIndex = Tool.getCookie("curIndex")
    if(!curIndex){
      Tool.setCookie("curIndex", this.curIndex, 1)
    }else{
      this.$store.commit('updateIndex', { curIndex: +curIndex })
    }
    this.getSysByUserId();
  },
  methods: {
    onClickMore () {
      this.showMenu = true
    },
    changeSystem (index) {
      this.$store.commit('updateIndex', { curIndex: +index })
    },
    logout(){
      Tool.delCookie("userId");
      Tool.delCookie("userName");
      Tool.delCookie("isadmin");
      Tool.delCookie("Token");
      Tool.delCookie("unismName");
      Tool.delCookie("apiKey");
      Tool.delCookie("groupId");
      Tool.delCookie("ConsoleToken");
      Tool.delCookie("userNum");
      Tool.delCookie("groupName");
      Tool.delCookie("isLeader");
      this.$store.commit('updateSysList', { sysList: [] })
      this.$store.commit('updateIndex', { curIndex: 0 })
      this.$router.push("/");
    },
    getSysByUserId(){
      this.userName = Tool.getCookie("userName");
      this.groupName = Tool.getCookie("groupName");
      const userId = Tool.getCookie("userId");
      const isadmin = Tool.getCookie("isadmin");
      const _this = this;
      axios.get(URL.getSysByUserId, {
        params: {
          userId: userId,
          isAdmin: isadmin
        }
      })
      .then(function (response) {
        if(response.status == 200){
          if(response.data.status == true){
            const syslist = response.data.result;
            let menuList = {};
            for (var i = 0; i < syslist.length; i++) {
              syslist[i].title = syslist[i].sysName;
              menuList[i] = syslist[i].sysName;
            };
            _this.$store.commit('updateSysList', { sysList: syslist })
            // _this.$store.commit('updateIndex', { curIndex: 0 })
            _this.menus = menuList;
            _this.fetchIrrWaterPlanList(); //获取灌水计划
            _this.fetchRotPlanList();  //获取轮灌计划
            _this.fetchRotList();  //获取轮灌
          }else{
            Tool.toast(_this, response.data.message);
          }
        }else{
          Tool.toast(_this, '获取系统信息失败');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    fetchIrrWaterPlanList(){
      var _this = this;
      if(_this.sysList.length == 0) return false;
      const sysId = _this.sysList[_this.curIndex].sysId;
      axios.get(URL.getPlanBySysId, {
        params: {
          sysId: sysId,
          // sysId: "0d681812-e500-4384-b38e-696e8284bcb0",
        }
      })
      .then(function (response) {
        if(response.status == 200){
          if(response.data.status == true){
            _this.$set(_this.sysList[_this.curIndex], 'irrWaterPlanList', response.data.result)
          }else{
            _this.$set(_this.sysList[_this.curIndex], 'irrWaterPlanList', [])
            // Tool.toast(_this, response.data.message);
          }
        }else{
          _this.$set(_this.sysList[_this.curIndex], 'irrWaterPlanList', [])
          Tool.toast(_this, response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    fetchRotList(){
      var _this = this;
      if(_this.sysList.length == 0) return false;
      const sysId = _this.sysList[_this.curIndex].sysId;
      axios.get(URL.getRotBySysId, {
        params: {
          sysId: sysId,
          // sysId: "0d681812-e500-4384-b38e-696e8284bcb0",
        }
      })
      .then(function (response) {
        _this.$set(_this.sysList[_this.curIndex], 'rotList', [])
        _this.$refs.children.$refs.scroller.finishPullToRefresh()
        if(response.status == 200){
          if(response.data.status == true){
            const rotList = response.data.result
            _this.$set(_this.sysList[_this.curIndex], 'rotList', rotList)
          }else{
            console.log(_this, response.data.message);
          }
        }else{
          Tool.toast(_this, response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
        _this.$set(_this.sysList[_this.curIndex], 'rotList', [])
        _this.$refs.children.$refs.scroller.finishPullToRefresh()
      });
    },
    fetchRotPlanList(){
      var _this = this;
      if(_this.sysList.length == 0) return false;
      const sysId = _this.sysList[_this.curIndex].sysId;
      axios.get(URL.getRotPlanBySysId, {
        params: {
          sysId: sysId,
          // sysId: "0d681812-e500-4384-b38e-696e8284bcb0",
        }
      })
      .then(function (response) {
        if(response.status == 200){
          if(response.data.status == true){
            const rotPlanList = response.data.result
            _this.$set(_this.sysList[_this.curIndex], 'rotIrrPlanList', rotPlanList)
            if(rotPlanList.length == 0) return false;
            for (var i = 0; i < rotPlanList.length; i++) {
              _this.fetchRotPlanExeList(rotPlanList, i);
            };
          }else{
            _this.$set(_this.sysList[_this.curIndex], 'rotIrrPlanList', [])
            // Tool.toast(_this, response.data.message);
          }
        }else{
          _this.$set(_this.sysList[_this.curIndex], 'rotIrrPlanList', [])
          Tool.toast(_this, response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    fetchRotPlanExeList(rotPlanList, i){
      var _this = this;
      axios.get(URL.getRotPlanById, {
        params: {
          id: rotPlanList[i].id,
        }
      })
      .then(function (response) {
        _this.$set(_this.sysList[_this.curIndex].rotIrrPlanList[i], 'rotPlanExeList', [])
        _this.$refs.children.$refs.scroller.finishPullToRefresh()
        if(response.status == 200){
          if(response.data.status == true){
            let rotPlanExeList = response.data.result
            if(typeof rotPlanExeList ==  typeof {}){
              rotPlanExeList = new Array(rotPlanExeList)
            }
            _this.$set(_this.sysList[_this.curIndex].rotIrrPlanList[i], 'rotPlanExeList', rotPlanExeList)
          }else{
            console.log(_this, response.data.message);
          }
        }else{
          Tool.toast(_this, response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
        _this.$set(_this.sysList[_this.curIndex].rotIrrPlanList[i], 'rotPlanExeList', [])
        _this.$refs.children.$refs.scroller.finishPullToRefresh()
      });
    },
  },
  mounted () {
    
  },
  watch: {
    curIndex(curVal, oldVal){
      this.$store.commit('updateIndex', { curIndex: +curVal })
      Tool.setCookie("curIndex", curVal, 1)
      this.fetchIrrWaterPlanList(); //获取灌水计划
      this.fetchRotPlanList();  //获取轮灌计划
      this.fetchRotList()  //获取轮灌信息
    },
  },
  computed: {
    ...mapState({
      route: state => state.route,
      curIndex: state => state.curIndex,
      sysList: state => state.sysList,
      path: state => state.route.path,
      isLoading: state => state.vux.isLoading,
      direction: state => state.vux.direction
    }),
    isShowSwiper () {
      return /setting/.test(this.path)? false : true
    },
    leftOptions () {
      return {
        showBack: this.path !== '/home'
      }
    },
    rightOptions () {
      return {
        showMore: /setting/.test(this.path)? false : true
      }
    },
    headerTransition () {
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    },
  },
  data () {
    return {
      userName: "",
      groupName: "",
      showMenu: false,
      drawerVisibility: false,
      url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
      menus: {},
      status: {
        pulldownStatus: 'default'
      },
    }
  }
}
</script>

<style lang="less">
@maincolor : #47dd1f;

.vux-popup-dialog{ z-index: 10000!important }
.popupTime .weui-cell_access{ padding: 10px 0!important;}
.popupTime .weui-label{ width: auto }
.popupTime .vux-cell-box:before{ border: none; }
.popupPeriod:before{ left:0!important }
.popupPeriod .vux-x-input{ padding: 10px 0; }
.popupPeriod .weui-cell__primary input{ text-align: right; }

[v-cloak] { display:none !important; }
body { background-color: #fbf9fe;width: 10rem!important; height:100%; margin: 0 auto; }
html, body { height: 100%; width: 100%; overflow-x: hidden; }
.curRotInfo .vux-no-group-title{ margin-top: 0;}
.progress:before{ border: none!important; }
#vux_view_box_body{ padding-bottom: 0!important; }
#vux_view_box_body>div{ margin-top: 46px!important}
.leftMenu { fill:#fff;position:relative;top:-8px;left:-3px; }
.bumpStatus{ overflow-y: visible!important; }
.bumpStatus .vux-swiper{ height: 1.8rem!important; background-color: #fff!important; overflow-y: visible!important; }
.rotStatus .vux-swiper{ height: 100%!important; background-color: #fff!important; overflow-y: visible!important;  overflow:hidden!important}
.irriSwiper, .planSwiper{ min-height: 100%;}
.irriSwiper .vux-swiper{ overflow-y: visible!important; }
.planSwiper .vux-swiper, .irriSwiper .vux-swiper{ height: 100%!important; min-height:100%; background-color: #fbf9fe!important;
overflow: scroll!important }
.vux-slider > .vux-swiper > .vux-swiper-item{ overflow-y: auto; height: auto!important }
.vux-swiper-desc{ height:40px!important; background-image: none!important; line-height: 40px!important; padding: 0!important; }
.vux-header-title{ margin: 0 65px!important; }
.drawer-left .weui-cells:before,
.drawer-left .weui-cells:after,
.drawer-left .weui-cell:before{ border: none!important; }
.center { text-align: center; padding-top: 20px; color: #fff; font-size: 18px;margin-bottom: 0.2rem; }
.center img { width: 100px; height: 100px; border-radius: 50%; border: 4px solid #ececec; }
.vux-bg-blur{ width: 120%!important; height:110%!important; }
.weui-form-preview__label{ height: 30px; text-align: center;}
.searchBox .weui-search-bar__label{ line-height: 2; }
.branchList .weui-cell.weui-check_label.hide{ display: none; }

.username, .groupname{ color: #fff; }
.groupname{ color: #fff; font-size: 0.4rem; }
.sideMenu .vux-label{ padding-left: 50px; }
.home .vux-label{ background: url(../assets/home.png) 30px center no-repeat;}
.plans .vux-label{ background: url(../assets/plans.png) 30px center no-repeat;}
.compile .vux-label{ background: url(../assets/compile.png) 30px center no-repeat;}
.setting .vux-label{ background: url(../assets/setting.png) 30px center no-repeat;}
.irrigate .vux-label{ background: url(../assets/irrigate.png) 26px center no-repeat;}
.exit{ position: absolute; left:0; bottom:0px; width:170px; margin: 15px; }
.personalInfo label.weui-label{ width: 3rem!important; text-align: left; }
.sex .weui-cell__bd{ position: relative; }
.sex .vux-label-desc{ position: absolute; right: 0.2rem; top: 0; font-size: 0.5rem;}
.savePanel .weui-cells{ width: 9rem!important; margin: 1rem auto; }

.router-view { width: 100%; height:auto; overflow:scroll!important;}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter { opacity: 0; transform: translate3d(-100%, 0, 0); }
.vux-pop-out-leave-active { opacity: 0; transform: translate3d(100%, 0, 0); }
.vux-pop-in-enter { opacity: 0; transform: translate3d(100%, 0, 0); }
.vux-pop-in-leave-active { opacity: 0; transform: translate3d(-100%, 0, 0); }
.menu-title { color: #888; }
.menuList .weui-actionsheet{ height: 8rem; overflow: hidden; overflow-y: auto;}
</style>
