var models = require('../models');
var sequelize = require('../common/mysql');
var Task = models.Task;
var User = models.User;
var TaskCategory = models.TaskCategory;

//查询所有
exports.getAllTasksQuery = (query, cb) => {
	var userId = query.userId,
		keyword = query.keyword,
		pageNum = query.pageNum,
		pageSize = query.pageSize || 10;

	var statement = "SELECT  tasks.id as task_id,tasks.name as task_name,DATE_FORMAT(start_date,'%Y-%m-%d') as start_date,\
DATE_FORMAT(end_date,'%Y-%m-%d') as end_date,DATE_FORMAT(update_date,'%Y-%m-%d %l:%i:%s') as update_date,\
DATE_FORMAT(expect_date,'%Y-%m-%d') as expect_date,complete_day,url,status,task_categories.name as task_categories_name,\
users.name as user_name,users.photo as user_photo FROM tasks,users,task_categories where tasks.user_id = users.id and tasks.task_category_id = task_categories.id";
	if (keyword) statement += " and tasks.name like " + "'%" + keyword + "%'";
	if (userId) statement += " and user_id = " + userId;
	statement += " ORDER BY status,update_date DESC limit " + ((pageNum - 1) * pageSize) + ", " + pageSize;
	sequelize.query(statement).then((data) => {
		cb(data);
	});
};

exports.getTotalCount = (query, cb) => {
	var userId = query.userId,
		keyword = query.keyword,
		pageNum = query.pageNum,
		pageSize = query.pageSize || 0;
	if (keyword) statement += " and tasks.name like " + "'%" + keyword + "%'";
	if (userId) statement += " and user_id = " + userId;
	var statement = "SELECT count(*) as totalCount FROM tasks,users,task_categories where tasks.user_id = users.id and tasks.task_category_id = task_categories.id";
	sequelize.query(statement).then((rows) => {
		cb(rows);
	});
};

exports.getOneTasksQuery = (id, cb) => {
	var taskId = id;
	var statement = "SELECT tasks.id as task_id,tasks.name as task_name,DATE_FORMAT(start_date,'%Y-%m-%d') as start_date,\
DATE_FORMAT(end_date,'%Y-%m-%d') as end_date,DATE_FORMAT(update_date,'%Y-%m-%d') as update_date,\
DATE_FORMAT(expect_date,'%Y-%m-%d') as expect_date,complete_day,quality,score,url,status,description,task_categories.name,task_categories.id as task_category_id,\
users.name as user_name,users.username as username ,users.id as user_id FROM tasks,users,task_categories where tasks.user_id = users.id and tasks.task_category_id = task_categories.id";
	statement += " and tasks.id = " + taskId;
	sequelize.query(statement).spread((data) => {
		cb(data);
	});

};

exports.addTask = (query, cb) => {
	var queryObj = {};
	queryObj.name = query.name;
	queryObj.user_id = query.user_id;
	queryObj.start_date = query.start_date;
	queryObj.update_date = new Date();
	queryObj.expect_date = query.expect_date;
	queryObj.url = query.url || '';
	queryObj.task_category_id = query.task_category_id;
	queryObj.status = 1;
	console.log(queryObj);
	Task.build(queryObj).save().then((data) => {
		console.log(data.dataValues);
		cb(data.dataValues);
	}).catch((err) => {
		cb(err);
	})
};

exports.modTaskSelf = (query, cb) => {
	var queryObj = {};
	taskId = query.task_id;
	queryObj.name = query.name;
	queryObj.start_date = query.start_date;
	queryObj.update_date = new Date();
	queryObj.expect_date = query.expect_date;
	queryObj.url = query.url || '';
	queryObj.task_category_id = query.task_category_id;
	queryObj.status = query.status;
	Task.update(queryObj, {
		where: {
			id: taskId
		}
	}).then((data) => {
		cb(data);
	});
};

exports.modTaskAdmin = (query, cb) => {
	var queryObj = {};
	taskId = query.task_id;
	queryObj.name = query.name;
	queryObj.user_id = query.user_id;
	queryObj.start_date = query.start_date;
	queryObj.update_date = new Date();
	queryObj.expect_date = query.expect_date;
	queryObj.url = query.url || '';
	queryObj.task_category_id = query.task_category_id;
	queryObj.status = query.status;
	queryObj.complete_day = query.complete_day;
	queryObj.quality = query.quality;
	queryObj.score = query.score;
	console.log(queryObj);
	Task.update(queryObj, {
		where: {
			id: taskId
		}
	}).then((data) => {
		console.log(data);
		cb(data);
	})
};