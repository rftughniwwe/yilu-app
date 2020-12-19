<!-- 题目选项 -->
<template>
	<view>
		<view v-for="(option,index) in item" :class="['options-item','flex-row-start',singleItem == index?'selected':'']" @click="clickItem(index,option)">
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
				{{option.optionContent?option.optionContent:'未知'}}
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				singleItem:-1,
				current:0
			};
		},
		props:['item','index'],
		created() {
			
		},
		mounted() {
			
		},
		updated() {
			
		},
		methods: {
			clickItem(index,item){
				if(this.singleItem !== -1){
					return
				}
				let examdatas = uni.getStorageSync('autoExamQuestions')
				let answerId = item.answerId
				this.singleItem = index
				this.$emit('optionsClick',{option:index})
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
	.selected{
		background-color: rgba(222, 251, 222, 1);
	}
	.selectedImg{
		width: 64rpx;
		height: 64rpx;
	}
</style>
