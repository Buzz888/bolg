const Router = require('koa-router')
const router = new Router()
const fs = require('fs')
router.get('/', async (ctx) => {
    // await require('../../model/baner').deleteMany()
    ctx.body = await require('../../model/baner').find()
})
router.post('/', async (ctx) => {
    ctx.body = await require('../../model/baner').create(ctx.request.body)
})
router.delete('/:id', async (ctx) => {
    const upload = await require('../../model/baner').findById(ctx.params.id)
    await fs.unlinkSync(`./upload/image/${upload.url}`);
    ctx.body = await require('../../model/baner').findByIdAndDelete(ctx.params.id)
})
module.exports = router.routes()