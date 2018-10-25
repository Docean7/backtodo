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
        await TodoItem.create({
            text,
            userId: req.user.id
        });
        getAllTodos(req, res)
    } catch (e) {
        console.log(e);
    }
};

module.exports = {getAllTodos, addTodo};

