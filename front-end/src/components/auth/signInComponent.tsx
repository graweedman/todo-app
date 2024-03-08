import React, {useState} from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function signInWithEmailAndPasswordHandler() {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            setError('');
        }
        catch (error) {
            setError('Error signing in with password and email!');
            console.error('Error signing in with password and email', error);
        }
    }

    return (
        <div className="form-container">
            <h1>Sign In</h1>
            <div>
                <label htmlFor="email">Email:</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" onClick={signInWithEmailAndPasswordHandler}>Sign In</button>

            <div>
                {error}
            </div>
        </div>
    );
}

export default SignIn;
