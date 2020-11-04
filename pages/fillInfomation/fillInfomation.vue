<template>
	<view class="main-base">
		<view class="item-content">

			<view class="info-item flex-between">
				<view class="header">
					姓名
				</view>
				<view class="input-content">
					<input type="text" maxlength="10" v-model="name" placeholder="请填写" />
				</view>
			</view>
			<view class="info-item flex-between">
				<view class="header">
					性别
				</view>
				<view class="input-content">
					<radio-group name="gender" @change="genderChange">
						<label class="first-label">
							<radio :value="1" /><text>男</text>
						</label>
						<label>
							<radio :value="2" /><text>女</text>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="info-item flex-between">
				<view class="header">
					手机号
				</view>
				<view class="input-content">
					<input type="number" maxlength="11" v-model="phoneNum" placeholder="请填写" />
				</view>
			</view>
			<view class="info-item flex-between">
				<view class="header">
					服务单位
				</view>
				<view class="input-content">
					<input type="text" maxlength="30" v-model="company" placeholder="请填写" />
				</view>
			</view>


		</view>
		<nextPageBtn @goNextPage='goNextPager'></nextPageBtn>
	</view>
</template>

<script>
	import nextPageBtn from '../../components/nextPageBtn/nextPageBtn.vue'
	import {
		REG_PHONE
	} from '../../utils/util.js'
	export default {
		data() {
			return {
				name: '',
				gender: '1',
				phoneNum: '',
				company: ''
			};
		},
		components: {
			nextPageBtn
		},
		methods: {
			goNextPager() {

				let obj = {
					name: this.name,
					gender: this.gender,
					phoneNum: this.phoneNum,
					company: this.company
				}
				
				if(!this.name || !this.company){
					uni.showToast({
						title:'姓名服务单位不能为空',
						icon:'none'
					})
					return
				}
				if(!REG_PHONE.test(this.phoneNum)){
					uni.showToast({
						title:"手机号格式不正确",
						icon:"none"
					})
					return
				}
				uni.setStorageSync('RegisterName',this.name)
				uni.navigateTo({
					url:'../documentRegistration/idCardRegister'
				})
				
			},
			genderChange(e) {
				this.gender = e.detail.value
			}
		}
	}
</script>

<style lang="scss">
	/* 填写基本信息 */
	.main-base {
		padding: 10rpx $uni-spacing-row-lg;
		// width: 100%;
	}

	.item-content {
		margin-bottom: 100rpx;

		.first-label {
			margin-right: 30rpx;
		}
	}

	.input-content {
		input {
			text-align: right;
		}
	}
	.header {
		color: $uni-text-color;
		font-weight: bold;
		font-size: 34rpx;
	}
</style>
