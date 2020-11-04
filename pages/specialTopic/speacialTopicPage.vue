<!-- 专题页 -->
<template>
	<view class="main">
		<specialTopic @clickCollectBtn='collect' @goSpecialTopicDetail='routeJump'/>
		<specialTopic @clickCollectBtn='collect' @goSpecialTopicDetail='routeJump'/>
	</view>
</template>

<script>
	import specialTopic from '@/components/specialTopic/specialTopic.vue'
	export default {
		data() {
			return {

			};
		},
		methods:{
			// 收藏按钮点击
			collect(){
				console.log('收藏')
			},
			routeJump(){
				uni.navigateTo({
					url:'./specialTopicDetail'
				})
			}
		}
	}
</script>

<style lang="scss">
	
</style>
