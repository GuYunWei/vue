<template>
  <scroller id="planScroller" lock-x scrollbar-y use-pulldown :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}" @on-pulldown-loading="loadStatus" v-model="status">
    <div>
      <swiper class="planSwiper" direction="horizontal" v-model="curIndex" :min-moving-distance="20" :show-dots="false" @on-index-change="changePlan" :threshold="100" ref="swiper">
        <swiper-item v-if="sysList" v-for="item in sysList" :key="item">
          <x-table v-if="item.rotIrrPlanList && item.rotIrrPlanList.length > 0" v-for="subItem in item.rotIrrPlanList" :key="subItem" :cell-bordered="false" style="background-color:#fff;">
            <thead>
              <tr>
                <th colspan="6">{{subItem.pName}}</th>
              </tr>
              <tr>
                <th colspan="6">
                  <grid class="sysInfo" :rows="4">
                    <grid-item class="statusItem" label1="灌水编号">
                      <img src="../assets/num.png" width="30" alt="">
                      <p>{{subItem.code}}</p>
                    </grid-item>
                    <grid-item class="statusItem" label1="灌溉面积">
                      <img src="../assets/area.png" width="30" alt="">
                      <p>{{subItem.area}}亩</p>
                    </grid-item>
                    <grid-item class="statusItem" label1="开始时间">
                      <img src="../assets/startTime.png" width="30" alt="">
                      <p>{{subItem.startTime.substr(5, 11)}}</p>
                    </grid-item>
                    <grid-item class="statusItem" label1="结束时间">
                      <img src="../assets/endTime.png" width="30" alt="">
                      <p>{{subItem.endTime.substr(5, 11)}}</p>
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
                <th>周期</th>
              </tr>
            </thead>
              <tbody v-if="subItem.rotPlanExeList && subItem.rotPlanExeList.length > 0" v-for="subItem2 in subItem.rotPlanExeList" :key="subItem2">
                <tr v-if="subItem2.rgs && subItem2.rgs.length > 0" v-for="subItem3 in subItem2.rgs" :key="subItem3">
                  <td>{{subItem3.sequence}}</td>
                  <td>{{subItem3.rgName}}</td>
                  <td>{{subItem3.rgCode}}</td>
                  <td>{{subItem3.branchId.split(",").length + (subItem3.affixId ? subItem3.affixId.split(",").length : 0)}}</td>
                  <td>{{subItem3.startTime.substr(5, 11)}}</td>
                  <td>{{subItem.period}}h</td>
                </tr>
              </tbody>
          </x-table>
          <div class="empty" v-if="!item.rotIrrPlanList || item.rotIrrPlanList.length == 0" style="padding: 0.5rem;font-size:0.5rem;height:100%">暂无轮灌计划</div>
        </swiper-item>
      </swiper>
    </div>
    <!--pulldown slot-->
    <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 20px; line-height:20px; top: -40px; text-align: center;">
      <span v-show="status.pulldownStatus === 'down'">下拉刷新</span>
      <span v-show="status.pulldownStatus === 'up'">释放刷新</span>
      <span v-show="status.pulldownStatus === 'loading'"><spinner type="ios-small"></spinner></span>
    </div>
  </scroller>
</template>

<script>
import { Swiper, SwiperItem, XTable, Grid, GridItem, Scroller, Spinner } from 'vux'
import { mapState, mapActions } from 'vuex'
import $ from "webpack-zepto";
import axios from "axios"
import Tool from "@/utils/Tool"
import { URL } from "@/utils/API"

export default {
  components: {
    Swiper,
    SwiperItem,
    Grid,
    GridItem,
    Scroller,
    Spinner,
    XTable
  },
  mounted(){
    this.fixSwiperHeight()
    this.$store.commit('updateLoadingStatus', {isLoading: false})
    // this.A();
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
    loadStatus () {
      this.$emit('message');
    },
    fixSwiperHeight(){
      const swiperItem = $(".planSwiper .vux-swiper-item")[this.curIndex];
      $(".planSwiper").parent().height($(swiperItem).height()+46)
    },
    A: function() {
            setTimeout(() => { 
                const swiperItem = $(".planSwiper .vux-swiper-item")[this.curIndex];
                      $(".planSwiper").parent().height($(swiperItem).height()+46)
                      $(".planSwiper, .planSwiper .vux-swiper").css('height', $(swiperItem).height()+46+'px!important')
            }, 1000)
        },
  },
  watch: {
    curIndex(curVal, oldVal){
      this.fixSwiperHeight()
    },
    sysList(curVal, oldVal){
      this.fixSwiperHeight()
    },
  },
  data(){
    return {
      status: {
        pulldownStatus: 'default'
      },
    }
  }
}
</script>

<style scoped>
table{ font-size: 0.4rem;}
.planSwiper table{ margin-bottom: 0.4rem; }
.planSwiper table:last-child{ margin-bottom: 0; }
.statusItem{ display:table-cell; height: 1.9rem; padding: 0.2rem 0!important; }
.statusItem svg{ height:35px; }
.statusItem p{ color: #333; margin-top: -0.2rem; overflow: hidden;text-overflow:ellipsis;white-space: nowrap; }
</style>
