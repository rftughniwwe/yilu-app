<style lang="scss" scoped>
	.probleMain {
		padding: 30upx 0;
		.problemTitle {
			display: flex;
			padding: 0 30upx;
			font-weight: 200;
			font-style: normal;
			font-size: 14px;
			line-height: 28px;
			.problemTitleText {
				font-size: 15px;
				color:#222;
				flex: 1;
			}
			.problemTitleNum {
				padding-right: 12upx;
				position: relative;
			}
		}
	}

	.problemOptions {
		margin-top: 40upx;
		padding: 0 30upx 40upx;
		.checkboxItem,
		.radioItem {
			padding: 10upx 0;
			padding-left: 30px;
			line-height: 52upx;
			font-weight: 400;
			font-style: normal;
			font-size: 14px;
			display: flex;
			line-height: 20px;
			position: relative;
			.radioItemText,
			.checkboxItemText {
				flex: 1;
				color:#333;
			}
			.checkbox,
			.radio {
				transform:scale(0.7);
				position: absolute;
				top: 6upx;
				left: 0;
				margin-right: 4upx;
			}
		}

		.textarea {
			min-height: 200px;
			border: 1px solid #999;
			width: 100%;
			box-sizing: border-box;
			padding: 10upx 20upx;
			border-radius: 2px;
		}

		.inputBox {
			border: 1px solid #999;
			display: flex;
			line-height: 64upx;
			height: 64upx;
			margin-bottom: 20upx;
			width: 100%;
			.num {
				width: 64upx;
				height: 64upx;
				line-height: 64upx;
				text-align: center;
				font-size: 14px;
				color: #666;
				border-right: 1px solid #999;
			}
			.input {
				flex: 1;
				line-height: 64upx;
				height: 64upx;
				padding: 0 20upx;
				color: #666;
				text-align: left;
				white-space: pre-wrap;
			}
		}
	}



</style>

<template>
	<view class="probleMain">
		<view class="problemTitle">
			<view class="problemTitleNum">{{ index }}、</view>
			<view class="problemTitleText  w-e-text">
				<jyf-parser :html="'<div>' +  problem.problemContent + '</div>'" ref="article"></jyf-parser>
			</view>
		</view>
		<view class="problemOptions" v-if="problem.problemType == 1 || problem.problemType == 3">
			<radio-group @change="radioChange">
				<label v-for="(item, index) in problem.optionList" :key="item.value">
					<view class="radioItem">
						<radio class="radio" :disabled="isExplain" :value="item.optionContent" :checked="value === item.optionContent" />
						<text v-if="problem.problemType == 1">{{ letter[index] }}、</text>
						<view class="radioItemText  w-e-text" >
							<jyf-parser :html="'<div>' + item.optionContent + '</div>'" ref="article"></jyf-parser>
						</view>
					</view>
				</label>
			</radio-group>
		</view>

		<view class="problemOptions" v-if="problem.problemType == 2">
			<checkbox-group @change="checkboxChange">
				<label v-for="(item, index) in problem.optionList" :key="item.value">
					<view class="checkboxItem">
						<checkbox class="checkbox" :disabled="isExplain" :value="item.optionContent" :checked="valueList.indexOf(item.optionContent) != -1" />
						<text>{{ letter[index] }}、</text>
						<view class="checkboxItemText  w-e-text" >
							<jyf-parser :html="'<div>' + item.optionContent + '</div>'" ref="article"></jyf-parser>
						</view>
					</view>
				</label>
			</checkbox-group>
		</view>

		<view class="problemOptions" v-if="problem.problemType == 4">
			<view class="inputBox" v-for="oIndex in problem.optionCount" :key="oIndex">
				<view class="num">{{ oIndex }}</view>
				<input class="input" :disabled="isExplain" type="text" v-model="valueList[oIndex]" @blur="submit()" :placeholder="'请输入第' + oIndex +'个空的答案'">
			</view>
		</view>
		<view class="problemOptions" v-if="problem.problemType == 5">
			<editor-tag v-if="!isExplain" v-model="value" @blur="submit()"></editor-tag>
		</view>
		<problem-explain v-if="isExplain" @playVideo="playVideo" :problem="problem"></problem-explain>
	</view>
</template>

<script>
	import * as examApis from "@/commons/api/exam";
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	import problemExplain from "@/components/exam/problemExplain";
	import editorTag from "@/components/editor/editor";
	import * as gradeApis from '@/commons/api/grade.js'
	export default {
		components: {
			problemExplain,
			editorTag,
			jyfParser
		},
		props: {
			problem: {
				type: Object,
				default () {
					return {}
				}
			},
			isExplain: {
				type: Boolean,
				default () {
					return false
				}
			},
			titleId: {
				type: String,
				default () {
					return ''
				}
			},
			recordId: {
				type: String,
				default () {
					return ''
				}
			},
			index: {
				type: Number,
				default () {
					return 0
				}
			}
		},
		created() {
			if (this.problem.value && this.problem.value.join) {
				this.valueList = this.problem.value
			} else {
				this.value = this.problem.value
			}
		},
		data() {
			return {
				letter: 'ABCDEFGHIJkLMNOPQRSTUVWXYZ'.split(''),
				value: '',
				valueList: []
			};
		},
		methods: {
			playVideo(data) {
				this.$emit('playVideo', data)
			},
			checkboxChange(e) {
				this.valueList = e.detail.value;
				this.submit();
			},
			radioChange(e) {
				this.value = e.detail.value
				this.submit();
			},
			submit() {
				
				let v  = this.valueList.length ? this.valueList.join('|') : this.value;
				v = v.replace(' style="max-width:100%;height:auto" ', '')
				const d = {
					titleId: this.titleId,
					problemId: this.problem.id,
					recordId: this.recordId,
					relationId: this.recordId,
					noLoading: true,
					answerContent: v,
					userAnswer: v
				}
				const value = this.valueList.length ? this.valueList : this.value;
				this.problem.value =   value
				this.$emit('updateUserAnswer', {
					userAnswer: value,
					titleId: this.titleId,
					problemId: this.problem.id,
					recordId: this.recordId,
					relationId: this.recordId,
					noLoading: true,
					answerContent: value
				})
				if (this.problem.gradeExamId) {
					gradeApis.saveExamAnswer(d).then((res) => {
						console.log(res)
					})
				} else {
					examApis.saveExamAnswer(d).then((res) => {
						console.log(res)
					})
				}
			}
		}
	}
</script>
