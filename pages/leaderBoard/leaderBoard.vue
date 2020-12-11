<!-- 排行榜 -->
<template>
	<view>
		<view class="header-content">
			<view class="header-tab">
				<view :class="[tabNum==0?'select-tab':'','tab-one','tab']" @click="changeTab(0)">
					本单位排行
				</view>
				<view :class="[tabNum==1?'select-tab':'','tab','tab-two']" @click="changeTab(1)">
					全行业排行
				</view>
			</view>
			<view class="top-three-content ">
				<view class="top-two">
					<view class="circle-img">
						<image class="top-two-img" src="../../static/number-two.png" mode=""></image>
						<userHeadImg width='112rpx' height='112rpx' :url="'default'"/>
					</view>
					<view class="name">
						{{datas && datas.length > 0?datas[1].name:'暂无人选'}}
					</view>
					<view class="totla-time">
						0
					</view>
				</view>
				<view class="top-one">
					<view class="circle-img">
						<image class="top-one-img" src="../../static/number-one.png" mode=""></image>
						<userHeadImg width='112rpx' height='112rpx' :url="'default'"/>
					</view>
					<view class="name">
						{{datas && datas.length > 0?datas[0].name:'暂无人选'}}
					</view>
					<view class="totla-time">
						0
					</view>
				</view>
				<view class="top-three">
					<view class="circle-img">
						<image class="top-three-img" src="../../static/number-three.png" mode=""></image>
						<userHeadImg width='112rpx' height='112rpx' :url="'default'"/>
					</view>
					<view class="name">
						{{datas && datas.length > 0?datas[2].name:'暂无人选'}}
					</view>
					<view class="totla-time">
						0
					</view>
				</view>
			</view>
			<view class="current-top-content flex-evenly">
				<view class="current-top-img">
					<userHeadImg width='52rpx' height='52rpx' :url='datas.nickName'/>
				</view>
				<view class="current-top-text">
					当前排名第{{datas.ranking}}名
				</view>
			</view>
		</view>
		<view class="rank-content">
			<view class="table-header flex-between">
				<view class="no">
					排名
				</view>
				<view class="t-name">
					姓名
				</view>
				<view class="company">
					所属单位
				</view>
				<view class="total-date">
					学习总时长
				</view>
			</view>
			<template v-if="datas && datas.length > 0">
				<view v-for="(item,index) in datas" :key='item' class="table flex-between">
					<view class="no">
						{{item.ranking}}
					</view>
					<view class="t-name flex-evenly">
						<view class="t-circle-img">
							<userHeadImg width='70rpx' height='70rpx' :url='item.headImgUrl'/>
						</view>
						<view class="real-name">
							{{item.nickName}}
						</view>
					</view>
					<view class="company">
						{{item.compName}}
					</view>
					<view class="total-date">
						{{item.watchLength}}
					</view>
				</view>
			</template>
			<view v-else class="no-data">
				暂无数据
			</view>
			
			
		</view>
	</view>
</template>

<script>
	import userHeadImg from '@/components/userHeadImg/userHeadImg.vue'
	import userName from '@/components/userName/userName.vue'
	import {
		httpRequest
	} from '@/utils/httpRequest.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	import {
		getLearningTypeInfo,
		getUserLoginInfo
	} from '@/utils/util.js'

	export default {
		data() {
			return {
				tabNum: 0,
				datas:[]
			};
		},
		onLoad() {
			this.getData()
		},
		components: {
			userHeadImg,
			userName
		},
		methods: {
			getData() {
				let d = {
					"compId": this.tabNum == 0 ? getLearningTypeInfo().compId : null,
					"userNo": getUserLoginInfo('userNo')
				}
				uni.showLoading({
					title:'加载中...'
				})
				httpRequest({
					url: '/data/api/courseStatUser/userCourseRankinglist',
					method: "POST",
					data: d,
					success: res => {
						uni.hideLoading()
						console.log('zxczxczxc', res)
						if (res.data.code == 200) {
							this.datas = res.data.data
						} else {
							request_success(res)
						}
					},
					fail: err => {
						uni.hideLoading()
						request_err(err, '获取数据失败')
					}
				}, 4)
			},
			changeTab(num) {
				this.tabNum = num
				this.getData()
			}
		}
	}
</script>

<style lang="scss">
	.header-content {
		height: 600rpx;
		background-image: url(../../static/leaderborder-bg.png);
		background-size: 100% 100%;
		padding: 0 30rpx;
		text-align: center;
		position: relative;
	}

	.header-tab {
		// width: 66%;
		// margin: 0 auto;
		padding-top: 40rpx;
		display: inline-block;
	}

	.tab {
		padding: 8rpx 20rpx;
		color: #333333;
		background-color: #FFFFFF;
		width: 204rpx;
		text-align: center;
		font-size: 30rpx;
		display: inline-block;
	}

	.tab-one {
		border-top-left-radius: $uni-border-radius-half-circle;
		border-bottom-left-radius: $uni-border-radius-half-circle;
		margin-right: 4rpx;
	}

	.tab-two {
		border-top-right-radius: $uni-border-radius-half-circle;
		border-bottom-right-radius: $uni-border-radius-half-circle;
	}

	.top-three-content {
		display: flex;
		justify-content: space-evenly;
		align-items: flex-start;
		margin-top: 50rpx;

	}

	.t-circle-img {}

	.circle-img {
		width: 112rpx;
		height: 112rpx;
		text-align: center;
		margin: 0 auto;
		position: relative;
	}

	.name {
		font-size: 28rpx;
		color: #FFFFFF;
		text-align: center;
		margin: 20rpx 0 8rpx;
		// width: 170rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.totla-time {
		font-size: 24rpx;
		color: #FFFFFF;
		text-align: center;
		// width: 170rpx;
	}

	.top-one {

		width: 33%;

		.top-one-img {
			position: absolute;
			z-index: 999;
			top: -32rpx;
			left: -38rpx;
			transform: rotate(-15deg);
			width: 80rpx;
			height: 71rpx;
		}
	}

	.top-two {
		margin-top: 60rpx;

		width: 33%;

		.top-two-img {
			position: absolute;
			z-index: 999;
			top: -26rpx;
			left: -26rpx;
			transform: rotate(-12deg);
			width: 68rpx;
			height: 62rpx;
		}
	}

	.top-three {
		margin-top: 60rpx;

		width: 33%;

		.top-three-img {
			position: absolute;
			z-index: 999;
			top: -26rpx;
			left: -26rpx;
			transform: rotate(-12deg);
			width: 68rpx;
			height: 62rpx;
		}
	}

	.current-top-content {
		background-image: url(../../static/current-top-bg.png);
		background-size: 100% 100%;
		padding: 16rpx 180rpx;
		position: absolute;
		bottom: 0;
		width: 326rpx;
		// left: 30rpx;
	}

	.current-top-img {}

	.current-top-text {
		color: #F9DFAE;
		font-size: 28rpx;
	}

	.no,
	.t-name,
	.real-name,
	.company,
	.total-date {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 32rpx;
		text-align: center;
	}

	.table-header {
		color: #333333;

		background-color: #FFFFFF;
		padding: 20rpx 30rpx;

		.no {
			width: 10%;
			font-size: 28rpx;
		}

		.t-name {
			font-size: 28rpx;
			width: 25%;
		}

		.company {
			width: 40%;
			font-size: 28rpx;
		}

		.total-date {
			font-size: 28rpx;
			width: 25%;
		}
	}

	.table {
		padding: 20rpx 30rpx;
		border-bottom: 2rpx solid #D1D2D5;

		.no {
			width: 10%;
			font-size: 28rpx;
		}

		.total-date {
			color: #FB842A;
			font-size: 28rpx;

		}

		.t-name {
			width: 22%;

			margin: 0 4rpx;

			.real-name {
				font-size: 28rpx;
			}
		}

		.company {
			width: 40%;
			font-size: 28rpx;
		}

		.total-date {
			font-size: 28rpx;
			width: 25%;
		}
	}

	.select-tab {
		background-color: #8FC0FB;
	}
</style>
