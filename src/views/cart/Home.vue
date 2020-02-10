<template>
    <div class="cart-table">
      <table class="table" border="1">
        <tr>
          <th></th>
          <th>id</th>
          <th>name</th>
          <th>price</th>
          <th>count</th>
        </tr>
        <tr v-for="goodItem in oCart" :key="goodItem.id" :class="{'is-active': !goodItem.active}">
          <td>
            <input type="checkbox" v-model="goodItem.active" @change="changeActive(goodItem)">
          </td>
          <td>{{goodItem.id}}</td>
          <td>{{goodItem.name}}</td>
          <td>{{goodItem.price}}</td>
          <td>{{goodItem.count}}</td>
        </tr>
        <tr>
          <td>合计</td>
          <td colspan="4">{{totalCount}}</td>
        </tr>
      </table>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      sGoodsInput: '',
      // totalCount: 0,
      oGoodsList: [
        {id: 1, name: '口罩', price: 35},
        {id: 2, name: '双黄连', price: 40},
        {id: 3, name: '酒精', price: 50}
      ],
      oCart: []
    }
  },
  computed: {
    totalCount () {
      return this.oCart.reduce((sum, c) => {
        if (c.active) {
          sum+=c.price*c.count
        }
        return sum
      }, 0) // 使用reduce函数，作为第一次调用callback函数时的第一个参数的值，如果没有提供初始值，使用[]空数组会报错~.~
    }

  },
  methods: {
    addToCart(goodItem) {
      // 1 添加购物车列表
      // Array.prototype.find方法是浅拷贝，更改ret.count后，会更改this.oGoodsList数组中的item~.~
      const ret = this.oCart.find(item => item.id === goodItem.id)
      if (ret) {
        ret.count+=1
      } else {
        this.oCart.push({...goodItem, count: 1, active: true})
      }
      // 2 计算购物车内总金额
      this.totalCount+=goodItem.price
    },
    changeActive(goodItem) {
      if (goodItem.active) {
        this.totalCount+=goodItem.price
      } else {
        this.totalCount-=goodItem.price
      }
    }
  }
}
</script>


<style scoped>
.cart-table .table{
  margin: 0 auto;
}
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
