const Router = require('koa-router')
const router = new Router()
const template = require('fs').readFileSync('./index.template.html', 'utf-8');
const serverBundle = require('./public/vue-ssr-server-bundle.json');
const clientManifest = require('./public/vue-ssr-client-manifest.json');
const { createBundleRenderer } = require('vue-server-renderer');
const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template,
    clientManifest,
});
router.get('*', async (ctx) => {
    let tem = null
    let dataErr = null
    let hello = 'hello Vue app'
    await new Promise((resolve,reject) => {
        const context = { title: hello, url: ctx.url };
        renderer.renderToString(context, (err, html) => {resolve(html); reject(err) });
    }).then((html) => {tem = html;}, (err) => {console.log(err);dataErr = err })
    ctx.body = dataErr || tem 
});  
module.exports = router.routes() 