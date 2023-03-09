const express = require('express');
const router = express.Router();
const myadminController = require('../app/controllers/MyAdminController.js');

var authMiddleWares = require('../middlewares/auth.middleware.js');

router.patch('/account/:userId/:commentId', myadminController.changeStatusCommentOfUser);

router.get('/account/:userId', myadminController.showDetailCommentOfUser);

router.get('/more', authMiddleWares.requireAuth, myadminController.showMore);

router.get('/more/:songId', myadminController.showMoreDetail);

router.patch('/more/:songId/:commentId', myadminController.changeStatusComment);

router.get('/create', authMiddleWares.requireAuth, myadminController.showCreatePage);

router.post('/stored',authMiddleWares.requireAuth, myadminController.stored);

router.get('/myMusic/edit/:name', authMiddleWares.requireAuth, myadminController.showEdit);

router.put('/myMusic/:name', myadminController.upload);

router.get('/account', authMiddleWares.requireAuth, myadminController.showAccount);

router.patch('/account/:id/change', myadminController.changeStatus);

router.get('/account/trash', authMiddleWares.requireAuth, myadminController.showAccountTrash);

router.patch('/account/:id/restore', myadminController.enableAccount);

router.patch('/myMusic/restore/:id', myadminController.restore);

router.delete('/myMusic/:id', myadminController.delete);

router.delete('/myMusic/deleteForce/:id', myadminController.deleteForce);

router.get('/myMusic/trash', authMiddleWares.requireAuth, myadminController.showTrash);

router.get('/myMusic', authMiddleWares.requireAuth, myadminController.showMyMusic);

router.get('/', authMiddleWares.requireAuth, myadminController.showMyAdmin);

module.exports = router;