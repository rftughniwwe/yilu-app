import req from "@/utils/request"; 

// 获取课程列表活动角标
export const getCourseListMark = (params = {}) => {
  return req.post('/marketing/api/act/mark', params)
}
// 获取课程活动详情
export const courseACTInfo = (params = {}) => {
  return req.post('/marketing/api/act/zone/course/view', params)
}
// 领取优惠券
export const bindCoupon = (params = {}) => {
  return req.post('/marketing/auth/actCouponUser/bind', params)
}
// 用户可参与活动
export const userACTList = (params = {}) => {
  return req.post('/marketing/auth/act/view', params)
}
// 当前进行中的活动
export const nowACTView = (params = {}) => {
  return req.post('/marketing/api/act/view', params)
}
