import React, {  useState, FormEvent } from 'react';

import './todos.css';

import TodoProps from '../../entities/todo';
import { getAuth } from 'firebase/auth';
import { getFunctions, httpsCallable } from '@firebase/functions';


interface TodoPropsComponent extends TodoProps {
    onUpdate: () => void;
}


function Todo ({ id, title, completed, onUpdate}: TodoPropsComponent) {
    const [text, setText] = useState(title);
    const [checked, setChecked] = useState(completed);
    const [status, setStatus] = useState('');
    const user = getAuth().currentUser;

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!user) return;
        const updateTodo = httpsCallable(getFunctions(), "updateTodo");
        try {
            await updateTodo({ id, title: text, completed: checked });
            setStatus('Todo updated');
        } catch (error) {
            console.error('Error updating todo', error);
        }
        onUpdate();
    }

    const handleDelete = async () => {
        if (!user) return;
        const deleteTodo = httpsCallable(getFunctions(), "deleteTodo");
        try {
            await deleteTodo({ id });
            setStatus('Todo deleted');
        } catch (error) {
            console.error('Error deleting todo', error);
        }
        onUpdate();
    }

    return (
        <div className="todo">
            <form onSubmit={handleSubmit}>
                <input type="checkbox" checked={checked} onChange={(e) => setChecked(!checked)}/>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} style={{ textDecoration: checked ? 'line-through' : 'none' }}/>
                <button onClick={handleDelete}>Delete</button>
                <button type="submit" >Update</button>
                <span>{ status }</span>
            </form>
        </div>
    );
}

export default Todo;


