import axios from "axios";
import Tool from "@/utils/Tool"

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
axios.defaults.withCredentials = true

export default class Axios {
	static get (url, data) {
	  return Axios.connect(url, {
	    url: url,
	    method: 'get',
	    params: data,
	  })
	}
	static post (url, data) {
	  return Axios.connect(url,{
	      url: url,
	      method: 'post',
	      data: data,
	    }
	  )
	}
	static connect (data) {
		var _this = this;
	  return axios(data)
	    .then(
	      (response) => {
	        if (response.status == 200) {
	            if(response.data.status == true){
								return response.data.result;
	            }else{
								Tool.toast(_this, response.data.message);
	            }
	        } else {
	          Tool.toast(_this, response.data.message);
	        }
	      }
	    )
	    .catch((e) => {
	      console.log(e)
	    })
	}
}