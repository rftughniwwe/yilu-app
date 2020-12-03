<template>
	<!--pages/course/list/list.wxml-->
	<view>
		<view class="search_box">
			<view class="p_relative center_box">
				<image class="search_icon" src=""></image>
				<view class="search_input" @tap="goSearch">请输入搜索内容</view>
			</view>
		</view>
		<class-list class="classList" @triggerchange="selectCB" :showPrice="showPrice" :filterData="map"></class-list>
		<view class="course_list">
			<view v-for="(item, index) in courseList" :key="index" @tap="goDetail" :data-id="item.id" data-type class="result_item">
				<view class="img_box">
					<image :src="item.courseLogo" class="result_img"></image>
				</view>
				<view class="course_msg">
					<text class="font25 c_333">{{item.courseName}}<text v-if="item.courseCategory && item.courseCategory == 2">(直播)</text><text
						 v-if="item.courseCategory && item.courseCategory == 3">(录播+直播)</text></text>
					<text class="font25 c_gold" v-if="showPrice && !item.isFree">SVIP: {{item.courseDiscount ? '￥' + item.courseDiscount : '免费'}}</text>
					<text class="font33 c_red" v-if="showPrice">{{!item.isFree ? '￥' + item.courseOriginal : '免费'}}</text>
					<text v-else></text>
				</view>
				<!-- <Mark class="Mark" v-if="markData[item.id]" :act-list="markData[item.id]"></Mark> -->
			</view>
			<!-- <float-tab /> -->
			<view class="no_more c_999 font25 text_center">{{loadMsg}}</view>
		</view>
	</view>
</template>

<script>
	// pages/course/list/list.js
	import * as apis from "@/commons/api/course";
	const app = getApp();
	import classList from "@/components/classList/class";
	import floatTab from "@/components/floatTab/floatTab";
	import {
		getCourseListMark
	} from "@/commons/api/activity.js";
	// import Mark from "@/components/activity/Mark.vue"
	export default {
		data() {
			return {
				map: {
					courseCategory: 1,
					categoryId1: '',
					categoryId2: '',
					categoryId3: ''
				},
				showPrice: true,
				courseClass: '',
				courseList: [],
				pageSize: 20,
				totalPage: 2,
				pageCurrent: 1,
				markData: {},
				loadMsg: ""
			};
		},

		components: {
			classList,
			floatTab
			// Mark
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.showPrice = uni.getStorageSync('showPrice')
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.getCourseList(1);
		},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function(e) {
			console.log(this.pageCurrent);

			if (this.pageCurrent < this.totalPage) {
				this.loadMsg = '加载中...'
				this.getCourseList(this.pageCurrent + 1);
			} else {
				this.loadMsg = '没有更多了...'
			}
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			
			goSearch: () => {
				uni.navigateTo({
					url: '../search/search'
				});
			},

			// 跳转课程详情
			goDetail(e) {
				let id = e.currentTarget.dataset.id;
				console.log('iiiiiiiiii',id)
				if (this.map.courseCategory == '1') {
					uni.navigateTo({
						url: '/pages/course/view/view?id=' + id
					});
				} else {
					uni.navigateTo({
						url: '/pages/course/live/live?id=' + id
					});
				}
			},

			// 获取课程列表
			getCourseList(page) {
				uni.showLoading({
					title: '加载中...'
				});
				apis.courseList(page, this.pageSize, this.map).then(res => {
					this.pageCurrent = res.pageCurrent
					this.totalPage = res.totalPage
					this.courseList = this.courseList.concat(res.list)
					const idList = res.list.map(e => e.id);
					console.log('reszzzzzzzz',res)
					getCourseListMark({
						courseIds: idList
					}).then(res => {
						const box = {};
						res.courseIdList.forEach(e => {
							if (e.actZoneCourseUserViewDTO && e.actZoneCourseUserViewDTO.length) {
								this.markData[e.courseId] = e.actZoneCourseUserViewDTO
							}
						})
						this.markData = {
							...this.markData,
							...box
						}
					})
				});
			},

			// 筛选组件回调
			selectCB(e) {
				const map = e.detail;
				this.map = map
				this.courseList = []
				this.getCourseList(1);
			}

		}
	};
</script>
<style scoped>
	/* pages/course/list/list.wxss */


	.Mark {
		position: absolute;
		top: 30upx;
		width: 200px;
		left: 20upx;
	}

	.classList {
		z-index: 100;
	}

	.search_box {
		background: #2388EC;
		display: flex;
		padding: 10rpx 0;
		position: fixed;
		top: 0;
		z-index: 100;
		width: 100%;
	}

	.search_icon {
		width: 25rpx;
		height: 25rpx;
		position: absolute;
		top: 19rpx;
		left: 10rpx;
	}

	.center_box {
		width: 708rpx;
		margin: 0 auto;
	}

	.search_input {
		background: #fff;
		height: 61rpx;
		line-height: 61rpx;
		width: 665rpx;
		border-radius: 6px;
		font-size: 14px;
		padding-left: 45rpx;
		color: #999;
	}

	.course_list {
		margin-top: 180rpx;
	}

	.result_item {
		padding: 30rpx 20rpx;
		display: flex;
		position: relative;
		justify-content: space-between;
		border-bottom: 1px solid rgb(235, 235, 235);
	}

	.img_box {
		width: 49%;
		height: 166rpx;
		position: relative;
	}

	.result_img {
		width: 100%;
		height: 166rpx;
		border-radius: 3px;
	}

	.course_msg {
		width: 49%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
