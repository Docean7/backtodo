const usersController = require('../controllers').users;
const todosController = require('../controllers').todoItems;
const expressJwt = require('express-jwt');
module.exports = (app) => {

    app.post('/api/register', usersController.create);
    app.post('/api/auth', usersController.auth);
    app.post('/api/addtodo',expressJwt({ secret: 'secret' }), todosController.addTodo);
    app.get('/api/getall', expressJwt({ secret: 'secret' }), todosController.getAllTodos);
};