
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/normalLogin","pages/documentRegistration/driverLicense","pages/documentRegistration/idCardRegister","pages/onSiteTraining/signInPage","pages/tabBar/index","pages/leaderBoard/leaderBoard","pages/examQuestion/examQuestion","pages/onSiteTraining/monthlySummary","pages/fillInfomation/fillInfomation","pages/paymentPage/paymentPage","pages/documentRegistration/jobLicense","pages/login/codeLogin","pages/login3/login","pages/livebroadcast/livebroadcast","pages/login/fastLogin","pages/login/getPhoneCode","pages/userAgreement/userAgreement","pages/resetPassword/resetPassword","pages/login/faceLogin","pages/tabBar/user","pages/tabBar/learn","pages/searchFor/searchFor","pages/aiticlePage/aiticlePage","pages/specialTopic/speacialTopicPage","pages/specialTopic/specialTopicDetail","pages/userInfomation/userInfomation","pages/userInfomation/userEditorName","pages/settting/settting","pages/settting/changePhoneNumber","pages/settting/setFontSize","pages/user/myNews/myNews","pages/user/myCourse","pages/user/myCollect","pages/user/myOrder/myOrder","pages/user/learningMaterials/learningMaterials","pages/user/absoutUs","pages/user/feedback","pages/onSiteTraining/onSiteTraining","pages/onSiteTraining/courseDetails","pages/onSiteTraining/examBegin","pages/onSiteTraining/examResult","pages/user/coursePreview","pages/user/myNews/newsDetail","pages/user/mySignInPage/mySignInPage","pages/user/mySignInPage/mySignInDetail","pages/course/list/list","pages/course/view/view","pages/verifyFace/verifyFace","pages/exam/gradeResult","pages/exam/details","pages/exam/startExam","pages/exam/result","pages/exam/explain","pages/exam/pay","pages/exam/examInfo","pages/exam/list","pages/playVideo/playVideo","pages/course/live/live","pages/webview/webview","pages/allNews/allNews","pages/user/myTraining/myTraining"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"宜陆","navigationBarBackgroundColor":"#fff","backgroundColor":"#fff"},"tabBar":{"color":"#999999","selectedColor":"#3CA7FF","backgroundColor":"#FFFFFF","list":[{"pagePath":"pages/tabBar/index","text":"资讯","iconPath":"./static/index-news-no.png","selectedIconPath":"./static/index-news.png"},{"pagePath":"pages/tabBar/learn","text":"学习","iconPath":"./static/learn.png","selectedIconPath":"./static/learn-selected.png"},{"pagePath":"pages/tabBar/user","text":"我的","iconPath":"./static/user.png","selectedIconPath":"./static/user-selected.png"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":false,"autoclose":false},"appname":"宜陆","compilerVersion":"2.9.8","entryPagePath":"pages/login/normalLogin","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/normalLogin","meta":{"isQuit":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/documentRegistration/driverLicense","meta":{},"window":{"navigationBarTitleText":"驾驶证上传"}},{"path":"/pages/documentRegistration/idCardRegister","meta":{},"window":{"navigationBarTitleText":"身份证上传"}},{"path":"/pages/onSiteTraining/signInPage","meta":{},"window":{"enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/tabBar/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/leaderBoard/leaderBoard","meta":{},"window":{"navigationBarTitleText":"排行榜","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#50ADFE","enablePullDownRefresh":false}},{"path":"/pages/examQuestion/examQuestion","meta":{},"window":{"enablePullDownRefresh":false}},{"path":"/pages/onSiteTraining/monthlySummary","meta":{},"window":{"navigationBarTitleText":"月汇总","enablePullDownRefresh":false}},{"path":"/pages/fillInfomation/fillInfomation","meta":{},"window":{"navigationBarTitleText":"基本信息"}},{"path":"/pages/paymentPage/paymentPage","meta":{},"window":{"navigationBarTitleText":"支付详情","enablePullDownRefresh":false,"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#3CA7FF"}},{"path":"/pages/documentRegistration/jobLicense","meta":{},"window":{"navigationBarTitleText":"从业资格证上传"}},{"path":"/pages/login/codeLogin","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/login3/login","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/livebroadcast/livebroadcast","meta":{},"window":{}},{"path":"/pages/login/fastLogin","meta":{},"window":{}},{"path":"/pages/login/getPhoneCode","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/userAgreement/userAgreement","meta":{},"window":{"navigationBarTitleText":"用户协议"}},{"path":"/pages/resetPassword/resetPassword","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/login/faceLogin","meta":{},"window":{"navigationBarTitleText":"人脸采集"}},{"path":"/pages/tabBar/user","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/tabBar/learn","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/searchFor/searchFor","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/aiticlePage/aiticlePage","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/specialTopic/speacialTopicPage","meta":{},"window":{"navigationBarTitleText":"精选专题"}},{"path":"/pages/specialTopic/specialTopicDetail","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/userInfomation/userInfomation","meta":{},"window":{"navigationBarTitleText":"个人信息","enablePullDownRefresh":false}},{"path":"/pages/userInfomation/userEditorName","meta":{},"window":{"navigationBarTitleText":"设置昵称","enablePullDownRefresh":false}},{"path":"/pages/settting/settting","meta":{},"window":{"navigationBarTitleText":"设置","enablePullDownRefresh":false}},{"path":"/pages/settting/changePhoneNumber","meta":{},"window":{"navigationBarTitleText":"修改手机号","enablePullDownRefresh":false}},{"path":"/pages/settting/setFontSize","meta":{},"window":{"navigationBarTitleText":"字体大小","enablePullDownRefresh":false}},{"path":"/pages/user/myNews/myNews","meta":{},"window":{"navigationBarTitleText":"系统消息","enablePullDownRefresh":false}},{"path":"/pages/user/myCourse","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/user/myCollect","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/user/myOrder/myOrder","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/user/learningMaterials/learningMaterials","meta":{},"window":{"navigationBarTitleText":"学习资料","enablePullDownRefresh":false}},{"path":"/pages/user/absoutUs","meta":{},"window":{"navigationBarTitleText":"关于我们","enablePullDownRefresh":false}},{"path":"/pages/user/feedback","meta":{},"window":{"navigationBarTitleText":"意见反馈","enablePullDownRefresh":false}},{"path":"/pages/onSiteTraining/onSiteTraining","meta":{},"window":{"navigationBarTitleText":"现场培训","enablePullDownRefresh":false}},{"path":"/pages/onSiteTraining/courseDetails","meta":{},"window":{"navigationBarTitleText":"课程详情","enablePullDownRefresh":false}},{"path":"/pages/onSiteTraining/examBegin","meta":{},"window":{"navigationBarTitleText":"试卷详情","enablePullDownRefresh":false}},{"path":"/pages/onSiteTraining/examResult","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/user/coursePreview","meta":{},"window":{"navigationBarTitleText":"课程详情","enablePullDownRefresh":false}},{"path":"/pages/user/myNews/newsDetail","meta":{},"window":{"navigationBarTitleText":"我的消息","enablePullDownRefresh":false}},{"path":"/pages/user/mySignInPage/mySignInPage","meta":{},"window":{"navigationBarTitleText":"我的签到","enablePullDownRefresh":false}},{"path":"/pages/user/mySignInPage/mySignInDetail","meta":{},"window":{"navigationBarTitleText":"我的签到","enablePullDownRefresh":false}},{"path":"/pages/course/list/list","meta":{},"window":{}},{"path":"/pages/course/view/view","meta":{},"window":{}},{"path":"/pages/verifyFace/verifyFace","meta":{},"window":{"navigationBarTitleText":"人脸识别"}},{"path":"/pages/exam/gradeResult","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/exam/details","meta":{},"window":{"navigationBarTitleText":"试卷详情"}},{"path":"/pages/exam/startExam","meta":{},"window":{}},{"path":"/pages/exam/result","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/exam/explain","meta":{},"window":{}},{"path":"/pages/exam/pay","meta":{},"window":{}},{"path":"/pages/exam/examInfo","meta":{},"window":{}},{"path":"/pages/exam/list","meta":{},"window":{}},{"path":"/pages/playVideo/playVideo","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/course/live/live","meta":{},"window":{"pageOrientation":"auto","resizable":"auto"}},{"path":"/pages/webview/webview","meta":{},"window":{}},{"path":"/pages/allNews/allNews","meta":{},"window":{"navigationBarTitleText":"资讯","enablePullDownRefresh":false}},{"path":"/pages/user/myTraining/myTraining","meta":{},"window":{"navigationBarTitleText":"我的培训","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
