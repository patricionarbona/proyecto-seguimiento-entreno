import React, { useState } from "react";

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
    try {
        const formData = new FormData();
        formData.append('name', 'df');
        formData.append('email', 'fct@sialitech.com');
        formData.append('password', 'pass');
        formData.append('getUsuarios', 'getUsuarios');

        const response = await fetch("http://localhost/tfg/proyecto-seguimiento-entreno/src/php/registro.php", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            const responseData = await response.json();
            setResponseMessage(responseData.message);
            console.log(responseData[0])
            console.log("Usuarios recuperados:", responseData.message);
        } else {
            console.error("Error al enviar los datos:", await response.text());
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