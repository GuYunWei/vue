const mutations = {
	getMsg (state, payload) {
		state.msg = payload.data.data.msg;
	},
	updateIndex (state, payload) {
	  state.curIndex = payload.curIndex
	},
	updateLoadingStatus (state, payload) {
	  state.isLoading = payload.isLoading
	}
}

export default mutations;