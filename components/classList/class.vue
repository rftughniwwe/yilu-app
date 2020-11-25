<template>
<!--components/classList/class.wxml-->
<view class="class_list">
  <view class="header_box">
    <view :class="isCourse ? 'class_header c_blue' : 'class_header'" @tap="showOption(1)" >
      {{courseClass}}
      <view class="down"></view>
    </view>
    <view :class="'class_header ' + (ctrl.optionVisible == '3' ? 'c_blue' : '')" @tap="showOption(3)" data-type="3">
      {{className}}
      <view class="down"></view>
    </view>
    <view :class="'class_header ' + (ctrl.optionVisible == '2' ? 'c_blue' : '')" @tap="showOption(2)" data-type="2" v-if="showPrice">
      {{freeName}}
      <view class="down"></view>
    </view>
  </view>
  <!-- 选择课程分类 -->
  <view class="class_box" v-if="isClass" @tap="showOption(0)" >
  <!-- 一级分类 -->
    <scroll-view scroll-y="true" class="class_items">
      <view :class="'class_item ' + (map.categoryId1 ? '' : 'c_blue')" @tap.stop="selectCate({floor: 1})">全部</view>
      <view v-for="(item, index) in classList" :key="index" :class="'class_item ' + (map.categoryId1 === item.id ? 'c_blue' : '')" @tap.stop="selectCate(item)" >{{item.categoryName}}</view>
    </scroll-view>
    <!-- 二级分类 -->
    <scroll-view scroll-y="true" class="class_items" v-if="twoClassList.length">
      <view :class="'class_item ' + (!!map.categoryId2 ? '' : 'c_blue')" @tap.stop="selectCate({floor: 2})" >全部</view>
      <view v-for="(item, index) in twoClassList" :key="index" :class="'class_item ' + (map.categoryId2 === item.id ? 'c_blue' : '')" @tap.stop="selectCate(item)">{{item.categoryName}}</view>
    </scroll-view>
    <!-- 三级分类 -->
    <scroll-view scroll-y="true" class="class_items" v-if="threeList.length">
      <view :class="three ? 'class_item' : 'class_item c_blue'" @tap.stop="changeThree({id: '', categoryName: '全部'})">全部</view>
      <view v-for="(item, index) in threeList" :key="index" :class="three === item.categoryNo ? 'class_item c_blue' : 'class_item'" @tap.stop="changeThree(item)" >{{item.categoryName}}</view>
    </scroll-view>
  </view>
  <!-- 是否免费 -->
  <scroll-view scroll-y="true" class="free_box" v-if="ctrl.optionVisible == 2" @tap="showOption(0)" >
    <view class="free_item"  @tap="selectOption({name: '是否免费'})">全部</view>
    <view v-for="(item, index) in opts.free" :key="index" :class="'free_item ' + (item.val == map.isFree? 'c_blue': (item.val == 2 && map.isVipFree)? 'c_blue' : '' )" @tap="selectOption({name: item.key, free:item.val })" >{{item.key}}</view>
  </scroll-view>
  <!-- 课程类型 -->
  <scroll-view scroll-y="true" class="free_box" v-if="ctrl.optionVisible == 1" @tap="showOption(0)" >
   <view v-for="(item, index) in opts.courseType" :key="index" :class="'free_item ' + (item.val == map.courseCategory? 'c_blue': '')" @tap="selectOption({name: item.key, cate:item.val })" >{{item.key}}</view>
  </scroll-view>
</view>
</template>

<script>
// components/classList/class.js
import * as apis from "@/commons/api/course";
/**
 * 课程类型筛选
 * @param classchange 选择筛选回调
 */

export default {
  data() {
    return {
      courseClass: '点播',
      className: '分类',
      freeName: '是否免费',
      classList: [],
	  isCourse: false,
	  isClass:false,
      twoClassList: [],
	  threeList:[],
    three: false,
      threeClassList: [],
      map: {
        courseCategory: 1,
        categoryId1: '',
        categoryId2: '',
        categoryId3: '',
        isFree: ''
      },
      ctrl: {
        optionVisible: 0
      },
      opts: {
        free: [{
          key: '免费',
          val: '1'
        }, {
          key: '收费',
          val: '0'
        }, {
          key: 'SVIP免费',
          val: '2'
        }],
        courseType: [{
          key: '点播',
          val: '1'
        }, {
          key: '直播',
          val: '2'
        }]
      }
    };
  },

  components: {},
  props: {
    showPrice: {
      type: Boolean
    },
    filterData: {
      type: Object
    }
  },
  watch: {
    filterData: {
      handler: function (newVal, oldVal, changedPath) {
        this.setFilterData();
      },
      deep: true
    }
  },

  mounted() {
    this.setFilterData();
    this.getClassList();
  },

  methods: {
    sendNo() {
      let nObj = {
        one: this.one,
        two: this.two,
        three: this.three,
        free: this.free,
        isVipFree: this.isVipFree
      };
      this.$emit('classchange', {
        detail: nObj
      });
    },

    getClassList() {
      apis.categoryList({
        categoryType: this.map.courseCategory
      }).then(res => {
        this.setData({
          classList: res.courseCategoryList
        });
      });
    },

    // 选择课程分类
    selectCate(cate) {
      const map = this.map;



      if (cate.floor === 1 ) {
        // 一级分类
        map.categoryId1 = cate.id;
        map.categoryId2 = '';
        map.categoryId3 = '';
        this.setData({
          className: cate.categoryName || '全部分类',
          twoClassList: cate.twoList || [],
          map: map
        });
        this.$emit('triggerchange', {
          detail: map
        });
      } else if (cate.floor == 2 ) {
        // 二级分类
        map.categoryId2 = cate.id;
        map.categoryId3 = '';
        this.setData({
          className: cate.categoryName || '全部分类',
          threeList: cate.threeList || [],
          map: map
        });
        this.$emit('triggerchange', {
          detail: map
        });

        if (!cate.threeList || !cate.threeList.length) {
          this.isClass = false;
          this.setData({
            ctrl: {
              optionVisible: 0
            }
          });
        }
      } else if (cate.floor == 3) {
        // 三级分类
        map.categoryId3 = cate.id;
        this.setData({
          className: cate.categoryName || '全部分类',
          map: map
        });
        this.$emit('triggerchange', {
          detail: map
        });
        this.setData({
          ctrl: {
            optionVisible: 0
          }
        });
      }

      if (!cate.id) {
        this.setData({
          ctrl: {
            optionVisible: 0
          }
        });
      }
    },
    changeThree(item) {
      this.className = item.categoryName
      this.map.categoryId3 = item.id;
      console.log(item)
      this.isClass = false;
      this.$emit('triggerchange', {
        detail: this.map
      });
    },
    showOption(type) {
      const ctrl = this.ctrl;
      ctrl.optionVisible = type;
      if(this.ctrl.optionVisible == 3) {
        this.isClass = true;
      } else {
		this.isClass = false;
	  }
      this.setData({
        ctrl: ctrl
      });
    },

    selectOption(e) {
		console.log(e, this.ctrl.optionVisible);
      const map = this.map;
      const ctrl = this.ctrl; // 是否免费

      if (this.ctrl.optionVisible == '2') {
        ctrl.optionVisible = 0;
        const free = e.free;

        if (free == '2') {
          map.isVipFree = 1;
          map.isFree = undefined;
        } else {
          map.isVipFree = undefined;
          map.isFree = free;
        }

        this.setData({
          freeName: e.name,
          map: map,
          ctrl: ctrl
        });
      } // 课程类型


      if (this.ctrl.optionVisible == '1') {
        ctrl.optionVisible = 0;
        map.courseCategory = e.cate;
        map.categoryId1 = undefined;
        map.categoryId2 = undefined;
        map.categoryId3 = undefined;
        this.setData({
          courseClass: e.name,
          className: '全部分类',
          map: map,
          ctrl: ctrl
        });
        this.getClassList();
      }

      this.$emit('triggerchange', {
        detail: map
      });
    },

    setFilterData() {
      if (this.filterData.isVipFree) {
        const map = this.map;
        map.isVipFree = 1;
        map.isFree = undefined;
        this.setData({
          freeName: 'SVIP免费',
          map: map
        });
      }
    }

  }
};
</script>
<style>
/* components/classList/class.wxss */
.class_list {
  width: 100%;
  position: fixed;
  top: 78rpx;
  z-index: 100;
}
.header_box {
  width: 100%;
  display: flex;
  border-bottom: 1px solid rgb(235, 235, 235);
  background: #fff;
}
.class_header {
  flex: 1;
  box-sizing: border-box;
  font-size: 25rpx;
  color: #333;
  text-align: center;
  height: 94rpx;
  line-height: 94rpx;
  /* padding: 0 131rpx; */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
}
.class_box {
  display: flex;
  height: 100%;
  position: fixed;
  top: 175rpx;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
}
.class_items {
  width: 33.3%;
  font-size: 25rpx;
  color: #333;
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 170rpx;
}
.class_item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 87rpx;
  line-height: 87rpx;
  padding-left: 20rpx;
  border-bottom: 1px solid rgb(245, 245, 245);
  background: #fff;
}
.class_items:nth-child(2n) .class_item {
  background: rgb(245, 245, 245);
}
.free_box {
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 175rpx;
  bottom: 0;
  left: 0;
  right: 0;
}
.free_item {
  padding: 0 20px;
  height: 87rpx;
  line-height: 87rpx;
  color: #333;
  font-size: 25rpx;
  background: #fff;
  border-bottom: 1px solid rgb(245, 245, 245);
}
.c_blue {
  color: #2488EC;
}
.down {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-right: 1rpx solid #333;
  border-bottom: 1rpx solid #333;
  transform: rotate(45deg);
  margin: 0 0 7rpx 10rpx;
}
</style>
