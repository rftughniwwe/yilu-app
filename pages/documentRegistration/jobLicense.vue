<!-- 从业资格证登记 -->
<template>
	<view class="main">
		<view class="edit-infomation">
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
						从业资格证件号
					</view>
					<view class="input-content">
						<input type="text" maxlength="30" v-model="cardId" value="" placeholder="请填写证件号" />
					</view>
				</view>
				<view class="info-item flex-between">
					<view class="header">
						从业资格类别
					</view>
					<view class="input-content">
						<!-- <input type="text" maxlength="10" v-model="cardGender" value="" placeholder="请填写" /> -->
						<picker mode="selector" :range="jobTypeData" @change="jobTypeChange">
							<view :class="cardjobType?'picker-text-normal':'picker-text'">{{cardjobType?cardjobType:'请选择类别'}}</view>
						</picker>
					</view>
				</view>


				<view class="info-item flex-between">
					<view class="header">
						有效期起始日期
					</view>
					<view class="input-content">
						<picker mode="date" @change="beginDateChange">
							<view :class="validBeginDate?'picker-text-normal':'picker-text'">{{validBeginDate?validBeginDate:'请选择起始日期'}}</view>
						</picker>
					</view>
				</view>
				<view class="info-item no-bottom-border flex-between">
					<view class="header">
						有效期结束日期
					</view>
					<view class="input-content">
						<picker mode="date" @change="endDateChange" :start="validBeginDate">
							<view :class="validEndDate?'picker-text-normal':'picker-text'">{{validEndDate?validEndDate:'请选择结束日期'}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="bottom-content">
				<topTips :text='text' align='left' marginTop='0'></topTips>
				<view class="id-card-content flex-around" :style="{backgroundImage:'url('+tempPath+')'}" @click="beginShoot()">
					<view class="center-image-txt">
						<image src="../../static/camera.png" mode=""></image>
						<view class="txt">
							拍摄资格证主页
						</view>
					</view>
				</view>
				<view class="next">
					<button class="done-btn none-border" @click="submit">完成</button>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import Toast from '@/commons/showToast.js'
	import topTips from '@/components/fill-info-toptipe/fill-info-toptipe.vue'
	export default {
		data() {
			return {
				text: '',
				cardName: '',
				cardId: '',
				cardjobType: '',
				validBeginDate: '',
				validEndDate: '',
				jobTypeData: ['111', '222'],
				tempPath: '../../static/allow-job.png',
				flag:false
			};
		},
		onLoad(options) {
			console.log('drivingInfo:',options.drivingInfo) 
			console.log('idCardInfo:',options.idCardInfo) 
			this.text = `请上传${options.name || '本人'}的从业资格证，并录入信息`
		},
		components: {
			Toast,
			topTips
		},
		methods: {
			beginDateChange(e) {
				this.validBeginDate = e.detail.value
			},
			endDateChange(e) {
				this.validEndDate = e.detail.value
			},
			jobTypeChange(e) {
				this.cardjobType = this.jobTypeData[e.detail.value]
			},
			beginShoot() {
				let that = this

				uni.chooseImage({
					count: 1,
					sizeType: 'compressed',
					success(tempFilePaths) {
						that.tempPath = tempFilePaths.tempFilePaths[0]
						that.flag = true
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			submit() {
				let data = this.judgeData()
				if(data){
					console.log('完成！',data)
				}
			},
			judgeData() {
			
				if (!this.flag) {
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
				} else if (!this.cardId) {
					Toast({
						title: '请填写资格证件号'
					})
					return
				} else if (!this.cardjobType) {
					Toast({
						title: '请选择从业资格类别'
					})
					return
				} else if (!this.validBeginDate) {
					Toast({
						title: '请选择起始日期'
					})
					return
				} else if (!this.validEndDate) {
					Toast({
						title: '请选择结束日期'
					})
					return
				}
				let beginDate = new Date(this.validBeginDate).getTime()
				let endDate = new Date(this.validEndDate).getTime()
				if (endDate < beginDate) {
					Toast({
						title: "有效期结束日期错误"
					})
					return
				}
				return {
					cardName: this.cardName,
					cardjobType: this.cardjobType,
					cardId: this.cardId,
					validBeginDate: this.validBeginDate,
					validEndDate: this.validEndDate
				}
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: $uni-bg-color-grey;
	}

	.bottom-content{
		padding: 30rpx $uni-spacing-row-lg;
		background: $uni-bg-color-grey;
	}


	.bottom-tips,.edit-input-content {
		background: #FFFFFF;
		padding: 0 $uni-spacing-row-lg;
	}

	.id-card-content {
		// padding: 10rpx;
		margin-top: 30rpx;
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

	.input-content {
		input {
			text-align: right;
		}
	}

	.done-btn {
		width: 100%;
		background: $uni-color-primary;
		color: #FFFFFF;
		font-size: 36rpx;
		border-radius: $uni-border-radius-base;
	}
	.no-bottom-border{
		border-bottom: none;
	}
	.header {
		color: $uni-text-color;
		font-weight: bold;
		font-size: 34rpx;
	}
</style>
