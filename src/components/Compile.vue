<template>
  <div style="height:100%;">
    <swiper class="irriSwiper" direction="horizontal" v-model="curIndex" :min-moving-distance="20" :show-dots="false" @on-index-change="changePlan">
      <swiper-item>
      	<group>
      		<x-input title="轮灌名称" placeholder="请输入轮灌名称"></x-input>
		      <x-input title="轮灌编号" placeholder="请输入轮灌编号"></x-input>
      	</group>
      </swiper-item>
      <swiper-item>
        <group>
      		<x-input title="轮灌名称" placeholder="请输入轮灌名称"></x-input>
		      <x-input title="轮灌编号" placeholder="请输入轮灌编号"></x-input>
      	</group>
      </swiper-item>
      <swiper-item>
        <group>
      		<x-input title="轮灌名称" placeholder="请输入轮灌名称"></x-input>
		      <x-input title="轮灌编号" placeholder="请输入轮灌编号"></x-input>
      	</group>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem, Group, XInput, XButton } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Swiper,
    SwiperItem,
    Group,
    XInput,
    XButton,
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
.irriSwiper{ height: 100%; }
.irriSwiper .vux-swiper{ background-color: #fff!important; }
.statusItem{ display:table-cell; height: 2.1rem; padding: 0.2rem 0!important; }
.statusItem svg{ height:35px; }
.statusItem p{ font-size: 0.35rem; color: #333; margin-top: -0.4rem}
</style>
