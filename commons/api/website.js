import req from "@/utils/request";
import md5 from "@/utils/md5";
import config from "@/config/index";
export const login = (params = {}) => {
  return req.post('/user/api/user/xcx/xcxLogin', params);
};

// 用户名密码登录
export const userLogin = (params = {}) => {
  return req.post('/user/api/user/login/password', params);
};

export const binding = (params = {}) => {
  let now = new Date();
  let uniconId = uni.getStorageSync('wxUniCode');
  const data = {
    timestamp: now.getTime(),
    uniconId: uniconId,
    sign: md5.hexMD5(params.password + now.getTime() + uniconId + params.username),
    ...params
  };
  return req.post('/user/api/user/xcx/xcxBinding', data);
};
export const serviceInfo = (params = {}) => {
  return req.post('/system/api/website/get', params);
};
export const sendCode = (params = '') => {
  return req.post('/user/api/user/send/code', {
    mobile: params
  });
}; // 校验验证码

export const checkCode = (params = {}) => {
  return req.post('/user/api/user/verify/send/code', params);
}; // vip列表

export const vipList = (params = {}) => {
  return req.post('/user/api/vip/set/list', params);
}; // 注册

export const register = (params = {}) => {
  return req.post('/user/api/user/register', {
    ...params
  });
}; // 修改密码

export const updatePwd = (params = {}) => {
  return req.post('/user/api/user/update/password', {
    ...params
  });
}; // 分享推荐码

export const getSharingCode = (params = {}) => {
  return req.post('/user/auth/user/ext/sharing/recommended', params);
};
