<!-- 设置单位信息 -->
<template>
	<view class="main">
		<view class="topic">
			欢迎登录宜陆
		</view>
		<view class="form-content">
			<view class="subtitle">
				您的身份证号
			</view>
			<input class="idcard" type="text" v-model="inputIdcard" placeholder="请输入您的身份证号" />
			<template v-if="company">
				<view class="subtitle">
					您的工作单位
				</view>
				<view class="idcard">
					{{company}}
				</view>
			</template>
			
		</view>
		<view class="comfirm">
			<view class="btn" @click="goNextPager">
				{{company?'进入首页':'确定'}}
			</view>
		</view>
	</view>
</template>

<script>
	import nextPageBtn from '../../components/nextPageBtn/nextPageBtn.vue'
	import {
		httpRequest
	} from '../../utils/httpRequest.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	import {
		setUserInfomation
	} from '@/commons/api/apis.js'
	import {
		getUserLoginInfo
	} from '../../utils/util.js'
	import Toast from '@/commons/showToast.js'
	export default {
		data() {
			return {
				inputIdcard:'',
				company:'',
				phoneNum:'',
				userfaceimg:'',
				username:''
			};
		},
		onLoad(options) {
			this.userfaceimg = options.userimg
		},
		methods: {
			goNextPager() {
				if(this.company){
					uni.reLaunch({
						url:'../tabBar/index'
					})
				}else {
					let id = this.inputIdcard
					if(!id || id.length < 18){
						uni.showToast({
							title:"请输入正确的身份证号",
							icon:'none'
						})
						return
					}
					this.getCompanyById(id)
				}
			},
			// 根据身份证号获取服务单位
			getCompanyById(id) {
				httpRequest({
					url: 'user/api/compUser/selectCompByIdCard',
					data: {
						idCard: id
					},
					method: 'POST',
					success: res => {
						console.log('查询服务单位：', res)
						if (res.data.code == 200) {
							this.setCompany(res.data.data)
							this.idCardSave()
							this.company = res.data.data.compName
						} else {
							request_success(res)
						}
					},
					fail: err => {
						request_err(err, '查询服务单位失败')
					}
				}, 1)
			},
			// 设置身份证信息
			idCardSave() {
			
				let datas = {
					"idcardNum": this.inputIdcard,
					"userId": getUserLoginInfo('userNo')
				}
				console.log('保存信息参数:', datas)
				httpRequest({
					url: 'user/api/tbSysIdCard/save',
					method: 'POST',
					data: datas,
					success: (res) => {
						console.log('保存信息成功：', res)
						if (res.data.code == 200) {
							
						} else {
							Toast({
								title: res.data.msg
							})
						}
					},
					fail: (err) => {
						console.log('保存信息失败', err)
						Toast({
							title: "保存信息失败"
						})
					}
				}, 1)
			},
			
			// 设置服务单位
			setCompany(data) {
				if(!data || !data.compId){
					uni.showModal({
						title:'提示',
						content:'查找不到您的单位信息，请联系单位管理员。',
						showCancel:false,
						confirmText:'我知道了',
						success:res=>{
						}
					})
					return
				}
				// let infoStorage = uni.getStorageSync('loginUserBasicInfo')
				// let info = infoStorage
				let p = uni.getStorageSync('userloginphonenumber')
				
				let params = {
					mobile: p,
					userNo: getUserLoginInfo('userNo'),
					compId: data.compId,
					headImgUrl:this.userfaceimg,
					nickname:data.userName
				}
				console.log('zxiuchzxcjknsdkjf',params)
				setUserInfomation(params).then(res => {
					console.log('oaisdfhnksjd',res)
					if (res.data.code == 200) {
						uni.setStorageSync('userCompleteInfo', 1)
						Toast({
							title: '保存成功',
							duration:1000
						})
					} else {
						request_success(res)
					}
				}, err => {
					console.log('请求失败：', err)
				})
			},
		}
	}
</script>

<style lang="scss">
	.main{
		margin: 40rpx 50rpx;
	}
	.topic{
		font-size: 44rpx;
		color: #333333;
		margin-bottom: 30rpx;
		font-weight: bold;
	}
	.subtitle{
		color: #999999;
		font-size: 24rpx;
		margin-top: 30rpx;
	}
	.comfirm {
		padding: 40rpx 0;
	}
	.idcard{
		border-bottom: 2rpx solid #ddd;
		padding: 14rpx 6rpx;
		font-size: 32rpx;
		color: #333333;
	}
	.btn{
		background: #3CA7FF;
		color: #FFFFFF;
		border: 1px solid #3CA7FF;
		font-size: 36rpx;
		margin: 30rpx 0;
		text-align: center;
		padding: 20rpx 0;
		letter-spacing: 2rpx;
		border-radius: 9999rpx;
	}
</style>
