// 未尝试过是否能跑通 ---- TODO ----
const Koa = require('koa')
const Router = require('koa-router')
const jwt = require('jsonwebtoken') // 签发令牌
const jwtAuth = require('koa-jwt') // 令牌校验

const secret = 'I am a secret' // 密钥

const app = new Koa()
const router = new Router()

router.get("/api/login", async ctx => {
    const {username, passwd} = ctx.query
    console.log(username, passwd)

    if (username === 'h' && passwd === '12345') {
        // 生成令牌
        const token = jwt.sign({
            data: {name: 'h'}, // 用户信息数据
            exp: Math.floor(Date.now() / 1000) + 60 * 60 // 过期时间
        })
        ctx.body = {code: 1, token}
    } else {
        ctx.status = 401
        ctx.body = {code: 0, message: "用户名不存在或者密码错误"}
    }
})

router.get("/api/userinfo", jwtAuth({ secret }), async ctx => {
    ctx.body = {code: 1, data: {name:'h', age: '20'}}
})

app.use(router.routes())
app.listen(3000)