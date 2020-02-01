module.exports =(app)=>{
    app.use(async (ctx, next) => {
        ctx.set({
            'Access-Control-Allow-Origin': '*', // 打开跨域
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept,Authorization',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE'
            
            
        });
        if (ctx.request.method === 'OPTIONS') {
            ctx.response.status = 200;
        }
        try {
            await next();
        } catch (err) {
            ctx.response.status = err.statusCode || err.status || 500;
            ctx.response.body = {
                message: err.message
            }
        }
    });}