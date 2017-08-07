<template>
  <div>
    <div class="scrollPanel">
      <swiper class="bumpStatus" direction="horizontal" :min-moving-distance="20" :show-dots="false">
        <swiper-item>
          <grid class="sysInfo" :rows="5">
            <grid-item class="statusItem" label1="水泵名称">
              <icon name="name" :scale="3.5" color="#47dd1f"></icon>
              <p>水泵1</p>
            </grid-item>
            <grid-item class="statusItem" label1="在线状态">
              <icon name="outage" :scale="3" color="#E60012"></icon>
              <p>停电</p>
            </grid-item>
            <grid-item class="statusItem" label1="运行状态">
              <icon name="pump" :scale="4" color="#E60012"></icon>
              <p>调试</p>
            </grid-item>
            <grid-item class="statusItem" label1="流量">
              <icon name="flow" :scale="4" color="#47dd1f"></icon>
              <p>1.25m³/s</p>
            </grid-item>
            <grid-item class="statusItem" label1="压力">
              <icon name="pressure" :scale="4" color="#47dd1f"></icon>
              <p>110kPa</p>
            </grid-item>
          </grid>
        </swiper-item>
        <swiper-item>
          <grid class="sysInfo" :rows="5">
            <grid-item class="statusItem" label1="水泵名称">
              <icon name="name" :scale="3.5" color="#47dd1f"></icon>
              <p>水泵2</p>
            </grid-item>
            <grid-item class="statusItem" label1="在线状态">
              <icon name="poweron" :scale="3.5" color="#47dd1f"></icon>
              <p>在线</p>
            </grid-item>
            <grid-item class="statusItem" label1="运行状态">
              <icon name="pump" :scale="4" color="#47dd1f"></icon>
              <p>运行</p>
            </grid-item>
            <grid-item class="statusItem" label1="流量">
              <icon name="flow" :scale="4" color="#47dd1f"></icon>
              <p>1.25m³/s</p>
            </grid-item>
            <grid-item class="statusItem" label1="压力">
              <icon name="pressure" :scale="4" color="#47dd1f"></icon>
              <p>110kPa</p>
            </grid-item>
          </grid>
        </swiper-item>
        <swiper-item>
          <grid class="sysInfo" :rows="5">
            <grid-item class="statusItem" label1="网关在线状态">
              <icon name="gateway" :scale="4" color="#47dd1f"></icon>
              <p>在线</p>
            </grid-item>
            <grid-item class="statusItem" label1="网关电池电压">
              <icon name="battery" :scale="3.5" color="#47dd1f" style="padding-top:3px"></icon>
              <p>3.2V</p>
            </grid-item>
            <grid-item class="statusItem" label1="网关通讯质量">
              <icon name="signal3" :scale="4" color="#47dd1f"></icon>
              <p>良好</p>
            </grid-item>
          </grid>
        </swiper-item>
      </swiper>
    </div>
    <!-- <div class="scrollPanel">
      <scroller lock-y :scrollbar-x="false">
        <div class="box1">
          <div class="box1-item">
            <icon name="outage" :scale="3.5" color="#47dd1f" style="padding-top:5px"></icon>
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
            <p>3.2V</p>
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
    </div> -->
    <group>
      <x-table class="irriTable" :cell-bordered="false" style="background-color:#fff;">
        <thead>
          <tr>
            <th colspan="6">当前轮灌</th>
          </tr>
          <tr>
            <th colspan="6">
              <grid class="sysInfo" :rows="5">
                <grid-item class="statusItem" label1="轮灌名称">
                  <icon name="name" :scale="3.5" color="#47dd1f"></icon>
                  <p>轮灌1</p>
                </grid-item>
                <grid-item class="statusItem" label1="开始时间">
                  <icon name="startTime" :scale="3" color="#47dd1f"></icon>
                  <p>7-24 18:01</p>
                </grid-item>
                <grid-item class="statusItem" label1="已灌时间">
                  <icon name="time" :scale="3.3" color="#47dd1f"></icon>
                  <p>39分钟</p>
                </grid-item>
                <grid-item class="statusItem" label1="已灌水量">
                  <icon name="volume" :scale="4" color="#47dd1f"></icon>
                  <p>500m³</p>
                </grid-item>
                <grid-item class="statusItem" label1="灌水时长">
                  <icon name="irriTime" :scale="3.5" color="#47dd1f"></icon>
                  <p>5h</p>
                </grid-item>
              </grid>
            </th>
          </tr>
          <tr>
            <th>序号</th>
            <th>名称</th>
            <th>流量</th>
            <th>压力</th>
            <th>电池电压</th>
            <th>采集时间</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>阀门01</td>
            <td>1.25m³/s</td>
            <td>133kPa</td>
            <td>3.6V</td>
            <td>7-29 13:21</td>
          </tr>
          <tr>
            <td>2</td>
            <td>阀门02</td>
            <td>1.05m³/s</td>
            <td>120kPa</td>
            <td>4.1V</td>
            <td>7-29 15:33</td>
          </tr>
          <tr>
            <td>3</td>
            <td>阀门03</td>
            <td>1.05m³/s</td>
            <td>120kPa</td>
            <td>4.1V</td>
            <td>7-29 15:33</td>
          </tr>
          <tr>
            <td>4</td>
            <td>阀门04</td>
            <td>1.05m³/s</td>
            <td>120kPa</td>
            <td>4.1V</td>
            <td>7-29 15:33</td>
          </tr>
          <tr>
            <td>5</td>
            <td>阀门05</td>
            <td>1.05m³/s</td>
            <td>120kPa</td>
            <td>4.1V</td>
            <td>7-29 15:33</td>
          </tr>
          <tr>
            <td>6</td>
            <td>阀门06</td>
            <td>1.05m³/s</td>
            <td>120kPa</td>
            <td>4.1V</td>
            <td>7-29 15:33</td>
          </tr>
          <tr>
            <td>7</td>
            <td>阀门07</td>
            <td>1.05m³/s</td>
            <td>120kPa</td>
            <td>4.1V</td>
            <td>7-29 15:33</td>
          </tr>
          <tr>
            <td>8</td>
            <td>阀门08</td>
            <td>1.05m³/s</td>
            <td>120kPa</td>
            <td>4.1V</td>
            <td>7-29 15:33</td>
          </tr>
          <tr>
            <td>9</td>
            <td>阀门09</td>
            <td>1.05m³/s</td>
            <td>120kPa</td>
            <td>4.1V</td>
            <td>7-29 15:33</td>
          </tr>
          <tr>
            <td>10</td>
            <td>阀门10</td>
            <td>1.05m³/s</td>
            <td>120kPa</td>
            <td>4.1V</td>
            <td>7-29 15:33</td>
          </tr>
        </tbody>
      </x-table>
    </group>
    <group>
      <icon class="running" name="running" :scale="3.5" color="#47dd1f"></icon>
      <grid class="sysInfo" :rows="5">
        <grid-item class="statusItem" label1="轮灌名称">
          <icon name="name" :scale="3.5" color="#47dd1f"></icon>
          <p>轮灌1</p>
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
              <td><icon name="battery" :scale="2.5" color="#47dd1f"></icon></td>
              <td>3.2V</td>
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
              <td><icon name="battery" :scale="2.5" color="#47dd1f"></icon></td>
              <td>3.2V</td>
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
        <grid-item class="statusItem" label1="轮灌名称">
          <icon name="name" :scale="3.5" color="#47dd1f"></icon>
          <p>轮灌2</p>
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
            <icon class="triangle1" name="triangle1" :scale="2" color="#ec7777"></icon>
            <icon class="triangle2" name="triangle2" :scale="2" color="#47dd1f"></icon>
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
              <td><icon name="battery" :scale="2.5" color="#47dd1f"></icon></td>
              <td>3.2V</td>
            </tr>
            <tr>
              <td><icon name="time" :scale="3" color="#47dd1f"></icon></td>
              <td>7-24 14:15:16</td>
            </tr>
        </x-table>
      </div>
    </group>
  </div>
</template>

<script>
  import { Swiper, SwiperItem, Group, Grid, GridItem, XInput, XButton, XTable, Scroller } from 'vux'
  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
      Swiper,
      SwiperItem,
      Group,
      Grid,
      GridItem,
      XInput,
      XButton,
      XTable,
      Scroller,
    },
    methods: {
      
    },
    mounted () {
      
    },
    watch: {
      
    },
    computed: {
      
    },
    data () {
      return {
        
      }
    }
  }
</script>

<style scoped>
  .addBranch{ padding: 7px 15px!important; }
  .addBranch:before{ border-top: none; }
  .irriTable{ font-size: 0.4rem;}
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
  .statusItem{ line-height: 1; padding: 0.2rem 0 0!important; }
  .statusItem svg{ height:35px; }
  .valveList{ float: left; width: 70%!important; line-height: 2.1!important;}
  .valveList:before{ content: " ";position: absolute;left: 0;bottom: 0;width: 1px;height:100%;border-left: 1px solid #D9D9D9;color: #D9D9D9;-webkit-transform-origin: 0 0;-ms-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleX(0.5);-ms-transform: scaleX(0.5);transform: scaleX(0.5) }
  .valveList:after{ border-top: none!important;}
  .valveList svg{ display: inline-block; vertical-align:middle; }
  .valveList td:nth-child(1){ width: 50px; }
  .valveList td:nth-child(2){ text-align: left; padding-left: 10px; }

  .running{ padding-top: 10px; }
  .sysInfo p{ font-size: 0.4rem; color: #333; padding-bottom: 5px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap; line-height: 1; }
  .scrollPanel{ overflow: hidden;overflow-x:auto;}
  .box1 { position: relative; width:20.63rem; height:80px;}
  .box1:before{ content: " ";position: absolute;left: 0;bottom: 0;width:1px;height:100%;border-left: 1px solid #D9D9D9;color: #D9D9D9;-webkit-transform-origin: 0 0;-ms-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleX(0.5);-ms-transform: scaleX(0.5);transform: scaleX(0.5) }
  .box1-item{ position:relative; width: 1.8754rem; height: 70px; display: inline-block; float: left; text-align: center; padding-top: 10px; }
  .box1-item>p{ font-size: 13px; }
  .box1-item:before { content: " ";position: absolute;left: 0;bottom: 0;width:100%;height:1px;border-bottom: 1px solid #D9D9D9;color: #D9D9D9;-webkit-transform-origin: 0 0;-ms-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleY(0.5);-ms-transform: scaleY(0.5);transform: scaleY(0.5) }
  .box1-item:after { content: " ";position: absolute;right: 0;bottom: 0;width: 1px;height:100%;border-right: 1px solid #D9D9D9;color: #D9D9D9;-webkit-transform-origin: 0 0;-ms-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleX(0.5);-ms-transform: scaleX(0.5);transform: scaleX(0.5) }
  .box1-item:first-child { margin-left: 0;  }
  .box1-item:first-child:after {  }
</style>