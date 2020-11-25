<template>
<view>
<image v-if="isCollection == 1" :src="like" @tap="delCollect" class="like_img"></image>
<image v-else :src="noLike" @tap="likeTap" class="like_img"></image>
</view>
</template>

<script>
// components/likebtn/likebtn.js
import * as apis from "@/commons/api/course.js";
const app = getApp();

export default {
  data() {
    return {
      isLike: false,
      like: "/static/static/images/is_like.svg",
      noLike: "/static/static/images/no_like.svg",
      userInfo: "",
      submit: false
    };
  },

  components: {},
  props: {
    collectionId: {
      type: [String, Number]
    },
    isCollection: {
      type: [String, Number]
    },
    courseCategory: {
      type: [String, Number]
    }
  },
  methods: {
    likeTap() {
      if (uni.getStorageSync('userInfo')) {
        this.setData({
          userInfo: uni.getStorageSync('userInfo')
        });
        let obj = {
          collectionType: 1,
          courseCategory: this.courseCategory,
          collectionId: this.collectionId
        };
        apis.collectionSave(obj).then(res => {
          this.setData({
            isCollection: 1
          });
          uni.showToast({
            title: '收藏成功'
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
                if (res.confirm) {
                  if (res.code > 300 && res.code < 400) {
                    uni.removeStorage({
                      key: 'userInfo',
                      success: () => {// app.loginRoncoo();
                      }
                    });
                  }
                }
              }
            });
          }
        });
      } else {
      }
    },

    delCollect(e) {
      let id = this.collectionId;
      apis.collectionDelete({
        collectionId: id,
        collectionType: 1
      }).then(res => {
        uni.showToast({
          title: '取消收藏成功'
        });
        this.setData({
          isCollection: 0
        });
      }).catch(res => {
        uni.showModal({
          title: '删除失败',
          content: res.msg
        });
        uni.hideLoading();
        this.setData({
          submit: false
        });
      });
    }

  }
};
</script>
<style>
.like_img {
  width: 34rpx;
  height: 34rpx;
  margin-top: 5rpx;
}
</style>