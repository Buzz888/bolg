const jwt = require('jsonwebtoken');
const config = require('../config')
module.exports = async (ctx, next) => {
    const token = ctx.request.header.authorization.slice(7)
    try {
        var decoded = jwt.verify(token, config.ssh);
        if (Math.floor(Date.now() / 1000) - 30 - decoded.iat > 86400) {
            ctx.response.status = 401;
        } else {
            await next()
        }
    } catch (err) {
        console.log(err)
        ctx.response.status = 401;
    }
}