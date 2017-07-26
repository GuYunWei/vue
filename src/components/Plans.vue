<template>
  <div style="height:100%;">
    <swiper class="planSwiper" direction="horizontal" v-model="curIndex" :min-moving-distance="20" :show-dots="false" @on-index-change="changePlan">
      <swiper-item>
        <x-table :cell-bordered="false" style="background-color:#fff;">
          <thead>
            <tr>
              <th colspan="6">灌水计划001</th>
            </tr>
            <tr>
              <th colspan="6">
                <grid class="sysInfo" :rows="5">
                  <grid-item class="statusItem" label1="灌水名稱">
                    <icon name="name" :scale="3.5" color="#47dd1f"></icon>
                    <p>灌水1</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="灌水编号">
                    <icon name="num" :scale="3" color="#47dd1f"></icon>
                    <p>01001</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="灌水量">
                    <icon name="volume" :scale="4" color="#47dd1f"></icon>
                    <p>500m³</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="开始时间">
                    <icon name="startTime" :scale="3.5" color="#47dd1f"></icon>
                    <p>7-24 18:00</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="结束时间">
                    <icon name="endTime" :scale="3.3" color="#47dd1f"></icon>
                    <p>7-24 23:00</p>
                  </grid-item>
                </grid>
              </th>
            </tr>
            <tr>
              <th>序号</th>
              <th>轮灌名称</th>
              <th>轮灌编号</th>
              <th>数量</th>
              <th>开始时间</th>
              <th>周期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>轮灌01</td>
              <td>10010</td>
              <td>10</td>
              <td>07-25 10:46</td>
              <td>5h</td>
            </tr>
            <tr>
              <td>2</td>
              <td>轮灌02</td>
              <td>10011</td>
              <td>12</td>
              <td>07-25 14:00</td>
              <td>5h</td>
            </tr>
          </tbody>
        </x-table>
        <x-table :cell-bordered="false" style="background-color:#fff;">
          <thead>
            <tr>
              <th colspan="6">灌水计划001</th>
            </tr>
            <tr>
              <th colspan="6">
                <grid class="sysInfo" :rows="5">
                  <grid-item class="statusItem" label1="灌水名稱">
                    <icon name="name" :scale="3.5" color="#47dd1f"></icon>
                    <p>灌水1</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="灌水编号">
                    <icon name="num" :scale="3" color="#47dd1f"></icon>
                    <p>01001</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="灌水量">
                    <icon name="volume" :scale="4" color="#47dd1f"></icon>
                    <p>500m³</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="开始时间">
                    <icon name="startTime" :scale="3.5" color="#47dd1f"></icon>
                    <p>7-24 18:00</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="结束时间">
                    <icon name="endTime" :scale="3.3" color="#47dd1f"></icon>
                    <p>7-24 23:00</p>
                  </grid-item>
                </grid>
              </th>
            </tr>
            <tr>
              <th>序号</th>
              <th>轮灌名称</th>
              <th>轮灌编号</th>
              <th>数量</th>
              <th>开始时间</th>
              <th>周期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>轮灌01</td>
              <td>10010</td>
              <td>10</td>
              <td>07-25 10:46</td>
              <td>5h</td>
            </tr>
            <tr>
              <td>2</td>
              <td>轮灌02</td>
              <td>10011</td>
              <td>12</td>
              <td>07-25 14:00</td>
              <td>5h</td>
            </tr>
          </tbody>
        </x-table>
        <x-table :cell-bordered="false" style="background-color:#fff;">
          <thead>
            <tr>
              <th colspan="6">灌水计划001</th>
            </tr>
            <tr>
              <th colspan="6">
                <grid class="sysInfo" :rows="5">
                  <grid-item class="statusItem" label1="灌水名稱">
                    <icon name="name" :scale="3.5" color="#47dd1f"></icon>
                    <p>灌水1</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="灌水编号">
                    <icon name="num" :scale="3" color="#47dd1f"></icon>
                    <p>01001</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="灌水量">
                    <icon name="volume" :scale="4" color="#47dd1f"></icon>
                    <p>500m³</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="开始时间">
                    <icon name="startTime" :scale="3.5" color="#47dd1f"></icon>
                    <p>7-24 18:00</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="结束时间">
                    <icon name="endTime" :scale="3.3" color="#47dd1f"></icon>
                    <p>7-24 23:00</p>
                  </grid-item>
                </grid>
              </th>
            </tr>
            <tr>
              <th>序号</th>
              <th>轮灌名称</th>
              <th>轮灌编号</th>
              <th>数量</th>
              <th>开始时间</th>
              <th>周期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>轮灌01</td>
              <td>10010</td>
              <td>10</td>
              <td>07-25 10:46</td>
              <td>5h</td>
            </tr>
            <tr>
              <td>2</td>
              <td>轮灌02</td>
              <td>10011</td>
              <td>12</td>
              <td>07-25 14:00</td>
              <td>5h</td>
            </tr>
          </tbody>
        </x-table>
      </swiper-item>
      <swiper-item>
        <x-table :cell-bordered="false" style="background-color:#fff;">
          <thead>
            <tr>
              <th colspan="6">灌水计划010</th>
            </tr>
            <tr>
              <th colspan="6">
                <grid class="sysInfo" :rows="5">
                  <grid-item class="statusItem" label1="灌水名稱">
                    <icon name="name" :scale="3.5" color="#47dd1f"></icon>
                    <p>灌水2</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="灌水编号">
                    <icon name="num" :scale="3" color="#47dd1f"></icon>
                    <p>01011</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="灌水量">
                    <icon name="volume" :scale="4" color="#47dd1f"></icon>
                    <p>700m³</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="开始时间">
                    <icon name="startTime" :scale="3.5" color="#47dd1f"></icon>
                    <p>7-30 10:00</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="结束时间">
                    <icon name="endTime" :scale="3.3" color="#47dd1f"></icon>
                    <p>7-30 14:00</p>
                  </grid-item>
                </grid>
              </th>
            </tr>
            <tr>
              <th>序号</th>
              <th>轮灌名称</th>
              <th>轮灌编号</th>
              <th>数量</th>
              <th>开始时间</th>
              <th>周期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>轮灌01</td>
              <td>10110</td>
              <td>12</td>
              <td>07-25 10:00</td>
              <td>5h</td>
            </tr>
            <tr>
              <td>2</td>
              <td>轮灌02</td>
              <td>10111</td>
              <td>11</td>
              <td>07-25 14:00</td>
              <td>5h</td>
            </tr>
          </tbody>
        </x-table>
      </swiper-item>
      <swiper-item>
        <x-table :cell-bordered="false" style="background-color:#fff;">
          <thead>
            <tr>
              <th colspan="6">灌水计划010</th>
            </tr>
            <tr>
              <th colspan="6">
                <grid class="sysInfo" :rows="5">
                  <grid-item class="statusItem" label1="灌水名稱">
                    <icon name="name" :scale="3.5" color="#47dd1f"></icon>
                    <p>灌水2</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="灌水编号">
                    <icon name="num" :scale="3" color="#47dd1f"></icon>
                    <p>01011</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="灌水量">
                    <icon name="volume" :scale="4" color="#47dd1f"></icon>
                    <p>700m³</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="开始时间">
                    <icon name="startTime" :scale="3.5" color="#47dd1f"></icon>
                    <p>7-30 10:00</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="结束时间">
                    <icon name="endTime" :scale="3.3" color="#47dd1f"></icon>
                    <p>7-30 14:00</p>
                  </grid-item>
                </grid>
              </th>
            </tr>
            <tr>
              <th>序号</th>
              <th>轮灌名称</th>
              <th>轮灌编号</th>
              <th>数量</th>
              <th>开始时间</th>
              <th>周期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>轮灌01</td>
              <td>10110</td>
              <td>12</td>
              <td>07-25 10:00</td>
              <td>5h</td>
            </tr>
            <tr>
              <td>2</td>
              <td>轮灌02</td>
              <td>10111</td>
              <td>11</td>
              <td>07-25 14:00</td>
              <td>5h</td>
            </tr>
          </tbody>
        </x-table>
        <x-table :cell-bordered="false" style="background-color:#fff;">
          <thead>
            <tr>
              <th colspan="6">灌水计划010</th>
            </tr>
            <tr>
              <th colspan="6">
                <grid class="sysInfo" :rows="5">
                  <grid-item class="statusItem" label1="灌水名稱">
                    <icon name="name" :scale="3.5" color="#47dd1f"></icon>
                    <p>灌水2</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="灌水编号">
                    <icon name="num" :scale="3" color="#47dd1f"></icon>
                    <p>01011</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="灌水量">
                    <icon name="volume" :scale="4" color="#47dd1f"></icon>
                    <p>700m³</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="开始时间">
                    <icon name="startTime" :scale="3.5" color="#47dd1f"></icon>
                    <p>7-30 10:00</p>
                  </grid-item>
                  <grid-item class="statusItem" label1="结束时间">
                    <icon name="endTime" :scale="3.3" color="#47dd1f"></icon>
                    <p>7-30 14:00</p>
                  </grid-item>
                </grid>
              </th>
            </tr>
            <tr>
              <th>序号</th>
              <th>轮灌名称</th>
              <th>轮灌编号</th>
              <th>数量</th>
              <th>开始时间</th>
              <th>周期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>轮灌01</td>
              <td>10110</td>
              <td>12</td>
              <td>07-25 10:00</td>
              <td>5h</td>
            </tr>
            <tr>
              <td>2</td>
              <td>轮灌02</td>
              <td>10111</td>
              <td>11</td>
              <td>07-25 14:00</td>
              <td>5h</td>
            </tr>
          </tbody>
        </x-table>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem, XTable, Grid, GridItem } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Swiper,
    SwiperItem,
    Grid,
    GridItem,
    XTable
  },
  computed: {
    ...mapState({
      curIndex: state => state.curIndex,
    })
  },
  methods: {
    changePlan(index){
      this.$store.commit("updateIndex", { curIndex: +index })
    }
  },
  watch: {
    curIndex(curVal, oldVal){
      console.log(curVal);
    }
  }
}
</script>

<style scoped>
.planSwiper{ height: 100%; }
.planSwiper table{ margin-bottom: 0.4rem; }
.statusItem{ display:table-cell; height: 2.1rem; padding: 0.2rem 0!important; }
.statusItem svg{ height:35px; }
.statusItem p{ font-size: 0.35rem; color: #333; margin-top: -0.4rem; line-height: 0.5rem }
</style>
