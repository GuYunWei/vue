<template>
  <div class="userPanel">
		<div class="user-bg">
			<span class="text">尊敬的会员</span>
			<img src="http://www.xingshifu.com/static/default-avatar.png" alt="avatar" class="avatar">
		</div>
		<div class="menus"></div>
		<group>
      <cell class="link" title="个人资料" link="/setting/personal"></cell>
      <cell class="link" title="密码修改" link="/setting/modify"></cell>
    </group>
    <group class="exit">
      <x-button type="warn" @click.native="logout">退出登录</x-button>
    </group>
  </div>
</template>

<script>
import { XHeader, Group, Cell, CellBox, XButton } from 'vux'

export default {
	components: {
		XHeader,
		Group,
		Cell,
		CellBox,
		XButton,
	}
}
</script>

<style scoped>
.link{ text-align: left; }
.exit{ position: fixed; left: 0; bottom: 0; width: 92%; }
.user-bg { position: relative; height: 5.12rem; background-color: #fea900; }
.user-bg>.text { position: absolute; bottom: .42667rem; left: 2.29333rem; font-size: 16px; color: #fff; }
.user-bg>.avatar { position: absolute; left: .42667rem; width: 1.6rem; height: 1.6rem; bottom: -.8rem; border: 2px solid #fff; border-radius: 50%; }
.menus { height: 1rem; background-color: #fff; }
.userPanel{ height: 100%; }
</style>
