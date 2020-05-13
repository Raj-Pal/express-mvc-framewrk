/*user model*/
var Sequelize = require('sequelize')
var sequelize = require('../common/mysql')
var User = require('./user')

var Notice = sequelize.define('notice', {
	id: {
		type: Sequelize.BIGINT(11),
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	content: {
		type: Sequelize.STRING(240),
		allowNull: false,
		comment: '消息内容'
	},
	notice_date: {
		type: Sequelize.DATE,
		allowNull: false,
		comment: '消息日期'
	},
	is_read: {
		type: Sequelize.BIGINT(11),
		defaultValue: 0,
		comment: '所属任务,外键'
	},
	user_id: {
		type: Sequelize.BIGINT(11),
		allowNull: false,
		references: {
			model: User,
			key: 'id'
		},
		comment: '消息所属人, 外键'
	}

}, {
	underscored: true,
	timestamps: false,
	createAt: false,
	paranoid: true
});

// User.hasMany(Notice, {
// 	foreignKey: 'user_id'
// });

// //添加消息
// var msgs = [{
// 	content: '您的专题任务1已经到了反馈时间请及时反馈!',
// 	notice_date: new Date(),
// 	user_id: 2
// }, {
// 	content: '您的专题任务2已经到了反馈时间请及时反馈!',
// 	notice_date: new Date(),
// 	user_id: 2
// }, {
// 	content: '您的专题任务3已经到了反馈时间请及时反馈!',
// 	notice_date: new Date(),
// 	user_id: 2
// }, {
// 	content: '您的专题任务4已经到了反馈时间请及时反馈!',
// 	notice_date: new Date(),
// 	user_id: 2
// }, {
// 	content: '您的专题任务5已经到了反馈时间请及时反馈!',
// 	notice_date: new Date(),
// 	user_id: 2
// }, {
// 	content: '您的专题任务6已经到了反馈时间请及时反馈!',
// 	notice_date: new Date(),
// 	user_id: 2
// }, {
// 	content: '您的专题任务7已经到了反馈时间请及时反馈!',
// 	notice_date: new Date(),
// 	user_id: 2
// }, {
// 	content: '您的专题任务8已经到了反馈时间请及时反馈!',
// 	notice_date: new Date(),
// 	user_id: 2

// }];

// msgs.forEach((i) => {
// 	Notice.sync({
// 		force: false
// 	}).then(() => {
// 		return Notice.create(i);
// 	})
// })

module.exports = Notice