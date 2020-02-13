<template>
  <div class="cart-container">
    <div class="good-content-container">
      <ul>
        <li v-for="goodItem in oGoodsList" :key="goodItem.id">
          商品名：{{goodItem.name}} ；
          价格：{{goodItem.price}}；
          <button class="add-to-cart" @click="addToCart(goodItem)">加入购物车</button>
        </li>
      </ul>
    </div>
    </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      oGoodsList: [
        {id: 1, name: '口罩', price: 35},
        {id: 2, name: '双黄连', price: 40},
        {id: 3, name: '酒精', price: 50}
      ]
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
