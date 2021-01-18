<!-- 做题swpier -->
<template>
	<view class="main">
		<swiper class='swiper' :indicator-dots='false' @change="itemChange" :current='currentItem' :disable-programmatic-animation='true'>
			<template v-for="(item,index) in datas">
				<swiper-item>
					<view class="topic">
						{{index+1}}.{{item.problemContent}}
					</view>
					<view class="options">
						<examOptions :item='item' @optionsClick='clickItem($event,index)' @optionsClickMutile='MutileOptionClick($event,index)'/>
					</view>
					<view v-if="item.userAnswer" class="answer-content">
						<template v-if="(item.problemType == 1 || item.problemType == 3)">
							<view v-if="item.userAnswer !== item.problemAnswer" class="error-answer-content flex-between" :style="{'backgroundColor': '#F75D42'}">
								<image src="../../static/answer-error-img.png" mode=""></image>
								<view class="text">
									回答错误
								</view>
							</view>
							<view v-else-if='item.userAnswer === item.problemAnswer' class="error-answer-content" :style="{'backgroundColor': '#3ED3AA'}">
								<view class="text">
									回答正确
								</view>
							</view>
						</template>
						<template v-else>
							<view v-if="rightAnswerMutile !== currentOptionMutile" class="error-answer-content flex-between" :style="{'backgroundColor': '#F75D42'}">
								<image src="../../static/answer-error-img.png" mode=""></image>
								<view class="text">
									回答错误
								</view>
							</view>
							<view v-else-if='rightAnswerMutile === currentOptionMutile' class="error-answer-content" :style="{'backgroundColor': '#3ED3AA'}">
								<view class="text">
									回答正确
								</view>
							</view>
						</template>
						<view class="answer-contrast flex-evenly">
							<view class="right-answer-content">
								<view class="answer-txt">
									正确答案：
								</view>
								<view v-if='item.problemType == 1 || item.problemType == 3' class="option">
									{{optionsMapping[rightAnswerOption]}}
								</view>
								<view v-else class="option">
									{{rightAnswerMutile}}
								</view>
							</view>
							<view class="my-answer-content">
								<view class="answer-txt">
									我的答案：
								</view>
								<view v-if='item.problemType == 1 || item.problemType == 3' class="option">
									{{optionsMapping[currentOption]}}
								</view>
								<view v-else class="option">
									{{currentOptionMutile}}
								</view>
							</view>
						</view>
						<view class="answer-parse">
							<view class="title-parse">
								答案解析：
							</view>
							<view class="parse-content">
								{{item.analysis}}
							</view>
						</view>
					</view>
				</swiper-item>
			</template>

		</swiper>
	</view>
</template>

<script>
	import examOptions from '@/components/examOptions/examOptions.vue'
	import {
		httpRequest
	} from '@/utils/httpRequest.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	import {
		getUserLoginInfo
	} from '@/utils/util.js'
	export default {
		data() {
			return {
				datas: [],
				optionsMapping:['A','B','C','D','E','F'],
				singleItem: -1,
				currnet: 0,
				currentItem:0,
				rightAnswerOption:0,
				rightAnswerMutile:'',
				currentOption:0,
				currentOptionMutile:'',
				isShowAnswer:false
			};
		},
		components: {
			examOptions
		},
		props: [],
		created() {
			// let examdatas = uni.getStorageSync('autoExamQuestions')
			
			this.getQuestions()
			uni.$on('tabChange',(res)=>{
				this.currentItem = res.index
			})
		},
		methods: {
			clickItem(e, index) {
				uni.showLoading({
					title:'判断中',
					mask:true
				})
				let examdatas = uni.getStorageSync('autoExamQuestions')
				let selected = e.option
				this.currentOption = selected
				console.log('当前选项：', selected)
				console.log('当前的item：', examdatas[index])
				examdatas[index].children.forEach((i,index)=>{
					if(i.isTrue){
						console.log('答对了：')
						this.rightAnswerOption = index
						this.removeThisItem(examdatas[index].id,examdatas,index)
					}
				})
				examdatas[index].userAnswer = examdatas[index].children[selected].optionContent
				examdatas[index].questionId = examdatas[index].children[selected].answerId
				this.datas = examdatas
				uni.setStorageSync('autoExamQuestions', examdatas)
				uni.$emit('optionsChange',{})
				uni.hideLoading()
			},
			removeThisItem(id,data,index){
				let userNo = getUserLoginInfo('userNo')
				httpRequest({
					url:'exam/api/tbCourQuestionPerson/errordelete',
					method:'DELETE',
					data:{
						questionId:id,
						updateUser:userNo
					},
					success:res=>{
						console.log('移除题目',res)
					},
					fail:err=>{
						console.log('移除题目失败：',err)
					}
				},5)
			},
			itemChange(e) {
				uni.$emit('swiperChange', {
					current: e.target.current
				})
			},
			// 获取试题
			getQuestions() {
				uni.showLoading({
					title: '获取中',
				})
				httpRequest({
					url: 'exam/api/tbCourPaper/list',
					method: 'POST',
					success: res => {
						uni.hideLoading()
			
						if (res.data.code == 200) {
							// uni.setStorageSync('autoExamQuestions', res.data.data)
							this.datas = res.data.data
						} else {
							request_success(res)
						}
					},
					fail: err => {
						uni.hideLoading()
						console.log('获取试题失败', err)
					}
				},5)
			},
			MutileOptionClick(e,index){
				let examdatas = uni.getStorageSync('autoExamQuestions')
				let selected = e.option
				
				console.log('当前答案集：', selected)
				console.log('当前的item：', examdatas[index])
				let rightAnswer = ''
				let myAnsers = ''
				let submit_answer = ''
				examdatas[index].children.forEach((_item,_index)=>{
					console.log('itemssss',_item)
					if(_item.isTrue == 1){
						rightAnswer += this.optionsMapping[_index]
					}
				})
				selected.forEach((item,inx)=>{
					myAnsers += this.optionsMapping[item.index]
					submit_answer += submit_answer.length==0?item.option.optionContent:'|'+item.option.optionContent
				})
				console.log('正确答案：',rightAnswer)
				console.log('我的答案：',submit_answer)
				this.rightAnswerMutile = rightAnswer
				this.currentOptionMutile = myAnsers
				examdatas[index].userAnswer = submit_answer
				// examdatas[index].questionId = examdatas[index].children[selected].answerId
				this.datas = examdatas
				uni.setStorageSync('autoExamQuestions', examdatas)
				uni.$emit('optionsChange',{})
			}
		}
	}
</script>

<style lang="scss">
	.topic {
		background-color: #F3F7F6;
		padding: 40rpx 30rpx;
		color: #333333;
		font-size: 36rpx;
	}

	.swiper {
		height: 100vh;
	}

	.answer-content {
		margin: 130rpx 0 30rpx;
		position: relative;
	}

	.error-answer-content {
		position: absolute;
		top: -66rpx;
		left: 30rpx;
		padding:14rpx 22rpx;
		
		border-top-left-radius: 12rpx;
		border-top-right-radius: 12rpx;

		image {
			width: 36rpx;
			height: 36rpx;
			margin-right: 10rpx;
		}
		
		.text{
			color: #FFFFFF;
			font-size: 28rpx;
		}
		
	}

	.answer-contrast {
		padding: 30rpx 0;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
	}

	.right-answer-content,
	.my-answer-content {
		width: 50%;
	}

	.answer-txt,
	.option {
		text-align: center;
	}

	.answer-txt {
		color: #000000;
		font-size: 26rpx;
	}

	.option {
		color: #000000;
		font-size: 36rpx;
		font-weight: bold;
	}
	.answer-parse{
		padding: 30rpx;
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
	}
	.title-parse{
		margin: 4rpx 0 10rpx;
		color: #333333;
		font-size: 28rpx;
	}
	.parse-content{
		padding: 20rpx 0 30rpx;
		color: #333333;
		font-size: 28rpx;
		letter-spacing: 2rpx;
	}
</style>
