import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { comprobarEmail, crearUsuario } from "../utils/Peticiones";

export default function RegistrarPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [responseMessage, setResponseMessage] = useState("");

  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const datos = {
      nombre : formData.get("name"),
      email : formData.get("email"),
      password : formData.get("password")
    }
    try {
      let response = await comprobarEmail(datos.email)
      console.log("respuesta ", response)
      if (response.message === "no existe") {
        response = await crearUsuario(datos)
        if (response.message === "añadido usuario") {
          navigate('/login');
        } else {
          console.log("No se añadió el usuario")
        }
      } else {
        console.log("Ya existe el usuario")
      }
      
    } catch (error) {
      console.error("Error de red:", error);
    }
  };
  
  
  

  return (
    <div>
      <a href="http://localhost/tfg/proyecto-seguimiento-entreno/src/php/registro.php">Prueba</a>
      <a href="http://localhost/tfg/proyecto-seguimiento-entreno/src/php/conexion.php">usuarios</a>
      <form onSubmit={handleSubmit}>
        <label htmlFor="inputName">Nombre:</label>
        <input
          id="inputName"
          type="text"
          placeholder="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="inputEmail">Email:</label>
        <input
          id="inputEmail"
          type="email"
          placeholder="correo@example.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="inputPassword">Contraseña:</label>
        <input
          id="inputPassword"
          type="password"
          placeholder="Contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button id="btnRegistrar" type="submit">
          Registrar
        </button>
      </form>
      <img src="../../php/a.gif" alt="" />
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
