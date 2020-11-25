<template>
  <div class="actList">
    <div v-for="(item, index) in actList" :key="index">
      <div v-if="item.actType == 1" class="yhq">
        优惠券
        <br>
        {{ item.actPrice }}
      </div>
      <div v-if="item.actType == 2" class="ms">秒杀价 <span>¥{{ item.actPrice }}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mark',
  props: {
    actList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      li: []
    }
  }
}
</script>

<style lang="scss" scoped>
  .yhq{
    position: absolute;
    top: 0;
    left: 10px;
    z-index: 9;
    width: 46px;
    height: 46px;
	font-size: 12px;;
	padding-top: 2px;
    text-align: center;
    color: #fff;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAAXNSR0IArs4c6QAAAc5JREFUaAXtmTFLw2AQhu9atUIRLBZEEYpx1ILO7eKim04FjT/BP+TeKuIgOOjg4qKbCBUFF6WDLtJoRVBbmpxXUYRQ9KJXpXBdyvflzZvne/IlS/A8PUHQhb9YFzK/IRv4X985M27GhQZsqwhFqcXMuJpKYZEZF4pSi5lxNZXCIjMuFKUWM+NqKoVFZlwoSi1mxtVUCovMuFCUWsyMq6kUFplxoSi1mBlXUyksMuNCUWoxM66mUlhkxoWi1GKdM05wQwRNNdJQkSo4Ed0B0Rr5kJ/0LsdeGs8jPLdKQEc8r/p1DxU+F9aZaTeAoBj3KnuTAI2QnLfhyeB4JhFHlwcuIE61y0SZ+xl4yx7CIQCWGk1/a6ZWqUW56GnKycZisIIAS7yITJRzP7KRwJn3gm97qenTOsNWPkp+8Y/nKScHvAiWUGAZQ9Kub8EZ9BaJNgPEYrZ6dSwtjprj4t5EypnDeGsRsICAya862oIz7BOftBP4UPLur/ZnoXNvh3ZwZRhO9qSTi3zMJcJ5ROgJ5z7BiQI+eMCbt1jDh+18tfoYDv/H+HhgNJ3o6y8wvIsEOX4m+NHgjXWWdsoMW/KpvjHtXd/8B5z0mu9vpmXOu6/vHIhQLqp1lQAAAABJRU5ErkJggg==) no-repeat top;
  }
  .ms{
    position: absolute;
    top: 5px;
	line-height: 40upx;
	height: 40upx;
	font-size: 12px;
    padding: 2px 8px;
    background: #fa9106;
    color: #fff;
    span{
      font-family: arial;
      font-size: 12px;
    }
    &:after{
      content: '';
      display: block;
      width: 0;
      height: 0;
      border-width: 24upx;
	  border-top-width: 24upx;
      border-style: solid;
      border-color: #fa9106 transparent #fa9106 #fa9106;
      position: absolute;
      top: 0px;
      right: -44upx;
    }
  }
</style>
