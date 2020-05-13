var Task = require('../services').Task;
var config = require('../config');
var async = require('async');

exports.list = (req, res, next) => {
	var query = {};
	query.userId = req.query.userId;
	query.keyword = req.query.keyword;
	var pageNum = query.pageNum = req.query.pageNum;
	var pageSize = query.pageSize = req.query.pageSize || 10;
	console.log(req.query);
	async.series({
		total: (cb) => {
			Task.getTotalCount(query, (rows) => {
				cb(null, rows[0].totalCount);
			});
		},
		list: (cb) => {
			Task.getAllTasksQuery(query, (rows) => {
				cb(null, rows[0])
			});
		}

	}, (err, ret) => {
		var totalCount = ret.total;
		var totalPage = totalCount % pageSize == 0 ? totalCount / pageSize : Math.ceil(totalCount / pageSize);
		var data = {
			status: "success",
			list: ret.list,
			totalCount: ret.totalCount,
			pageNum: pageNum,
			pageSize: pageSize,
			totalPage: totalPage
		};
		res.json(data);
	});

};

exports.getOne = (req, res, next) => {
	var task_id = req.query.task_id;
	Task.getOneTasksQuery(task_id, (rows) => {
		if (!rows || !rows.length) {
			res.json({
				"status": "failed",
				"task": null
			})
		} else {
			res.json({
				"status": "success",
				"task": rows[0]
			})
		}
	})
};

exports.add = (req, res, next) => {
	var query = {};
	query.name = req.body.name;
	query.user_id = req.body.user_id;
	query.start_date = req.body.start_date;
	query.update_date = new Date();
	query.expect_date = req.body.expect_date;
	query.url = req.body.url || '';
	query.task_category_id = req.body.task_category_id;
	Task.addTask(query, (ret) => {

		if (ret) res.json({
			status: "success",
			taskId: ret.id
		})
	});
};

exports.update = (req, res, next) => {
	var query = {};
	query.task_id = req.body.task_id;
	query.name = req.body.name;
	query.start_date = req.body.start_date;
	query.update_date = new Date();
	query.expect_date = req.body.expect_date;
	query.url = req.body.url || '';
	query.task_category_id = req.body.task_category_id;
	query.status = req.body.status;
	Task.modTaskSelf(query, (ret) => {
		if (ret.length >= 0) res.json({
			status: "success"
		});
	});
};

exports.updateAdmin = (req, res, next) => {
	var query = {};
	query.task_id = req.body.task_id;
	query.name = req.body.name;
	query.user_id = req.body.user_id;
	query.start_date = req.body.start_date;
	query.update_date = new Date();
	query.expect_date = req.body.expect_date;
	query.url = query.url || '';
	query.task_category_id = req.body.task_category_id;
	query.status = req.body.status;
	query.complete_day = req.body.complete_day;
	query.quality = req.body.quality;
	query.score = req.body.score;

	Task.modTaskAdmin(query, (ret) => {
		if (ret.length >= 0) res.json({
			status: "success"
		});
	});
};