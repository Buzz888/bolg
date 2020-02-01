const Router = require('koa-router')
const router = new Router()
router.get('/:id', async (ctx) => {
    ctx.body = await require(`../../model/${ctx.params.id}`).find()
})
router.post('/:id', async (ctx) => {
    ctx.body = await require(`../../model/${ctx.params.id}`).create(ctx.request.body)
})
router.delete('/:id/:_id', async (ctx) => {
    ctx.body = await require(`../../model/${ctx.params.id}`).findByIdAndDelete(ctx.params._id)
})
router.put('/:id/:_id', async (ctx) => {
    ctx.body = await require(`../../model/${ctx.params.id}`).findByIdAndUpdate(ctx.params._id, ctx.request.body)
})
module.exports = router.routes()