/* PÁGINA DE LOGIN */
import { useState } from "react"

export function Login(){

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    return <div>
        <form>
            <input type="email" name="email" id="email" placeholder="Email" />
            <input type="password" name="password" id="password" placeholder="Password"/>
        </form>
    </div>
}