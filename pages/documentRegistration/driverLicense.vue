<!-- 驾驶证识别 -->
<template>
	<view class="main">
		<topTips :text='text' align='center'></topTips>
		<view class="id-card-content flex-around" :style="{backgroundImage:'url('+tempPathFront+')'}" @click="beginShoot(1)">
			<view class="center-image-txt">
				<image src="../../static/camera.png" mode=""></image>
				<view class="txt">
					拍摄驾驶证主页
				</view>
			</view>
		</view>
		<view class="id-card-content flex-around" :style="{backgroundImage:'url('+tempPathBack+')'}" @click="beginShoot(2)">
			<view class="center-image-txt">
				<image src="../../static/camera.png" mode=""></image>
				<view class="txt">
					拍摄驾驶证副页
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
						<input type="text" maxlength="10" v-model="cardName" value="" placeholder="请填写姓名" />
					</view>
				</view>
				<view class="info-item flex-between">
					<view class="header">
						准驾车型
					</view>
					<view class="input-content">
						<input type="text" maxlength="10" v-model="cardAllowCarType" value="" placeholder="请填写准驾车型" />
						<!-- <picker mode="selector" :range="carTypeData" @change="carTypeChange">
							<view :class="cardAllowCarType?'picker-text-normal':'picker-text'">{{cardAllowCarType?cardAllowCarType:'请选择准驾车型'}}</view>
						</picker> -->
					</view>
				</view>
				<view class="info-item flex-between">
					<view class="header">
						初次领证日期
					</view>
					<view class="input-content">
						<picker mode="date" fields="day" @change="firstAllowChange">
							<view :class="cardFirstAllow?'picker-text-normal':'picker-text'">{{cardFirstAllow?cardFirstAllow:'请选择日期'}}</view>
						</picker>
					</view>
				</view>
				<view class="info-item flex-between">
					<view class="header">
						证件编号
					</view>
					<view class="input-content">
						<input type="text" maxlength="40" v-model="cardId" value="" placeholder="请填写证件编号" />
					</view>
				</view>
				<view class="info-item flex-between">
					<view class="header">
						有效期起始日期
					</view>
					<view class="input-content">
						<picker mode="date" fields="day" @change="beginDateChange">
							<view :class="cardBeginDate?'picker-text-normal':'picker-text'">{{cardBeginDate?cardBeginDate:'请选择起始日期'}}</view>
						</picker>
					</view>
				</view>
				<view class="info-item flex-between">
					<view class="header">
						有效期结束日期
					</view>
					<view class="input-content">
						<picker mode="date" fields="day" @change="endDateChange" :start="cardBeginDate">
							<view :class="cardEndDate?'picker-text-normal':'picker-text'">{{cardEndDate?cardEndDate:'请选择结束日期'}}</view>
						</picker>
					</view>
				</view>

			</view>
		</view>

		<view class="next">
			<nextPageBtn @goNextPage='goNextPager' :isSolid='true'></nextPageBtn>
			<nextPageBtn @goNextPage='directNextPage' text='跳过'></nextPageBtn>
		</view>
	</view>
</template>

<script>
	import nextPageBtn from '@/components/nextPageBtn/nextPageBtn.vue'
	import Toast from '@/commons/showToast.js'
	import topTips from '@/components/fill-info-toptipe/fill-info-toptipe.vue'
	import {
		toBase64,
		dateFormat,
		getUserLoginInfo
	} from '../../utils/util.js'
	import {
		httpRequest,
		DVIVING_CARD_OCR,
		OCR_Request,
		uploadImage
	} from '../../utils/httpRequest.js'

	export default {
		data() {
			return {
				text: '',
				flag1: false,
				flag2: false,
				tempPathBack: '../../static/driver-back.png',
				tempPathFront: '../../static/driver-front.png',
				tempPathFront_upload:'',
				tempPathBack_upload:'',
				cardName: '',
				cardAllowCarType: '',
				cardFirstAllow: '',
				cardId: '',
				cardBeginDate: '',
				cardEndDate: '',
				carTypeData: ['a1', 'a2', 'a1和a2'],
				idCardInfo: {},
				idCardNum:''
			};
		},
		components: {
			nextPageBtn,
			Toast,
			topTips
		},
		onLoad(options) {
			this.idCardInfo = options.idCard
			this.idCardNum = options.idCardNum
			this.text = `请上传${ options.name || '本人'}的驾驶证正反面图片`
			this.queryInfo()
		},
		methods: {
			// 选取照片或拍摄
			beginShoot(num) {
				let that = this
				if (num === 2 && that.tempPathFront === '../../static/driver-front.png') {
					return
				}
				uni.chooseImage({
					count: 1,
					sizeType: 'compressed',
					success(tempFilePaths) {
						uni.showLoading({
							title: '处理中...',
							mask:true
						})
						num === 1 ? that.tempPathFront = tempFilePaths.tempFilePaths[0] : that.tempPathBack = tempFilePaths.tempFilePaths[
							0]

						

						toBase64(tempFilePaths.tempFilePaths[0], (r) => {
							let original = r
							let result = original.split(',')[1]
							let ocrtoken = uni.getStorageSync('ocr_token')

							uni.showLoading({
								title:'识别中...',
								mask:true
							})
							// ocr 驾驶证识别
							OCR_Request(DVIVING_CARD_OCR, {
								'image': result
							}).then((res) => {

								uni.hideLoading()
								let data = res.data
								
								if (!data.words_result) {
									Toast({
										title: '识别失败，请重试。'
									})
									return
								}
								
								console.log('驾驶证识别成功：',data.words_result)
								uploadImage('course/api/upload/pic', 'picFile', tempFilePaths.tempFilePaths[0], {}).then((respones) => {
									let img_data = JSON.parse(respones.data)
									console.log('上传图片成功：', img_data)
									if (img_data.code == 200) {
										if (num === 1) {
											that.flag1 = true
											that.tempPathFront_upload = img_data.data
										} else {
											that.flag2 = true
											that.tempPathBack_upload = img_data.data
											return
										}
										// num === 1 ? 
										//  that.tempPathFront = img_data.data: that.tempPathBack = img_data.data
										
										that.cardName = res.data.words_result.姓名 ? res.data.words_result.姓名.words : '';
										that.cardAllowCarType = res.data.words_result.准驾车型 ? res.data.words_result.准驾车型.words : '';
										that.cardFirstAllow = res.data.words_result.初次领证日期 ? dateFormat(res.data.words_result.初次领证日期.words, '-','-') : '';
										that.cardId = res.data.words_result.证号 ? res.data.words_result.证号.words : ''	;
										that.cardBeginDate = res.data.words_result.有效期限 ? dateFormat(res.data.words_result.有效期限.words, '-', '-') : '';
										that.cardEndDate = res.data.words_result.至 ? res.data.words_result.至.words === '长期' ? '长期' : dateFormat(res.data.words_result.至.words, '-', '-') : '';
										
										Toast({
											title: '上传成功'
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
					}
				})
			},

			// 下一步
			goNextPager() {
				let data = this.judgeData()
				
				if (data) {
					uni.showModal({
						title: '确认信息',
						content: '确认信息无误并提交？',
						success:res=>{
							if (res.confirm) {
								this.confirmSubmit(data)
							}
						}
					})

				}
			},
			// 确认提交
			confirmSubmit(data){
				data.userId =  getUserLoginInfo('userNo')
				uni.showLoading({
					title:'保存中...'
				})
				console.log('ddddd',data)
				httpRequest({
					url:'user/api/tbSysDrivingLicense/save',
					method:'POST',
					data:data,
					success:(res)=>{
						uni.hideLoading()
						console.log('res',res)
						if(res.data.code == 200){
							uni.navigateTo({
								url: './jobLicense?idCardNum='+this.idCardNum
							})
						}else {
							Toast({
								title:res.data.msg
							})
						}
					},
					fail:(err)=>{
						uni.hideLoading()
						console.log('保存失败',err)
						Toast({
							title:'保存失败'
						})
					}
					
				},1)
			},
			
			directNextPage(){
				uni.navigateTo({
					url: './jobLicense'
				})
			},
			
			// 驾驶证信息查看
			queryInfo(){
				let userno = getUserLoginInfo('userNo');
				httpRequest({
					url:'user/api/tbSysDrivingLicense/view?userid='+userno,
					success:resp=>{
						console.log('驾驶证信息:',resp)
						if(resp.data.code == 200){
							
							if(resp.data.data){
								let _data = resp.data.data
								this.flag1 = _data.drivingFront?true:false
								this.tempPathFront_upload = _data.drivingBack;
								this.tempPathBack_upload = _data.drivingFront;
								this.tempPathBack = _data.drivingBack,
								this.tempPathFront = _data.drivingFront,
								this.cardId = _data.drivingId;
								this.cardAllowCarType = _data.drivingSubjecton;
								this.cardEndDate = _data.indateEnd;
								this.cardBeginDate = _data.indateStart;
								this.cardName = _data.name;
								this.cardFirstAllow = _data.cardFirstAllow;
							}
						}
					},
					fail:err=>{
						console.log('请求失败',err)
						Toast({
							title:'请求失败'
						})
					}
				},1)
			},
			// 数据校验
			judgeData() {
				console.log('flag1:',this.flag1)
				if (!this.flag1) {
					Toast({
						title: '请拍摄或上传图片'
					})
					return
				}
				if (!this.cardName) {
					Toast({
						title: '请填写姓名'
					})
					return
				} else if (!this.cardAllowCarType) {
					Toast({
						title: '请选择准驾车型'
					})
					return
				} else if (!this.cardFirstAllow) {
					Toast({
						title: '请选择领证日期'
					})
					return
				} else if (!this.cardId) {
					Toast({
						title: '请填写证件号'
					})
					return
				} else if (!this.cardBeginDate) {
					Toast({
						title: '请选择起始日期'
					})
					return
				} else if (!this.cardEndDate) {
					Toast({
						title: '请选择结束日期'
					})
					return
				}
				let beginDate = new Date(this.cardBeginDate).getTime()
				let endDate = this.cardEndDate === '长期' ? 0 : new Date(this.cardEndDate).getTime()
				if (this.cardEndDate !== '长期' && endDate < beginDate) {
					Toast({
						title: "有效期结束日期错误"
					})
					return
				}
				return {
					drivingBack:this.tempPathBack_upload,
					drivingFront:this.tempPathFront_upload,
					drivingNum:this.cardId,
					drivingSubjecton:this.cardAllowCarType,
					indateEnd:this.cardEndDate,
					indateStart:this.cardBeginDate,
					name:this.cardName,
					cardFirstAllow:this.cardFirstAllow,
					idcard:this.idCardNum
				}
			},
			// 准驾车型改变事件
			carTypeChange(e) {
				this.cardAllowCarType = this.carTypeData[e.detail.value]
			},
			// 初次领证改变事件
			firstAllowChange(e) {
				this.cardFirstAllow = e.detail.value
			},
			// 有效期起始日期
			beginDateChange(e) {
				this.cardBeginDate = e.detail.value
			},
			endDateChange(e) {
				this.cardEndDate = e.detail.value
			}
		}
	}
</script>

<style lang="scss">
	.main {
		padding: 0 $uni-spacing-row-lg;
	}

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
</style>
