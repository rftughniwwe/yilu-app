<template>
	<view class="main-base">
		<view class="item-content">

			<view class="info-item flex-between">
				<view class="header">
					姓名
				</view>
				<view class="input-content">
					<input type="text" maxlength="10" v-model="name" placeholder="请填写" />
				</view>
			</view>
			<view class="info-item flex-between">
				<view class="header">
					性别
				</view>
				<view class="input-content">
					<radio-group name="gender" @change="genderChange">
						<label class="first-label">
							<radio :value="1" :checked="gender==1"/><text>男</text>
						</label>
						<label>
							<radio :value="2" :checked="gender==2"/><text>女</text>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="info-item flex-between">
				<view class="header">
					手机号
				</view>
				<view class="input-content">
					<input type="number" maxlength="11" v-model="phoneNum" placeholder="请填写" />
				</view>
			</view>
			<view class="info-item flex-between">
				<view class="header">
					服务单位
				</view>
				<view class="input-content xbl">
					<input type="text" maxlength="30" @input="companyInput" v-model="company" placeholder="请填写" />
				</view>
			</view>
			<view class="company-list" v-show="companyArr && companyArr.length > 0">
				<scroll-view scroll-y="true" class="company-scroll">
					<view class="title" v-for="(item,index) in companyArr" :key='index' @click="itemSelected(item)">
						{{item.unitName}}
					</view>
				</scroll-view>
			</view>

		</view>
		<nextPageBtn @goNextPage='goNextPager'></nextPageBtn>
	</view>
</template>

<script>
	import nextPageBtn from '../../components/nextPageBtn/nextPageBtn.vue'
	import {
		REG_PHONE,
		getUserLoginInfo
	} from '../../utils/util.js'
	import {
		queryUnitName
	} from '../../commons/api/apis.js'
	import Toast from '../../commons/showToast.js'
	import {
		httpRequest
	} from '../../utils/httpRequest.js'
	
	export default {
		data() {
			return {
				name: '',
				gender: '1',
				phoneNum: '',
				company: '',
				companyArr: [],
			};
		},
		components: {
			nextPageBtn
		},
		onLoad() {
			this.queryInfo()
		},
		methods: {
			// 添加或修改个人基本信息
			goNextPager() {
				let obj = {
					compId: this.compId,
					mobile: this.phoneNum,
					nickname: this.name,
					sex: this.gender,
					userNo: getUserLoginInfo('userNo'),
					userType:1
				}

				if (!this.name || !this.company) {
					uni.showToast({
						title: '姓名服务单位不能为空',
						icon: 'none'
					})
					return
				}
				if (!REG_PHONE.test(this.phoneNum)) {
					uni.showToast({
						title: "手机号格式不正确",
						icon: "none"
					})
					return
				}
				uni.showLoading({
					title: '处理中...'
				})
				
				httpRequest({
					url: '/user/api/user/perfect/basicInfo',
					method: 'POST',
					data: obj,
					success: (res) => {

						uni.hideLoading()
						if (res.data.code == 200) {
							console.log('基本信息修改成功：', res)
							
							uni.navigateTo({
								url: '../documentRegistration/idCardRegister'
							})
						} else {
							console.log('添加错误', res)
							Toast({
								title: res.data.msg
							})
						}
					},
					fail: (err) => {
						uni.hideLoading()
						console.log('请求失败：', err)
					}
				})


			},
			
			// 查询
			queryInfo(){
				let userno = getUserLoginInfo('userNo')
				httpRequest({
					url:'/user/api/user/perfect/getBasicInfo?userNo='+userno,
					method:'POST',
					success:resp=>{
						console.log('resp:',resp)
						if(resp.data.code == 200){
							if(resp.data.data){
								let _data = resp.data.data
								// this.compId = _data.compId
								this.phoneNum = _data.mobile
								this.name = _data.nickname
								this.gender = _data.sex
							}
						}
					},
					fail:err=>{
						console.log('请求失败',err)
						Toast({
							title:'请求失败'
						})
					}
				})
			},
			
			genderChange(e) {
				this.gender = e.detail.value
			},
			// 服务单位模糊查询
			companyInput(e) {
				let val = e.detail.value
				if (val == '') {
					this.companyArr = []
					return
				}
				queryUnitName(val).then((res) => {

					if (res.data.code == 200) {
						this.companyArr = res.data.data
					} else {
						Toast({
							title: res.data.msg
						})
					}
				}, (err) => {
					console.log('查询公司失败', err)
					Toast({
						title: '查询公司失败'
					})
				})
			},
			
			itemSelected(item) {
				console.log('item', item)
				this.company = item.unitName
				this.compId = item.unitId
				this.companyArr = []
			}
		}
	}
</script>

<style lang="scss">
	/* 填写基本信息 */
	.main-base {
		padding: 10rpx 50rpx;
		// width: 100%;
	}

	.item-content {
		margin-bottom: 100rpx;

		.first-label {
			margin-right: 30rpx;
		}
	}

	.input-content {
		input {
			text-align: right;
		}
	}

	.header {
		color: $uni-text-color;
		font-weight: bold;
		font-size: 34rpx;

	}

	.company-scroll {
		width: 100%;
		height: 600rpx;
	}

	.title {
		border-bottom: 2rpx solid #eaeaea;
		padding: 20rpx 0;
		font-size: 30rpx;
		color: #666;
	}

	.xbl {
		width: 70%;
	}
</style>
