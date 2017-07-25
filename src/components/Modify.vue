<template>
  <div class="personalInfo">
		<group>
      <x-input placeholder="请输入旧密码"></x-input>
      <x-input placeholder="请输入新密码"></x-input>
    </group>
    <group class="savePanel">
    	<x-button type="primary" @click.native="modify">修改</x-button>
    </group>
  </div>
</template>

<script>
import { Group, XInput, XSwitch, XButton } from 'vux'

export default {
	components: {
		Group,
		XInput,
		XButton,
	},
	watch: {
		
	},
	data() {
		return {
			
		}
	}
}
</script>

<style>
.personalInfo label.weui-label{ width: 3rem!important; text-align: left; }
.sex .weui-cell__bd{ position: relative; }
.sex .vux-label-desc{ position: absolute; right: 0.2rem; top: 0.1rem; font-size: 0.5rem;}
.savePanel .weui-cells{ width: 9rem; margin: 1rem auto; }
</style>

<style scoped>
</style>
