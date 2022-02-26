//* CONTEXTO PARA CONCEDER ACCESO LUEGO DEL LOGIN *//

import { createContext, useContext } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase/firebase-config";

export const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) throw new Error("There's not Auth Provider")
    return context;
}

export function AuthProvider({ children }) {
    //* ENVÍA DATOS A FIREBASE *//
    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);

    return (
        <authContext.Provider value={{ signup }}>{children}</authContext.Provider>
    );
}