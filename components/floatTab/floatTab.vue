<template>
<!--components/floatTab/floatTab.wxml-->
<view class="float_box">
  <view :class="showClose ? (noshare ? 'float_tabs h344' : 'float_tabs h430') : 'float_tabs'">
    <view class="float_tab" v-if="showClose" @tap="goTop">
      顶部
    </view>
    
    <navigator open-type="switchTab" url="/pages/account/index/index" class="float_tab" v-if="showClose">
      我的
    </navigator>
    <navigator open-type="switchTab" url="/pages/index/index" class="float_tab" v-if="showClose">
      首页
    </navigator>
    <view class="float_tab" v-if="!showClose" @tap="changeTab">
      导航
    </view>
    <view class="float_tab" v-if="showClose" @tap="changeTab">
    </view>
  </view>
  <share-ewm @closeewm="closeEwm" v-if="showEwm" :shareUrl="imgUrl"></share-ewm>
</view>
</template>

<script>
// components/floatTab/floatTab.js
import { courseInfo } from "@/commons/api/course";
let app = getApp(); // components/float_tab/float_tab.js

export default {
  data() {
    return {
      showEwm: false,
      showClose: false,
      imgUrl: ''
    };
  },

  components: {},
  props: {
    islong: {
      type: Boolean
    },
    noshare: {
      type: Boolean
    },
    shareImg: {
      type: Boolean
    },
    coursetype: {
      type: [String, Number]
    },
    actid: {
      type: [String, Number]
    }
  },
  methods: {
    closeEwm() {
      this.setData({
        showEwm: false
      });
      this.$emit('hideewm');
    },

    showShare() {
      console.log(this.actid);

      if (!this.shareImg) {
        this.setData({
          showClose: false
        });
        return;
      }

      let pageList = getCurrentPages();
      let pageSelf = pageList[pageList.length - 1];
      let id = pageSelf.options.scene ? decodeURIComponent(pageSelf.options.scene) : pageSelf.options.id;
      let pageRouter = pageSelf.route;
      console.log(pageRouter, id);
      console.log(pageSelf.options);
      console.log(this.coursetype);
      let url = '/course/api/course/info/sharing/course';
      let urlData = {
        courseCategory: this.coursetype,
        courseId: id,
        orgNo: app.globalData.clientData.no,
        page: pageRouter
      };

      if (this.actid) {
        url = '/activity/api/act/sharing/act';
        urlData = {
          actId: this.actid,
          page: pageRouter
        };
      }

      console.log(url, urlData);
      uni.showLoading({
        title: '图片生成中...',
        mask: true
      });
      console.log(app.globalData.clientData.no);
      uni.request({
        method: 'POST',
        url: app.globalData.apiUrl + url,
        data: urlData,
        header: {
          'orgno': app.globalData.clientData.no
        },
        success: res => {
          uni.hideLoading();
          let result = res.data;
          console.log(result);

          if (result.code === 200) {
            saveShare(1);
            this.$emit('hidevideo');
            uni.showToast({
              title: '图片生成成功，可以保存图片或分享给小伙伴咯！',
              icon: 'none',
              duration: 3000
            });
            this.setData({
              imgUrl: result.data,
              showClose: false,
              showEwm: true
            });
          } else {
            uni.showToast({
              title: result.msg,
              icon: 'none'
            });
          }
        },
        fail: () => {
          uni.hideLoading();
          uni.showToast({
            title: '系统繁忙，请稍后重试',
            icon: 'none'
          });
        }
      });
    },

    changeTab() {
      this.setData({
        showClose: !this.showClose
      });
    },

    goTop() {
      if (this.islong) {
        this.$emit("longtop");
      } else {
        uni.pageScrollTo({
          scrollTop: 0
        });
      }

      this.setData({
        showClose: false
      });
    }

  }
};
</script>
<style>
/* components/floatTab/floatTab.wxss */
.float_box {
  z-index: 10;
  position: fixed;
  bottom: 150rpx;
  right: 10rpx;
}
.float_tabs {
  overflow: hidden;
  width: 86rpx;
  height: 86rpx;
  border-radius: 43rpx;
  border: 1rpx solid rgb(190, 190, 190);
  font-size: 20rpx;
  color: #999;
  transition: height 0.3s;
  background: #fff;
}
.h344 {
  height: 344rpx;
}
.h430 {
  /* height: 430rpx; */
  height: 344rpx;
}
.float_tab {
  position: relative;
  width: 86rpx;
  height: 66rpx;
  padding: 10rpx 0;
  font-size: 20rpx;
  text-align: center;
  display: flex;
  box-sizing: content-box;
  flex-direction: column;
  justify-content: space-around;
}
.share_btn {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 20;
  background: rgba(255, 255, 255, 0);
  top: 0;
  border-radius: 50%;
  border-color: #fff;
}
.tab_img {
  display: block;
  width: 28rpx;
  height: 27rpx;
  margin: 0 auto;
}
</style>