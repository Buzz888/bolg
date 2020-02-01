const Router = require('koa-router')
const router = new Router()
const user = require('../model/user')
const jwt = require('jsonwebtoken');
router.get('/', async (ctx) => {
   
    ctx.body = await user.find()
})
router.post('/', async (ctx) => {
    let { username, password } = ctx.request.body;
    let admin = await user.findOne({ username: username }).select('+password')
    if (!admin) {
        ctx.body = { type: 'error', message: '账号或者密码错误' }
    } else {
        let pass = require('bcryptjs').compareSync(password, admin.password)
        if (!pass) {
            ctx.body = { type: 'error', message: '账号或者密码错误' }
        } else {
            const token = jwt.sign({ name: admin.name, id: admin.username, iat: Math.floor(Date.now() / 1000) - 30 }, require('../config').ssh);
            ctx.body = { type: 'success', message: `欢迎${admin.name}的访问！！！`, token: token }
        }
    }

})

module.exports = router.routes()