/* PÁGINA PRINCIPAL (LUEGO DEL LOGEARSE) */

import { useAuth } from "../context/authContext"

export function Home() {

    //* TRAE EL USUARIO, LA VARIABLE DE CARGA Y LA FUNCIÓN LOGOUT DEL AUTH CONTEXT *//
    const{ user, logout, loading } = useAuth();
    console.log(user)

    const handleLogout = async() => {
        await logout()
    }

    //* SI LOS DATOS DEL AUTH NO SE HAN ACTUALIZADO, SE PINTA UN "CARGANDO" *//
    if (loading) return <h1>Cargando...</h1>
    
    return <div>

        <h1>Welcome, {user.email}</h1>
        <button onClick={handleLogout} name="logout">Logout</button>

    </div>
}