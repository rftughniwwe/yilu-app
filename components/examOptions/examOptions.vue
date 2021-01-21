<!-- 题目选项 -->
<template>
	<view>
		<!-- 单选 -->
		<template v-if="item.problemType == 1 || item.problemType == 3">
			<view v-for="(option,index) in item.children" :class="['options-item','flex-row-start',singleItem == index?'selected':'']"
			 @click="clickItem(index,option)">
				<view class="options-img">
					<image v-if="index == '0'" :class="singleItem == index?'selectedImg':''" :src="singleItem == index?'../../static/optionsA-selected.png':'../../static/optionsA.png'"
					 mode=""></image>
					<image v-if="index == '1'" :class="singleItem == index?'selectedImg':''" :src="singleItem == index?'../../static/optionsB-selected.png':'../../static/optionsB.png'"
					 mode=""></image>
					<image v-if="index == '2'" :class="singleItem == index?'selectedImg':''" :src="singleItem == index?'../../static/optionsC-selected.png':'../../static/optionsC.png'"
					 mode=""></image>
					<image v-if="index == '3'" :class="singleItem == index?'selectedImg':''" :src="singleItem == index?'../../static/optionsD-selected.png':'../../static/optionsD.png'"
					 mode=""></image>

				</view>
				<view class="options-text">
					<rich-text :nodes="option.optionContent || ''"></rich-text>
					<!-- {{option.optionContent?option.optionContent:'未知'}} -->
				</view>
			</view>
		</template>
		<!-- 多选 -->
		<template v-else-if="item.problemType == 2">
			<view v-for="(option,index) in item.children" :class="['options-item','flex-row-start']" @click="clickItemMulite(index,option)">
				<view class="options-img">
					<image v-if="index == '0'" :class="singleItem1?'selectedImg':''" :src="singleItem1?'../../static/optionsA-selected.png':'../../static/optionsA.png'"
					 mode=""></image>
					<image v-if="index == '1'" :class="singleItem2?'selectedImg':''" :src="singleItem2?'../../static/optionsB-selected.png':'../../static/optionsB.png'"
					 mode=""></image>
					<image v-if="index == '2'" :class="singleItem3?'selectedImg':''" :src="singleItem3?'../../static/optionsC-selected.png':'../../static/optionsC.png'"
					 mode=""></image>
					<image v-if="index == '3'" :class="singleItem4?'selectedImg':''" :src="singleItem4?'../../static/optionsD-selected.png':'../../static/optionsD.png'"
					 mode=""></image>

				</view>
				<view class="options-text">
					<rich-text :nodes="option.optionContent || ''"></rich-text>
					<!-- {{option.optionContent?option.optionContent:'未知'}} -->
				</view>
			</view>
			<view v-show="(singleItem1 || singleItem2 || singleItem3 || singleItem4) && showMutileBtn" class="confirm-btn" @click="confirmssss">
				确定
			</view>
		</template>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				singleItem: -1,
				current: 0,
				mapping: ['未知', '单选题', '多选题', '判断题'],
				singleItem1: false,
				singleItem2: false,
				singleItem3: false,
				singleItem4: false,
				mutileAnswers: [],
				showMutileBtn:true
			};
		},
		props: ['item', 'index'],
		created() {

		},
		mounted() {

		},
		updated() {

		},
		methods: {
			clickItem(index, item) {
				if (this.singleItem !== -1) {
					return
				}
				// if(index == 0){
				// 	this.singleItem1 = !this.singleItem1
				// }else if(index == 1){
				// 	this.singleItem2 = !this.singleItem2
				// }else if(index == 2){
				// 	this.singleItem3 = !this.singleItem3
				// }else{
				// 	this.singleItem4 = !this.singleItem4
				// }
				// let examdatas = uni.getStorageSync('autoExamQuestions')
				let answerId = item.answerId
				this.singleItem = index
				this.$emit('optionsClick', {
					option: index
				})
			},
			clickItemMulite(index, item) {
				if(!this.showMutileBtn) return
				if (index == 0) {
					if (!this.singleItem1) {
						this.mutileAnswers.push({
							option: item,
							index: index
						})
					} else {
						this.mutileAnswers.forEach((_item, _index) => {
							if (item.answerId == _item.option.answerId) {
								this.mutileAnswers.splice(_index, 1)
							}
						})
					}
					this.singleItem1 = !this.singleItem1
				} else if (index == 1) {
					if (!this.singleItem2) {
						this.mutileAnswers.push({
							option: item,
							index: index
						})
					} else {
						this.mutileAnswers.forEach((_item, _index) => {
							if (item.answerId == _item.option.answerId) {
								this.mutileAnswers.splice(_index, 1)
							}
						})
					}
					this.singleItem2 = !this.singleItem2
				} else if (index == 2) {
					if (!this.singleItem3) {
						this.mutileAnswers.push({
							option: item,
							index: index
						})
					} else {
						this.mutileAnswers.forEach((_item, _index) => {
							if (item.answerId == _item.option.answerId) {
								this.mutileAnswers.splice(_index, 1)
							}
						})
					}
					this.singleItem3 = !this.singleItem3
				} else {
					if (!this.singleItem4) {
						this.mutileAnswers.push({
							option: item,
							index: index
						})
					} else {
						this.mutileAnswers.forEach((_item, _index) => {
							if (item.answerId == _item.option.answerId) {
								this.mutileAnswers.splice(_index, 1)
							}
						})
					}
					this.singleItem4 = !this.singleItem4
				}

			},
			confirmssss() {
				console.log('ooooooooooooo', this.mutileAnswers)
				this.showMutileBtn = false
				this.$emit('optionsClickMutile', {
					option: this.mutileAnswers
				})
			}
		}
	}
</script>

<style lang="scss">
	.options-item {
		background-color: #FFFFFF;
		padding: 30rpx;
		margin-bottom: 28rpx;

		&:last-child {
			margin-bottom: 50rpx;
		}
	}

	.options-img {
		width: 12%;
		height: 54rpx;

		image {
			width: 54rpx;
			height: 100%;
		}
	}

	.options-text {
		font-size: 32rpx;
		color: #333333;
		letter-spacing: 2rpx;
		width: 88%;
	}

	.selected {
		background-color: rgba(222, 251, 222, 1);
	}

	.selected-error {
		background-color: #FFE1DE;
	}

	.selectedImg {
		width: 64rpx;
		height: 64rpx;
	}

	.confirm-btn {
		text-align: center;
		border-radius: $uni-border-radius-half-circle;
		background-color: $uni-color-primary;
		width: 60%;
		margin: 20rpx auto;
		color: #FFFFFF;
		padding: 20rpx 0;
	}
</style>
