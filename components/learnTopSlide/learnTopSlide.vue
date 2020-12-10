<!-- 学习模块中的顶部滑动组件 -->
<template>
	<view>
		<scroll-view class="scroll-content" scroll-x="true">
			<!-- 安全教育 -->
			<view class="flex-between" v-if="type == 0">
				<view class="items" v-for="(item,index) in datas" :key='index' @click="chagneTab(index,item)" :class="AnquanNum===index?'selected-item':''">
					{{item.categoryName}}
				</view>
			</view>
			<!-- 继续教育 -->
			<view class="flex-between" v-if="type ==1">
				<view class="items" v-for="(item,index) in datas2" :key='index' @click="chagneTab(index,item)" :class="JixuNum===index?'selected-item':''">
					{{item.categoryName}}
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
	const _global = getApp().globalData
	export default {
		data() {
			return {
				// 默认选中第一个tab
				AnquanNum: 0,
				JixuNum: 0,
				otherTab: 0,
				datas: [{
						"id": "1080387575940304898",
						"categoryName": "从业人员技能培训",
						"floor": 2,
						"remark": ""
					},
					{
						"id": "1080748559775240194",
						"categoryName": "安全领导小组学习",
						"floor": 2,
						"remark": ""
					},
					{
						"id": "1080752583811469314",
						"categoryName": "从业人员安全学习",
						"floor": 2,
						"remark": ""
					},
					{
						"id": "1232501813918695426",
						"categoryName": "应急演练",
						"floor": 2,
						"remark": ""
					}
				],
				datas2: [{
						"id": "1263818166278471681",
						"categoryName": "驾驶员",
						"floor": 2,
						"remark": null
					},
					{
						"id": "1263818224717709313",
						"categoryName": "押运员",
						"floor": 2,
						"remark": null
					},
					{
						"id": "1263818285547700225",
						"categoryName": "装卸管理员",
						"floor": 2,
						"remark": null
					}
				]
			};
		},
		props: ['type', 'AnquanType', 'selfLearnType', 'tabArr'],
		created() {
			// this.AnquanNum = this.AnquanType > 0 ? this.AnquanType : uni.getStorageSync('anquanTab')
			this.JixuNum = uni.getStorageSync('jixuTab') ? uni.getStorageSync('jixuTab') : 0
			uni.$on('closeModalMask', (data) => {
				uni.setStorageSync('anquanTab', data.index)
				this.AnquanNum = data.index == -1 ? 0 : data.index
			})
			uni.pageScrollTo({
				selector: 'selected-item'
			})
		},
		updated() {
			this.JixuNum = uni.getStorageSync('jixuTab') ? uni.getStorageSync('jixuTab') : 0
		},
		methods: {
			// 安全教育学习教育改变事件
			chagneTab(e, item) {
				if (this.type == 0) {
					uni.setStorageSync('anquanTab', e)
					this.AnquanNum = e
				} else if (this.type == 1) {
					uni.setStorageSync('jixuTab', e)
					this.JixuNum = e
				}
				uni.setStorageSync('LearningSubTypeSubItem', item)
				console.log('选择的子模块：', item)
				uni.$emit('tabbarChange',{})
			},
			selfChagneTab(num) {
				uni.$emit('selfChange', {
					tab: num
				})
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
