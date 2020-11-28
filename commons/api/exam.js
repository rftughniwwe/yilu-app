import req from "@/utils/request"; // 生成推荐二维码
// 课程审核列表
export const categoryList = (params = {}) => {
  return req.post('/exam/api/exam/category/list', params)
}

// 我的试题列表
export const myproblemList = (params = {}) => {
  return req.post('/exam/auth/exam/problem/list', params)
}

// 删除试题
export const removeproblem = (params = {}) => {
  return req.post('/exam/auth/exam/problem/delete', params)
}

// 更新试题
export const updateproblem = (params = {}) => {
  return req.post('/exam/auth/exam/problem/update', params)
}

// 获取试题详情
export const getproblem = (params = {}) => {
  return req.get('/exam/auth/exam/problem/view/' + params.id)
}

// 添加试题
export const saveproblem = (params = {}) => {
  return req.post('/exam/auth/exam/problem/save', params)
}

// 审核试卷列表
export const myExamList = (params = {}) => {
  return req.post('/exam/auth/exam/audit/list', params)
}

// 添加试卷
export const saveExam = (params = {}) => {
  return req.post('/exam/auth/exam/audit/save', params)
}

// 试卷上下架
export const wayExam = (params = {}) => {
  return req.post('/exam/auth/exam/audit/is/put/way', params)
}

// 试卷更新
export const updateExam = (params = {}) => {
  return req.post('/exam/auth/exam/audit/update', params)
}

// 添加试卷里面的试题
export const saveExamRef = (params = {}) => {
  return req.post('/exam/auth/exam/audit/save/exam/ref', params)
}

// 试卷预览接口
export const getExamPreview = (id = 0) => {
  return req.post('/exam/auth/exam/audit/preview', {
    examId: id
  })
}

// 试卷中心列表
export const getExamInfoList = (params = {}) => {
  return req.post('/exam/api/exam/info/list', params)
}

// 未登录 获取试卷详情
export const getExamViewInfo = (params = {}) => {
  return req.post('/exam/api/exam/info/view', params)
}

// 已经登录 获取试卷详情
export const getAuthExamViewInfo = (params = {}) => {
  return req.post('/exam/auth/exam/view', params)
}

// 试卷收藏
export const collectExam = (id = '') => {
  return req.post('/exam/auth/exam/problem/collection/collect', {
    collectionId: id,
    collectionType: 4
  })
}

// 取消试卷收藏
export const deleteCollectExam = (data = {}) => {
  return req.post('/exam/auth/exam/problem/collection/delete', data)
}

// 试卷收藏列表
export const collectExamList = (data) => {
  data.collectionType = 4;
  return req.post('/exam/auth/exam/problem/collection/list', data)
}

// 试卷推荐
export const getRecommendList = () => {
  return req.post('/exam/api/exam/recommend/list', { collectionType: 4 })
}

// 考试完成提交接口
export const examFinish = (data) => {
  return req.post('/exam/auth/user/exam/record/examFinish', data)
}

// 继续考试
export const recordExam = (data) => {
  return req.post('/exam/auth/user/exam/record/continue', data)
}

// 保存考试试题答案
export const saveExamAnswer = (data) => {
  return req.post('/exam/auth/user/exam/record/answer/save', data)
}

// 开始考试
export const examexamOnline = (data) => {
  return req.post('/exam/auth/user/exam/record/examOnline', data)
}

// 获取用户试卷答案和参考答案
export const getExamAnswer = (recordId) => {
  return req.post('/exam/auth/user/exam/answer/view', { recordId })
}

// 获取用户试卷列表（考过 和 购买）
export const getUserExam = (data = {}) => {
  return req.post('/exam/auth/user/exam/list', data)
}

// 获取用户试卷答案和参考答案
export const getUserRecord = (data = {}) => {
  return req.post('/exam/auth/user/exam/record/list', data)
}

// 获取试题视频播放sign
export const getproblemVideoSign = (data = {}) => {
  return req.post('/exam/auth/exam/sign', data)
}

// 提交审核
export const submitAuditExam = (data = {}) => {
  return req.post('/exam/auth/exam/audit/is/submit/audit', data)
}

// 提交审核
export const examRecordCheck = (data = {}) => {
  return req.post('/exam/auth/user/exam/record/check', data)
}

// 试卷列表搜索
export const examSearchList = (data = {}) => {
  return req.post('/exam/api/exam/info/search/list', data)
}

// 用户下载试卷
export const userDownloadExam = (data = {}) => {
  return req.post('/exam/auth/user/exam/download/export', data)
}
