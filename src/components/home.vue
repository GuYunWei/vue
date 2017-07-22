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
      <div slot="drawer">
        <div>
          <blur :blur-amount=10 :url="url">
            <p class="center"><img :src="url"></p>
            <p class="username">张三</p>
          </blur>
        </div>
        <group>
          <cell class="home" title="主页" link="/demo" @click.native="drawerVisibility = false">
          </cell>
          <cell class="service" title="客服" link="project/donate" @click.native="drawerVisibility = false">
          </cell>
          <cell class="setup" title="设置" link="/setup" @click.native="drawerVisibility = false">
          </cell>
        </group>
        <group class="exit">
          <x-button type="warn">退出登录</x-button>
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
          <swiper class="sysSwiper" :list="sysList" v-model="curSystem" direction="horizontal" :min-moving-distance="20" height="40px"></swiper>
        </x-header>

        <grid :rows="8">
          <!-- <grid-item label="test" v-for="i in 8">
            <img slot="icon" src="../assets/stop.gif">
          </grid-item> -->
          <grid-item label="水泵">
            <img slot="icon" src="../assets/stop.gif">
          </grid-item>
          <grid-item label="网关">
            <img slot="icon" src="../assets/8.png">
          </grid-item>
          <grid-item label="通讯">
            <img slot="icon" src="../assets/8.png">
          </grid-item>
          <grid-item label="电池">
            <img slot="icon" src="../assets/8.png">
          </grid-item>
        </grid>
        <group>
          <cell title="当前轮灌组"></cell>
          <cell-form-preview :list="curIrriList"></cell-form-preview>
        </group>
        <group>
          <cell title="下一轮灌组"></cell>
          <x-input placeholder="请输入支管名称" class="weui-vcode">
            <x-button slot="right" type="primary" mini>添加支管</x-button>
          </x-input>
          <cell-form-preview :list="curIrriList"></cell-form-preview>
        </group>

        <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
          <router-view class="router-view"></router-view>
        </transition>
            
        <tabbar class="vux-demo-tabbar" icon-class="vux-center" v-show="!isTabbarDemo" slot="bottom">
          <tabbar-item :link="{path:'/home'}" :selected="route.path === '/home'">
            <span class="demo-icon-22" slot="icon">&#xe637;</span>
            <span slot="label">主页</span>
          </tabbar-item>
          <tabbar-item :link="{path:'/service'}" :selected="route.path === '/service'">
            <span class="demo-icon-22" slot="icon">&#xe633;</span>
            <span slot="label">客服</span>
          </tabbar-item>
          <tabbar-item :link="{path:'/setting'}" :selected="route.path === '/setting'">
            <span class="demo-icon-22" slot="icon">&#xe630;</span>
            <span slot="label">设置</span>
          </tabbar-item>
        </tabbar>
      </view-box>
    </drawer>
  </div>
</template>

<script>
import { Radio, Group, Grid, GridItem, Cell, CellFormPreview, Badge, Drawer, Actionsheet, ButtonTab, ButtonTabItem, ViewBox, XInput, XButton, XHeader, Tabbar, TabbarItem, Loading, TransferDom, Swiper, Flexbox, FlexboxItem, Blur } from 'vux'
import { mapState, mapActions } from 'vuex'
import 'vue-awesome/icons/flag'

export default {
  directives: {
    TransferDom
  },
  components: {
    Radio,
    Group,
    Grid,
    GridItem,
    Cell,
    CellFormPreview,
    Badge,
    Drawer,
    ButtonTab,
    ButtonTabItem,
    ViewBox,
    XInput,
    XButton,
    XHeader,
    Tabbar,
    TabbarItem,
    Loading,
    Swiper,
    Flexbox,
    FlexboxItem,
    Blur,
    Actionsheet
  },
  methods: {
    onClickMore () {
      this.showMenu = true
    },
    changeSystem (index) {
      this.curSystem = +index
    },
    ...mapActions([
      'updateDemoPosition'
    ])
  },
  mounted () {
    this.handler = () => {
      if (this.path === '/demo') {
        this.box = document.querySelector('#demo_list_box')
        this.updateDemoPosition(this.box.scrollTop)
      }
    }
  },
  beforeDestroy () {
    this.box && this.box.removeEventListener('scroll', this.handler, false)
  },
  watch: {
    curSystem(curVal, oldVal){
      console.log(curVal);
    },
    path (path) {
      if (path === '/component/demo') {
        this.$router.replace('/demo')
        return
      }
      if (path === '/demo') {
        setTimeout(() => {
          this.box = document.querySelector('#demo_list_box')
          if (this.box) {
            this.box.removeEventListener('scroll', this.handler, false)
            this.box.addEventListener('scroll', this.handler, false)
          }
        }, 1000)
      } else {
        this.box && this.box.removeEventListener('scroll', this.handler, false)
      }
    }
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      deviceready: state => state.app.deviceready,
      demoTop: state => state.vux.demoScrollTop,
      isLoading: state => state.vux.isLoading,
      direction: state => state.vux.direction
    }),
    isShowBar () {
      if (/component/.test(this.path)) {
        return true
      }
      return false
    },
    leftOptions () {
      return {
        showBack: this.route.path !== '/home'
      }
    },
    rightOptions () {
      return {
        showMore: true
      }
    },
    headerTransition () {
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    },
    componentName () {
      if (this.route.path) {
        const parts = this.route.path.split('/')
        if (/component/.test(this.route.path) && parts[2]) return parts[2]
      }
    },
    isDemo () {
      return /component|demo/.test(this.route.path)
    },
    isTabbarDemo () {
      return /tabbar/.test(this.route.path)
    },
    // title () {
    //   if (this.route.path === '/') return 'Home'
    //   if (this.route.path === '/project/donate') return 'Donate'
    //   if (this.route.path === '/demo') return 'Demo list'
    //   return this.componentName ? `Demo/${this.componentName}` : 'Demo/~~'
    // }
  },
  data () {
    return {
      showMenu: false,
      curSystem: 0,
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
        value: '2017-7-21 11:00'
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
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';

body { background-color: #fbf9fe; }
html, body { height: 100%; width: 100%; overflow-x: hidden; }
.leftMenu { fill:#fff;position:relative;top:-8px;left:-3px; }
.vux-swiper-desc{ line-height: 40px!important; }
.vux-header-title{ margin: 0 60px!important; }
.drawer-left .weui-cells:before,
.drawer-left .weui-cells:after,
.drawer-left .weui-cell:before{ border: none!important; }
.center { text-align: center; padding-top: 20px; color: #fff; font-size: 18px; }
.center img { width: 100px; height: 100px; border-radius: 50%; border: 4px solid #ececec; }
.vux-bg-blur{ width: 120%!important; height:110%!important; }
.username{ color: #fff; }
.home .vux-label{ background: url(../assets/home.png) 30px center no-repeat;}
.service .vux-label{ background: url(../assets/service.png) 30px center no-repeat;}
.setup .vux-label{ background: url(../assets/setup.png) 30px center no-repeat;}
.exit{ position: absolute; left:0; bottom:0px; width:170px; margin: 15px; }

.demo-icon-22 { font-family: 'vux-demo'; font-size: 22px; color: #888; }
.weui-tabbar.vux-demo-tabbar { background-color: #fff; }
.vux-demo-tabbar .weui-bar__item_on .demo-icon-22 { color: #F70968; }
.vux-demo-tabbar .weui-tabbar_item.weui-bar__item_on .vux-demo-tabbar-icon-home { color: rgb(53, 73, 94); }
.demo-icon-22:before { content: attr(icon); }
.vux-demo-tabbar-component { background-color: #F70968; color: #fff; border-radius: 7px; padding: 0 4px; line-height: 14px; }
.weui-tabbar__icon + .weui-tabbar__label { margin-top: 0 !important; }
.vux-demo-header-box { z-index: 100; position: absolute; width: 100%; left: 0; top: 0; }
@font-face {
  font-family: 'vux-demo';  /* project id 70323 */
  src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot');
  src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot?#iefix') format('embedded-opentype'),
  url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.woff') format('woff'),
  url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.ttf') format('truetype'),
  url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.svg#iconfont') format('svg');
}
.demo-icon { font-family: 'vux-demo'; font-size: 20px; color: #04BE02; }
.demo-icon-big { font-size: 28px; }
.demo-icon:before { content: attr(icon); }
.router-view { width: 100%; top: 46px; }
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
