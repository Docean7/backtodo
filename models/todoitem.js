'use strict';
module.exports = (sequelize, DataTypes) => {
    const TodoItem = sequelize.define('TodoItem', {
        text: DataTypes.STRING,
        completed: DataTypes.BOOLEAN
    }, {});
    TodoItem.associate = function (models) {
        TodoItem.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        })
    };
    return TodoItem;
};