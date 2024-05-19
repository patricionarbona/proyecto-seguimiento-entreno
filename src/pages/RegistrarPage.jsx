import React, { useState } from "react";
import { comprobarEmail, crearUsuario } from "../utils/Peticiones";

export default function RegistrarPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [responseMessage, setResponseMessage] = useState("");

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
    console.log(formData)
  console.log(datos)
    try {
      const response = await comprobarEmail(datos.email);
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.message === "existe") {
          setResponseMessage("El usuario ya existe.");
          return;
        }
      } else {
        console.error("Error al verificar el email existente:", await response.text());
      }
  
      // const crearUsuarioResponse = await crearUsuario(formData);
      // if (crearUsuarioResponse.ok) {
      //   const responseData = await crearUsuarioResponse.json();
      //   setResponseMessage("Usuario creado correctamente.");
      // } else {
      //   console.error("Error al crear el usuario:", await crearUsuarioResponse.text());
      // }
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
