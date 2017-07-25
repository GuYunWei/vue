<template>
  <div class="personalInfo">
		<group>
      <x-input title="昵称" placeholder="请输入昵称" is-type="china-name"></x-input>
      <x-input title="真实姓名" placeholder="请输入姓名" is-type="china-name"></x-input>
      <x-switch class="sex" title="性别" :inline-desc="sexSwitch? '男':'女'" v-model="sexSwitch"></x-switch>
    </group>
    <group class="savePanel">
    	<x-button type="primary" @click.native="save">保存</x-button>
    </group>
  </div>
</template>

<script>
import { Group, XInput, XSwitch, XButton } from 'vux'

export default {
	components: {
		Group,
		XInput,
		XSwitch,
		XButton,
	},
	watch: {
		sexSwitch(val){
			console.log(val)
		}
	},
	data() {
		return {
			sexSwitch: true
		}
	}
}
</script>

<style>
.personalInfo label.weui-label{ width: 3rem!important; text-align: left; }
.sex .weui-cell__bd{ position: relative; }
.sex .vux-label-desc{ position: absolute; right: 0.2rem; top: 0; font-size: 0.5rem;}
.savePanel .weui-cells{ width: 9rem; margin: 1rem auto; }
</style>

<style scoped>
</style>
