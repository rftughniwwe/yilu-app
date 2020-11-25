import * as apis from "@/commons/api/website";
import * as userApis from "@/commons/api/user";

const serviceInfo = (cb) => {
  apis.serviceInfo({ platShow: 2 }).then(res => {
    // #ifdef H5
    if (isPc()) {
      // console.log(res.domain)
      window.location.href = res.domain
    }
    // #endif
    if (cb) {
      cb(res)
    }
    uni.setStorage({
      'key': 'serviceInfo',
      'data': res
    });
  });
}; // 获取通知条数
// #ifdef H5
const isPc = () => {
  const userAgentInfo = navigator.userAgent;
  const Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  let flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}
// #endif
const getMsgNum = cb => {
  userApis.getMsgNum({
    noLoading: true
  }).then(res => {
    cb(res);
  });
};

module.exports = {
  serviceInfo: serviceInfo,
  msgNum: getMsgNum
};
