import React from "react";
import { getAuth, signOut } from "firebase/auth";

function SignOut() {
    async function signOutHandler() {
        try {
            await signOut(getAuth());
        }
        catch (error) {
            console.error('Error signing out', error);
        }
    }

    return (
        <div>
            <button onClick={signOutHandler}>Sign Out</button>
        </div>
    );
}


export default SignOut;
