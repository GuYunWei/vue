<template>
  <div style="height:100%;">
    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenu" @on-click-menu="changeSystem"></actionsheet>
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
          <blur :blur-amount=10 :url="url">
            <p class="center"><img :src="url"></p>
            <p class="username">张三</p>
          </blur>
        </div>
        <group>
          <cell class="home" title="主页" link="/home" @click.native="drawerVisibility = false">
          </cell>
          <cell class="plans" title="轮灌计划" link="/plans" @click.native="drawerVisibility = false">
          </cell>
          <cell class="compile" title="轮灌编制" link="/compile" @click.native="drawerVisibility = false">
          </cell>
          <cell class="setting" title="设置" link="/setting" @click.native="drawerVisibility = false">
          </cell>
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
          <router-view class="router-view"></router-view>
        </transition>
            
      </view-box>
    </drawer>
  </div>
</template>

<script>
import { Group, Grid, GridItem, Cell, CellFormPreview, Drawer, Actionsheet, ViewBox, XInput, XButton, XHeader, XTable, Loading, TransferDom, Swiper, Blur, Scroller } from 'vux'
import { mapState, mapActions } from 'vuex'

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
  methods: {
    onClickMore () {
      this.showMenu = true
    },
    changeSystem (index) {
      this.$store.commit('updateIndex', { curIndex: +index })
    },
    logout(){
      this.$router.push("/");
    }
  },
  mounted () {
    
  },
  watch: {
    curIndex(curVal, oldVal){
      console.log(curVal);
    },
  },
  computed: {
    ...mapState({
      route: state => state.route,
      curIndex: state => state.curIndex,
      path: state => state.route.path,
      isLoading: state => state.vux.isLoading,
      direction: state => state.vux.direction
    }),
    isShowSwiper () {
      return /setting/.test(this.path)? false : true
    },
    leftOptions () {
      return {
        showBack: this.route.path !== '/home'
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
      showMenu: false,
      drawerVisibility: false,
      url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
      sysList: [{
        title: '当前系统1'
      }, {
        title: '当前系统2'
      }, {
        title: '当前系统3'
      }],
      curIrriList: [{
        label: '轮灌名称',
        value: '轮灌组1'
      }, {
        label: '轮灌编号',
        value: '1000101'
      }, {
        label: '开始时间',
        value: '7-21 11:00'
      }],
      menus: {
        '0': '当前系统1',
        '1': '当前系统2',
        '2': '当前系统3'
      },
    }
  }
}
</script>

<style lang="less">
@maincolor : #47dd1f;

body { background-color: #fbf9fe;width: 10rem!important; height:100%; margin: 0 auto; }
html, body { height: 100%; width: 100%; overflow-x: hidden; }
.leftMenu { fill:#fff;position:relative;top:-8px;left:-3px; }
.planSwiper .vux-swiper, .irriSwiper .vux-swiper{ height: 100%!important; }
.planSwiper .vux-swiper-item{ overflow-y: auto; }
.vux-swiper-desc{ height:40px!important; background-image: none!important; line-height: 40px!important; padding: 0!important; }
.vux-header-title{ margin: 0 60px!important; }
.drawer-left .weui-cells:before,
.drawer-left .weui-cells:after,
.drawer-left .weui-cell:before{ border: none!important; }
.center { text-align: center; padding-top: 20px; color: #fff; font-size: 18px; }
.center img { width: 100px; height: 100px; border-radius: 50%; border: 4px solid #ececec; }
.vux-bg-blur{ width: 120%!important; height:110%!important; }
.weui-form-preview__label{ height: 30px; text-align: center;}

.username{ color: #fff; }
.sideMenu .vux-label{ padding-left: 50px; }
.home .vux-label{ background: url(../assets/home.png) 30px center no-repeat;}
.plans .vux-label{ background: url(../assets/plans.png) 30px center no-repeat;}
.compile .vux-label{ background: url(../assets/compile.png) 30px center no-repeat;}
.setting .vux-label{ background: url(../assets/setting.png) 30px center no-repeat;}
.exit{ position: absolute; left:0; bottom:0px; width:170px; margin: 15px; }

.router-view { width: 100%; }
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
</style>
