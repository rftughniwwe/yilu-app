<style lang="scss" scoped>
	.classify {
		padding-top: 100upx;


	}
</style>
<template>
	<view class="classify">
		<class-tag @seek="seek"></class-tag>
		<examList :examList="examList"></examList>
		<view class="no_more c_999 font25 text_center">{{loadMsg}}</view>
	</view>
</template>

<script>
	import {
		getExamInfoList
	} from "@/commons/api/exam";
	import classTag from "@/components/exam/class";
	import examList from "@/components/exam/examList";
	export default {
		components: {
			classTag,
			examList
		},
		data() {
			return {
				examList: [],
				loadMsg: '没有更多了...',
				param: {},
				pageCurrent: 1,
				pageSize: 20,
			};
		},
		onLoad() {
			this.getExamList();
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.loadMsg = '没有更多了...'
			if (this.pageCurrent < this.totalPage) {
				this.loadMsg = '加载中...'
				this.pageCurrent = this.pageCurrent + 1
				this.getExamList();
			}
		},
		methods: {

			seek(param) {
				this.param = param
				this.getExamList()
			},
			getExamList() {
				getExamInfoList({
					pageCurrent: this.pageCurrent,
					pageSize: this.pageSize,
					...this.param
				}).then(res => {
					if (this.pageCurrent == 1) {
						this.examList = []
					}
					this.examList = this.examList.concat(res.list)
					this.pageSize = res.pageSize;
					this.totalPage = res.totalPage;
				}).catch(() => {});
			},
		}
	}
</script>
