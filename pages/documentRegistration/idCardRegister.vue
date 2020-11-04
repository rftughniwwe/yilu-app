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
						<picker mode="date" @change="dateChange">
							<view :class="cardBirthday?'picker-text-normal':'picker-text'">{{cardBirthday?cardBirthday:'请选择出生年月'}}</view>
						</picker>
					</view>
				</view>
				<view class="info-item flex-between">
					<view class="header">
						身份证号
					</view>
					<view class="input-content">
						<input type="text" maxlength="18" v-model="cardId" value="" placeholder="请填写身份证号" />
					</view>
				</view>
				<view class="info-item flex-between">
					<view class="header">
						证件地址
					</view>
					<view class="input-content">
						<input type="text" maxlength="40" v-model="cardAddress" value="" placeholder="请填写证件地址" />
					</view>
				</view>
				<view class="info-item flex-between">
					<view class="header">
						有效期至
					</view>
					<view class="input-content">
						<!-- <input type="text" v-model="cardUseday" value="" placeholder="请填写有效期" /> -->
						<picker mode="date" @change="validDateChange">
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
		dateFormat
	} from '../../utils/util.js'
	import Toast from '../../commons/showToast.js'
	import topTips from '../../components/fill-info-toptipe/fill-info-toptipe.vue'
	import {
		httpRequest,
		ID_CARD_OCR,
		getAcceessToken,
		BD_OCR_KEY,
		BD_OCR_SECRET
	} from '../../utils/httpRequest.js'

	export default {
		data() {
			return {
				text: '',
				tempPathBack: '../../static/id-card-back.png',
				tempPathFront: '../../static/id-card-front.png',
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
				nationData: []
			};
		},
		components: {
			nextPageBtn,
			topTips
		},
		onLoad() {
			let name = uni.getStorageSync('RegisterName') || '本人'
			this.text = `请上传${name}的身份证正反面照片`
			this.nationData = NATION

			// getAcceessToken(BD_OCR_KEY, BD_OCR_SECRET).then((res)=>{
			// 	uni.setStorageSync('ocr_token',res.data.access_token)
			// })
		},
		methods: {
			// 下一步
			goNextPager() {
				let data = this.judgeData()
				if (data) {
					console.log('身份证信息：', data)
					uni.showModal({
						title:'确认信息',
						content:'确认信息无误并提交？',
						success(confirm,cancel) {
							if(confirm){
								uni.navigateTo({
									url: `./driverLicense?idCard=${data}`
								})
							}
						}
					})
					
				}

			},
			// 开始拍摄
			beginShoot(num) {
				let that = this

				uni.chooseImage({
					count: 1,
					sizeType: 'compressed',
					success(tempFilePaths) {
						uni.showLoading({
							title: '处理中',
							mask: true
						})
						num === 1 ? that.tempPathBack = tempFilePaths.tempFilePaths[0] : that.tempPathFront = tempFilePaths.tempFilePaths[
							0]

						toBase64(tempFilePaths.tempFilePaths[0], (r) => {
							let original = r
							let result = original.split(',')[1]
							let ocrtoken = uni.getStorageSync('ocr_token')

							httpRequest({
								url: ID_CARD_OCR + '?access_token=' + ocrtoken,
								methods: 'POST',
								header: {
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								data: {
									'image': result,
									'id_card_side': num === 1 ? 'front' : 'back'
								},
								success: (res) => {
									console.log('OCR完成', res)
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
									if (num === 1) {
										that.cardName = data.words_result.姓名 ? data.words_result.姓名.words : ''
										that.cardGender = data.words_result.性别 ? data.words_result.性别.words : ''
										that.cardNation = data.words_result.民族 ? data.words_result.民族.words : ''
										that.cardBirthday = data.words_result.出生 ? data.words_result.出生.words : ''
										that.cardId = data.words_result.公民身份号码 ? data.words_result.公民身份号码.words : ''
										that.cardAddress = data.words_result.住址 ? data.words_result.住址.words : ''
										that.flag1 = true
									} else {
										that.cardUseday = dateFormat(data.words_result.失效日期.words, '-', '-')
										that.flag2 = true
									}



								},
								fail: (err) => {
									console.log('OCR失败', err)
									uni.hideLoading()
								}
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
					cardUseday: this.cardUseday
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
		padding: 0 $uni-spacing-row-lg;

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
				}
			}

			image {
				width: 100%;
				height: 100%;
			}
		}



		.next {
			width: 100%;
			margin: 80rpx 0 50rpx;
		}

		.input-content {
			input {
				text-align: right;
			}
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
	}
</style>
