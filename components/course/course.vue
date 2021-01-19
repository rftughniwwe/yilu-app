<!-- 课程item -->
<template>
	<view class="main" @click="itemClick(datas)">
		<view class="item-content flexzzxczxc">
			<view class="img-content">
				<view v-if="isShowTag" class="tag-content">
					{{datas.trainFlag == 1?'已结束':'未开始'}}
				</view>
				<image v-if="!isShowTag" :src="datas.courseLogo || ''" mode=""></image>
				<image v-if="isShowTag" :src="datas.headurl || ''" mode=""></image>
			</view>
			<view class="right-content">
				<view v-if="!isShowTag" class="title text-overflow2">
					{{datas.courseName || '未知'}}
				</view>
				<view v-if="isShowTag" class="title text-overflow2">
					{{datas.name || '未知'}}
				</view>
				
				<view class="time-from" :style="isFromAutoz?'margin-top: 54rpx;':''">
					<view v-if="!isShowTag" class="time">
						<template v-if="!isFromAutoz">
							<view class="">
								开始时间：{{datas.startTime || '未知'}}
							</view> 
							<view class="">
								结束时间：{{datas.endTime || '未知'}}
							</view> 
						</template>
					</view>
					<view v-if="isShowTag" class="time">
						<view class="">
							开始时间：{{datas.trainStart || '未知'}}
						</view>
						<view class="">
							结束时间：{{datas.trainEnd || '未知'}}
						</view>
					</view>
					
					<view v-if="!isShowTag"  class="from">
						<template v-if="!isShowlecturer">
							讲师：{{datas.lecturerName || '未知'}}
						</template>
						<template v-else>
							讲师：宜陆科技
						</template>
					</view>
					<view v-if="isShowTag"  class="from">
						<template v-if="!isShowlecturer">
							{{datas.type==4?'总指挥':'主持人'}}：{{datas.teacher || '未知'}}
						</template>
						<template v-else>
							讲师：宜陆科技
						</template>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				datas:{},
				isShowTag:false,
				tttttttxt:'',
				isShowlecturer:false,
				isFromAutoz:false
			};
		},
		props:['data','isTag','nolecturer','isFromAuto'],
		created() {
			this.datas = this.data?this.data:{},
			this.isShowTag = this.isTag?true:false
			this.isShowlecturer = this.nolecturer?true:false
			this.isFromAutoz = this.isFromAuto?true:false
		},
		methods:{
			itemClick(item){
				this.$emit('courseClick',{item:item})
			}
		},
	}
</script>

<style lang="scss">
	.item-content {
		border-bottom: 2rpx solid #EAEAEA;
		padding: 20rpx 0;
	}
	.title{
		width: 100%;
		color: #333333;
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
	}
	.time,.from{
		color: #999;
		font-size: 24rpx;
	}
	.img-content{
		width:40%;
		height: 170rpx;
		background-color: #999999;
		position: relative;
		image{
			width: 100%;
			height: 100%;
		}
		.tag-content{
			position: absolute;
			top: 20rpx;
			left: 0;
			padding: 6rpx 12rpx;
			color: #FFFFFF;
			font-size: 22rpx;
			background-color: rgba(0,0,0,.5);
			z-index: 998;
			border-top-right-radius: 8rpx;
			border-bottom-right-radius: 8rpx;
		}
	}
	.right-content{
		width: 55%;
		margin: 0 20rpx;
	}
	.flexzzxczxc{
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
	}
</style>
