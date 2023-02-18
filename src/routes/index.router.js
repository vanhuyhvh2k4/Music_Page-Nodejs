const siteRouter = require('./sites.router.js');
const songDetailRouter = require('./songDetail.router.js');
const myAdminRouter = require('./myadmin.router.js');
const AuthRouter = require('./auth.router.js');

function route (app) {
    app.use('/', siteRouter);

    app.use('/song', songDetailRouter);

    app.use('/myadmin', myAdminRouter);

    app.use('/admin', AuthRouter);
}

module.exports = route;