<template>
  <div>
    <div class="scrollPanel">
      <scroller lock-y :scrollbar-x=false>
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
  </div>
</template>

<script>
  import { Group, Grid, GridItem, XInput, XButton, XTable, Scroller } from 'vux'
  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
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
  .statusItem{ display:table-cell; height: 2.4rem; padding: 0.2rem 0!important; }
  .statusItem svg{ height:35px; }
  .valveList{ float: left; width: 70%!important; line-height: 2.1!important;}
  .valveList:before{ content: " ";position: absolute;left: 0;bottom: 0;width: 1px;height:100%;border-left: 1px solid #D9D9D9;color: #D9D9D9;-webkit-transform-origin: 0 0;-ms-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleX(0.5);-ms-transform: scaleX(0.5);transform: scaleX(0.5) }
  .valveList:after{ border-top: none!important;}
  .valveList svg{ display: inline-block; vertical-align:middle; }
  .valveList td:nth-child(1){ width: 50px; }
  .valveList td:nth-child(2){ text-align: left; padding-left: 10px; }

  .running{ padding-top: 10px; }
  .sysInfo p{ font-size: 0.35rem; color: #333; padding-top: 5px;}
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