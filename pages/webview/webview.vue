<template>
<view>
<web-view :src="pagePath"  @message="fn"></web-view>
</view>
</template>

<script>

export default {
  data() {
    return {
      pagePath: ''
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  console.log(options)
	  console.log('1111111111111111111111')
	if( options.url) {
		this.setData({
		  pagePath: options.url
		});
	} else {
		const data = uni.getStorageSync('liveData');
		this.periodId = data.periodId;
		this.pagePath = data.liveUrl;
	}
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
	  fn(data) {
		  console.log('fffffffffffffffffff')
		 uni.navigateTo({
		 	url: '/pages/verifyFace/verifyFace?refId=' + this.periodId + '&signType=2'
		 })
	  }
  }
};
</script>
<style scoped>
/* pages/webview/webview.wxss */
</style>