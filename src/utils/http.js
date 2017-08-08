import axios from "axios";
import Tool from "@/utils/Tool"

axios.defaults.baseURL = 'http://nmgjg.unilogger.cn:8070'
//设置默认请求头
axios.defaults.headers = {
	'Content-Type': 'application/json'
}
// 发送请求前处理request的数据
axios.defaults.transformRequest = [function(data) {
	let newData = ''
	for (let k in data) {
		newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
	}
	return newData
}]
// 带cookie请求
// axios.defaults.withCredentials = true

class Axios {
	static get (url) {
	  return data => Axios.connect({
	    url: url,
	    method: 'get',
	    params: data,
	  })
	}
	static post (url) {
	  return data => Axios.connect({
	      url: url,
	      method: 'post',
	      data
	    }
	  )
	}
	static async connect (data) {
		var _this = this;
	  await axios(data)
	    .then(
	      (response) => {
	        return response
	      }
	    )
	    .catch((e) => {
	      console.log(e)
	    })
	}
}

export const login = Axios.get('/privilege/access/login')