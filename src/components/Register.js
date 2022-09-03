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
        rol: "user"
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
        if (user.password !== user.repassword){
           setError("Las contraseñas no coinciden")
        } else{
            try {
                await signup(user.email, user.password);
                navigate("/"); //* SI NO HUBO ERROR EN EL REGISTRO, NAVEGAS AL HOME *//
            } catch (error) {
                //* TRADUCCIÓN DE ERRORES *//
                // eslint-disable-next-line default-case
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
        <div>
            {error && <Alert message = {error} />}
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" name="userName" id="userName"
                            placeholder=" " //onChange={handleChange}
                            autoComplete="off"
                        ></input>
                        <label htmlFor="userName"
                            id="userName"
                        >User Name</label>
                    </div>
                    <div>
                        <input type="email" name="email" id="email"
                            placeholder=" " onChange={handleChange}
                            autoComplete="off"
                        ></input>
                        <label htmlFor="email"
                            id="email-label"

                        >Email</label>
                    </div>
                    <div>
                        <input type="password" name="password"
                            onChange={handleChange} placeholder=" "
                        ></input>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div>
                        <input type="password" name="repassword"
                            onChange={handleChange} placeholder=" "
                        ></input>
                        <label htmlFor="repassword"
                        >Repeat Password</label>
                    </div>
                    <button type="submit" name="register">Register</button>

                </form>
                <div>
                    <p>Already have an Account?</p>
                    <Link to="/login">LogIn</Link>
                </div>
        </div>
    )
}