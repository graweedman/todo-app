/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import { createTodoHandler, deleteTodoHandler, getTodoHandler, getTodosHandler, updateTodoHandler } from "./todos";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const createTodo = createTodoHandler;
export const getTodo = getTodoHandler;
export const getTodos = getTodosHandler;
export const updateTodo = updateTodoHandler;
export const deleteTodo = deleteTodoHandler;
