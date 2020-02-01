const Router = require('koa-router')
const router = new Router()
const fs = require('fs')
router.get('/:id',async(ctx) => {
    console.log(ctx)
    ctx.body = await require(`../../model/children/${ctx.params.id}`).find().populate('objid')
})
router.post('/:id', async (ctx) => {
    ctx.body = await require(`../../model/children/${ctx.params.id}`).create(ctx.request.body)
})
router.delete('/:id/:_id', async (ctx) => {
    const model = await require(`../../model/children/${ctx.params.id}`).findById(ctx.params._id)
    if (fs.existsSync(`./upload/${model.context['name']}`)) {
        await fs.unlinkSync(`./upload/${model.context['name']}`)
    }
    ctx.body = await require(`../../model/children/${ctx.params.id}`).findByIdAndDelete(ctx.params._id)
})
router.put('/:id/:_id', async (ctx) => {
    ctx.body = await require(`../../model/children/${ctx.params.id}`).findByIdAndUpdate(ctx.params._id, ctx.request.body)
})

module.exports = router.routes()