const { Router } = require("express");
const UsersController = require("../controllers/Users.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = Router();

router.get("/users", authMiddleware, UsersController.getAllUsers);
router.post("/auth", UsersController.registerUser);
router.post('/login', UsersController.login)
module.exports = router