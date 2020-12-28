<!-- 我的消息页面 -->
<template>
	<view class="main">
		<template v-if="msgList && msgList.length > 0">

			<view class="item flex-row-start" @click="newsDetail(item.id)" v-for="(item,index) in msgList" :key='index'>
				<!-- <uni-swipe-action-item :threshold="0" :right-options="options1" @click="bindClick"> -->
					<view class="img zxczxc">
						<image src="../../../static/system-news.png" mode=""></image>
					</view>
					<view class="middle-content">
						<view class="topic">
							{{item.msgTitle}}
						</view>
						<view class="subtitle">
							{{item.msgTitle}}
						</view>
					</view>
					<view class="time">
						{{item.gmtCreate}}
					</view>
					<view class="remove-item" @click.stop="removeItem(item)">
						<image src="../../../static/trash-2.svg" mode=""></image>
					</view>
				<!-- </uni-swipe-action-item> -->
			</view>
		</template>
		<template v-else>
			<EmptyData type='chat' />
		</template>

	</view>
</template>

<script>
	import {
		myMessageList
	} from '@/commons/api/user.js'
	import EmptyData from '@/components/EmptyData/EmptyData.vue'
	import {
		getUserLoginInfo
	} from '@/utils/util.js'
	import {
		httpRequest
	} from '../../../utils/httpRequest.js'
	
	export default {
		data() {
			return {
				noMore: false,
				pageCurrent: 1,
				totalPage: 1,
				msgList: [],
				options1: [{
					text: '取消置顶'
				}],
				options2: [{
						text: '取消',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '确认',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],
			};
		},
		onLoad() {
			this.getMsg()
		},
		onReachBottom: function() {
			if (this.pageCurrent < this.totalPage) {
				this.pageCurrent += 1
				this.getMessageList();
			}
		},
		methods: {
			removeItem(item){
				let msgId = item.msgId
				httpRequest({
					url:'/user/pc/msg/delete?id='+msgId,
					method:'DELETE',
					success:res=>{
						console.log('删除:',res)
						if(res.data.code == 200){
							uni.showToast({
								title:'删除成功'
							})
							this.getMsg()
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
					},
					fail:err=>{
						console.log('删除消息失败',err)
						uni.showToast({
							title:'删除消息失败',
							icon:'none'
						})
					}
				},1)
			},
			bindClick(e) {
				console.log('eeeeeee', e)
				uni.showToast({
					title: `点击了${e.position === 'left' ? '左侧' : '右侧'} ${e.content.text}按钮`,
					icon: 'none'
				});
			},
			newsDetail(id) {
				uni.navigateTo({
					url: './newsDetail?id=' + id
				})
			},
			getMsg() {
				let userno = getUserLoginInfo('userNo')
				uni.showLoading({
					title: '加载中...'
				});
				myMessageList({
					pageCurrent: this.pageCurrent,
					pageSize: 1000
				}).then(res => {
					console.log(res);
					uni.hideLoading()
					uni.setStorageSync(userno, res.list.length)
					this.totalPage = res.totalPage
					let aaa = res.list
					aaa.forEach((item,index)=>{
						aaa[index].gmtCreate = item.gmtCreate.split(' ')[1]
					})
					this.msgList = aaa
					if (res.totalPage == res.pageCurrent) {
						this.noMore = true
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.main {
		padding: 30rpx;
	}

	.item {
		padding: 30rpx;
		background-color: #FFFFFF;
		margin-bottom: 30rpx;
		border-radius: 18rpx;
	}

	.img {
		border-radius: $uni-border-radius-half-circle;
		height: 102rpx;
		margin-right: 10rpx;
		// position: relative;

		image {
			border-radius: $uni-border-radius-half-circle;
			width: 102rpx;
			height: 100%;
		}
	}

	.zxczxc {
		width: 20%;
	}

	.middle-content {
		width: 50%;

		.topic {
			color: #333;
			font-size: 34rpx;
			font-weight: bold;
			margin-bottom: 12rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

		}

		.subtitle {
			color: #666;
			font-size: 24rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	.time {
		color: #999;
		font-size: 24rpx;
		width: 20%;
	}
	.remove-item{
		width: 20%;
		text-align: right;
		image{
			width: 46rpx;
			height: 56rpx;
		}
	}
	.buble {
		width: 33rpx;
		height: 33rpx;
		background: #FE5A00;
		color: #FFFFFF;
		border-radius: 50%;
		position: absolute;
		right: -10rpx;
		top: -6rpx;
		z-index: 9899;
		padding: 4rpx;
		text-align: center;
		line-height: 33rpx;
		font-size: 24rpx;
	}
</style>
