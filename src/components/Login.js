/* PÁGINA DE LOGIN */
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
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

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }

    //* SUBMIT DE LOS DATOS *//

    const handleSubmit = async e => {
        e.preventDefault() //* PREVENIR EL REFRESCO DE LA PÁGINA *//
        setError('')
        try {
            await login(user.email, user.password)
            navigate("/"); //* SI NO HUBO ERROR EN EL LOGIN, NAVEGAS AL HOME *//
        } catch (error) {
            //* TRADUCCIÓN DE ERRORES *//
            switch (error.code) {
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

    const handleGoogleSignIn = async () => {
        setError('')
        try {
            await loginWithGoogle()
            navigate("/")
        } catch (error) {
            setError('Hubo un error con el login de google, inténtelo más tarde.')
        }
    }

    return (
        <div className="w-full max-w-xs m-auto">
            <div className="text-center">
                {error && <Alert message={error} />}
                <form onSubmit={handleSubmit} className="bg-primary2 px-8 pt-3 pb-8 mb-1">
                    <div>
                        <img src="../logoCrapp.png" alt="Logo Crapp"
                            className="mx-auto p-9 mb-8"></img>
                    </div>
                    <div className="mb-10">
                        <input type="email" name="email"
                            placeholder="Email" onChange={handleChange}
                            className="appearance-none bg-transparent text-left 
                                        focus:outline-none leading-tight text-white placeholder-white
                                        border border-primary2 border-b-black w-9/12 pb-1" ></input>
                    </div>
                    <div className="mb-10">
                        <input type="password" name="password" placeholder="Password"
                            onChange={handleChange} className="appearance-none bg-transparent text-left 
                                            leading-tight text-white placeholder-white focus:outline-none
                                            border border-primary2 border-b-black w-9/12 pb-1"></input>
                    </div>
                    <div className="mb-5">
                        <button type="submit" name="login"
                            className="text-white p-4 px-10 bg-primary hover:bg-gray-300
                             hover:text-black rounded h-15">Login</button>
                    </div>
                    <div className="">
                        <button className="text-white hover:text-black">Forgot Password?</button>
                    </div>
                </form>
                <div>
                    <div className="flex w-full h-15 p-0 m-0">
                        <img src="../logoGoogle.png" className="w-1/5 p-2"
                        alt="Logo Google"></img>
                        <button onClick={handleGoogleSignIn} className="text-primary hover:text-black w-2/5 text-left fit-content">Google Login</button>
                        <button className="w-2/5 ml-10 text-center 
                        bg-gray-300 text-primary hover:bg-primary2 hover:text-white my-2"><Link to="/register">Register</Link></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
