import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    async function signUpWithEmailAndPasswordHandler() {
        try {
            if (password !== confirmPassword) {
                setError('Passwords do not match!');
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
            setError('');
        }
        catch (error) {
            setError('Error signing up with password and email!');
            console.error('Error signing up with password and email', error);
        }
    }

    return (
        <div className="form-container">
            <h1>Sign Up</h1>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label>Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button onClick={signUpWithEmailAndPasswordHandler}>Sign Up</button>
            <div>
                {error}
            </div>
        </div>
    );

}

export default SignUp;
