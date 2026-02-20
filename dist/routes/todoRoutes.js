"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controller/todoController");
const todoRoutes = express_1.default.Router();
todoRoutes.post("/", todoController_1.createTodo);
todoRoutes.get("/AllTodo", todoController_1.getAllTodo);
todoRoutes.put("/update/:id", todoController_1.updateTodo);
todoRoutes.delete("/delete/:id", todoController_1.deleteTodo);
exports.default = todoRoutes;
