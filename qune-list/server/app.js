const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const controller = require('./controller')
// const mongoDB = require('./mongodb/mongodb') // 连接mongodb

const app = new Koa()
// mongoDB()
// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    await next()
})

app.use(
    cors({
        origin: function (ctx) {
            //设置允许来自指定域名请求
            if (ctx.url === '/test') {
                return '*' // 允许来自所有域名请求
            }
            return '*' //只允许http://localhost:8080这个域名的请求
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], //设置获取其他自定义字段
    })
)

// parse request body:
app.use(bodyParser())

// add controllers:
app.use(controller())

app.listen(8080)
console.log('app started at port 8080...')
