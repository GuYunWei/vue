export default {
	setCookie(name, value, days) {
		const exdate = new Date()
		exdate.setDate(exdate.getDate() + days)
		document.cookie = name + "=" + escape(value) + ((days == null) ? "" : ";expires=" + exdate.toGMTString())
	},
	getCookie(name) {
		if (document.cookie.length > 0) {
			let start = document.cookie.indexOf(name + "=")
			if (start != -1) {
				start = start + name.length + 1
				let end = document.cookie.indexOf(";", start)
				if (end == -1) end = document.cookie.length
				return unescape(document.cookie.substring(start, end))
			}
		}
		return ""
	},
	localItem(key, value) {
		if (arguments.length == 1) {
			return localStorage.getItem(key);
		} else {
			return localStorage.setItem(key, value);
		}
	},
	removeLocalItem(key) {
		if (key) {
			return localStorage.removeItem(key);
		}
		return localStorage.removeItem();
	},
	formatDate(str) {
		var date = new Date(str);
		var time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
		if (time < 0) {
			return '';
		} else if (time / 1000 < 60) {
			return '刚刚';
		} else if ((time / 60000) < 60) {
			return parseInt((time / 60000)) + '分钟前';
		} else if ((time / 3600000) < 24) {
			return parseInt(time / 3600000) + '小时前';
		} else if ((time / 86400000) < 31) {
			return parseInt(time / 86400000) + '天前';
		} else if ((time / 2592000000) < 12) {
			return parseInt(time / 2592000000) + '月前';
		} else {
			return parseInt(time / 31536000000) + '年前';
		}
	},
	paramType(data){
    // data['token'] = 'pt';
		let paramArr = []; 
    let paramStr = ''; 
    for (let attr in data) {
        paramArr.push(attr + '=' + data[attr]);
    }
    paramStr = paramArr.join('&');
    paramStr = '?' + paramStr;
    return paramStr;
	}
}