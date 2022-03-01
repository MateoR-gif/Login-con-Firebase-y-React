/* PÁGINA DE REGISTRO */

import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "./Alert";

export function Register() {

    const [user, setUser] = useState({
        email: "",
        password: "",
        repassword: "",
    });

    const { signup } = useAuth()
    const navigate = useNavigate();
    const [error, setError] = useState();

    //* SET DE EMAIL Y PASSWORD *//

    const handleChange = ({target: {name, value}}) => {
        setUser({...user, [name]: value}) 
    }

    //* SUBMIT DE LOS DATOS *//

    const handleSubmit = async (e) =>{
        e.preventDefault() //* PREVENIR EL REFRESCO DE LA PÁGINA *//
        setError('')
        if (user.password != user.repassword){
           setError("Las contraseñas no coinciden")
        } else{ 
            try {
                await signup(user.email, user.password);
                navigate("/login"); //* SI NO HUBO ERROR EN EL REGISTRO, NAVEGAS AL LOGIN *//
            } catch (error) {
                //* TRADUCCIÓN DE ERRORES *//
                switch (error.code){
                    case "auth/internal-error":
                        setError("No ha digitado los campos correctamente.");
                        break;
                    case "auth/invalid-email":
                        setError("El email digitado es inválido");
                        break;
                    case "auth/weak-password":
                        setError("La contraseña debe tener como mínimo 6 caracteres");
                        break;
                    case "auth/email-already-in-use":
                        setError("El correo digitado ya está en uso");
                        break;
                }   
            }
        }   
    }

    return (
        <div className="w-full max-w-xs m-auto">
            <div className="text-center">
                {error && <Alert message = {error} />}
                <form onSubmit={handleSubmit} className="bg-primary2 px-8 pt-3 
                pb-8 mb-2">
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
                                            focus:outline-none leading-tight text-white placeholder-white
                                            border border-primary2 border-b-black w-9/12 pb-1"></input>
                    </div>
                    <div className="mb-10">
                        <input type="password" name="repassword" placeholder="Repeat Password"
                            onChange={handleChange} className="appearance-none bg-transparent text-left 
                                            focus:outline-none leading-tight text-white placeholder-white
                                            border border-primary2 border-b-black w-9/12 pb-1"></input>
                    </div>
                    <button type="submit" name="register" className="text-white p-4 px-10 
                    bg-primary hover:bg-white rounded hover:text-black">Register</button>

                </form>
                <div>
                    <p className="separated">Already have an Account?<Link to="/login">LogIn</Link></p>
                </div>
            </div>
            
        </div>
    )
}