const TodoItem = require('../models').TodoItem;

const getAllTodos = async (req, res) => {
    const todoItems = await TodoItem.findAll({
        where: {
            userId: req.user.id
        }
    });
    res.send(todoItems)
};

const addTodo = async (req, res) => {
    const {text} = req.body;
    try {
        let createdTodo = await TodoItem.create({
            text,
            userId: req.user.id
        }).then(todo => todo.get({ plain: true }));
        res.send(createdTodo);

    } catch (e) {
        console.log(e);
    }
};

module.exports = {getAllTodos, addTodo};

