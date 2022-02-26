import React from "react";
import { Routes, Rout, Route } from "react-router-dom"; //*FUNCIONES PARA EL MANEJO DE LAS RUTAS DE LA WEB*//
import { Home } from './components/Home'
import { Login } from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Register } from "./components/Register";
import { AuthProvider } from "./context/authContext"; //*FUNCIÓN PARA LA AUTENTICACIÓN DEL USUARIO *//

export default function App() {
  return (
    //* (AuthProvider provee la autenticación para el acceso a las rutas (Routes)) *//
    <AuthProvider>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  )
}