/*user model*/
var Sequelize = require('sequelize');
var sequelize = require('../common/mysql');

var TaskCategory = sequelize.define('task_category', {
	id: {
		type: Sequelize.BIGINT(11),
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING(100),
		allowNull: false,
		comment: '类别名称'
	},
	weight: {
		type: Sequelize.BIGINT(11),
		allowNull: false,
		comment: '权重'
	}
}, {
	underscored: true,
	timestamps: false,
	createAt: false,
	paranoid: true
});

// var tasks = [{
// 	name: '静态页',
// 	weight: 1
// }, {
// 	name: '动态专题',
// 	weight: 2
// }, {
// 	name: '后端页',
// 	weight: 2
// }, {
// 	name: '公共组件',
// 	weight: 2
// }, {
// 	name: '游戏',
// 	weight: 3
// }, {
// 	name: '专业研发',
// 	weight: 4
// }, {
// 	name: '通用一',
// 	weight: 1
// }, {
// 	name: '通用二',
// 	weight: 2
// }, {
// 	name: '通用三',
// 	weight: 3
// }];

// tasks.forEach((i) => {
// 	TaskCategory.sync({
// 		force: false
// 	}).then(function() {
// 		return TaskCategory.create(i)
// 	})
// })

module.exports = TaskCategory