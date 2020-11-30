<!-- 题目练习考试  -->
<template>
	<view class="container">
		<view class="topic-content">
			<examTopContent :datas='topDatas'/>
		</view>
		<view class="swiper-contnet">
			<examSwpier :options='options'/>
		</view>
		<view class="bottom-content">
			<questionBottom @answerSheet='answerSheet' @complete='completeExam' />
		</view>

		<view v-show="answerShow" class="answer-sheet-modal" @touchmove.stop.prevent="moveStop" @click.stop.prevent="answerSheet">
			<view class="answer" @click.stop.prevent="moveStop">
				<view class="top-content flex-between">
					<view class="left-content"  @click.stop.prevent="moveStop">
						<view class="flex-row-start">
							<view class="zz flex-between">
								<view class="circle circle-right">

								</view>
								<view>正确</view>
							</view>
							<view class="zz flex-between">
								<view class="circle circle-error">

								</view>
								<view>错误</view>
							</view>
							<view class="zz flex-between">
								<view class="circle circle-empty">

								</view>
								<view>未做</view>
							</view>
						</view>
						<view class="tips">
							点击题目序号可以跳转到该题哦!
						</view>
					</view>
					<view class="right-content" @click.stop.prevent="answerSheet">
						<image src="../../static/close-img.png" mode=""></image>
					</view>
				</view>
				<view class="main-content" @click.stop.prevent="moveStop">
					<view class="serial-content">
						<view class="title">
							单选题
						</view>
						<view class="inline-block-item flex-row-start">
							<view class="item empty-item">
								1
							</view>
							<view class="item empty-item">
								2
							</view>
							<view class="item empty-item">
								3
							</view>
							<view class="item empty-item">
								4
							</view>
							<view class="item empty-item">
								5
							</view>
							<view class="item empty-item">
								6
							</view>
							<view class="item empty-item">
								7
							</view>
							<view class="item empty-item">
								8
							</view>
							<view class="item empty-item">
								9
							</view>
							<view class="item empty-item">
								10
							</view>
						</view>
					</view>
				</view>
				<view class="jiaojuan" @click.stop.prevent="moveStop">
					<primaryBtn text='交卷并查看结果' @callBackFun='completeExam' />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import questionBottom from '@/components/questionBottom/questionBottom.vue'
	import examTopContent from '@/components/ExamTopContent/ExamTopContent.vue'
	import examSwpier from '@/components/examSwpier/examSwpier.vue'
	import primaryBtn from '@/components/primaryBtn/primaryBtn.vue'
	import useFacePlugin from '../../commons/faceplugin.js'
	import {
		faceVerification,
		getExamDetails
	} from '@/commons/api/apis.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	export default {
		data() {
			return {
				topDatas: {},
				answerShow: false,
				options: [{
						count: '1',
						title: '道路危险货物运输过程中，应每隔（   ）小时检查一次。',
						mode: 'single',
						list: [{
								options: '3',
								serialNum: 'A',
								isRight: false
							},
							{
								options: '2',
								serialNum: 'B',
								isRight: false
							},
							{
								options: '1',
								serialNum: 'C',
								isRight: false
							}
						]
					},
					{
						count: '2',
						title: '道路危险货物运输驾驶人员安全文明驾驶最基本的是要做到遵守交通法规、时刻集中注意力、（   ）、提前预防。',
						mode: 'single',
						list: [{
								options: '仔细观察',
								serialNum: 'A',
								isRight: false
							},
							{
								options: '偶尔观察',
								serialNum: 'B',
								isRight: false
							},
							{
								options: '定期观察',
								serialNum: 'C',
								isRight: false
							}
						]
					},
					{
						count: '3',
						title: '以下不属于道路危险货物运输驾驶员职业道德的是（  ）。',
						mode: 'single',
						list: [{
								options: '遵章守法、安全作业 ',
								serialNum: 'A',
								isRight: false
							},
							{
								options: '诚实守信、团结互助',
								serialNum: 'B',
								isRight: false
							},
							{
								options: '效益第一、安全第二',
								serialNum: 'C',
								isRight: false
							}
						]
					},
					{
						count: '4',
						title: '驾驶人员在出车前，若发现制动或转向不灵、喇叭不响或灯光不亮、证件不全等现象，应（   ）',
						mode: 'single',
						list: [{
								options: '继续出车',
								serialNum: 'A',
								isRight: false
							},
							{
								options: '拒绝出车',
								serialNum: 'B',
								isRight: false
							},
							{
								options: '在管理人员同意时继续出车',
								serialNum: 'C',
								isRight: false
							}
						]
					},
					{
						count: '5',
						title: '发生道路危险货物运输事故后，事故现场有关人员应当立即向（   ）报告，同时向本企业事故应急指挥中心和其它相关部门报告。',
						mode: 'single',
						list: [{
								options: '托运人或货主',
								serialNum: 'A',
								isRight: false
							},
							{
								options: '当地公安部门',
								serialNum: 'B',
								isRight: false
							},
							{
								options: '道路运输管理机构',
								serialNum: 'C',
								isRight: false
							}
						]
					},
					{
						count: '6',
						title: '道路危险货物运输车辆应根据所装危险货物的性质配备相应的（   ）和捆扎、防水、防散失等工具。',
						mode: 'single',
						list: [{
								options: '消防器材',
								serialNum: 'A',
								isRight: false
							},
							{
								options: '锹镐工具',
								serialNum: 'B',
								isRight: false
							},
							{
								options: '必要的修车工具',
								serialNum: 'C',
								isRight: false
							}
						]
					},
					{
						count: '7',
						title: '厢式车辆在装运易燃，易爆危险货物时，若车辆底版为金属材质，应采取铺（  ）等防护衬垫。',
						mode: 'single',
						list: [{
								options: '木板或橡胶板',
								serialNum: 'A',
								isRight: false
							},
							{
								options: '铁板',
								serialNum: 'B',
								isRight: false
							},
							{
								options: '铜板',
								serialNum: 'C',
								isRight: false
							}
						]
					},
					{
						count: '8',
						title: '道路危险货物运输驾驶人员安全文明驾驶最基本的是要做到遵守交通法规、时刻集中注意力、（   ）、提前预防。',
						mode: 'single',
						list: [{
								options: '仔细观察',
								serialNum: 'A',
								isRight: false
							},
							{
								options: '偶尔观察',
								serialNum: 'B',
								isRight: false
							},
							{
								options: '定期观察',
								serialNum: 'C',
								isRight: false
							}
						]
					},
					{
						count: '9',
						title: '装运大型气瓶的车辆必须配置活络插桩，三角垫木、（    ）等工具，以便于车辆安全运行。',
						mode: 'single',
						list: [{
								options: '紧绳器',
								serialNum: 'A',
								isRight: false
							},
							{
								options: '苫布',
								serialNum: 'B',
								isRight: false
							},
							{
								options: '麻袋',
								serialNum: 'C',
								isRight: false
							}
						]
					},
					{
						count: '10',
						title: '在道路运输活动中，（  ）是道路危险货物从业人员职业道德的重要内容，是职业活动能够正常进行的基本保证。',
						mode: 'single',
						list: [{
								options: '遵章守法、安全作业',
								serialNum: 'A',
								isRight: false
							},
							{
								options: '爱家庭',
								serialNum: 'B',
								isRight: false
							},
							{
								options: '五讲四美',
								serialNum: 'C',
								isRight: false
							}
						]
					},
				]
			};
		},
		components: {
			questionBottom,
			examTopContent,
			examSwpier
		},
		onShow() {

		},
		onUnload() {
			console.log('页面卸载')
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: '练习题'
			})
			this.setTopData()
			
		},
		methods: {
			setTopData() {
				this.topDatas = {
					mode: '单选题',
					scope: '10',
					time: '600',
					total: '10',
					current: '1'
				}

			},
			moveStop() {},
			// 答题卡
			answerSheet() {
				this.answerShow = !this.answerShow
			},
			// 交卷
			completeExam() {
				uni.showModal({
					title:'提交',
					content:'确认交卷吗？',
					success:res=>{
						if(res.confirm){
							useFacePlugin({}).then(res=>{
								// 人脸验证
								uni.showLoading({
									title: '验证中...'
								})
								faceVerification(res).then(res => {
									console.log('考试前的人脸验证：', res)
									uni.hideLoading()
									if (res.data.code == 200) {
										uni.redirectTo({
											url:'../onSiteTraining/examResult'
										})
									} else {
										request_success(res)
									}
								}, err => {
									uni.hideLoading()
									request_err(err, '人脸验证失败，稍后重试')
								})
							})
							
						}
					}
				})
			
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F3F7F6;
		min-height: 100vh;
	}

	.container {
		background-color: #F3F7F6;
	}

	.topic-content {
		// padding: 0 30rpx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 998;
	}

	.bottom-content {
		padding: 40rpx;
		background-color: #FFFFFF;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
	}

	.swiper-contnet {
		margin-top: 90rpx;
	}

	.answer-sheet-modal {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		z-index: 1000;
		background-color: rgba(0, 0, 0, .6);
	}

	.answer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		// top: 0;
		z-index: 1001;
		height: 85%;
		background-color: #FFFFFF;
	}

	.top-content {
		padding: 30rpx;
		border-bottom: 2rpx solid #DDDDDD;
	}

	.circle {
		width: 24rpx;
		margin-right: 10rpx;
		height: 24rpx;
		border-radius: $uni-border-radius-half-circle;
	}

	.circle-right {
		background-color: #26A8FD;
	}

	.circle-error {
		background-color: #FD6468;
	}

	.circle-empty {
		background-color: #FFFFFF;
		border: 2rpx solid #D8D8D8;
	}

	.zz {
		color: #333;
		font-size: 28rpx;
		margin-right: 32rpx;
	}

	.tips {
		font-size: 26rpx;
		color: #333333;
		margin-top: 16rpx;
	}

	.right-content {
		margin-right: 30rpx;

		image {
			width: 32rpx;
			height: 32rpx;
		}
	}

	.jiaojuan {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10000;
		margin: 30rpx 0;
		padding: 0 80rpx;
		background-color: #FFFFFF;
	}

	.main-content {
		padding: 30rpx;
	}

	.title {
		color: #333333;
		font-size: 30rpx;
		font-weight: bold;
	}

	.inline-block-item {
		padding: 30rpx 0;
		flex-wrap:wrap
	}

	.item {
		width: 86rpx;
		height: 86rpx;
		border-radius: $uni-border-radius-half-circle;
		font-size: 34rpx;
		vertical-align: middle;
		text-align: center;
		white-space: nowrap;
		text-overflow: hidden;
		margin:0 20rpx 30rpx 20rpx;
		line-height: 2.5;
	}

	.empty-item {
		background-color: #FFFFFF;
		border: 2rpx solid #d8d8d8;
	}

	.error-item {
		background-color: rgba(255, 227, 223, 1);
		color: #FD6468;
		border: 2rpx solid rgba(255, 227, 223, 1);
	}

	.right-item {
		background-color: rgba(220, 242, 253, 1);
		color: #26A8FD;
		border: 2rpx solid rgba(220, 242, 253, 1);
	}
</style>
