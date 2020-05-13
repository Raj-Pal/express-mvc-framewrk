/*user model*/
var Sequelize = require('sequelize');
var sequelize = require('../common/mysql');
var User = require('./user');
var TaskCategory = require('./task_category');

var Task = sequelize.define('task', {
	id: {
		type: Sequelize.BIGINT(11),
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING(100),
		allowNull: false,
		comment: '任务名称'
	},
	start_date: {
		type: Sequelize.DATE,
		allowNull: false,
		comment: '开始日期'
	},
	end_date: {
		type: Sequelize.DATE,
		comment: '结束日期'
	},
	update_date: {
		type: Sequelize.DATE,
		comment: '更新日期'
	},
	expect_date: {
		type: Sequelize.DATE,
		allowNull: false,
		comment: '预计完成日期'
	},
	complete_day: {
		type: Sequelize.BIGINT(11),
		comment: '实际完成天数'
	},
	quality: {
		type: Sequelize.FLOAT(2, 1),
		comment: '完成质量 0-2值, 1表示标准质量'
	},
	url: {
		type: Sequelize.STRING(200),
		comment: '项目链接地址'
	},
	status: {
		type: Sequelize.ENUM('1', '2', '3', '4'),
		comment: '任务状态:1.进行中 2.待确认 3.已完成'
	},
	description: {
		type: Sequelize.STRING(200),
		comment: '任务描述'
	},
	task_category_id: {
		type: Sequelize.BIGINT(11),
		references: {
			model: TaskCategory,
			key: 'id'
		},
		comment: '任务类别, 外键'
	},
	user_id: {
		type: Sequelize.BIGINT(11),
		references: {
			model: User,
			key: 'id'
		},
		comment: '负责人, 外键'
	},
	score: {
		type: Sequelize.BIGINT(11),
		comment: '积分'
	}
}, {
	underscored: true,
	timestamps: false,
	createAt: false,
	paranoid: true
});

// User.hasMany(Task, {
// 	foreignKey: 'user_id'
// });
// Task.hasOne(TaskCategory, {
// 	foreignKey: 'task_category_id'
// });
// TaskCategory.belongsTo(Task);

// var tasks = [{
// 			name: '任务1',
// 			start_date: new Date(),
// 			expect_date: new Date(),
// 			url: 'https://cnodejs.org/topic/512d8172df9e9fcc58333c73',
// 			status: 1,
// 			task_category_id: 5,
// 			user_id: 2
// 		}, {
// 			name: '任务2',
// 			start_date: new Date(),
// 			expect_date: new Date(),
// 			url: 'https://cnodejs.org/topic/512d8172df9e9fcc58333c73',
// 			status: 2,
// 			task_category_id: 2,
// 			user_id: 1
// 		}, {
// 			name: '任务3',
// 			start_date: new Date(),
// 			expect_date: new Date(),
// 			url: 'https://cnodejs.org/topic/512d8172df9e9fcc58333c73',
// 			status: 2,
// 			task_category_id: 2,
// 			user_id: 1
// 		}, {
// 			name: '任务4',
// 			start_date: new Date(),
// 			expect_date: new Date(),
// 			url: 'https://cnodejs.org/topic/512d8172df9e9fcc58333c73',
// 			status: 2,
// 			task_category_id: 2,
// 			user_id: 2
// 		}, {
// 			name: '任务5',
// 			start_date: new Date(),
// 			expect_date: new Date(),
// 			url: 'https://cnodejs.org/topic/512d8172df9e9fcc58333c73',
// 			status: 2,
// 			task_category_id: 2,
// 			user_id: 2
// 		}, {
// 			name: '任务6',
// 			start_date: new Date(),
// 			expect_date: new Date(),
// 			url: 'https://cnodejs.org/topic/512d8172df9e9fcc58333c73',
// 			status: 2,
// 			task_category_id: 2,
// 			user_id: 2
// 		}, {
// 			name: '任务7',
// 			start_date: new Date(),
// 			expect_date: new Date(),
// 			url: 'https://cnodejs.org/topic/512d8172df9e9fcc58333c73',
// 			status: 1,
// 			task_category_id: 4,
// 			user_id: 2
// 		}, {
// 			name: '任务8',
// 			start_date: new Date(),
// 			expect_date: new Date(),
// 			url: 'https://cnodejs.org/topic/512d8172df9e9fcc58333c73',
// 			status: 3,
// 			task_category_id: 1,
// 			user_id: 2
// 		}

// 	]
// 	//添加任务
// tasks.forEach((i) => {
// 	Task.sync({
// 		force: false
// 	}).then(function() {
// 		// Table created
// 		return Task.create(i);
// 	});
// })

module.exports = Task