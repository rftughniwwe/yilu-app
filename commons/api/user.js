import req from "@/utils/request.js";
import config from "@/config/index";
export const register = (params = {}) => {
  return req.post('/user/api/user/register', {
    ...params
  });
};
export const updatePwd = (params = {}) => {
  return req.post('/user/api/user/update/password', {
    ...params
  });
};
export const getUserInfo = (params = {}) => {
  return req.post('/user/auth/user/ext/view', params);
};
export const getMsgNum = (params = {}) => {
  return req.post('/user/auth/msg/user/num', params);
};
export const getVideoSign = (params = {}) => {
  return req.post('/course/auth/course/sign', params);
}; // 修改用户信息

export const changeUserInfo = (params = {}) => {
  return req.post('/user/auth/user/ext/update', params);
}; // 我的通知

export const myMessageList = (params = {}) => {
  return req.post('/user/auth/msg/user/list', params);
};

// 站内信详情
export const messageInfo = (params = {}) => {
  return req.post('/user/auth/msg/user/read', params);
}; // 银行卡信息

export const cardInfo = (params = {}) => {
  return req.post('/user/auth/user/account/view', params);
}; // 绑定银行卡

export const addCard = (params = {}) => {
  return req.post('/user/auth/user/account/update', params);
}; // 订单收益

export const orderHisList = (params = {}) => {
  return req.post('/user/auth/order/info/lecturer', params);
}; // 提现记录

export const cashList = (params = {}) => {
  return req.post('/user/auth/user/account/extract/log/list', params);
}; // 申请提现

export const getCash = (params = {}) => {
  return req.post('/user/auth/user/account/extract/log/save', params);
};
export const orderList = (params = {}, page = 1, pageSize = 20) => {
  return req.post('/user/auth/order/info/list', {
    pageCurrent: page,
    pageSize: pageSize,
    ...params
  });
};
export const studyLog = (params = {}, page = 1, pageSize = 20) => {
  return req.post('/data/auth/course/log/list', {
    pageCurrent: page,
    pageSize: pageSize,
    ...params
  });
};
export const courseInfo = (params = {}) => {
  return req.post('/course/auth/course/view', params);
};
export const chapterList = (params = {}) => {
  return req.post('/course/auth/course/chapter/page', params);
};
export const getCourseSign = (params = {}) => {
  return req.post('/course/auth/course/sign', params);
};
export const saveOrder = (params = {}) => {
  return req.post('/user/auth/order/info/pay', params);
}; // 继续支付

export const continuePay = (params = {}) => {
  return req.post('/user/auth/order/info/continue/pay', params);
}; // 取消支付

export const closePay = (params = {}) => {
  return req.post('/user/auth/order/info/close', params);
}; // 购买VIP

export const saveVipOrder = (params = {}) => {
  return req.post('/user/auth/user/order/pay', params);
}; // 直播频道

export const getLiveUrl = (params = {}) => {
  return req.post('/course/auth/course/getLiveUrl', params);
}; 

// 获取直播回放链接接口
export const getPlaybackUrl = (params = {}) => {
  return req.post('/course/auth/course/getPlaybackUrl', params);
}; 

// 用戶关注讲师记录分页列出
export const attentionList = (params = {}, page = 1, pageSize = 20) => {
  return req.post('/user/auth/lecturer/attention/list', {
    pageCurrent: page,
    pageSize: pageSize,
    ...params
  });
}; // 用戶关注讲师删除

export const attentionDelete = (params = {}) => {
  return req.post('/user/auth/lecturer/attention/delete', params);
}; // 关注讲师

export const attentionSave = (params = {}) => {
  return req.post('/user/auth/lecturer/attention/save', params);
}; // 我的推荐

export const recommendList = (params = {}) => {
  return req.post('/user/auth/user/recommended/list', params);
};

export const saveCourseLog = (params = {}) => {
  return req.post('/data/auth/course/log/save', params);
};
// 观看课程活体认证
export const verifyFace = (params = {}) => {
  return req.post('/user/auth/user/ext/face/contras', params)
}


// 用户签到人脸提交记录
export const faceSignLog = (params = {}) => {
  return req.post('/course/auth/face/sign/log/save', params)
}
// 用户验证人脸提交记录
export const faceUserLog = (params = {}) => {
  return req.post('/user/auth/user/ext/face/contrast/save', params)
}

// 获取人脸识别参数
export const getFaceData = (params = {}) => {
  return req.post('/user/auth/user/ext/face/contrast/get', params)
}





