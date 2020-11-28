<style lang="scss" scoped>
	.examList {
		.examItem {
			background-color: #fff;
			padding: 26upx 30upx 18upx;
			margin: 20upx 30upx;
			border-radius: 10upx;
			display: flex;

			.examItemTitle {
				font-style: normal;
				font-size: 14px;
				line-height: 24px;
				color: #333333;
				overflow:hidden;
				text-overflow:ellipsis;
				display:-webkit-box;
				-webkit-line-clamp:2; 
				-webkit-box-orient:vertical;
			}

			.examItemTime {
				font-weight: 400;
				font-size: 12px;
				color: #999999;
				line-height: 20px;
				margin-bottom: 20upx;
			}

			.examItemMain {
				flex: 1;
			}


			.examItemIcon {
				width: 32upx;
				height: 32upx;
				margin-right: 20upx;
				border: 1px solid #0C9BFF;
				color: #0C9BFF;
				border-radius: 6upx;
				display: inline-block;
				text-align: center;
				position: relative;
				font-size: 26upx;
				line-height: 30upx;
				position: relative;
				top: -2upx;
			}

			.examItemTip {
				line-height: 30px;
				color: #666666;
				font-size: 13px;
				.fr {
					line-height: 20px;
					margin-top: 10upx
				}
				.tipItem {
					display: inline-block;
					margin-right: 20upx;
					line-height: 20px;

					.icon {
						width: 32upx;
						position: relative;
						top: 4px;
						height: 32upx;
						margin-right: 10upx;
					}
				}
			}
		}
	}
</style>


<template>
	<view class="examList">
		<view class="examItem" v-for="(exam, index) in examList" @click="toExam(exam)" :key="index">
			<view class="examItemSide">
				<view class="examItemIcon">
					{{ exam.subjectName ? exam.subjectName[0] : '卷' }}
				</view>
			</view>
			<view class="examItemMain">
				<view class="examItemTitle" >
					<jyf-parser :html="'<div>' +  exam.examName + '</div>'" ref="article"></jyf-parser>
				</view>
				<view class="examItemTime">
					{{ exam.gmtModified }}
				</view>
				<view class="examItemTip">
					<view class="tipItem">
						<image class="icon" src="../../static/images/exam/u29.svg" alt=""></image>{{ exam.studyCount }}
					</view>
					<view class="tipItem">
						<image class="icon" src="../../static/images/exam/u31.svg" alt=""></image>{{ exam.downloadCount }}
					</view>
					<view :class="['fr', exam.orgPrice ? 'c_red' : 'c_green']" v-if="showPrice">
						{{ exam.orgPrice ? '￥' + exam.orgPrice : '免费' }}
						<text class="font25 c_gold mgl20" v-if="exam.orgPrice">SVIP:{{exam.fabPrice ? '￥' + exam.fabPrice : '免费'}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	export default {
		props: {
			examList: {
				type: Array,
				default () {
					return []
				}
			},
		},
		components: {
			jyfParser
		},
		data() {
			return {
				showPrice: false
			};
		},
		mounted() {
			this.showPrice =  uni.getStorageSync('showPrice')
		},
		methods: {
			toExam(data) {
				uni.navigateTo({
				    url: '/pages/exam/details?id=' + data.id
				});
			},
		}
	}
</script>
