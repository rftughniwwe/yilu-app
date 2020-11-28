import req from "@/utils/request"; // 生成推荐二维码

export const joinGrade = (params = {}) => {
    return req.post('/exam/auth/grade/student/grade/add', params);
}; // 加入班级

export const quitGrade = (params = {}) => {
    return req.put('/exam/auth/grade/student/quit', params);
}; // 退出班级

export const gradeList = (params = {}) => {
    return req.post('/exam/auth/grade/info/grade/list/all', params);
}; // 学生班级

// 学生的的班级试卷列表
export const StudentGradeExamList = (params = {}) => {
  return req.post('/exam/auth/grade/exam/student/relation/page', params)
}

// 获取考试记录详情
export const examRelationView = (params = {}, token) => {
  return req.post('/exam/auth/grade/exam/student/relation/view', params)
}

// 继续考试
export const continueExam = (params = {}) => {
  return req.post('/exam/auth/grade/exam/student/relation/continue', params)
}

// 开始考试
export const beginExam = (params = {}) => {
  return req.post('/exam/auth/grade/exam/student/relation/begin', params)
}

// 考试保存答案
export const saveExamAnswer = (params = {}) => {
  return req.post('/exam/auth/grade/student/exam/answer/save', params)
}

// 提交考试
export const submitExam = (params = {}) => {
  return req.post('/exam/auth/grade/exam/student/relation/submit/audit', params)
}

// 查看系统评分详情
export const relationExamScore = (params = {}) => {
  return req.post('/exam/auth/grade/exam/student/relation/view/score', params)
}

// 查看试卷答案
export const getStudentAnswer = (params = {}) => {
  return req.post('/exam/auth/grade/student/exam/answer/view', params)
}

	