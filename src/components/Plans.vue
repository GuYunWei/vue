<template>
  <scroller :on-refresh="refresh" ref="scroller">
    <swiper class="planSwiper" direction="horizontal" v-model="curIndex" :min-moving-distance="20" :show-dots="false" @on-index-change="changePlan" :threshold="100" ref="swiper" :style="{ minHeight: swperMinHeight + 'px' }">
      <swiper-item v-if="sysList" v-for="item in sysList" :key="item">
        <x-table v-if="item.rotIrrPlanList && item.rotIrrPlanList.length > 0" v-for="subItem in item.rotIrrPlanList" :key="subItem" :cell-bordered="false" style="background-color:#fff;">
          <thead>
            <tr>
              <th colspan="6">{{subItem.name}}</th>
            </tr>
            <tr>
              <th colspan="6">
                <grid class="sysInfo" :rows="4">
                  <grid-item class="statusItem" label1="灌水编号">
                    <img src="../assets/num.png" width="30" alt="">
                    <p>{{subItem.code}}</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="灌溉水量">
                    <img src="../assets/volume.png" width="30" alt="">
                    <p>{{getIrrWaterVolum(subItem.id)}}m³</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="开始时间">
                    <img src="../assets/startTime.png" width="30" alt="">
                    <p>{{subItem.startTime.substr(5, 11)}}</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="周期">
                    <img src="../assets/irriTime.png" width="30" alt="">
                    <p>{{subItem.period}}分钟</p>
                  </grid-item>
                </grid>
              </th>
            </tr>
            <tr v-if="subItem.rotPlanExeList && subItem.rotPlanExeList.length > 0">
              <th colspan="6">
                <grid class="operateBtn" :rows="3">
                  <grid-item>
                    <x-button type="primary" :disabled="subItem.status == 2" mini @click.native="showStartBox($event, subItem)">
                      <img src="../assets/startup.png" width="17" style="vertical-align:middle">
                    启用</x-button>
                  </grid-item>
                  <grid-item>
                    <x-button type="primary" :disabled="subItem.status != 2" mini @click.native="showPauseBox($event, subItem)">
                      <img src="../assets/paused.png" width="17" style="vertical-align:middle">
                    暂停</x-button>
                  </grid-item>
                  <grid-item>
                    <x-button type="primary" :disabled="subItem.status != 2" mini @click.native="showStopBox($event, subItem)">
                      <img src="../assets/stop.png" width="17" style="vertical-align:middle">
                    停止</x-button>
                  </grid-item>
                </grid>
              </th>
            </tr>
            <tr v-if="subItem.rotPlanExeList && subItem.rotPlanExeList.length > 0">
              <th>序号</th>
              <th>轮灌名称</th>
              <th>轮灌编号</th>
              <th>数量</th>
              <th>开始时间</th>
              <th>状态</th>
            </tr>
          </thead>
            <tbody v-if="subItem.rotPlanExeList && subItem.rotPlanExeList.length > 0" v-for="subItem2 in subItem.rotPlanExeList" :key="subItem2">
              <tr v-if="subItem2.rgs && subItem2.rgs.length > 0" v-for="subItem3 in subItem2.rgs" :key="subItem3">
                <td>{{subItem3.sequence}}</td>
                <td>{{subItem3.rgName}}</td>
                <td>{{subItem3.rgCode}}</td>
                <td>{{subItem3.branchId1.split(",").length + (subItem3.affixId ? subItem3.affixId.split(",").length : 0)}}</td>
                <td>{{subItem3.startTime.substr(5, 11)}}</td>
                <td>
                  <img v-if="subItem3.status == 1" src="../assets/status-wjh.png" width="17" style="vertical-align:middle">
                    <img v-if="subItem3.status == 2" src="../assets/status-qy.png" width="17" style="vertical-align:middle">
                    <img v-if="subItem3.status == 3" src="../assets/status-zt.png" width="17" style="vertical-align:middle">
                    <img v-if="subItem3.status == 4" src="../assets/status-ty.png" width="17" style="vertical-align:middle">
                    <img v-if="subItem3.status == 5" src="../assets/block.png" width="20" style="vertical-align:middle">
                    <img v-if="subItem3.status == 6" src="../assets/status-ok.png" width="17" style="vertical-align:middle">
                </td>
              </tr>
            </tbody>
        </x-table>
        <div class="empty" v-if="!item.rotIrrPlanList || item.rotIrrPlanList.length == 0" style="padding: 0.5rem;font-size:0.5rem;height:100%">暂无轮灌计划</div>
      </swiper-item>
    </swiper>
    <div v-transfer-dom>
      <confirm v-model="showStart" @on-confirm="startConfirm">
        <p style="text-align:center;font-size:20px;margin-bottom:20px">确认启用？</p>
        <group class="popupTime" style="text-align:left">
          <datetime-range title="时间" start-date="2017-01-01" end-date="2020-01-01" format="YYYY年MM月DD日" v-model="startTime"></datetime-range>
        </group>
        <cell class="popupPeriod" style="padding:0">
          <x-input title="周期(分钟)" v-model="period" class="weui-vcode" style="text-align:left;color:#333;"></x-input>
        </cell>
      </confirm>
      <confirm v-model="showPause" @on-confirm="pauseConfirm">
        <p style="text-align:center;font-size:20px">确认暂停？</p>
      </confirm>
      <confirm v-model="showStop" @on-confirm="stopConfirm">
        <p style="text-align:center;font-size:20px">确认停止？</p>
      </confirm>
    </div>
  </scroller>
</template>

<script>
import { Swiper, SwiperItem, XTable, Grid, GridItem, XButton, Confirm, TransferDom, DatetimeRange, Cell, XInput, Group } from 'vux'
import { mapState, mapActions } from 'vuex'
import $ from "webpack-zepto";
import axios from "axios"
import Tool from "@/utils/Tool"
import { URL } from "@/utils/API"

export default {
  directives: {
      TransferDom
    },
  components: {
    Swiper,
    SwiperItem,
    Grid,
    GridItem,
    XTable,
    Confirm,
    DatetimeRange,
    Cell,
    XInput,
    Group,
    XButton
  },
  mounted(){
    this.fixSwiperHeight()
    this.getRotPlanWater()
    this.$store.commit('updateLoadingStatus', {isLoading: false})
    this.swperMinHeight = $('html').height()-46;
  },
  computed: {
    ...mapState({
      curIndex: state => state.curIndex,
      sysList: state => state.sysList,
      isLoading: state => state.vux.isLoading,
    }),
  },
  methods: {
    changePlan(index){
      this.$store.commit("updateIndex", { curIndex: +index })
    },
    getRotPlanWater(){
      if(this.sysList.length == 0) return false;
      const sysId = this.sysList[this.curIndex].sysId;
      const token = Tool.getCookie("Token");
      axios.get(URL.getRotPlanWater, {
        params: { sysId : sysId, token: token }
      })
      .then(response => {
        if(response.status == 200 && response.data.status == true){
          this.rotPlanWater = response.data.result
        }else{
          Tool.toast(this, '获取数据失败');
        }
      })
      .catch(function (error) {
        console.log(error)
      });
    },
    getIrrWaterVolum(planid){
      const currentPlan = this.rotPlanWater.filter(item=>{
        return item.id = planid
      })
      return currentPlan[0] ? currentPlan[0].currWater.toFixed(2) : 0
    },
    refresh () {
      this.$emit('message');
      this.getRotPlanWater()
    },
    fixSwiperHeight(){
      const timer = setInterval(()=>{
        const swiperItem = $(".planSwiper .vux-swiper-item")[this.curIndex];
        $(".planSwiper").parent().height($(swiperItem).height()+46)
        $(".planSwiper").height($(swiperItem).height()+46)
      }, 10)
      setTimeout(()=>{
        clearTimeout(timer)
      }, 5000)
    },
    // startup($event, pid){
    //   exeCommand(pid, 2, '启用')
    // },
    // pause($event, pid){
    //   exeCommand(pid, 3, '暂停')
    // },
    // stop($event, pid){
    //   exeCommand(pid, 4, '停止')
    // },
    showStartBox($event, item){
      // this.curIrrPlan = item;
      this.getRotPlanById(item.id);
      const startTimeArr = []
      const tempArr = item.startTime.split(" ");
      startTimeArr.push(tempArr[0]);
      startTimeArr.push(tempArr[1].split(":")[0]);
      startTimeArr.push(tempArr[1].split(":")[1]);
      console.log(startTimeArr)
      this.startTime = startTimeArr
      this.showStart = true
    },
    showPauseBox($event, item){
      this.curIrrPlan = item;
      this.showPause = true
    },
    showStopBox($event, item){
      this.curIrrPlan = item;
      this.showStop = true
    },
    startConfirm($event, item){
      if(!this.curIrrPlan) return false
      this.setlRotPlan()
    },
    pauseConfirm($event, item){
      if(!this.curIrrPlan) return false
      this.exeCommand(this.curIrrPlan.id, 3, '暂停')
    },
    stopConfirm($event, item){
      if(!this.curIrrPlan) return false
      this.exeCommand(this.curIrrPlan.id, 4, '停止')
    },
    exeCommand(id, status, msg){
      axios.get(URL.changeStatus, {
        params: { planId : id, status: status, userName: Tool.getCookie("userName") }
      })
      .then((response) => {
        if(response.status == 200 && response.data.status == true){
          this.refresh()
          Tool.toast(this, msg + '成功');
        }else{
          Tool.toast(this, response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error)
      });
    },
    getRotPlanById(id){
      axios.get(URL.getRotPlanById, {
        params: {
          id: id,
        }
      })
      .then((response) => {
        if(response.status == 200 && response.data.status == true){
          this.curIrrPlan = response.data.result
          const startTimeArr = []
          const tempArr = this.curIrrPlan.startTime.split(" ");
          startTimeArr.push(tempArr[0]);
          startTimeArr.push(tempArr[1].split(":")[0]);
          startTimeArr.push(tempArr[1].split(":")[1]);
          this.startTime = startTimeArr
        }else{
          console.log(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    setlRotPlan(){
      if(!this.curIrrPlan) return false
      const item = this.curIrrPlan
      const startTimeArr = this.startTime
      item.period = this.period
      item.startTime = startTimeArr[0] + ' ' + startTimeArr[1] + ":" + startTimeArr[2] + ':00'
      const temp = item.startTime;
      const arr = temp.replace('-', '/').split(/[- : \/]/);
      const date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
      if(date - new Date() < 120000){
        Tool.toast(this, '开始时间设置太小');
        return false
      }
      axios.post(URL.setlRotPlan, item)
      .then((response)=>{
        if(response.status == 200 && response.data.status == true){
          this.exeCommand(item.id, 2, '启用')
        }else{
          Tool.toast(this, '设置失败');
        }
      })
      .catch(function (error) {
        console.log(error)
      });
    }
  },
  watch: {
    curIndex(curVal, oldVal){
      this.fixSwiperHeight()
      this.getRotPlanWater()
    },
    sysList(curVal, oldVal){
      this.getRotPlanWater()
    },
  },
  data(){
    return {
      rotPlanWater: [],
      swperMinHeight: 0,
      startTime: [],
      curIrrPlan: null,
      period: 1,
      showStart: false,
      showPause: false,
      showStop: false,
    }
  }
}
</script>

<style scoped>
table{ font-size: 0.4rem;}
.operateBtn a{ padding: 0.2rem ;}
.planSwiper table{ margin-bottom: 0.4rem; }
.planSwiper table:last-child{ margin-bottom: 0; }
.statusItem{ display:table-cell; height: 1.9rem; padding: 0.2rem 0!important; }
.statusItem svg{ height:35px; }
.statusItem p{ color: #333; margin-top: -0.2rem; overflow: hidden;text-overflow:ellipsis;white-space: nowrap; }
</style>
