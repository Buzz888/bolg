const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const mount = require('koa-mount');
const config = require('./config')

const app = new Koa()
//db
const mongoose = require('mongoose')
require('./plugin/db.js')(mongoose, config.db)
//token 
const token = require('./plugin/token')
//静态资源
app.use(serve('public'))
app.use(serve('upload'))
app.use(mount('/buz888/admin', serve("./admin")));

const router = new Router()
//路由管理
require('./routes/index')(router,token)
//菜单
router.use('/api/admin/menu',token,require('./routes/admin/menu'))
//子菜单
router.use('/api/admin/item',token,require('./routes/admin/item'))
router.use('/api/admin/baner',require('./routes/admin/baner'))
router.use('/api/admin/note',token,require('./routes/admin/Note'))
//账号
router.use('/api/admin/user', require('./routes/user'))
//web
router.use('/api/web/menu', require('./routes/web/menu'))
router.use('/api/web/note', require('./routes/web/note'))


router.use('/', require('./Vue.ssr'))
//跨域   
require('./plugin/cors')(app)
//app.uses
//文件上传
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024
    }
}));
app.use(bodyParser());
app
    .use(router.routes())
    .use(router.allowedMethods());
app.on('error', err => {
    log.error('server error', err)
});
app.listen(config.PORT, async () => {
    console.log(`http://localhost:${config.PORT}`)
})