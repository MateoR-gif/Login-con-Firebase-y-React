/* PÁGINA PRINCIPAL (LUEGO DEL LOGEARSE) */

import { useAuth } from "../context/authContext"
import { useState } from "react";

export function Home() {

    //* TRAE EL USUARIO, LA VARIABLE DE CARGA Y LA FUNCIÓN LOGOUT DEL AUTH CONTEXT *//
    const{ user, logout, loading } = useAuth();
    console.log(user)

    const [error, setError] = useState(); //* GUARDA MENSAJES DE ERROR *//

    const handleLogout = async() => {
        setError('')
        try{
            await logout()
        } catch (error) {
            setError('Hubo un problema con el logout, inténtelo de nuevo.')
        }
        
    }

    //* SI LOS DATOS DEL AUTH NO SE HAN ACTUALIZADO, SE PINTA UN "CARGANDO" *//
    if (loading) return <h1>Cargando...</h1>

    return <div>

        <h1>Welcome, {user.displayName || user.email}</h1>
        <button onClick={handleLogout} name="logout">Logout</button>

    </div>
}