const Router = require('koa-router')
const router = new Router()
const note = require('../../model/Note')
router.get('/:id', async (ctx) => {
    ctx.body = await note.find({index:{$gt:ctx.params.id}}).sort().limit(5)

})

module.exports = router.routes()