import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [resetSent, setResetSent] = useState(false);
    const [error, setError] = useState('');

    async function resetPasswordHandler() {

        try {
            await sendPasswordResetEmail(getAuth(), email);
            setResetSent(true);
            setError('');
        }
        catch (error) {
            setError('Error resetting password!');
            console.error('Error resetting password', error);
        }

    }

    return (
        <div className="form-container">
            <h1>Reset Password</h1>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={resetPasswordHandler}>Reset Password</button>
            <div>
                {error}
            </div>
            {resetSent && <div>Password reset email sent!</div>}
        </div>
    );
}

export default ResetPassword;
