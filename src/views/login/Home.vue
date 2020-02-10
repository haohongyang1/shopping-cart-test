<template>
  <div class="login-container">
    <login></login>
  </div>
</template>

<script>
// 假登录
import login from '../../components/FormTest'
export default {
  name: 'Login',
  components: {
    login
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
