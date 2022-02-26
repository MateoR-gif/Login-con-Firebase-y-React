/* PÁGINA DE LOGIN */
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";

export function Login() {

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { login, loginWithGoogle } = useAuth(); //* LLAMA LA FUNCIÓN LOGIN *//
    const navigate = useNavigate(); //* LLAMA LA FUNCIÓN QUE PERMITE NAVEGAR ENTRE PÁGINAS *//
    const [error, setError] = useState(); //* GUARDA MENSAJES DE ERROR *//

    //* SET DE EMAIL Y PASSWORD *//

    const handleChange = ({target: {name, value}}) => {
        setUser({...user, [name]: value}) 
    }

    //* SUBMIT DE LOS DATOS *//

    const handleSubmit = async e =>{
        e.preventDefault() //* PREVENIR EL REFRESCO DE LA PÁGINA *//
        setError('')
        try {
            await login(user.email, user.password) 
            navigate("/"); //* SI NO HUBO ERROR EN EL LOGIN, NAVEGAS AL HOME *//
        } catch (error) {
            //* TRADUCCIÓN DE ERRORES *//
            switch (error.code){
                case "auth/internal-error":
                    setError("No ha digitado los campos correctamente.");
                    break;
                case "auth/invalid-email":
                    setError("El email digitado es inválido");
                    break;
                case "auth/wrong-password":
                    setError("La contraseña es incorrecta")
                    break;
                case "auth/user-not-found":
                    setError("El usuario no está registrado")
                    break;
            }
        }       
    }

    const handleGoogleSignIn = async() => {
        setError('')
        try {
            await loginWithGoogle()
            navigate("/") 
        } catch (error) {
            setError('Hubo un error con el login de google, inténtelo más tarde.')   
        }
    }

    return (
        <div>
            {error && <Alert message = {error} />}
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange}></input>
                <input type="password" name="password" placeholder="Password" onChange={handleChange}></input>
                <button type="submit" name="login">Login</button> 
            </form>
            <button onClick={handleGoogleSignIn}>Google Login</button>
        </div>
    )
}
