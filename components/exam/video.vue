
<style lang="scss" scoped>
.bg,

.videoBox {
	position: fixed;
	z-index: 200;
	top: 0;
	right: 0;
	overflow: hidden;
	bottom: 0;
	left: 0;
	.bg {
		background-color: rgba(0,0,0,.5);
	}
	
	#polyvVideo {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		top: 50%;
		transform: translate(0, -50%);
		height: calc(100vw / 16 * 10);
		z-index: 201;
	}
	
	.beisu-btn{
	  color: #fff;
	  float:left;
	  margin-left: 12rpx;
	  font-size:24rpx;
	  width:120rpx;
	  text-align:left;
	  background: rgba(0, 0, 0, 0.2);
	}
	.beisu-box .bei_list{
	  width: 100rpx;
	}
	.beisu-box .btn{
	  background: rgba(255, 255, 255, 0.8);
	  font-size: 24rpx;
	}
	.beisu-box .btn.on{
	  color: springgreen;
	}
	
}
</style>

<template>
	<view class="videoBox">
		<view class="bg" @click="$emit('close')"></view>
		<video
		id="polyvVideo" 
		class="img_box" 
		poster="http://dev.edu.roncoos.com/exam.jpg" 
		:src="videoSrc"  @play="isPlay" 
		@pause="pausevideo" @timeupdate="sendanmu" enable-danmu="true"></video>
		<cover-view class="beisu-box" v-show="playstatu">
		  <cover-view class="clearfix">
		    <button class="beisu-btn" @tap="showbei">倍速{{bei == 1.0 ? "" : bei + "X"}}</button>
		  </cover-view>
		  <cover-view class="bei_list" v-show="showjs">
		    <button :class="'btn ' + (bei == 0.8 ? 'on' : '')" @tap="jiasu" data-b="0.8">0.8X</button>
		    <button :class="'btn ' + (bei == 1.0 ? 'on' : '')" @tap="jiasu" data-b="1.0">1.0X</button>
		    <button :class="'btn ' + (bei == 1.25 ? 'on' : '')" @tap="jiasu" data-b="1.25">1.25X</button>
		    <button :class="'btn ' + (bei == 1.5 ? 'on' : '')" @tap="jiasu" data-b="1.5">1.5X</button>
		  </cover-view>
		</cover-view>
	</view>
</template>

<script>
	import * as examApis from "@/commons/api/exam";
	import polyv from "@/utils/polyv";
	
	export default {
		props: {
			videoData: {
				type: Object,
				default () {
					return {}
				}
			},
		},
		data() {
			return {
				videoSrc: '',
				playstatu:false,
				bei: 1.0,
				showjs: false
			};
		},
		mounted() {
			this.playVideo(this.videoData)
		},
		methods:{
			isPlay() {
				this.setData({
				  playstatu: true
				});
			},
			wxGetVideo(vid, res) {
			  polyv.getVideo(vid, function (playInfo) {
			    that.setData({
			      videoSrc: playInfo.src[0],
			      study: videoInfo.id
			    });
			  }, res.ts, res.sign);
			},
			getVideo(data) {
			  const userInfo = uni.getStorageSync('userInfo')
			  // let box = this.$refs.playerbox;
			  this.setData({
			    h5Video: true
			  })
			  if (this.player) {
			    this.player.changeVid({
			      vid:data.vid,
			      playsafe: data.token,
			      ts: data.ts,
			      sign: data.sign,
			      autoplay: true
			    });
			  } else {
			    this.setData({
			      player: polyvObject('#polyvVideo').videoPlayer({
			        'width': '100%',
			        'height': 'calc(100vw / 16 * 10)',
			        'forceH5': true,
			        'code': data.code,
			        'playsafe': data.token,
			        'ts': data.ts,
			        'sign': data.sign,
			        'vid': data.vid,
			        'viewerInfo': {
			          'viewerId': userInfo.userNo,
			          'viewerName': userInfo.nickname
			        },
			          flashvars: {
			              skin_type: 'skin_blue',
			              ban_set_player: 'off'
			          }
			      })
			    })
			  }
			},
			// 播放视频
			playVideo(examId, periodId, vid) {
			  // console.log(polyvObject)
			  const that = this;
			  uni.showLoading({
			    title: '加载中...'
			  });
			  //
			  
			 //  {
			 //    problemId: periodId,
			//     videoVid: vid,
			//     examId: examId
			 //  }
			  examApis.getproblemVideoSign(this.videoData).then(res => {
			    // #ifdef MP-WEIXIN
			      this.wxGetVideo(this.videoData.videoVid, res)
			      return
			    // #endif
			    //   console.log('res',res)
			    this.getVideo(Object.assign({ vid: this.videoData.videoVid }, res))
			  });
			},
			// 显示加速列表
			showbei: function () {
			  this.setData({
			    showjs: !this.showjs
			  });
			},
			// 选择倍速
			jiasu: function (e) {
			  let beisu = parseFloat(e.currentTarget.dataset.b);
			  this.videoContext.playbackRate(beisu);
			  this.setData({
			    bei: beisu,
			    showjs: true
			  });
			},
			sendanmu() {},
			pausevideo(){
				this.setData({
				  playstatu: false
				});
			}
		}
	}
</script>

