<template>
  <scroller :on-refresh="refresh" ref="scroller">
    <div>
      <div class="scrollPanel">
        <swiper class="bumpStatus" direction="horizontal" :min-moving-distance="20" :show-dots="false"  :threshold="100">
          <swiper-item v-for="item in PWInfo" :key="item">
            <grid class="sysInfo" :rows="5">
              <grid-item class="statusItem" label1="水泵名称" @click.native="showMsg">
                <img src="../assets/name.png" width="30" alt="">
                <p class="pwName">{{item.pwName}}</p>
              </grid-item>
              <grid-item class="statusItem" label1="在线状态">
                <span v-if="item.online == 1">
                  <img src="../assets/dropElec.png" width="30" alt="">
                  <p>掉电</p>
                </span>
                <span v-if="item.online == 2">
                  <img src="../assets/onlineElec.png" width="30" alt="">
                  <p>在线</p>
                </span>
                <span v-if="item.online == 3">
                  <img src="../assets/outageElec.png" width="30" alt="">
                  <p>停电</p>
                </span>
                <span v-if="item.online == 4">
                  <img src="../assets/offlineElec.png" width="30" alt="">
                  <p>离线</p>
                </span>
              </grid-item>
              <grid-item class="statusItem" label1="运行状态">
                <span v-if="item.isRun == true">
                  <img src="../assets/bumpStart.png" width="30" alt="">
                  <p>运行</p>
                </span>
                <span v-if="item.isRun == false">
                  <img src="../assets/bumpStop.png" width="30" alt="">
                  <p>停止</p>
                </span>
              </grid-item>
              <grid-item class="statusItem" label1="流量">
                <img src="../assets/flow.png" width="30" alt="">
                <p>{{item.realData[0] < 0 ? 0 : item.realData[0].toFixed(2)}}m³/h</p>
              </grid-item>
              <grid-item class="statusItem" label1="压力">
                <img src="../assets/pressure.png" width="30" alt="">
                <p>{{item.appCode == 6516 ? (item.realData[10] < 0 ? 0 : item.realData[10].toFixed(2)) : (item.realData[3] < 0 ? 0 : item.realData[3].toFixed(2))}}m</p>
              </grid-item>
            </grid>
          </swiper-item>
          <!-- <swiper-item>
            <grid class="sysInfo" :rows="5">
              <grid-item class="statusItem" label1="水泵名称" @click.native="showMsg">
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
          </swiper-item> -->
          <swiper-item v-for="(gateway, index) in gateWayList" :key="index">
            <grid class="sysInfo" :rows="3">
              <grid-item class="statusItem" label1="网关名称">
                <img src="../assets/name.png" width="30" alt="">
                <p>{{index}}</p>
              </grid-item>
              <grid-item class="statusItem" label1="网关在线状态">
                <img v-if="gateway == true" src="../assets/gateway.png" width="30" alt="">
                <img v-if="gateway == false" src="../assets/getwayOffline.png" width="30" alt="">
                <p>{{gateway ? "在线" : "离线"}}</p>
              </grid-item>
              <grid-item class="statusItem" label1="网关电池电压">
                <img src="../assets/battery.png" width="30" alt="">
                <p>3.9V</p>
              </grid-item>
            </grid>
          </swiper-item>
        </swiper>
        <div :class="msgFlag ? 'msgTip show' : 'msgTip'"> 
          {{msgText}}
        </div>
      </div>
      <swiper id="rotStatus" class="rotStatus" direction="horizontal" :min-moving-distance="20" :show-dots="false" @on-index-change="changeCurIrr" :threshold="100" :style="{ minHeight: swperMinHeight + 'px' }">
        <swiper-item v-if="curIrrPlans.length > 0" v-for="(irrplan, index) in curIrrPlans" :key="index">
          <cell class="progress" :title="irrplan.name" primary="content">
          <progressbar :value="irrplan.progress"></progressbar>
          </cell>
          <group class="curRotInfo" v-if="irrplan.curPlanExe" v-for="(item, curEIndex) in irrplan.curPlanExe" :key="curEIndex">
            <x-table class="irriTable" :cell-bordered="false" style="background-color:#fff;">
              <thead>
                <tr>
                  <th colspan="7">
                    {{irrplan.curPlanExe.length == 2 && curEIndex == 0 ? '上一轮灌：' : '当前轮灌：'}}
                    {{item.rgName}}({{item.rgCode}})
                    <img v-if="item.status == 1" src="../assets/status-wjh.png" width="17" style="vertical-align:middle">
                    <img v-if="item.status == 2" src="../assets/status-qy.png" width="17" style="vertical-align:middle">
                    <img v-if="item.status == 3" src="../assets/status-zt.png" width="17" style="vertical-align:middle">
                    <img v-if="item.status == 4" src="../assets/status-ty.png" width="17" style="vertical-align:middle">
                    <img v-if="item.status == 5" src="../assets/block.png" width="20" style="vertical-align:middle">
                    <img v-if="item.status == 6" src="../assets/status-ok.png" width="17" style="vertical-align:middle">
                  </th>
                </tr>
                <tr>
                  <th colspan="7">
                    <grid class="sysInfo" :rows="4">
                      <grid-item class="statusItem" label1="开始时间">
                        <img src="../assets/startTime.png" width="30" alt="">
                        <p>{{item.startTime.substr(5, 11)}}</p>
                      </grid-item>
                      <grid-item class="statusItem" label1="已灌时间">
                        <img src="../assets/time.png" width="30" alt="">
                        <p>{{item.status == 2 ? formatDate(item.startTime) : '---'}}</p>
                      </grid-item>
                      <grid-item class="statusItem" label1="已灌水量">
                        <img src="../assets/volume.png" width="30" alt="">
                        <p>---</p>
                      </grid-item>
                      <grid-item class="statusItem" label1="灌水时长">
                        <img src="../assets/irriTime.png" width="30" alt="">
                        <p>{{irrplan.period}}分钟</p>
                      </grid-item>
                    </grid>
                  </th>
                </tr>
                <tr class="title">
                  <td>名称</td>
                  <td>状态</td>
                  <td>流量<br/>(m³/h)</td>
                  <td>压力<br/>(m)</td>
                  <td>电压<br/>(v)</td>
                  <td>采集时间</td>
                </tr>
              </thead>
              <tbody>
                <tr v-if="item.branchInfos.length > 0" v-for="branch in item.branchInfos" :key="irrplan">
                  <td>{{branch.name.replace(/-/g, '').replace(/管/g, '')}}</td>
                  <td class="irriItem">
                    <div class="name">
                      <span>
                        <img v-for="imgs in getStatus(branch).split(',')" :key="imgs" align='middle' height='15' width='15' :src="require('../assets/' + imgs + '.gif')" />
                      </span>
                    </div>
                  </td>
                  <td>{{branch.origVal[2] > 0 ? branch.origVal[2].toFixed(2) : 0}}</td>
                  <td>{{branch.origVal[0] > 0 ? branch.origVal[0].toFixed(2) : 0}}</td>
                  <td>
                    <img width='20' v-if="branch.batterySts!=null" :src="require('../assets/'+branch.batterySts+'.png')" />
                  </td>
                  <td>{{branch.collTime.substr(5, 11)}}</td>
                </tr>
                <tr class="affix" v-if="item.affixInfos.length > 0" v-for="affix in item.affixInfos" :key="irrplan">
                  <td>{{affix.name.replace(/-/g, '').replace(/管/g, '')}}</td>
                  <td class="irriItem">
                    <div class="name">
                      <span>
                        <img v-for="imgs in getStatus(affix).split(',')" :key="imgs" align='middle' height='15' width='15' :src="require('../assets/' + imgs + '.gif')" />
                      </span>
                    </div>
                  </td>
                  <td>{{affix.origVal[2] > 0 ? affix.origVal[2].toFixed(2) : 0}}</td>
                  <td>{{affix.origVal[0] > 0 ? affix.origVal[0].toFixed(2) : 0}}</td>
                  <td>
                    <img width='20' v-if="affix.batterySts!=null" :src="require('../assets/'+affix.batterySts+'.png')" />
                  </td>
                  <td>{{affix.collTime.substr(5, 11)}}</td>
                </tr>
                <!-- <tr>
                  <td>阀门02</td>
                  <td class="irriItem">
                    <div class="name">
                      <span>
                        <icon class="triangle1" name="triangle1" :scale="1" color="#ec7777"></icon>
                        <icon class="triangle2" name="triangle2" :scale="1" color="#47dd1f"></icon>
                      </span>
                    </div>
                  </td>
                  <td>1.05</td>
                  <td>120</td>
                  <td>
                    <icon class="valveVolt" name="battery" :scale="3" color="#47dd1f"></icon>
                  </td>
                  <td>7-29 15:33</td>
                </tr> -->
              </tbody>
            </x-table>
          </group>
          <group class="nextRotInfo" v-if="irrplan.nextPlanExe">
            <x-table class="irriTable" :cell-bordered="false" style="background-color:#fff;">
              <thead>
                <tr>
                  <th colspan="7">下一轮灌:{{irrplan.nextPlanExe.rgName}}({{irrplan.nextPlanExe.rgCode}})
                  <img v-if="irrplan.nextPlanExe.status == 1" src="../assets/status-wjh.png" width="17" style="vertical-align:middle">
                    <img v-if="irrplan.nextPlanExe.status == 2" src="../assets/status-qy.png" width="17" style="vertical-align:middle">
                    <img v-if="irrplan.nextPlanExe.status == 3" src="../assets/status-zt.png" width="17" style="vertical-align:middle">
                    <img v-if="irrplan.nextPlanExe.status == 4" src="../assets/status-ty.png" width="17" style="vertical-align:middle">
                    <img v-if="irrplan.nextPlanExe.status == 5" src="../assets/block.png" width="20" style="vertical-align:middle">
                    <img v-if="irrplan.nextPlanExe.status == 6" src="../assets/status-ok.png" width="17" style="vertical-align:middle">
                  </th>
                </tr>
                <tr>
                  <th colspan="7">
                    <grid class="sysInfo" :rows="4">
                      <grid-item class="statusItem" label1="开始时间">
                        <img src="../assets/startTime.png" width="30" alt="">
                        <p>{{irrplan.nextPlanExe.startTime.substr(5, 11)}}</p>
                      </grid-item>
                      <grid-item class="statusItem" label1="已灌时间">
                        <img src="../assets/time.png" width="30" alt="">
                        <p>{{irrplan.nextPlanExe.status == 2 ? formatDate(irrplan.nextPlanExe.startTime) : '---'}}</p>
                      </grid-item>
                      <grid-item class="statusItem" label1="已灌水量">
                        <img src="../assets/volume.png" width="30" alt="">
                        <p>---</p>
                      </grid-item>
                      <grid-item class="statusItem" label1="灌水时长">
                        <img src="../assets/irriTime.png" width="30" alt="">
                        <p>{{irrplan.period}}分钟</p>
                      </grid-item>
                    </grid>
                  </th>
                </tr>
                <tr>
                  <td colspan="7" class="setBranch">
                    <x-input placeholder="请输入支管名称" v-model="value3" class="weui-vcode" disabled @click.native="showBranchList($event, irrplan.nextPlanExe)">
                    </x-input>
                      <x-button slot="right" type="primary" mini :disabled="branchListValue.length == 0" @click.native="setBranch">设置</x-button>
                      <x-button slot="right" type="primary" mini  @click.native="resetBranch">恢复</x-button>
                  </td>
                </tr>
                <tr class="title">
                  <td>名称</td>
                  <td>状态</td>
                  <td>流量<br/>(m³/s)</td>
                  <td>压力<br/>(kPa)</td>
                  <td>电压<br/>(V)</td>
                  <td>采集时间</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                <tr v-if="irrplan.nextPlanExe.branchInfos.length > 0" v-for="branch in irrplan.nextPlanExe.branchInfos" :key="irrplan">
                  <td>{{branch.name.replace(/-/g, '').replace(/管/g, '')}}</td>
                  <td class="irriItem">
                    <div class="name">
                      <span>
                        <img v-for="imgs in getStatus(branch).split(',')" :key="imgs" align='middle' height='15' width='15' :src="require('../assets/' + imgs + '.gif')" />
                      </span>
                    </div>
                  </td>
                  <td>{{branch.origVal[2] > 0 ? branch.origVal[2].toFixed(2) : 0}}</td>
                  <td>{{branch.origVal[0] > 0 ? branch.origVal[0].toFixed(2) : 0}}</td>
                  <td>
                    <img width='20' v-if="branch.batterySts!=null" :src="require('../assets/'+branch.batterySts+'.png')" />
                  </td>
                  <td>{{branch.collTime.substr(5, 11)}}</td>
                  <td @click="showConfirmBox($event, irrplan.nextPlanExe, branch.id)" style="padding: 0 0.2rem"><img src="../assets/delete.png" width="17" alt=""></td>
                </tr>
                <tr class="affix" v-if="irrplan.nextPlanExe.affixInfos.length > 0" v-for="affix in irrplan.nextPlanExe.affixInfos" :key="irrplan">
                  <td>{{affix.name.replace(/-/g, '').replace(/管/g, '')}}</td>
                  <td class="irriItem">
                    <div class="name">
                      <span>
                        <img v-for="imgs in getStatus(affix).split(',')" :key="imgs" align='middle' height='15' width='15' :src="require('../assets/' + imgs + '.gif')" />
                      </span>
                    </div>
                  </td>
                  <td>{{affix.origVal[2] > 0 ? affix.origVal[2].toFixed(2) : 0}}</td>
                  <td>{{affix.origVal[0] > 0 ? affix.origVal[0].toFixed(2) : 0}}</td>
                  <td>
                    <img width='20' v-if="affix.batterySts!=null" :src="require('../assets/'+affix.batterySts+'.png')" />
                  </td>
                  <td>{{affix.collTime.substr(5, 11)}}</td>
                  <td @click="affixConfirmBox($event, irrplan.nextPlanExe, affix.id)" style="padding: 0 0.2rem"><img src="../assets/delete.png" width="17" alt=""></td>
                  <td></td>
                </tr>
              </tbody>
            </x-table>
          </group>
        </swiper-item>
        <swiper-item v-if="curIrrPlans.length == 0" style="padding:50px 0;font-size:20px">当前暂无轮灌</swiper-item>
        <!-- <swiper-item v-for="(irrplan, index) in curIrrPlans" :key="index">
          <group class="curRotInfo" v-if="irrplan.curPlanExe">
            <x-table class="irriTable" :cell-bordered="false" style="background-color:#fff;">
              <thead>
                <tr>
                  <th colspan="6">当前轮灌:{{irrplan.curPlanExe.rgName}}({{irrplan.curPlanExe.rgCode}})</th>
                </tr>
                <tr>
                  <th colspan="6">
                    <grid class="sysInfo" :rows="4">
                      <grid-item class="statusItem" label1="开始时间">
                        <icon name="startTime" :scale="3" color="#47dd1f"></icon>
                        <p>{{irrplan.curPlanExe.startTime.substr(5, 11)}}</p>
                      </grid-item>
                      <grid-item class="statusItem" label1="已灌时间">
                        <icon name="time" :scale="3.3" color="#47dd1f"></icon>
                        <p>{{formatDate(irrplan.curPlanExe.startTime)}}</p>
                      </grid-item>
                      <grid-item class="statusItem" label1="已灌水量">
                        <icon name="volume" :scale="4" color="#47dd1f"></icon>
                        <p>---</p>
                      </grid-item>
                      <grid-item class="statusItem" label1="灌水时长">
                        <icon name="irriTime" :scale="3.5" color="#47dd1f"></icon>
                        <p>{{irrplan.period}}h</p>
                      </grid-item>
                    </grid>
                  </th>
                </tr>
                <tr class="title">
                  <td>名称</td>
                  <td>状态</td>
                  <td>流量<br/>(m³/h)</td>
                  <td>压力<br/>(m)</td>
                  <td>电压<br/>(v)</td>
                  <td>采集时间</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="branch in irrplan.curPlanExe.branchInfos" :key="irrplan">
                  <td>{{branch.name}}</td>
                  <td class="irriItem">
                    <div class="name">
                      <span>
                        <img v-for="imgs in getStatus(branch).split(',')" :key="imgs" align='middle' height='15' width='15' :src="require('../assets/' + imgs + '.gif')" />
                      </span>
                    </div>
                  </td>
                  <td>{{branch.origVal[2]}}</td>
                  <td>{{branch.origVal[0]}}</td>
                  <td>
                    <img width='20' :src="require('../assets/'+branch.batterySts+'.png')" />
                  </td>
                  <td>{{branch.collTime.substr(5, 11)}}</td>
                </tr>
                <tr>
                  <td>阀门02</td>
                  <td class="irriItem">
                    <div class="name">
                      <span>
                        <icon class="triangle1" name="triangle1" :scale="1" color="#ec7777"></icon>
                        <icon class="triangle2" name="triangle2" :scale="1" color="#47dd1f"></icon>
                      </span>
                    </div>
                  </td>
                  <td>1.05</td>
                  <td>120</td>
                  <td>
                    <icon class="valveVolt" name="battery" :scale="3" color="#47dd1f"></icon>
                  </td>
                  <td>7-29 15:33</td>
                </tr>
              </tbody>
            </x-table>
          </group>
          <group class="nextRotInfo" v-if="irrplan.nextPlanExe">
            <x-table class="irriTable" :cell-bordered="false" style="background-color:#fff;">
              <thead>
                <tr>
                  <th colspan="6">下一轮灌:{{irrplan.nextPlanExe.rgName}}({{irrplan.nextPlanExe.rgCode}})</th>
                </tr>
                <tr>
                  <th colspan="6">
                    <grid class="sysInfo" :rows="4">
                      <grid-item class="statusItem" label1="开始时间">
                        <icon name="startTime" :scale="3" color="#47dd1f"></icon>
                        <p>{{irrplan.nextPlanExe.startTime.substr(5, 11)}}</p>
                      </grid-item>
                      <grid-item class="statusItem" label1="已灌时间">
                        <icon name="time" :scale="3.3" color="#47dd1f"></icon>
                        <p>{{formatDate(irrplan.nextPlanExe.startTime)}}</p>
                      </grid-item>
                      <grid-item class="statusItem" label1="已灌水量">
                        <icon name="volume" :scale="4" color="#47dd1f"></icon>
                        <p>---</p>
                      </grid-item>
                      <grid-item class="statusItem" label1="灌水时长">
                        <icon name="irriTime" :scale="3.5" color="#47dd1f"></icon>
                        <p>{{irrplan.period}}h</p>
                      </grid-item>
                    </grid>
                  </th>
                </tr>
                <tr>
                  <td colspan="6" class="setBranch">
                    <x-input placeholder="请输入支管名称" class="weui-vcode">
                      <x-button slot="right" type="primary" mini>添加支管</x-button>
                    </x-input>
                  </td>
                </tr>
                <tr class="title">
                  <td>名称</td>
                  <td>状态</td>
                  <td>流量<br/>(m³/s)</td>
                  <td>压力<br/>(kPa)</td>
                  <td>电压<br/>(V)</td>
                  <td>采集时间</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="branch in irrplan.nextPlanExe.branchInfos" :key="irrplan">
                  <td>{{branch.name}}</td>
                  <td class="irriItem">
                    <div class="name">
                      <span>
                        <img v-for="imgs in getStatus(branch).split(',')" :key="imgs" align='middle' height='15' width='15' :src="require('../assets/' + imgs + '.gif')" />
                      </span>
                    </div>
                  </td>
                  <td>{{branch.origVal[2]}}</td>
                  <td>{{branch.origVal[0]}}</td>
                  <td>
                    <img width='20' :src="require('../assets/'+branch.batterySts+'.png')" />
                  </td>
                  <td>{{branch.collTime.substr(5, 11)}}</td>
                </tr>
                <tr>
                  <td>阀门02</td>
                  <td class="irriItem">
                    <div class="name">
                      <span>
                        <icon class="triangle1" name="triangle1" :scale="1" color="#ec7777"></icon>
                        <icon class="triangle2" name="triangle2" :scale="1" color="#47dd1f"></icon>
                      </span>
                    </div>
                  </td>
                  <td>1.05</td>
                  <td>120</td>
                  <td>
                    <icon class="valveVolt" name="battery" :scale="3" color="#47dd1f"></icon>
                  </td>
                  <td>7-29 15:33</td>
                </tr>
              </tbody>
            </x-table>
          </group>
        </swiper-item> -->
      </swiper>
      <div v-transfer-dom>
        <popup v-model="show1">
          <search class="searchBox" :auto-fixed="false" @on-change="onChange" ref="search"></search>
          <popup-header
            left-text="取消"
            right-text="保存"
            title="请选择支管"
            :show-bottom-border="false"
            @on-click-left="show1 = false"
            @on-click-right="show1 = false">
            </popup-header>
          <group class="branchList" gutter="0">
            <checklist :options.sync="branchList" v-model="branchListValue" @on-change="listChange"></checklist>
          </group>
        </popup>
      </div>
    </div>
    <div v-transfer-dom>
      <confirm v-model="showConfirm" @on-confirm="deleteConfirm">
        <p style="text-align:center;font-size:20px">确认删除？</p>
      </confirm>
      <confirm v-model="showAffixConfirm" @on-confirm="deleteAffixConfirm">
        <p style="text-align:center;font-size:20px">确认删除？</p>
      </confirm>
    </div>
  </scroller>
</template>

<script>
  import { Swiper, SwiperItem, Search, Group, Grid, GridItem, XInput, XButton, XTable, Cell, TransferDom, Popup, PopupHeader, Checklist, Spinner, Confirm } from 'vux'
  import { mapState, mapActions } from 'vuex'
  import $ from "webpack-zepto";
  import axios from "axios"
  import Tool from "@/utils/Tool"
  import { URL } from "@/utils/API"
  import Vue from 'vue'
  import progressbar from './ProgressBar'


  export default {
    directives: {
      TransferDom
    },
    components: {
      Swiper,
      SwiperItem,
      Group,
      Grid,
      GridItem,
      XInput,
      XButton,
      XTable,
      Search,
      Cell,
      Popup,
      PopupHeader,
      Checklist,
      Spinner,
      Confirm,
      progressbar,
    },
    created(){
      this.fetchSysList();
      this.fetchInfoList();
    },
    mounted(){
      this.fetchSysList();
      this.fetchInfoList();
      this.fixSwiperHeight();
      this.swperMinHeight = $('body').height()- 46;
    },
    methods: {
      showMsg($event){
        const target = $event.currentTarget;
        this.msgFlag = !this.msgFlag;
        this.msgText = $(target).find('p.pwName').html();
        clearTimeout(this.timer);
        this.timer = setTimeout(function(){
          $(".msgTip").removeClass("show");
        }, 2000)
      },
      formatDate(str){
        return Tool.formatDate(str);
      },
      fetchSysList(){
        const _this = this;
        if(_this.sysList.length == 0) return false;
        const sysId = _this.sysList[_this.curIndex].sysId;
        axios.get(URL.getPWBySysId, {
          params: { sysId : sysId}
        })
        .then(function (response) {
          if(response.status == 200){
            _this.PWInfo = response.data.result
          }else{
            Tool.toast(_this, '获取数据失败');
          }
        })
        .catch(function (error) {
          Tool.toast(_this, '获取数据失败');
        });
      },
      fetchInfoList(){
        const _this = this;
        if(_this.sysList.length == 0) return false;
        const sysId = _this.sysList[_this.curIndex].sysId;
        const token = Tool.getCookie("Token");
        axios.get(URL.getIrrPlanBySysId, {
          params: { sysId : sysId, token: token }
        })
        .then(function (response) {
          if(response.status == 200){
            if(response.data.status == true){
              _this.infoList = response.data.result
            }else{
              Tool.toast(_this, response.data.message);
              _this.infoList = []
            }
          }else{
            Tool.toast(_this, '获取数据失败');
            _this.infoList = []
          }
          _this.$store.commit('updateLoadingStatus', {isLoading: false})
          _this.$refs.scroller.finishPullToRefresh()
        })
        .catch(function (error) {
          Tool.toast(_this, '获取数据错误');
          _this.infoList = []
          _this.$store.commit('updateLoadingStatus', {isLoading: false})
          _this.$refs.scroller.finishPullToRefresh()
        });
      },
      fetchBranchesBySysId(){
        const _this = this;
        if(_this.sysList.length == 0) return false;
        const sysId = _this.sysList[_this.curIndex].sysId;
        axios.get(URL.getAllBranchsBySysId, {
          params: { sysId : sysId, type: '6' }
        })
        .then(function (response) {
          if(response.status == 200){
            _this.rawBranchList = response.data
          }else{
            Tool.toast(_this, '获取数据失败');
          }
        })
        .catch(function (error) {
          Tool.toast(_this, '获取数据失败');
        });
      },
      getStatus(rowData){
        let valveCode = 0;
        const code = rowData.code;
        if(rowData.valveCoremarkrol == "P2"){
          valveCode = rowData.chnl01;
        }else if(rowData.valveCoremarkrol == "P3"){
          valveCode = rowData.chnl02;
        }
        let text = "";
        switch (valveCode) {
            case 400:
                text = "10";
                if (code == 170) {
                    text += ",0002";
                }else{
                    text += ",disconnect";
                }
                break;
            case 401:
                text = "11";
                if (code == 170) {
                    text += ",0002";
                }else{
                    text += ",disconnect";
                }
                break;
            case 410:
                text = "10";
                break;
            case 411:
                text = "11";
                break;
            case 300:
                text = "00";
                if (code == 170) {
                    text += ",0002";
                }else{
                    text += ",disconnect";
                }
                break;
            case 301:
                text = "01";
                if (code == 170) {
                    text += ",0002";
                }else{
                    text += ",disconnect";
                }
                break;
            case 310:
                text = "00";
                break;
            case 311:
                text = "01";
                break;
            default:
                text = "0000";
                if (code == 170) {
                    text += ",0002";
                }else{
                    text += ",disconnect";
                }
        }
        if (code == 170) {
            if (rowData.valveSts == 0) {
                // return "阀门故障状态";
            } else if (rowData.valveSts == 1) {
                // return "物理状态开";
            } else if (rowData.valveSts == 2) {
                // return "物理状态关";
            } else if (rowData.valveSts == 3) {
                text = "0001";
            }
        }else{
            if (rowData.valveSts == 0 && valveCode == 311) {
                text = "0001";
                return text;
            } else if (rowData.valveSts == 1) {
                // return "正常开";
            } else if (rowData.valveSts == 2) {
                // return "正常关";
            } else if (rowData.valveSts == 3) {
                // if(isRun){
                //     if(rowData.senserSts == 3 && rowData.instantDelivery > 0){
                //         text += "&nbsp;<img align='middle' height='16' width='16' src='../assets/0002.png'/>";
                //         return text;
                //     }
                // }
            }
        }
        return text;
      },
      fixSwiperHeight(){
        const rotSwiperItem = $("#rotStatus .vux-swiper-item")[this.curSwiperIndex];
        $("#rotStatus").height($(rotSwiperItem).height())
      },
      changeCurIrr (index) {
        this.curSwiperIndex = index
        this.fixSwiperHeight();
      },
      setFocus () {
        this.$refs.search.setFocus()
      },
      setBranch(){
        const _this = this;
        const branchId = this.branchListValue.join(",")
        const id = this.curIrrPlans[this.curSwiperIndex].nextPlanExe.id
        this.setAffix(id, branchId)
      },
      setAffix(id, branchId){
        const _this = this;
        axios.post(URL.setAffix, 
          { id : id, branchId: branchId }
        )
        .then(function (response) {
          if(response.status == 200 && response.data.status == true){
            Tool.toast(_this, '添加附件成功');
            _this.value3 = '' 
            _this.branchListValue = []
            _this.fetchInfoList();
            _this.fetchBranchesBySysId();
            _this.fixSwiperHeight();
          }else{
            Tool.toast(_this, '添加附件失败');
          }
        })
        .catch(function (error) {
          console.log(error)
        });
      },
      listChange(val) {
        this.branchListValue = val
      },
      fetchBranchName(branchId){
        const arrayFilter = this.branchList.filter(function(item) {
            return item.key == branchId;
        });
        return arrayFilter[0].value
      },
      filterBranch(){
        const list = this.branchList;
        const len = list.length;
        const reg = new RegExp(this.keyWord);
        const checkboxlist = $(".branchList .weui-cells_checkbox>label");
        for(let i=0; i < len; i++ ){
            if(!list[i].name.match(reg)){
                $(checkboxlist[i]).hide();
            }else{
                $(checkboxlist[i]).show();
            }
        }
      },
      showBranchList($event, nextPlanExe){
        this.branchInfos = nextPlanExe.branchInfos;
        this.affixInfos = nextPlanExe.affixInfos;
        this.show1 = true
        this.$refs.search.currentValue = ''
        this.$refs.search.isCancel = true
        this.fetchBranchesBySysId();
      },
      onChange (val) {
        this.keyWord = val;
        this.filterBranch()
      },
      loadStatus () {
        this.fetchInfoList();
        this.$emit('message');
      },
      showConfirmBox($event, nextPlanExe, branchId){
        let branchIdList = nextPlanExe.branchId2 ? nextPlanExe.branchId2 : nextPlanExe.branchId1
        if(branchIdList.length == 0) return false
        branchIdList = branchIdList.split(',').filter(item=>{
          return item != branchId;
        })
        this.showConfirm = true
        this.deleteBranchId = branchIdList.join(',')
      },
      affixConfirmBox($event, nextPlanExe, branchId){
        let branchIdList = nextPlanExe.affixIds ? nextPlanExe.affixIds.split(",") : []
        if(branchIdList.length == 0) return false
        this.affixBranchIdList = branchIdList.filter(item=>{
          return item != branchId;
        })
        this.showAffixConfirm = true
      },
      resetBranch(){
        this.deleteBranchId = ''
        this.deleteConfirm()
      },
      deleteConfirm(){
        const _this = this;
        const id = this.curIrrPlans[this.curSwiperIndex].nextPlanExe.id
        axios.post(URL.setBranch, 
          { id : id, branchId: this.deleteBranchId }
        )
        .then(function (response) {
          if(response.status == 200 && response.data.status == true){
            Tool.toast(_this, '更新附件成功');
            _this.fetchInfoList();
            _this.fixSwiperHeight();
          }else{
            Tool.toast(_this, '更新附件失败');
          }
        })
        .catch(function (error) {
          console.log(error)
        });
      },
      deleteAffixConfirm(){
        const branchId = this.affixBranchIdList.join(",")
        console.log(branchId)
        const id = this.curIrrPlans[this.curSwiperIndex].nextPlanExe.id
        this.setAffix(id, branchId)
      },
      refresh(){
        this.fetchInfoList();
        this.$emit('message');
      }
    },
    watch: {
      curIndex(curVal, oldVal){
        this.$store.commit('updateLoadingStatus', {isLoading: true})
        this.fetchSysList();
        this.fetchInfoList();
      },
      sysList(curVal, oldVal){
        this.fetchSysList();
        this.fetchInfoList();
        this.swperMinHeight = $('body').height()- 46;
      },
      branchListValue(){
        const branchListName = []
        const _this = this;
        if(this.branchListValue.length == 0){
          this.value3 = ''
          return false
        }
        this.branchListValue.map((item, index) =>{
          branchListName.push(_this.fetchBranchName(item))
        })
        this.value3 = branchListName.join(',');
      }
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
      curIrrPlans(){
        this.$nextTick(() =>{
          this.fixSwiperHeight();
        })
        if(this.infoList.length == 0) return []
          let curPlanExe = [];
          let nextPlanExe = [];
          //1未启用2启用3暂停4停止5完成6调试7延期(轮灌计划状态)
          //1待激活2激活3暂停4停止5阻塞6完成(轮灌执行计划状态)
          return this.infoList.map((irrplan, index) =>{
            irrplan.progress = parseInt(irrplan.progress*100)
            const nextActivePlanExe = irrplan.planExes.filter( item => item.status == 1 )
            const activePlanExe = irrplan.planExes.filter( item => item.status == 2 )
            const pausedPlanExe = irrplan.planExes.filter( item => item.status == 3 )
            const stopPlanExe = irrplan.planExes.filter( item => item.status == 4 )
            if(activePlanExe.length > 1){
              curPlanExe = activePlanExe
              curPlanExe.sort((a, b) =>  a.sequence - b.sequence )
              nextPlanExe = irrplan.planExes.filter( item => item.sequence == curPlanExe[curPlanExe.length-1].sequence + 1 )
            }else if(activePlanExe.length == 1){
              curPlanExe = activePlanExe
              nextPlanExe = irrplan.planExes.filter( item => item.sequence == curPlanExe[0].sequence + 1 )
            }else if(nextActivePlanExe.length > 0){
              curPlanExe = nextActivePlanExe
              nextPlanExe = irrplan.planExes.filter( item => item.sequence == curPlanExe[0].sequence + 1 )
            }else if(pausedPlanExe.length > 0 || stopPlanExe.length > 0){
              curPlanExe = pausedPlanExe.length > 0 ? pausedPlanExe : stopPlanExe
              nextPlanExe = irrplan.planExes.filter( item => item.sequence == curPlanExe[0].sequence + 1 )
              if(curPlanExe[0].sequence != 1){
                nextPlanExe = curPlanExe
                curPlanExe = irrplan.planExes.filter( item => item.sequence == curPlanExe[0].sequence - 1 )
              }
            }else if(irrplan.status == 5){
              curPlanExe = irrplan.planExes.filter( item => item.sequence == irrplan.planExes.length )
              // nextPlanExe = curPlanExe
              nextPlanExe = []
            }else{
              curPlanExe = irrplan.planExes.filter( item => item.sequence == 1 )
              nextPlanExe = irrplan.planExes.filter( item => item.sequence == 2 )
            }
            irrplan.curPlanExe = curPlanExe;
            irrplan.nextPlanExe = nextPlanExe[0];
            return irrplan;
          })
      },
      gateWayList(){
        if(this.infoList.length == 0) return false
        const getwayLists = this.infoList.map((item,index) =>{
          return item.planExes.map((item2, index2) =>{
            return item2.gprs;
          })
        })
        let filterGetWayObj = {};
        getwayLists[0].map(item1 => {
          item1.map(item2 =>{
            filterGetWayObj[item2.gprs] = item2.isOnline;
          })
        })
        return filterGetWayObj;
      },
      branchList(){
        let branchList = []
        this.rawBranchList.map((item, index) =>{
          item.children.map((item2, index2) =>{
            item2.children.map((item3, index3) =>{
              item3.children.map((item4, index4) =>{
                branchList.push(item4);
              })
            })
          })
        })
        const showedBranches = this.branchInfos.concat(this.affixInfos)
        branchList = branchList.filter((item, index)=>{
          for (var i = 0; i < showedBranches.length; i++) {
            if(showedBranches[i].id == item.id){
              return false;
            }
          };
          return true;
        })
        branchList.map((item, index) =>{
          item.key = item.id
          item.value = item.name
        })
        return branchList
      },
    },
    data () {
      return {
        keyWord: '',
        msgFlag: false,
        show1: false,
        showConfirm: false,
        showAffixConfirm: false,
        autoFixed: false,
        deleteBranchId: '',
        msgText: '',
        timer: '',
        value3: '',
        curSwiperIndex: 0,
        swperMinHeight: 0,
        PWInfo: [],
        infoList: [],
        branchInfos: [],
        affixInfos: [],
        rawBranchList: [],
        branchListValue: [],
        affixBranchIdList: [],
      }
    }
  }
</script>

<style scoped>
  .setBranch .vux-x-input{ float: left; width: 60%; padding: 10px 15px; }
  .setBranch .weui-btn_primary{ display: inline-block; width: 13%; padding: 0; vertical-align: middle; margin: 0; }
  .irriTable{ font-size: 0.4rem; padding: 0 1rem;}
  .irriTable tr.title{ line-height: 1; font-size: 0.4rem;}
  .irriTable tr.title>td{ padding: 0.3rem 0;}
  .irriItem>div.name>span{ display:inline-block; vertical-align:middle }
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
  .valveVolt{ vertical-align: middle;}
  .searchBox{ text-align: left; }
  tr.affix{ background-color: #ccc; }

  .selBranch{ text-align: left; padding-left: 0.7rem;}
  .branchList{ height: 220px; overflow: hidden; overflow-y:auto; }

  .running{ padding-top: 10px; }
  .sysInfo p{ font-size: 0.4rem; color: #333; padding: 0.13rem 0; overflow: hidden; text-overflow:ellipsis; white-space: nowrap; line-height: 1; }
  .scrollPanel{ position: relative; }
  .scrollPanel .msgTip{ display: none; position: absolute; left: 0.1rem; top :1.8rem; border: 1px solid #D9D9D9; border-radius: 0.1rem; padding: 0.05rem 0.1rem; background-color: #fff; z-index: 10}
  .scrollPanel .msgTip.show{ display: block; }
 .scrollPanel .msgTip:before{border:0.1rem solid transparent;border-bottom-color:#D9D9D9}
 .scrollPanel .msgTip:after,
 .scrollPanel .msgTip:before{content:'';position:absolute;left:0.7rem;top:-0.2rem;}
 .scrollPanel .msgTip:after{margin-top:1px;border:0.1rem solid transparent;border-bottom-color:#fff}
  .box1 { position: relative; width:20.63rem; height:80px;}
  .box1:before{ content: " ";position: absolute;left: 0;bottom: 0;width:1px;height:100%;border-left: 1px solid #D9D9D9;color: #D9D9D9;-webkit-transform-origin: 0 0;-ms-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleX(0.5);-ms-transform: scaleX(0.5);transform: scaleX(0.5) }
  .box1-item{ position:relative; width: 1.8754rem; height: 70px; display: inline-block; float: left; text-align: center; padding-top: 10px; }
  .box1-item>p{ font-size: 13px; }
  .box1-item:before, .sysInfo:after { content: " ";position: absolute;left: 0;bottom: 0;width:100%;height:1px;border-bottom: 1px solid #D9D9D9;color: #D9D9D9;-webkit-transform-origin: 0 0;-ms-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleY(0.5);-ms-transform: scaleY(0.5);transform: scaleY(0.5) }
  .box1-item:after { content: " ";position: absolute;right: 0;bottom: 0;width: 1px;height:100%;border-right: 1px solid #D9D9D9;color: #D9D9D9;-webkit-transform-origin: 0 0;-ms-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleX(0.5);-ms-transform: scaleX(0.5);transform: scaleX(0.5) }
  .box1-item:first-child { margin-left: 0;  }
  .box1-item:first-child:after {  }
</style>