import express from "express";
import { createTodo, deleteTodo, getAllTodo, updateTodo } from "../controller/todoController";

const todoRoutes = express.Router();
todoRoutes.post("/", createTodo);
todoRoutes.get("/AllTodo", getAllTodo);
todoRoutes.put("/update/:id",updateTodo);
todoRoutes.delete("/delete/:id",deleteTodo)

export default todoRoutes;