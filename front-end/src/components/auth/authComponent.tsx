import React, { useEffect, useState } from "react";
import SignIn from "./signInComponent";
import SignOut from "./signOutComponent";
import SignUp from "./signUpComponent";
import ResetPassword from "./resetPasswordComponent";
import "./auth.css";
import { getAuth } from "@firebase/auth";
import NotSignedIn from "./sub/notSignedIn";
import SignedIn from "./sub/signedIn";

enum Views {
    SignIn = 'signIn',
    SignUp = 'signUp',
    ResetPassword = 'resetPassword',
}

function Authentication() {
    const [currentView, setCurrentView] = useState<Views>(Views.SignIn);
    const [isAuthenticationPopupVisible, setIsAuthenticationPopupVisible] = useState(false);
    const [user, setUser] = useState(getAuth().currentUser);

    useEffect(() => {
        getAuth().onAuthStateChanged((user) => {
            setUser(user);
        });
    }, []);

    function changeView(view: Views) {
        setCurrentView(view);
    }

    return (
        <div>
            <div className="profile-icon" onClick={() => setIsAuthenticationPopupVisible(!isAuthenticationPopupVisible)}>
                <img src="https://via.placeholder.com/25" alt="Profile" />
            </div>
            <div className="authentication-popup" style={{display: isAuthenticationPopupVisible ? "block" : "none" }}>

                { user ?
                    <div>
                        <SignedIn />
                        <SignOut />
                    </div> :
                    <div>
                        <NotSignedIn />
                        <nav>
                            <ul>
                                <li><button onClick={() => changeView(Views.SignIn)}>Sign In</button></li>
                                <li><button onClick={() => changeView(Views.SignUp)}>Sign Up</button></li>
                                <li><button onClick={() => changeView(Views.ResetPassword)}>Reset Password</button></li>
                            </ul>
                        </nav>
                        {currentView === Views.SignIn && <SignIn />}
                        {currentView === Views.SignUp && <SignUp />}
                        {currentView === Views.ResetPassword && <ResetPassword />}
                    </div>
                }
            </div>
        </div>
    );
}

export default Authentication;
