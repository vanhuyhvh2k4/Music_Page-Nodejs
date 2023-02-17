const siteRouter = require('./sites.router.js');
const songDetail = require('./songDetail.router.js');
const myAdmin = require('./myadmin.router.js');

function route (app) {
    app.use('/', siteRouter);

    app.use('/song', songDetail);

    app.use('/myadmin', myAdmin);
}

module.exports = route;