import req from "@/utils/request.js";
export const courseInfo = (params = {}) => {
  return req.post('/course/api/course/view', params);
};
export const authCourseInfo = (params = {}) => {
  return req.post('/course/auth/course/view', params);
};


export const chapterList = (params = {}) => {
  return req.post('/course/api/course/chapter/list', params);
};
export const courseList = (page = 1, pageSize = 20, params = {}) => {
  return req.post('/course/api/course/list', {
    pageCurrent: page,
    pageSize: pageSize,
    ...params
  });
};


export const categoryList = (params = {}) => {
  return req.post('/course/api/course/category/list', params);
};
export const searchList = (page = 1, pageSize = 20, params = {}) => {
  return req.post('/course/api/course/search/list', {
    pageCurrent: page,
    pageSize: pageSize,
    ...params
  });
}; // 我的课程

export const courseRefList = (page = 1, pageSize = 20, params = {}) => {
  return req.post('/course/auth/user/order/course/ref/list', {
    pageCurrent: page,
    pageSize: pageSize,
    ...params
  });
}; // 用户收藏课程分页列出

export const collectionList = (params = {}, page = 1, pageSize = 20) => {
  return req.post('/course/auth/user/collection/course/list', {
    pageCurrent: page,
    pageSize: pageSize,
    ...params
  });
}; // 用户收藏课程删除

export const collectionDelete = (params = {}) => {
  return req.post('/course/auth/user/collection/course/delet', params);
}; // 用户收藏课程添加

export const collectionSave = (params = {}) => {
  return req.post('/course/auth/user/collection/course/save', params);
};

// 下载文件
export const downloadAccessory = (params = {}) => {
  return req.post('/course/auth/course/accessory/download', params);
};