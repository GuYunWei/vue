<template>
  <div class="loginPanel">
    <p class="logo"><img src="../assets/logo.png" alt=""></p>
    <p class="title">轮灌管理系统</p>
    <group>
      <x-input placeholder="请输入手机号" type="number" pattern="[0-9]*" is-type="china-mobile">
        <icon class="icon" slot="label" name="user" :scale="2.5" color="#acacac" required></icon>
      </x-input>
      <x-input class="password" placeholder="请输入密码" type="password">
        <icon class="icon" slot="label" name="password" :scale="2.5" color="#acacac" required></icon>
      </x-input>
    </group>
    <x-button type="primary" @click.native="login">登录</x-button>
  </div>
</template>

<script>
import { Group, XInput, XButton } from 'vux'
export default {
  components: {
    Group,
    XInput,
    XButton
  },
  methods: {
    login(){
      console.log(123)
      this.$router.push("/home");
    }
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.title{ color: #333; font-size: 30px;}
.logo{ width: 80px; height: 80px; margin: 50px auto; background-color: #4b4c4b; }
.logo>img{ width: 100%; height: 100%; }
.svg-icon{ vertical-align: middle; margin-right: 10px; }
.weui-input{ font-size: 16px!important; padding: 5px 15px; vertical-align: bottom; }
.loginPanel .weui-btn_primary { width: 90%!important; margin: 40px auto;}
.password:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    -ms-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
</style>
