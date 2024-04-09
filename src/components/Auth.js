import React, { useEffect } from "react";
import { auth, provider } from "../config/Firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "./hooks/useGetUserInfo";
import './auth.css'
const Auth = () => {
    const { isAuth } = useGetUserInfo();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate("/newproject");
        }
    }, [isAuth, navigate]);

    const signInWithGoogle = async () => {
        try {
            const results = await signInWithPopup(auth, provider);
            const authInfo = {
                userID: results.user.uid,
                name: results.user.displayName,
                profilePhoto: results.user.photoURL,
                isAuth: true,
            };
            localStorage.setItem("auth", JSON.stringify(authInfo));
            navigate("/newproject");
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    if (isAuth) {
        return null;
    }

    return (
        <>
            <div className="login-page">
                <h1>Welcome to Project Manager</h1>
                <p>Keep track of your Projects easily with our Project Manager app.</p>
                <p>Sign in with Google to continue:</p>
                <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign in with Google</button>
            </div>
        </>
    );
};

export default Auth;
