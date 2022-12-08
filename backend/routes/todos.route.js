const { Router } = require("express");
const todosController = require("../controllers/Todos.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = Router();

router.get("/todos", authMiddleware, todosController.getAllTodos);
// router.get("/:userId/todos", authMiddleware, todosController.getTodoByUserId);
router.post("/todos", authMiddleware, todosController.createTodo);
router.patch('/todos/:id', authMiddleware, todosController.editTodo)
router.delete('/todos/:id', authMiddleware, todosController.deleteTodo)
module.exports = router