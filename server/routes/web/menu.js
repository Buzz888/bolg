const Router = require('koa-router')
const router = new Router()
router.get('/:id', async (ctx) => {
    const data = []
    const res = await require(`../../model/${ctx.params.id}title`).find()
    res.forEach(i => {
        data.push({ title: i.name, item: [] })
    })
    const req = await require(`../../model/children/${ctx.params.id}item`).find().populate('objid')
    data.forEach(i => {
        req.forEach(item => {
            if (i.title == item.objid.name) {
                i['item'].push({ name: item.name, path: `/${ctx.params.id}/${item.context.name}` })
            }
        })
    })
    ctx.body = await data

})

module.exports = router.routes()