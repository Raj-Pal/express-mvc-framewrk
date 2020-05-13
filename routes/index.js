/**
 * Module dependencies.
 */
var express = require('express');
var router = express.Router();
var task = require('../controllers/task');
var feedback = require('../controllers/feedback');
var notice = require('../controllers/notice');
var taskCategory = require('../controllers/task_category');
var user = require('../controllers/user');

/*task list*/
router.get('/task/list', task.list);
/*task one*/
router.get('/task/one', task.getOne);

/*task mod*/
router.post('/task/mod/self', task.update);
/*admin mod*/
router.post('/task/mod/admin', task.updateAdmin);

/*task add*/
router.post('/task/add', task.add);

module.exports = router;