const mutations = {
	getMsg (state, payload) {
		state.msg = payload.data.data.msg;
	},
	updateLoadingStatus (state, payload) {
	  state.isLoading = payload.isLoading
	}
}

export default mutations;