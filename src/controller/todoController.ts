import { Request, Response } from "express";
import { Todo } from "../models/TodoController";

export const createTodo =async (req: Request, res: Response) => {
    try {
        const {name}=req.body;
        if(!name){
            return res.status(401).json({
                success:false,
                message:"Name is required"
            })
        }
        const newTodo=await Todo.create({
            name
        })
        return res.status(201).json({
            success:true,
            message:"Todo created successfully",
            newTodo
        })
    } catch (error) {
    console.log(error);
    return res.status(501).json({
        success:false,
        message:"Failed to create Todo"
    })
    }
};

export const getAllTodo=async(req:Request,res:Response)=>{
    try {
        const allTodos=await Todo.find();
        return res.status(201).json({
            success:true,
            message:"All todos fetched successfully",
            allTodos
        })
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success:false,
            message:"Failed to fetch all todos"
        })
    }
}


export const updateTodo=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const {name} =req.body;
        if(!name){
            return res.status(401).json({
                success:false,
                message:"Name is required"
            })
        }
        const updatedTodo=await Todo.findByIdAndUpdate(id,{name},{new:true});
        return res.status(201).json({
            success:true,
            message:"Todo updated successfully",
            updatedTodo
        })
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success:false,
            message:"Failed to update Todo"
        })
    }
}

export const deleteTodo=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const deleteTodo=await Todo.findByIdAndDelete(id);
        if(!deleteTodo){
            return res.status(401).json({
                success:false,
                message:"Todo is not found"
            })
        }
        return res.status(201).json({
            success:true,
            message:"Todo deleted successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success:false,
            message:"Failed to delete Todo"
        })
    }
}