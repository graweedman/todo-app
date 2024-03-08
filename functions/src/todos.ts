import { HttpsError, onCall } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { logger } from "firebase-functions/v1";

admin.initializeApp();

const db = admin.firestore();
const auth = admin.auth();
const todosCollection = db.collection("todos");

interface Todo {
    id: string;
    title: string;
    completed: boolean;
    userId: string;
}

export const createTodoHandler = onCall(async (request) => {
    if (!request.auth) {
        throw new HttpsError('unauthenticated', 'Not authenticated');
    }
    try {
        const { title, userId }: Todo = request.data;
        const user = await auth.getUser(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const newTodo = await todosCollection.add({ title, completed: false, userId});
        logger.info(`Todo created with id: ${newTodo.id}`);
        return { result: newTodo.id };
    } catch (error) {
        logger.error(error);
        throw new HttpsError('internal', 'Internal Server Error');
    }
});

export const getTodosHandler = onCall(async (request) =>{
    if (!request.auth) {
        throw new HttpsError('unauthenticated', 'Not authenticated');
    }
    try {
        const user = request.auth;
        const todos = await todosCollection.where('userId', '==', user.uid).get();
        const result = todos.docs.map((todo) => {
            return {
                id: todo.id,
                ...todo.data()
            } as Todo;
        });
        return { result };
    } catch (error) {
        logger.error(error);
        throw new HttpsError('internal', 'Internal Server Error');
    }
});

export const getTodoHandler = onCall(async (request) => {
    if (!request.auth) {
        throw new HttpsError('unauthenticated', 'Not authenticated');
    }
    try {
        const { id } = request.data;
        const todo = await todosCollection.doc(id).get();
        if (!todo.exists) {
            throw new HttpsError('not-found', 'Todo not found');
        }
        return { result: todo.data() };
    }
    catch (error) {
        logger.error(error);
        throw new HttpsError('internal', 'Internal Server Error');
    }
});

export const updateTodoHandler = onCall(async (request)  => {
    if (!request.auth) {
        throw new HttpsError('unauthenticated', 'Not authenticated');
    }
    try {
        const { id, title, completed }: Todo = request.data;
        const todo = todosCollection.doc(id);
        await todo.update({ title, completed });
        return { result: 'Todo updated' };
    }
    catch (error) {
        logger.error(error);
        throw new HttpsError('internal', 'Internal Server Error');
    }
}
);

export const deleteTodoHandler = onCall(async (request) => {
    if (!request.auth) {
        throw new HttpsError('unauthenticated', 'Not authenticated');
    }
    try {
        const { id } = request.data;
        const todo = todosCollection.doc(id);
        await todo.delete();
        return { result: 'Todo deleted' };
    }
    catch (error) {
        logger.error(error);
        throw new HttpsError('internal', 'Internal Server Error');
    }
});

