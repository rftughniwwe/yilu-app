<!-- 学习模块中的顶部滑动组件 -->
<template>
	<view>
		<scroll-view class="scroll-content" scroll-x="true">
			<view class="flex-between" v-if="type == 0">
				<view @click="chagneTab(1)" class="items" :class="selfNum===1?'selected-item':''">
					从业人员安全学习
				</view>
				<view @click="chagneTab(2)" class="items middle-items" :class="selfNum===2?'selected-item':''">
					从业人员技能培训
				</view>
				<view @click="chagneTab(3)" class="items" :class="selfNum===3?'selected-item':''">
					安全领导小组学习
				</view>
				<view @click="chagneTab(4)" class="items" :class="selfNum===4?'selected-item':''">
					应急演练
				</view>
			</view>
			<view class="flex-between" v-if="type ==1">
				<view @click="chagneTab(1)" class="items" :class="num===1?'selected-item':''">
					驾驶员
				</view>
				<view @click="chagneTab(2)" class="items middle-items" :class="num===2?'selected-item':''">
					押运员
				</view>
				<view @click="chagneTab(3)" class="items" :class="num===3?'selected-item':''">
					装卸管理员
				</view>
			</view>
			<view class="flex-evenly" v-if="type ==2">
				<view @click="selfChagneTab(1)" class="items" :class="selfLearnType===1?'selected-item':''">
					课程
				</view>
				<view @click="selfChagneTab(2)" class="items middle-items" :class="selfLearnType===2?'selected-item':''">
					练习
				</view>
				<view @click="selfChagneTab(3)" class="items" :class="selfLearnType===3?'selected-item':''">
					统计
				</view>
			</view>
			<view v-if="type == 3">
				<view v-for="(item,index) in tabArr" class="itemss" :key='index' :class="otherTab===index?'selected-item':''"
				 @click="otherChangeTab(index)">
					{{item}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 默认选中第一个tab
				num: 1,
				selfNum: 1,
				otherTab: 0
			};
		},
		props: ['type', 'safetyType', 'selfLearnType', 'tabArr'],
		created() {

			this.selfNum = this.safetyType
			uni.$on('closeModalMask', (data) => {
				this.selfNum = data.item
			})
		},
		methods: {
			chagneTab(e) {
				this.num = e
				this.selfNum = e
			},
			selfChagneTab(num) {
				uni.$emit('selfChange', {
					tab: num
				})
				this.selfNum = num
			},
			otherChangeTab(num) {
				this.otherTab = num
				this.$emit('tabChange', {
					tab: num
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-content {
		// width: 100%;

		overflow: hidden;
		white-space: nowrap;

		.items {
			display: inline-block;
			color: #333333;
			font-size: 34rpx;
			margin: 0 30rpx;
			padding: 20rpx 0;
			border-bottom: 6rpx solid transparent;

		}

		.itemss {
			display: inline-block;
			color: #333333;
			font-size: 34rpx;
			margin: 0 30rpx;
			border-bottom: 6rpx solid transparent;

		}

		.middle-items {
			margin: 0 30rpx;
		}

		.selected-item {
			color: $uni-color-primary;
			border-bottom-color: $uni-color-primary;
		}
	}

	.border-btm {
		border-bottom: 2rpx solid #EAEAEA;
	}
</style>
