import React, { FormEvent, useEffect, useState} from 'react';
import { getAuth } from 'firebase/auth';
import { getFunctions, httpsCallable } from '@firebase/functions';


function TodoForm() {
    const [title, setTitle] = useState('');
    const [user, setUser] = useState(getAuth().currentUser);
    const [status, setStatus] = useState('');

    useEffect(() => {
        getAuth().onAuthStateChanged((user) => {
            setUser(user);
        });
    },[]);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!user) {
            setStatus('User not signed in');
            return
        }
        if (title === '') {
            setStatus('Title cannot be empty');
            return;
        };

        const createTodo = httpsCallable(getFunctions(), "createTodo");
        try {
            await createTodo({ userId: user.uid, title: title });
            setStatus('Todo created');
        } catch (error) {
            setStatus('Error creating todo');
            console.error('Error creating todo', error);
        }

        setTitle('');
    }

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input type="text" disabled={user ? false : true} value={title} onChange={(e) => setTitle(e.target.value)} />
            <button type="submit" disabled={user ? false : true}>Add</button>
            <span>{ status }</span>
        </form>
    );
}

export default TodoForm;
