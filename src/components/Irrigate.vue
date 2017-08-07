<template>
  <iframe ref="iframe" :src="url" @load="loaded"></iframe>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	components: {
		
	},
	created(){

	},
	computed:{
		...mapState({
		  route: state => state.route,
		  curIndex: state => state.curIndex,
		  sysList: state => state.sysList,
		  path: state => state.route.path,
		  isLoading: state => state.vux.isLoading,
		  direction: state => state.vux.direction
		}),
		url(){
			return "http://nmgjg.unilogger.cn:8011/jsgg/yxkz/tjbg/ggList.html?sysId=" + this.sysList[this.curIndex].sysId;
		}
	},
	methods: {
		loaded(){
			this.$store.commit('updateLoadingStatus', {isLoading: false})
		}
	},
	data(){
		return{
			
		}
	}
}
</script>

<style scoped>
iframe{ width: 1100px; height: 100%; margin: 0; border: none; }
</style>
