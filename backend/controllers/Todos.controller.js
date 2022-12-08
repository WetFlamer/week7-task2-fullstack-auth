const Todo = require("../models/Todo.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = todosController = {
  getAllTodos: async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
  },

  deleteTodo: async (req, res) => {
    const { id } = req.params;

    try {

      const todo = await Todo.findByIdan(id)
     
        if(todo.user.toString() === req.user.id) {
            await todo.remove()

            return res.json('удалено');
        }
        return res.status(401).json('ошибка. Нет доступа!')

    } catch (error) {
      return res.status(401).json("Ошибка" + error);
    }
  },
  createTodo: async (req, res) => {
    const { text } = req.body;
    try {
      const todo = await Todo.create({
        user: req.user.id,
        text,
      });
      return res.json(todo);
    } catch (error) {
      return res.status(401).json(error + "Неверный токен");
    }
  },
  editTodo: async (req, res) => {
    try {
      const todo = await Todos.findByIdAndUpdate(
        req.params.id,
        {
          completed: req.body.completed,
        },
        { new: true }
      );
      res.json(todo);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};
