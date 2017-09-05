<template>
  <iframe ref="iframe" :src="url" @load="loaded"></iframe>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { URL } from "@/utils/API"

export default {
	components: {
		
	},
	created(){

	},
	mounted(){
		this.url = URL.irrigate + this.sysList[this.curIndex].sysId;
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
		// url(){
		// 	return URL.irrigate + this.sysList[this.curIndex].sysId;
		// }
	},
	watch: {
      sysList(curVal, oldVal){
      	if(!this.sysList) return false
        this.url = URL.irrigate + this.sysList[this.curIndex].sysId;
      },
	},
	methods: {
		loaded(){
			this.$store.commit('updateLoadingStatus', {isLoading: false})
		}
	},
	data(){
		return{
			url: ''
		}
	}
}
</script>

<style scoped>
iframe{ width: 1100px; height: 100%; margin: 0; border: none; }
</style>
