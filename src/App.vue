<template>
  <div id="app">
    <router-link to="/list">商品列表页</router-link>
    <router-link to="/cart">购物车</router-link>
    <router-link to="/login">登录</router-link>
    <hr>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
hr {
  margin: 20px 0;
}
</style>
