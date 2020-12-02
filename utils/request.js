import config from "../config/index";
import { login, logout } from "./auth";
const createHttp = {
  post: (url, params) => {
    const token = uni.getStorageSync('userToken') || '';
    const baseUrl = config.baseUrl
    // console.log(baseUrl + url)
    const data = {
      method: 'POST',
      url: baseUrl + url,
      data: params
    };

    if (token) {
      data.header = {
        token: token
      };
    }
    return request(data);
  },
  put: (url, params) => {
    const token = uni.getStorageSync('userToken') || '';
    const baseUrl = config.baseUrl
    // console.log(baseUrl + url)
    const data = {
      method: 'put',
      url: baseUrl + url,
      data: params
    };

    if (token) {
      data.header = {
        token: token
      };
    }
    return request(data);
  }
};

const request = (params, cb) => {

  var promise = new Promise((resolve, reject) => {
    if (params.data && !params.data.noLoading) {
      uni.showLoading({
        title: '加载中'
      });
    }
	
	// console.log(params);
    uni.request({
      ...params,
      success: res => {
		  let result = res.data;
		if (params.data && params.data.is) {
			console.log(result);
			console.log(311);
		}
        uni.hideLoading();
        
        if (result.code === 200) {
          resolve(result.data);
        } else if (result.code >= 300 && result.code <= 400) {
          uni.setStorage({
            'key': 'userInfo',
            'data': null
          });
		  uni.showToast({
		    title: '登录过期',
		    icon: 'none',
			duration:1500
		  });
		  setTimeout(()=>{
			  uni.navigateTo({
			  	url:'/pages/login3/login'
			  })
		  },1500)
		  return
        } else if(result.code == 514) {
			uni.showToast({
				title: '请输入真实的名字和身份证号码',
				icon: 'none'
			})
			setTimeout(()=>{
				uni.navigateTo({
					url: 'pages/account/info/info'
				})
			}, 1500)
		} else {
          reject(result);
		  console.log(result);
          if (!!result.msg) {
            // uni.showToast({
            //   title: result.msg,
            //   icon: 'none'
            // });
          }
        }
      },
      fail: msg => {
		console.log(msg)
        uni.hideLoading();
        uni.showToast({
          title: '数据加载失败，请稍后重试',
          icon: 'none'
        });
        reject(msg);
      }
    });
  });
  return promise;
};

export default createHttp;
