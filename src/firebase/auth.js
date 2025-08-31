import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword} from "firebase/auth";
import {auth} from "./firebase";
import { signOut } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignWithUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async()=>{
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    return result
};

export const doSignOut = () => {
    return signOut(auth);
  };

export const doPasswordReset = (email) =>{
    return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) =>{
    return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerfication = ()=>{
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
    });
};