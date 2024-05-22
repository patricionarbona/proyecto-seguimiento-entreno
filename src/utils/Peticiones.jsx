export default async function getUsuarios() {
  try {
    const formData = new FormData();
    formData.append('getUsuarios', 'getUsuarios');

    const response = await fetch("http://localhost/tfg/proyecto-seguimiento-entreno/src/php/api.php", {
      method: "POST",
      body: formData
    });

    return response;
  } catch (error) {
    console.error("Error de red:", error);
  }
}

export async function emailExiste(email) {
  try {
    const formData = new FormData();
    formData.append('emailExiste', 'emailExiste');
    formData.append('email', email);

    const response = await fetch("http://localhost/tfg/proyecto-seguimiento-entreno/src/php/api.php", {
      method: "POST",
      body: formData
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("respuesta petición: ", responseData);
    return responseData;
  } catch (error) {
    console.error("Error de red:", error);
  }
}

export async function comprobarEmail(email) {
  try {
    const data = { comprobarEmail: email}
    const response = await fetch("http://localhost/tfg/proyecto-seguimiento-entreno/src/php/api.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      
    });
    
    if(!response.ok) { throw new Error("Ha habido un error al comprobar el email")}

    const responseData = await response.json()

    return responseData;
  } catch (error) {
    console.error("Error de red:", error);
  }
}

export async function crearUsuario(datosUsuario) {
  try {
    const data = { crearUsuario: datosUsuario}
    console.log("crear usuario ",data)
    const response = await fetch("http://localhost/tfg/proyecto-seguimiento-entreno/src/php/api.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if(!response.ok) { throw new Error("Ha habido un error al añadir un usuario")}

    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error("Error de red:", error);
  }
}

export async function iniciarSesion(datosUsuario) {
  try {
    console.log("recibo: ",datosUsuario)
    const data = { iniciarSesion: datosUsuario}
    console.log("envio: ",data)
    const response = await fetch("http://localhost/tfg/proyecto-seguimiento-entreno/src/php/api.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if(!response.ok) { throw new Error("Ha habido un error al añadir iniciar sesion")}

    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error("Error de red:", error);
  }
}