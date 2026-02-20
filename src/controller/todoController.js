"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getAllTodo = exports.createTodo = void 0;
const express_1 = require("express");
const TodoController_1 = require("../models/TodoController");
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).json({
                success: false,
                message: "Name is required"
            });
        }
        const newTodo = yield TodoController_1.Todo.create({
            name
        });
        return res.status(201).json({
            success: true,
            message: "Todo created successfully",
            newTodo
        });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "Failed to create Todo"
        });
    }
});
exports.createTodo = createTodo;
const getAllTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTodos = yield TodoController_1.Todo.find();
        return res.status(201).json({
            success: true,
            message: "All todos fetched successfully",
            allTodos
        });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "Failed to fetch all todos"
        });
    }
});
exports.getAllTodo = getAllTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!name) {
            return res.status(401).json({
                success: false,
                message: "Name is required"
            });
        }
        const updatedTodo = yield TodoController_1.Todo.findByIdAndUpdate(id, { name }, { new: true });
        return res.status(201).json({
            success: true,
            message: "Todo updated successfully",
            updatedTodo
        });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "Failed to update Todo"
        });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteTodo = yield TodoController_1.Todo.findByIdAndDelete(id);
        if (!deleteTodo) {
            return res.status(401).json({
                success: false,
                message: "Todo is not found"
            });
        }
        return res.status(201).json({
            success: true,
            message: "Todo deleted successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "Failed to delete Todo"
        });
    }
});
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=todoController.js.map