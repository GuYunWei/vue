<template>
  <div style="height:100%;">
    <swiper class="irriSwiper" direction="horizontal" v-model="curIndex" :min-moving-distance="20" :show-dots="false" @on-index-change="changePlan">
      <swiper-item>
      	<group>
      		<x-input title="轮灌名称" placeholder="请输入轮灌名称"></x-input>
		      <x-input title="轮灌编号" placeholder="请输入轮灌编号"></x-input>
          <cell class="selBranch" title="支管列表" value="选择支管" is-link @click.native="show1=true"></cell>
          <flexbox :gutter="0" wrap="wrap">
            <flexbox-item :span="1/3" v-for="item in branchListValue" :key="item"><div class="flex-demo">{{fetchBrancchName(item)}}</div></flexbox-item>
          </flexbox>
        </group>
        <div v-transfer-dom>
          <popup v-model="show1">
            <!-- group already has a top border, so we need to hide header's bottom border-->
            <popup-header
              left-text="取消"
              right-text="保存"
              title="请选择支管"
              :show-bottom-border="false"
              @on-click-left="show1 = false"
              @on-click-right="show1 = false"></popup-header>
            <group class="branchList" gutter="0">
              <checklist :options="branchList" v-model="branchListValue" @on-change="listChange"></checklist>
            </group>
          </popup>
        </div>
        <group class="savePanel">
          <x-button type="primary" @click.native="save">保存</x-button>
        </group>
      </swiper-item>
      <swiper-item>
        <group>
          <x-input title="轮灌名称" placeholder="请输入轮灌名称"></x-input>
          <x-input title="轮灌编号" placeholder="请输入轮灌编号"></x-input>
          <cell class="selBranch" title="支管列表" value="选择支管" is-link @click.native="show1=true"></cell>
          <flexbox :gutter="0" wrap="wrap">
            <flexbox-item :span="1/3" v-for="item in branchListValue" :key="item"><div class="flex-demo">{{fetchBrancchName(item)}}</div></flexbox-item>
          </flexbox>
        </group>
        <div v-transfer-dom>
          <popup v-model="show1">
            <!-- group already has a top border, so we need to hide header's bottom border-->
            <popup-header
              left-text="取消"
              right-text="保存"
              title="请选择支管"
              :show-bottom-border="false"
              @on-click-left="show1 = false"
              @on-click-right="show1 = false"></popup-header>
            <group class="branchList" gutter="0">
              <checklist :options="branchList" v-model="branchListValue" @on-change="listChange"></checklist>
            </group>
          </popup>
        </div>
        <group class="savePanel">
          <x-button type="primary" @click.native="save">保存</x-button>
        </group>
      </swiper-item>
      <swiper-item>
        <group>
          <x-input title="轮灌名称" placeholder="请输入轮灌名称"></x-input>
          <x-input title="轮灌编号" placeholder="请输入轮灌编号"></x-input>
          <cell class="selBranch" title="支管列表" value="选择支管" is-link @click.native="show1=true"></cell>
          <flexbox :gutter="0" wrap="wrap">
            <flexbox-item :span="1/3" v-for="item in branchListValue" :key="item"><div class="flex-demo">{{fetchBrancchName(item)}}</div></flexbox-item>
          </flexbox>
        </group>
        <div v-transfer-dom>
          <popup v-model="show1">
            <!-- group already has a top border, so we need to hide header's bottom border-->
            <popup-header
              left-text="取消"
              right-text="保存"
              title="请选择支管"
              :show-bottom-border="false"
              @on-click-left="show1 = false"
              @on-click-right="show1 = false"></popup-header>
            <group class="branchList" gutter="0">
              <checklist :options="branchList" v-model="branchListValue" @on-change="listChange"></checklist>
            </group>
          </popup>
        </div>
        <group class="savePanel">
          <x-button type="primary" @click.native="save">保存</x-button>
        </group>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem, Group, XInput, XButton, TransferDom, XSwitch, PopupHeader, Popup, Radio, Cell, Flexbox, FlexboxItem, Checklist } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  directives: {
    TransferDom
  },
  components: {
    Swiper,
    SwiperItem,
    Group,
    XInput,
    XButton,
    XSwitch,
    PopupHeader,
    Popup,
    Radio,
    Cell,
    Flexbox,
    FlexboxItem,
    Checklist,
  },
  computed: {
    ...mapState({
      curIndex: state => state.curIndex,
    })
  },
  methods: {
    changePlan(index){
      this.$store.commit("updateIndex", { curIndex: +index })
    },
    listChange(val) {
      this.branchListValue = val
    },
    fetchBrancchName(branchId){
      var arrayFilter = this.branchList.filter(function(item) {
          return item.key == branchId;
      });
      return arrayFilter[0].value
    }
  },
  watch: {
    curIndex(curVal, oldVal){
      console.log(curVal);
    }
  },
  data () {
    return {
      show1: false,
      branchList: [
          {
              key: '1',
              value: '支管001'
          },
          {
              key: '2',
              value: '支管002'
          },
          {
              key: '3',
              value: '支管003'
          },
          {
              key: '4',
              value: '支管004'
          },
          {
              key: '5',
              value: '支管005'
          },
          {
              key: '6',
              value: '支管006'
          },
          {
              key: '7',
              value: '支管007'
          },
          {
              key: '8',
              value: '支管008'
          },
          {
              key: '9',
              value: '支管009'
          },
          {
              key: '10',
              value: '支管010'
          },
          {
              key: '11',
              value: '支管011'
          }
      ],
      branchListValue: ['1', '2'],
    }
  }
}
</script>

<style scoped>
.irriSwiper{ height: 100%; }
.irriSwiper .vux-swiper{ background-color: #fff!important; }
.statusItem{ display:table-cell; height: 2.1rem; padding: 0.2rem 0!important; }
.statusItem svg{ height:35px; }
.statusItem p{ font-size: 0.35rem; color: #333; margin-top: -0.4rem}
.selBranch{ text-align: left; padding-left: 0.7rem;}
.branchList{ height: 8rem; overflow: hidden; overflow-y:auto; }
.flex-demo {
  text-align: center;
  color: #333;
  background-color: #fff;
  border-radius: 4px;
  background-clip: padding-box;
}
</style>
