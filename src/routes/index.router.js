const siteRouter = require('./sites.router.js');
const songDetailRouter = require('./songDetail.router.js');
const myAdminRouter = require('./myadmin.router.js');
const AuthRouter = require('./auth.router.js');
const profileRouter = require('./profile.router.js');

function route (app) {
    
  app.use('/user', profileRouter);

  app.use('/song', songDetailRouter);
  
  app.use('/myadmin', myAdminRouter);
  
  app.use('/admin', AuthRouter);

  app.use('/', siteRouter);

    // 404 not found
    app.get("*", (req, res) => {
        res.status(404).render('errors/404notfound');
  })
}

module.exports = route;