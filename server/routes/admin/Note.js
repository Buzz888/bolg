const Router = require('koa-router')
const router = new Router()
const fs = require('fs')
const Note = require('../../model/Note')
router.get('/', async (ctx) => {
    ctx.body = await Note.find()
})
router.post('/', async (ctx) => {
    let item = await Note.find().sort({_id:-1}).limit(1)
    let bodyx = ctx.request.body
    let res = null
    if(item.length<1){
        bodyx['index'] = 1
        res = await Note.create(bodyx)
    }else{
        let top = await Note.find().sort({_id:-1}).limit(1)
        bodyx['index'] = top[0].index+1
        res = await Note.create(bodyx)
    }
    ctx.body = res
})
router.delete('/:id', async (ctx) => {

    const upload = await Note.findById(ctx.params._id)
    await fs.unlinkSync(`./upload/${upload.context['name']}`);
    const res = await Note.findByIdAndDelete(ctx.params._id)
    ctx.body = res
})
router.put('/:id/:_id', async (ctx) => {
    const res = await Note.findByIdAndUpdate(ctx.params._id, ctx.request.body)
    ctx.body = res
})
module.exports = router.routes()