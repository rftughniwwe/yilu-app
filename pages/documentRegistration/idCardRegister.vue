<!-- 身份证识别 -->
<template>
	<view class="main">
		<topTips :text='text' align='center'></topTips>

		<view class="id-card-content flex-around" :style="{backgroundImage:'url('+tempPathBack+')'}" @click="beginShoot(1)">
			<view class="center-image-txt">
				<image src="../../static/camera.png" mode=""></image>
				<view class="txt">
					拍摄人像面
				</view>
			</view>
		</view>
		<view class="id-card-content flex-around" :style="{backgroundImage:'url('+tempPathFront+')'}" @click="beginShoot(2)">
			<view class="center-image-txt">
				<image src="../../static/camera.png" mode=""></image>
				<view class="txt">
					拍摄国徽面
				</view>
			</view>
		</view>
		<view class="edit-infomation" v-if="flag1 || flag2">
			<view class="bottom-tips">
				请确认您的个人信息，若有误请点击修改
			</view>
			<view class="edit-input-content">
				<view class="info-item flex-between">
					<view class="header">
						姓名
					</view>
					<view class="input-content">
						<input type="text" maxlength="10" v-model="cardName" placeholder-style="{fontSize: 34rpx,color: #999}"
						 placeholder="请填写姓名" />
					</view>
				</view>
				<view class="info-item flex-between">
					<view class="header">
						性别
					</view>
					<view class="input-content">
						<!-- <input type="text" maxlength="10" v-model="cardGender" value="" placeholder="请填写" /> -->
						<picker mode="selector" :range="genderData" @change="genderChange">
							<view :class="cardGender?'picker-text-normal':'picker-text'">{{cardGender?cardGender:'请选择性别'}}</view>
						</picker>
					</view>
				</view>
				<view class="info-item flex-between">
					<view class="header">
						民族
					</view>
					<view class="input-content">
						<picker mode="selector" :range="nationData" @change="nationChange">
							<view :class="cardNation?'picker-text-normal':'picker-text'">{{cardNation?cardNation:'请选择民族'}}</view>
						</picker>
					</view>
				</view>
				<view class="info-item flex-between">
					<view class="header">
						出生年月
					</view>
					<view class="input-content">
						<picker mode="date" fields="day" @change="dateChange">
							<view :class="cardBirthday?'picker-text-normal':'picker-text'">{{cardBirthday?cardBirthday:'请选择出生年月'}}</view>
						</picker>
					</view>
				</view>
				<view class="info-item flex-between">
					<view class="header">
						身份证号
					</view>
					<view class="input-content xxxxx">
						<input type="text" maxlength="18" v-model="cardId" value="" placeholder="请填写身份证号" />
					</view>
				</view>
				<view class="info-item flex-between">
					<view class="header">
						证件地址
					</view>
					<view class="input-content xxxxx">
						<!-- <input type="text" maxlength="40" v-model="cardAddress" value="" placeholder="请填写证件地址" /> -->
						<textarea value="" placeholder="" v-model="cardAddress" placeholder="请填写证件地址" auto-height />
						</view>
				</view>
				<view class="info-item flex-between">
					<view class="header">
						有效期至
					</view>
					<view class="input-content">
						<!-- <input type="text" v-model="cardUseday" value="" placeholder="请填写有效期" /> -->
						<picker mode="date" fields="day" @change="validDateChange">
							<view :class="cardUseday?'picker-text-normal':'picker-text'">{{cardUseday?cardUseday:'请选择有效期'}}</view>

						</picker>
					</view>
				</view>
			</view>
		</view>
		<view class="next">
			<nextPageBtn @goNextPage='goNextPager'></nextPageBtn>
		</view>
	</view>
</template>

<script>
	import nextPageBtn from '../../components/nextPageBtn/nextPageBtn.vue'
	import {
		NATION,
		toBase64,
		dateFormat,
		getUserLoginInfo,
		getRandomDigits
	} from '../../utils/util.js'
	import Toast from '../../commons/showToast.js'
	import topTips from '../../components/fill-info-toptipe/fill-info-toptipe.vue'
	import {
		httpRequest,
		ID_CARD_OCR,
		getAcceessToken,
		BD_OCR_KEY,
		BD_OCR_SECRET,
		OCR_Request,
		uploadImage
	} from '../../utils/httpRequest.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	import {
		setUserInfomation
	} from '@/commons/api/apis.js'
	const app = getApp().globalData
	export default {
		data() {
			return {
				text: '',
				tempPathBack: '../../static/id-card-back.png',
				tempPathFront: '../../static/id-card-front.png',
				tempPathBack_upload: '',
				tempPathFront_upload: '',
				cardName: '',
				cardGender: '',
				cardNation: '',
				cardBirthday: '',
				cardId: '',
				cardAddress: '',
				cardUseday: '',
				flag1: false,
				flag2: false,
				genderData: ['男', '女'],
				nationData: [],
			};
		},
		components: {
			nextPageBtn,
			topTips
		},
		onLoad(options) {
			this.text = `请上传${options.name || '本人'}的身份证正反面照片`
			this.nationData = NATION
			this.queryIdCardInfo()
		},
		methods: {
			setIdCardInfo(){
				httpRequest({
					url: 'user/auth/user/ext/update',
					method: 'post',
					data: {
						userNo: getUserLoginInfo('userNo'),
						idCardName: this.cardName,
						idCardNo: this.cardId
					},
					success: res => {
						console.log('修改身份证号：',res)
						if (res.data.code == 200) {
							uni.setStorageSync('userBasicInfo', res.data.data)
						}
					},
					fail: err => {
						console.log('错误', err)
					}
				}, 1)
			},
			// 下一步
			goNextPager() {
				let data = this.judgeData()
				if (data) {
					uni.showModal({
						title: '确认信息',
						content: '确认信息无误并提交？',
						success: (res) => {
							if (res.confirm) {
								this.idCardSave(data)
							}
						}
					})

				}

			},
			// 身份证信息查看
			queryIdCardInfo() {
				let userno = getUserLoginInfo('userNo');
				httpRequest({
					url: 'user/api/tbSysIdCard/view?userid=' + userno,
					success: resp => {
						console.log('resp:', resp)
						if (resp.data.code == 200) {

							if (resp.data.data) {
								let _data = resp.data.data
								this.flag1 = _data.idcardFront ? true : false
								this.flag2 = _data.idcardBack ? true : false
								this.cardName = _data.name;
								this.cardGender = _data.sex==1?'男':'女';
								this.cardNation = _data.nation;
								this.cardBirthday = _data.dateBirth;
								this.cardId = _data.idcardNum;
								this.cardAddress = _data.adresss;
								this.cardUseday = _data.indate;
								this.tempPathFront_upload = _data.idcardFront;
								this.tempPathBack_upload = _data.idcardBack;
								this.tempPathBack = _data.idcardBack || '../../static/id-card-back.png';
								this.tempPathFront = _data.idcardFront || '../../static/id-card-front.png';
							}
						}
					},
					fail: err => {
						console.log('请求失败', err)
						Toast({
							title: '请求失败'
						})
					}
				}, 1)
			},

			// 保存信息
			idCardSave(data) {

				let datas = {
					"adresss": data.cardAddress,
					"dateBirth": data.cardBirthday,
					"idcardBack": data.cardBackImg,
					"idcardFront": data.cardFrontImg,
					"idcardNum": data.cardId,
					"indate": data.cardUseday,
					"name": data.cardName,
					"nation": data.cardNation,
					"sex": data.cardGender == '男' ? 1 : 2,
					"userId": getUserLoginInfo('userNo')
				}
				console.log('保存信息:', datas)
				uni.showLoading({
					title: '保存中...',
					mask:true
				})
				httpRequest({
					url: 'user/api/tbSysIdCard/save',
					method: 'POST',
					data: datas,
					success: (res) => {
						uni.hideLoading()
						console.log('保存成功：', res)
						if (res.data.code == 200) {
							this.setIdCardInfo()
							Toast({
								title: '保存成功',
								icon: 'success',
								mask: true
							})
							setTimeout(() => {
								uni.navigateTo({
									url: `./driverLicense`
								})
							}, 1500)
							// this.getCompanyById(data.cardId)
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
			// 根据身份证号获取服务单位
			getCompanyById(id) {
				httpRequest({
					url: 'user/api/compUser/selectCompByIdCard',
					data: {
						idCard: id
					},
					method: 'POST',
					success: res => {
						console.log('查询成功zz：', res)
						if (res.data.code == 200) {
							this.setCompany(res.data.data)
							
						} else {
							request_success(res)
						}
					},
					fail: err => {
						request_err(err, '查询服务单位失败')
					}
				}, 1)
			},

			// 设置服务单位
			setCompany(data) {
				if(!data || !data.compId){
					uni.showModal({
						title:'提示',
						content:'您没有所属的服务单位，请联系管理人员添加',
						cancelText:'暂时不用',
						confirmText:'确定',
						success:res=>{
							if(res.cancel){
								// #ifdef APP-PLUS
									plus.runtime.quit()
								// #endif
							}
						}
					})
					return
				}
				let infoStorage = uni.getStorageSync('loginUserBasicInfo')
				let info = infoStorage
				info.compId = parseInt(data.compId)
				setUserInfomation(info).then(res => {
					console.log('xiba',res)
					if (res.data.code == 200) {

						
					} else {
						request_success(res)
					}
				}, err => {
					console.log('请求失败：', err)
				})
			},

			// 开始拍摄
			beginShoot(num) {
				let that = this

				uni.chooseImage({
					count: 1,
					sizeType: 'compressed',
					success(tempFilePaths) {
						uni.showLoading({
							title: '处理中...',
							mask: true
						})
						num === 1 ? that.tempPathBack = tempFilePaths.tempFilePaths[0] : that.tempPathFront = tempFilePaths.tempFilePaths[
							0]

						toBase64(tempFilePaths.tempFilePaths[0], (r) => {
							let original = r
							let result = original.split(',')[1]
							let ocrtoken = uni.getStorageSync('ocr_token')

							// ocr 识别图片
							OCR_Request(ID_CARD_OCR, {
								'image': result,
								'id_card_side': num === 1 ? 'front' : 'back'
							}).then((res) => {

								uni.hideLoading()
								let data = res.data
								if (data.image_status === 'non_idcard') {
									Toast({
										title: '识别失败，请重试或手动填写'
									})
									return
								} else if (data.idcard_number_type === 0) {
									Toast({
										title: '身份证证号识别错误'
									})
								} else if (data.idcard_number_type === 2) {
									Toast({
										title: '身份证号和性别、出生信息不一致'
									})
								} else if (data.idcard_number_type === 3) {
									Toast({
										title: '身份证号和出生信息不一致'
									})
								} else if (data.idcard_number_type === 4) {
									Toast({
										title: '身份证号和性别信息不一致'
									})
								}

								uploadImage('course/api/upload/pic', 'picFile', tempFilePaths.tempFilePaths[0], {}).then((respones) => {
									let img_data = JSON.parse(respones.data)
									console.log('上传图片成功：', img_data)
									if (img_data.code == 200) {

										if (num === 1) {
											that.cardName = data.words_result.姓名 ? data.words_result.姓名.words : ''
											that.cardGender = data.words_result.性别 ? data.words_result.性别.words : ''
											that.cardNation = data.words_result.民族 ? data.words_result.民族.words : ''
											that.cardBirthday = data.words_result.出生 ? dateFormat(data.words_result.出生.words, '-', '-') : ''
											that.cardId = data.words_result.公民身份号码 ? data.words_result.公民身份号码.words : ''
											that.cardAddress = data.words_result.住址 ? data.words_result.住址.words : ''
											that.flag1 = true
											// 上传后的图片
											that.tempPathBack_upload = img_data.data
										} else {
											that.cardUseday = dateFormat(data.words_result.失效日期.words, '-', '-')
											that.flag2 = true
											// 上传后的图片
											that.tempPathFront_upload = img_data.data
										}

										Toast({
											title: '图片上传成功'
										})
									} else {
										Toast({
											title: img_data.msg
										})
									}
								}, (err) => {
									console.log('上传失败，请重试', err)
									Toast({
										title: "上传失败，请重试"
									})
								})



							}, err => {
								console.log('OCR失败', err)
								uni.hideLoading()
								uni.showToast({
									title: '识别失败请尝试手动填写',
									icon: 'none'
								})
							})
						})



					},
					fail(err) {
						console.log(err)
					},
					complete() {}
				})
			},
			// 数据合法性验证
			judgeData() {
				if (!this.flag1) {
					Toast({
						title: '请拍摄或上传人像面'
					})
					return
				} else if (!this.flag2) {
					Toast({
						title: '请拍摄或上传国徽面'
					})
					return
				}
				let realidcard =  uni.getStorageSync('userCompanyInfo').idCard
				if(this.cardId != realidcard){
					Toast({
						title: '请填写本人的身份证信息'
					})
					return
				}
				if (!this.cardName) {
					Toast({
						title: '请填写姓名'
					})
					return
				} else if (!this.cardGender) {
					Toast({
						title: '请选择性别'
					})
					return
				} else if (!this.cardNation) {
					Toast({
						title: '请选择民族'
					})
					return
				} else if (!this.cardBirthday) {
					Toast({
						title: '请选择出生年月'
					})
					return
				} else if (!this.cardId) {
					Toast({
						title: '请填写身份证号'
					})
					return
				} else if (!this.cardAddress) {
					Toast({
						title: '请填写证件地址'
					})
					return
				} else if (!this.cardUseday) {
					Toast({
						title: '请填写有效期'
					})
					return
				}
				return {
					cardName: this.cardName,
					cardGender: this.cardGender,
					cardNation: this.cardNation,
					cardBirthday: this.cardBirthday,
					cardId: this.cardId,
					cardAddress: this.cardAddress,
					cardUseday: this.cardUseday,
					cardFrontImg: this.tempPathFront_upload,
					cardBackImg: this.tempPathBack_upload
				}
			},
			// 性别改变事件
			genderChange(e) {
				this.cardGender = e.detail.value == 0 ? '男' : '女'
			},
			// 民族改变事件
			nationChange(e) {
				this.cardNation = this.nationData[e.detail.value]
			},
			// 日期改变事件
			dateChange(e) {
				this.cardBirthday = e.detail.value
			},
			validDateChange(e) {
				this.cardUseday = e.detail.value
			}
		}
	}
</script>

<style lang="scss">
	.main {
		padding: 0 30rpx;

		.id-card-content {
			// padding: 10rpx;
			margin-top: 40rpx;
			background-size: 100% 100%;
			width: 100%;
			height: 421rpx;

			.center-image-txt {
				text-align: center;

				image {
					width: 124rpx;
					height: 124rpx;
				}

				.txt {
					font-size: 40rpx;
					font-weight: bold;
					color: $uni-text-color;
					text-shadow: 0 0 5rpx #FFFFFF;
				}
			}

			image {
				width: 100%;
				height: 100%;
			}
		}



		.next {
			width: 100%;
			margin: 80rpx 0;
		}
		
		.input-content {
			overflow-y: hidden;
			input {
				text-align: right;
			}
		}
		.xxxxx{
			max-width: 65%;
		}
	}

	.placeholder-style {
		font-size: 34rpx;
		color: $uni-text-color;
	}

	.header {
		color: $uni-text-color;
		font-weight: bold;
		font-size: 34rpx;
		max-width: 30%;
	}

	.edit-infomation {
		padding: 0 20rpx;
	}
</style>
