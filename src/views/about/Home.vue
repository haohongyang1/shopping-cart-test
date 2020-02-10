<template>
  <div class="cart-container">
      关于我们
    <div class="add-good-container">
      <input type="text" v-model="sGoodsInput"> 添加商品
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  beforeRouteEnter() { // 3 、组件独享守卫

  },
  data () {
    return {
    }
  }
}
</script>


<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
.is-active {
  color: gray;
}
</style>
