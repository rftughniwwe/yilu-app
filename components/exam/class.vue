<style lang="scss" scoped>
	.down {
		display: inline-block;
		width: 5px;
		height: 5px;
		border-right: 1rpx solid #333;
		border-bottom: 1rpx solid #333;
		transform: rotate(45deg);
		margin: 0 0 7rpx 10rpx;
	}

	.classList {
		display: flex;
		background-color: #fff;
		height: 100upx;
		position: fixed;
		top: 45px;
		/*  #ifndef H5  */
		top: 0px;
		/*  #endif  */
		left: 0;
		width: 100%;
		z-index: 101;
		border-bottom: 1upx solid #ddd;

		.classItem {
			flex: 1;
			line-height: 100upx;
			text-align: center;
			font-weight: 400;
			font-style: normal;
			font-size: 14px;
		}
	}
	.bg {
		position: fixed;
		top: 89px;
		left:0;
		bottom:0;
		right: 0;
		z-index: 100;
		background-color: rgba(0,0,0,.5);
	}

	.list  {
		position: fixed;
		top: 96px;
		/*  #ifndef H5  */
		top: 44px;
		/*  #endif  */
		left:0;
		z-index: 100;
		overflow-y: auto;

		right: 0;
		max-height: calc(100vh - 96px - 50px);
		background-color: #fff;

		.item {
			padding: 0 30upx;
			line-height: 80upx;
			font-weight: 400;
			font-style: normal;
			font-size: 14px;
			border-bottom: 1px solid #ddd;
		}
	}

</style>


<template>
	<view class="class">
		<view class="classList">
			<view class="classItem"  @click="clear">全部</view>
			<view class="classItem" @click="showSelect(1)">{{ laiyuan }}<view class="down"></view>
			</view>
			<view class="classItem" @click="showSelect(2)">{{ kemu }}<view class="down"></view>
			</view>
			<view class="classItem" @click="showSelect(3)">{{ nianfen }}<view class="down"></view>
			</view>
		</view>
		<view class="bg" @click="hideSelect" v-if="isBg"></view>
		<view class="list" v-if="showIndex == 1">
			<view class="item" v-for="(item, index) in laiyuanList" :key="index" @click="select('sourceId', item)">
			{{ item.categoryName }}
			</view>
		</view>
		<view class="list" v-if="showIndex == 2">
			<view class="item" v-for="(item, index) in kemuList" :key="index"  @click="select('subjectId', item)">
			{{ item.categoryName }}</view>
		</view>
		<view class="list" v-if="showIndex == 3">
			<view class="item" v-for="(item, index) in nianfenList" :key="index"  @click="select('yearId', item)">
			{{ item.categoryName }}</view>
		</view>
	</view>
</template>

<script>
	import * as examApis from "@/commons/api/exam";
	export default {
		props: {
			problem: {
				type: Object,
				default () {
					return {}
				}
			},
		},
		data() {
			return {
				param: {
					subjectId: '',
					sourceId: '',
					yearId: '',
					sortType: 0
				},
				isBg: false,
				showIndex: 0,
				laiyuanList: [],
				kemuList: [],
				nianfenList: [],
				laiyuan: '来源',
				kemu: '科目',
				nianfen: '年份'
			};
		},
		created() {
			this.getData();
		},
		methods: {
			clear() {
				this.param =  {
					subjectId: '',
					sourceId: '',
					yearId: '',
					sortType: 0
				}
				this.laiyuan = '来源',
				this.kemu = '科目',
				this.nianfen = '年份'
				this.hideSelect();
				this.$emit('seek', this.param)
			},
			select(name, item) {
				this.param[name] = item.id;
				if(this.showIndex == 1) {
					this.laiyuan = item.id?item.categoryName:'来源'
				}
				if(this.showIndex == 2) {
					this.kemu = item.id?item.categoryName:'科目'
				}
				if(this.showIndex == 3) {
					this.nianfen = item.id?item.categoryName:'年份'
				}
				this.hideSelect();
				this.$emit('seek', this.param)
			},
			hideSelect() {
				this.showIndex = 0
				this.isBg = false;
			},
			showSelect(index) {
				if(this.showIndex == index) {
					this.showIndex = 0
					this.isBg = false;
					return
				}
				this.isBg = true;
				this.showIndex = index;
			},
			async getData() {
				const apiList = [
					['categoryList', {
						examCategoryType: 1,
						categoryType: 2
					}, 'kemuList'],
					['categoryList', {
						examCategoryType: 2,
						categoryType: 2
					}, 'nianfenList'],
					['categoryList', {
						examCategoryType: 3,
						categoryType: 2
					}, 'laiyuanList']
				]
				const That = this
				const promises = apiList.map(function(e) {
					return examApis[e[0]](e[1]);
				});
				const resList = await Promise.all(promises);
				apiList.map((e, i) => {
					if (resList[i] && resList[i] && resList[i].examCategoryList) {
						const d = resList[i].examCategoryList;

						if (d && d.length) {
							d.unshift({
								categoryName: '全部',
								id: ''
							})
							That[e[2]] = d;
						}
					}
				});
			}
		}
	}
</script>
