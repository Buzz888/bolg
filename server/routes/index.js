module.exports = (router,token) => {
    const fs = require('fs')
    const readline = require('readline')
    var path = require('path')
    const md = require('markdown-it')({
        html: true,
    });
    //读取文件
    router.get('/app/:id',async (ctx, next) => {
        let mdtext = ''
        //判断文件是否存在
        const flag = fs.existsSync(`./upload/${ctx.params.id}`);
        if (flag) {
            const rl = readline.createInterface({
                input: fs.createReadStream(`./upload/${ctx.params.id}`)
            })
            await new Promise((resolve) => {
                rl.on('line', (line) => {
                    mdtext = mdtext + '\n' + line
                })
                rl.once('close', () => {
                    resolve()
                })
            })
        } else {
            mdtext = `<div class="no">
            <div class="nopath"></div>
            <div class="notitle">404 页面不存在,请跳转回 ! ! !</div>
            </div>`
        }
        ctx.body = md.render(mdtext)
    })
    //创建文件
    router.post('/upload', async (ctx) => {
        const file = ctx.request.files.file;
        const reader = fs.createReadStream(file.path);
        let filePath = path.join("./upload/", file.lastModifiedDate.toString());
        const upStream = fs.createWriteStream(filePath);
        reader.pipe(upStream);
        ctx.body = {
            name: file.lastModifiedDate.toString(),
            url: file.name
        }
    });
    //创建banner
    router.post('/baner',async (ctx) => {
        const file = await ctx.request.files.file;
        const reader = await fs.createReadStream(file.path);
        let filePath = path.join("./upload/image", file.lastModifiedDate.toString());
        const upStream = await fs.createWriteStream(filePath);
        await reader.pipe(upStream);
        return ctx.body = { url: file.lastModifiedDate.toString() };
    });
}