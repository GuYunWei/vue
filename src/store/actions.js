import axios from "axios";

export const fun = ({ commit }) => {
	axios.get('http://rapapi.org/mockjsdata/22512/test', {
		params: {
      request: 12345
    }
	})
  .then(data => {
  	commit({
  		type: 'getMsg',
  		data,
  	})
  })
  .catch(error => console.log(error));
}