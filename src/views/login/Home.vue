<template>
  <div class="login-container">
    <label for="username">用户名</label>
    <input type="text" v-model="username">
    <button @click="login">登录</button>
    <!-- <login></login> -->
  </div>
</template>

<script>
// 假登录
// import login from '../../components/FormTest'
export default {
  name: 'Login',
  components: {
    // login
  },
  data () {
    return {
      username: ''
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch("user/login", {username: this.username})
        .then(() => {
          this.$router.push({path: this.$route.query.redirect || "/"})
        })
        .catch(e => {
          console.log(e)
        })
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
