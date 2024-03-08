import React, { useEffect, useState } from "react";
import TodoProps from "../../entities/todo";

import Todo from "./todoComponent";
import { getAuth } from "firebase/auth";
import { httpsCallable, getFunctions } from "firebase/functions";

function TodoList() {
    const [todos, setTodos] = useState<TodoProps[]>([]);
    const [user, setUser] = useState(getAuth().currentUser);

    async function fetchData() {
        if (!user) {
            setTodos([]);
            return;
        };
        const getTodos = httpsCallable(getFunctions(), 'getTodos');
        try {
            const result = await getTodos({ uid: user?.uid });
            const data = result.data as {result: TodoProps[]};
            setTodos(data.result);
        } catch (error)  {
            console.error('Error fetching todos', error);
        };
    }

    useEffect(() => {
        getAuth().onAuthStateChanged((user) => {
            setUser(user);
            fetchData();
        });
    });

    return (
        <div >
        {todos.map((todo) => (
            <Todo key={todo.id} {...todo} onUpdate={() => fetchData()} />
        ))}
        </div>
    );
}

export default TodoList;
