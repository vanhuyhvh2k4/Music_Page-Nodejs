const siteRouter = require('./sites.router.js');

function route (app) {
    app.use('/song', siteRouter);
}

module.exports = route;