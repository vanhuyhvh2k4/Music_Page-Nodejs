const siteRouter = require('./sites.router.js');

function route (app) {
    app.use('/', siteRouter);
}

module.exports = route;