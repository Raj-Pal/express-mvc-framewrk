/*user model*/
var Sequelize = require('sequelize')
var sequelize = require('../common/mysql')
var User = require('./user')
var Task = require('./task')

var Feedback = sequelize.define('feedback', {
	id: {
		type: Sequelize.BIGINT(11),
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	content: {
		type: Sequelize.STRING(240),
		allowNull: false,
		comment: '反馈内容'
	},
	feedback_date: {
		type: Sequelize.DATE,
		allowNull: false,
		comment: '反馈日期'
	},
	task_id: {
		type: Sequelize.BIGINT(11),
		allowNull: false,
		references: {
			model: Task,
			key: 'id'
		},
		comment: '所属任务,外键'
	},
	user_id: {
		type: Sequelize.BIGINT(11),
		allowNull: false,
		references: {
			model: User,
			key: 'id'
		},
		comment: '反馈人, 外键'
	}

}, {
	underscored: true,
	timestamps: false,
	createAt: false,
	paranoid: true
});

// Task.hasMany(Feedback, {
// 	foreignKey: 'task_id'
// });

// User.hasMany(Feedback, {
// 	foreignKey: 'task_id'
// });

// //添加反馈
// var feedbacks = [{
// 	content: '反馈1',
// 	feedback_date: new Date(),
// 	task_id: 1,
// 	user_id: 2
// }, {
// 	content: '反馈2',
// 	feedback_date: new Date(),
// 	task_id: 1,
// 	user_id: 2
// }, {
// 	content: '反馈3',
// 	feedback_date: new Date(),
// 	task_id: 1,
// 	user_id: 2
// }, {
// 	content: '反馈4',
// 	feedback_date: new Date(),
// 	task_id: 1,
// 	user_id: 2
// }, {
// 	content: '反馈5',
// 	feedback_date: new Date(),
// 	task_id: 1,
// 	user_id: 2
// }];

// feedbacks.forEach((i) => {
// 	Feedback.sync({
// 		force: false
// 	}).then(() => {
// 		return Feedback.create(i)
// 	});
// })

module.exports = Feedback