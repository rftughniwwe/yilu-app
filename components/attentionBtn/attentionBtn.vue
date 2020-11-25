<template>
<view class="atn_box">
	<!--components/attentionBtn/atnBtn.wxml-->
	<view v-if="isAttention" class="atn_btn action" @tap="atnClick">
	  <image :src="attention" class="like_img"></image>
	  <text v-if="showText">关注</text>
	</view>
	<view v-else class="atn_btn" @tap="atnClick">
	  <image :src="no_attention" class="like_img"></image>
	  <text v-if="showText">关注</text>
	</view>
</view>
</template>

<script>
// components/attentionBtn/atnBtn.js
import * as auto from "@/commons/api/user";
import { login } from "../../utils/auth";
const app = getApp();

export default {
  data() {
    return {
      attention: "/static/static/images/is_like.png",
      no_attention: "/static/static/images/no_like.png",
      isCollection: 0
    };
  },

  components: {},
  props: {
    showText: {
      type: Boolean,
      default: true
    },
    isAttention: {
      type: [Boolean, Number],
      default: false
    },
    lecturerUserNo: {
      type: String,
	  default: ''
    }
  },
  methods: {
    atnClick() {
      if (!uni.getStorageSync('userInfo')) {
        login(() => {
          this.atnClick();
        });
        return false;
      }

      if (this.isAttention) {
        auto.attentionDelete({
          lecturerUserNo: this.lecturerUserNo
        }).then(res => {
          this.setData({
            isAttention: 0
          });
          uni.showToast({
            title: '已取消关注'
          });
        }).catch(res => {
          uni.showModal({
            title: '错误',
            content: res.msg,
            showCancel: false
          });
        });
      } else {
        auto.attentionSave({
          lecturerUserNo: this.lecturerUserNo
        }).then(res => {
          this.setData({
            isAttention: 1
          });
          uni.showToast({
            title: '关注成功'
          });
        }).catch(res => {
          if (res.code === 406) {
            this.setData({
              isCollection: 1
            });
          } else {
            uni.showModal({
              title: '错误',
              content: res.msg,
              showCancel: false,
              success: res => {
                if (res.confirm) {}
              }
            });
          }
        });
      }
    }

  }
};
</script>
<style>
.atn_box {
  display: inline-block;
}
/* components/attentionBtn/atnBtn.wxss */
.atn_btn{
  margin-left: 20rpx;
  display: inline-block;
  overflow: visible;
}
.action{
  color: #de5509;
}
.like_img{
  width: 30rpx;
  height: 30rpx;
  vertical-align:sub;
  padding-right:5rpx;
  position: relative;
  top: -2rpx;
}
</style>