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
          <cell class="home" title="主页" link="/home" @click.native="drawerVisibility = false">
          </cell>
          <cell class="water" title="灌水计划" link="/water" @click.native="drawerVisibility = false">
          </cell>
          <cell class="plans" title="轮灌计划" link="project/donate" @click.native="drawerVisibility = false">
          </cell>
          <cell class="compile" title="轮灌编制" link="project/donate" @click.native="drawerVisibility = false">
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
          <swiper class="sysSwiper" :list="sysList" v-model="curSystem" direction="horizontal" :min-moving-distance="20" height="40px" :show-dots="false"></swiper>
        </x-header>
        <div class="scrollPanel">
          <scroller lock-y :scrollbar-x=false>
            <div class="box1">
              <div class="box1-item">
                <icon name="pump" :scale="4" color="#47dd1f"></icon>
                <p>停电</p>
              </div>
              <div class="box1-item">
                <icon name="pump" :scale="4" color="#47dd1f"></icon>
                <p>运行</p>
              </div>
              <div class="box1-item">
                <icon name="battery" :scale="3.5" color="#47dd1f" style="padding-top:3px"></icon>
                <p>正常</p>
              </div>
              <div class="box1-item">
                <icon name="flow" :scale="4" color="#47dd1f"></icon>
                <p>1.25m³/s</p>
              </div>
              <div class="box1-item">
                <icon name="pressure" :scale="4" color="#47dd1f"></icon>
                <p>110kPa</p>
              </div>
              <div class="box1-item">
                <icon name="voltage" :scale="4" color="#47dd1f"></icon>
                <p>20V</p>
              </div>
              <div class="box1-item">
                <icon name="current" :scale="4" color="#47dd1f"></icon>
                <p>20A</p>
              </div>
              <div class="box1-item">
                <icon name="power" :scale="4" color="#47dd1f"></icon>
                <p>300W</p>
              </div>
              <div class="box1-item">
                <icon name="energy" :scale="4" color="#47dd1f"></icon>
                <p>100kJ</p>
              </div>
              <div class="box1-item">
                <icon name="gateway" :scale="4" color="#47dd1f"></icon>
                <p>在线</p>
              </div>
              <div class="box1-item">
                <icon name="signal3" :scale="4" color="#47dd1f"></icon>
                <p>良好</p>
              </div>
            </div>
          </scroller>
        </div>
        <group>
          <icon class="running" name="running" :scale="3.5" color="#47dd1f"></icon>
          <grid class="sysInfo" :rows="5">
            <grid-item class="statusItem" label1="轮灌编号">
              <icon name="num" :scale="3.5" color="#47dd1f"></icon>
              <p>101001</p>
            </grid-item>
            <grid-item class="statusItem" label1="开始时间">
              <icon name="startTime" :scale="3" color="#47dd1f"></icon>
              <p>7-24 18:01</p>
            </grid-item>
            <grid-item class="statusItem" label1="结束时间">
              <icon name="endTime" :scale="3.3" color="#47dd1f"></icon>
              <p>7-24 18:01</p>
            </grid-item>
            <grid-item class="statusItem" label1="灌水量">
              <icon name="volume" :scale="4" color="#47dd1f"></icon>
              <p>500m³</p>
            </grid-item>
            <grid-item class="statusItem" label1="灌水时长">
              <icon name="irriTime" :scale="3.5" color="#47dd1f"></icon>
              <p>5h</p>
            </grid-item>
          </grid>
          <div class="irriItem">
            <div class="name">
              <span>
                <icon class="triangle1" name="triangle1" :scale="2" color="#ec7777"></icon>
                <icon class="triangle2" name="triangle2" :scale="2" color="#47dd1f"></icon>
              </span>
            </div>
            <x-table class="valveList">
                <tr>
                  <td><icon name="name" :scale="3" color="#47dd1f"></icon></td>
                  <td>阀1120</td>
                </tr>
                <tr>
                  <td><icon name="flow" :scale="3" color="#47dd1f"></icon></td>
                  <td>1.25m³/s</td>
                </tr>
                <tr>
                  <td><icon name="pressure" :scale="3" color="#47dd1f"></icon></td>
                  <td>110kPa</td>
                </tr>
                <tr>
                  <td><icon name="voltage" :scale="3" color="#47dd1f"></icon></td>
                  <td>20V</td>
                </tr>
                <tr>
                  <td><icon name="time" :scale="3" color="#47dd1f"></icon></td>
                  <td>7-24 14:15:16</td>
                </tr>
            </x-table>
          </div>
          <div class="irriItem">
            <div class="name">
              <span>
                <icon class="triangle1" name="triangle1" :scale="2" color="#ec7777"></icon>
                <icon class="triangle2" name="triangle2" :scale="2" color="#47dd1f"></icon>
              </span>
            </div>
            <x-table class="valveList">
                <tr>
                  <td><icon name="name" :scale="3" color="#47dd1f"></icon></td>
                  <td>阀2301</td>
                </tr>
                <tr>
                  <td><icon name="flow" :scale="3" color="#47dd1f"></icon></td>
                  <td>1.25m³/s</td>
                </tr>
                <tr>
                  <td><icon name="pressure" :scale="3" color="#47dd1f"></icon></td>
                  <td>110kPa</td>
                </tr>
                <tr>
                  <td><icon name="voltage" :scale="3" color="#47dd1f"></icon></td>
                  <td>20V</td>
                </tr>
                <tr>
                  <td><icon name="time" :scale="3" color="#47dd1f"></icon></td>
                  <td>7-24 14:15:16</td>
                </tr>
            </x-table>
          </div>
        </group>
        <group>
          <icon class="running" name="waiting" :scale="3.5" color="#47dd1f"></icon>
          <grid class="sysInfo" :rows="5">
            <grid-item class="statusItem" label1="轮灌编号">
              <icon name="num" :scale="3.5" color="#47dd1f"></icon>
              <p>101001</p>
            </grid-item>
            <grid-item class="statusItem" label1="开始时间">
              <icon name="startTime" :scale="3" color="#47dd1f"></icon>
              <p>7-24 18:01</p>
            </grid-item>
            <grid-item class="statusItem" label1="结束时间">
              <icon name="endTime" :scale="3.3" color="#47dd1f"></icon>
              <p>7-24 18:01</p>
            </grid-item>
            <grid-item class="statusItem" label1="灌水量">
              <icon name="volume" :scale="4" color="#47dd1f"></icon>
              <p>500m³</p>
            </grid-item>
            <grid-item class="statusItem" label1="灌水时长">
              <icon name="irriTime" :scale="3.5" color="#47dd1f"></icon>
              <p>5h</p>
            </grid-item>
          </grid>
          <x-input placeholder="请输入支管名称" class="weui-vcode addBranch">
            <x-button slot="right" type="primary" mini>添加支管</x-button>
          </x-input>
          <div class="irriItem">
            <div class="name">
              <span>
                <icon class="triangle1" name="triangle1" :scale="1.5" color="#ec7777"></icon>
                <icon class="triangle2" name="triangle2" :scale="1.5" color="#47dd1f"></icon>
              </span>
            </div>
            <x-table class="valveList">
                <tr>
                  <td><icon name="name" :scale="3" color="#47dd1f"></icon></td>
                  <td>阀1021</td>
                </tr>
                <tr>
                  <td><icon name="flow" :scale="3" color="#47dd1f"></icon></td>
                  <td>1.25m³/s</td>
                </tr>
                <tr>
                  <td><icon name="pressure" :scale="3" color="#47dd1f"></icon></td>
                  <td>110kPa</td>
                </tr>
                <tr>
                  <td><icon name="voltage" :scale="3" color="#47dd1f"></icon></td>
                  <td>20V</td>
                </tr>
                <tr>
                  <td><icon name="time" :scale="3" color="#47dd1f"></icon></td>
                  <td>7-24 14:15:16</td>
                </tr>
            </x-table>
          </div>
        </group>
        
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
      this.curSystem = +index
    },
    logout(){
      this.$router.push("/");
    }
  },
  mounted () {
    
  },
  watch: {
    curSystem(curVal, oldVal){
      console.log(curVal);
    },
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      isLoading: state => state.vux.isLoading,
      direction: state => state.vux.direction
    }),
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
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';

body { background-color: #fbf9fe; }
html, body { height: 100%; width: 100%; overflow-x: hidden; }
.leftMenu { fill:#fff;position:relative;top:-8px;left:-3px; }
.vux-swiper-desc{ height:40px!important; background-image: none!important; line-height: 40px!important; padding: 0!important; }
.vux-header-title{ margin: 0 60px!important; }
.drawer-left .weui-cells:before,
.drawer-left .weui-cells:after,
.weui-cell:before{ border: none!important; }
.center { text-align: center; padding-top: 20px; color: #fff; font-size: 18px; }
.center img { width: 100px; height: 100px; border-radius: 50%; border: 4px solid #ececec; }
.vux-bg-blur{ width: 120%!important; height:110%!important; }
.weui-form-preview__label{ height: 30px; text-align: center;}

.username{ color: #fff; }
.vux-label{ padding-left: 50px; }
.home .vux-label{ background: url(../assets/home.png) 30px center no-repeat;}
.service .vux-label{ background: url(../assets/service.png) 30px center no-repeat;}
.water .vux-label{ background: url(../assets/water.png) 30px center no-repeat;}
.plans .vux-label{ background: url(../assets/plans.png) 30px center no-repeat;}
.compile .vux-label{ background: url(../assets/compile.png) 30px center no-repeat;}
.setting .vux-label{ background: url(../assets/setting.png) 30px center no-repeat;}
.exit{ position: absolute; left:0; bottom:0px; width:170px; margin: 15px; }
.addBranch{ padding: 7px 15px!important; }
.irriItem{ position:relative; height:175px; text-align:left; overflow: hidden; }
.irriItem:nth-child(odd){  }
.irriItem:after, .title:after, .addBranch:after {content: " ";position: absolute;left: 0;bottom: 0;right: 0;height: 1px;border-bottom: 1px solid #D9D9D9;color: #D9D9D9;-webkit-transform-origin: 0 0;-ms-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleY(0.5);-ms-transform: scaleY(0.5);transform: scaleY(0.5);
}
.irriItem>div{ float:left; vertical-align:middle;text-align:center;height:100%;}
.irriItem>div.name{ position:relative;width:30%;line-height:175px;text-align:center;vertical-align:middle; }
.irriItem>div.name>span{ display:inline-block; vertical-align:middle }
.irriItem>div.curIrriList{ border-left: 1px solid #D9D9D9; }
.irriItem>div.name .svg-icon{ display: block!important;}
.triangle2{ margin: -1px 0;}
.statusItem{ display:table-cell; height: 100px;}
.statusItem svg{ height:35px; }
.valveList{ float: left; width: 70%!important; line-height: 2.1!important;}
.valveList:before{ content: " ";position: absolute;left: 0;bottom: 0;width: 1px;height:100%;border-left: 1px solid #D9D9D9;color: #D9D9D9;-webkit-transform-origin: 0 0;-ms-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleX(0.5);-ms-transform: scaleX(0.5);transform: scaleX(0.5) }
.valveList:after{ border-top: none!important;}
.valveList svg{ display: inline-block; vertical-align:middle; }
.valveList td:nth-child(1){ width: 50px; }
.valveList td:nth-child(2){ text-align: left; padding-left: 10px; }

.running{ padding-top: 10px; }
.sysInfo p{ font-size: 13px; color: #333; padding-top: 5px;}

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

.scrollPanel{ overflow: hidden;overflow-x:auto;}
.box1 { position: relative; width:660px; height:80px;}
.box1-item{ position:relative; width: 60px; height: 70px; display: inline-block; float: left; text-align: center; padding-top: 10px; }
.box1-item>p{ font-size: 13px; }
.box1-item:before { content: " ";position: absolute;left: 0;bottom: 0;width:100%;height:1px;border-bottom: 1px solid #D9D9D9;color: #D9D9D9;-webkit-transform-origin: 0 0;-ms-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleY(0.5);-ms-transform: scaleY(0.5);transform: scaleY(0.5) }
.box1-item:after { content: " ";position: absolute;right: 0;bottom: 0;width: 1px;height:100%;border-right: 1px solid #D9D9D9;color: #D9D9D9;-webkit-transform-origin: 0 0;-ms-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleX(0.5);-ms-transform: scaleX(0.5);transform: scaleX(0.5) }
.box1-item:first-child { margin-left: 0;  }
.box1-item:first-child:after {  }
</style>
