export default async function getUsuarios(emailUser) {
  try {

    const response = await fetch("http://localhost/api/api.php", {
      method: "POST",
      body: JSON.stringify({getUsuarios: emailUser}),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(!response.ok) { throw new Error("Ha habido un error al recuperar los usuarios")}

    const responseData = await response.json()

    return responseData;
  } catch (error) {
    console.error("Error de red:", error);
  }
}

export async function emailExiste(email) {
  try {
    const formData = new FormData();
    formData.append('emailExiste', 'emailExiste');
    formData.append('email', email);

    const response = await fetch("http://localhost/api/api.php", {
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
    const response = await fetch("http://localhost/api/api.php", {
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
    const response = await fetch("http://localhost/api/api.php", {
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
    const response = await fetch("http://localhost/api/api.php", {
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

export async function recuperarGrupos() {
  try {
    console.log("me llaman")
    const response = await fetch("http://localhost/api/api.php", {
      method: "POST",
      body: JSON.stringify({ recuperarGrupos: "recuperarGrupos" }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if(!response.ok) { throw new Error("Ha habido un error al añadir iniciar sesion")}
    console.log("pedi")
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error("Error de red:", error);
  }
}

export async function recuperarEjercicios() {
  try {
    console.log("me llaman")
    const response = await fetch("http://localhost/api/api.php", {
      method: "POST",
      body: JSON.stringify({ recuperarEjercicios: "recuperarEjercicios" }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if(!response.ok) { throw new Error("Ha habido un error al añadir iniciar sesion")}
    console.log("pedi")
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error("Error de red:", error);
  }
}

export async function recuperarEquipamientos() {
  try {
    console.log("me llaman")
    const response = await fetch("http://localhost/api/api.php", {
      method: "POST",
      body: JSON.stringify({ recuperarEquipamientos: "recuperarEquipamientos" }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if(!response.ok) { throw new Error("Ha habido un error al añadir iniciar sesion")}
    console.log("pedi")
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error("Error de red:", error);
  }
}

export async function recuperarEjerciciosGrupo(datosGrupo) {
  try {
    console.log("me llaman")
    const response = await fetch("http://localhost/api/api.php", {
      method: "POST",
      body: JSON.stringify({ recuperarEjerciciosGrupo: datosGrupo }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if(!response.ok) { throw new Error("Ha habido un error al añadir iniciar sesion")}
    console.log("pedi")
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error("Error de red:", error);
  }
}

export async function crearEjercicio(datosEjercicio) {
  try {
    console.log("me llaman");
    
    const response = await fetch("http://localhost/api/api.php", {
        method: "POST",
        body: datosEjercicio,
        // No es necesario establecer 'enctype' aquí
    });

    if (!response.ok) { 
        throw new Error("Ha habido un error al crear el ejercicio");
    }

    console.log("pedi");
    const responseData = await response.json();
    return responseData;
  } catch (error) {
      console.error("Error de red:", error);
  }
}

export async function crearEntreno(datos) {
  try {
    const data = { crearEntreno: datos}
    console.log("crear usuario ",data)
    const response = await fetch("http://localhost/api/api.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log(response)
    if(!response.ok) { throw new Error("Ha habido un error al añadir un entreno")}

    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error("Error de red:", error);
  }
}

export async function recuperarEntrenos(usuarioEmail) {
  try {
    console.log("me llaman")
    console.log(usuarioEmail)
    const response = await fetch("http://localhost/api/api.php", {
      method: "POST",
      body: JSON.stringify({ recuperarEntrenos: usuarioEmail }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log(response)
    if(!response.ok) { throw new Error("Ha habido un error al añadir iniciar sesion")}
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error("Error de red:", error);
  }
}

export async function recuperarEjerciciosEntreno(idEntreno) {
  try {
    console.log("me llaman")
    console.log(idEntreno)
    const response = await fetch("http://localhost/api/api.php", {
      method: "POST",
      body: JSON.stringify({ recuperarEjerciciosEntreno: idEntreno }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log(response)
    if(!response.ok) { throw new Error("Ha habido un error al añadir iniciar sesion")}
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error("Error de red:", error);
  }
}

export async function guardarEjercicioEntreno(datos) {
  try {
    console.log("me llaman")
    console.log(datos)
    const response = await fetch("http://localhost/api/api.php", {
      method: "POST",
      body: JSON.stringify({ guardarEjercicioEntreno: datos }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log(response)
    if(!response.ok) { throw new Error("Ha habido un error al añadir iniciar sesion")}
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error("Error de red:", error);
  }
}

export async function borrarUsuario(usuarioID) {
  try {
    console.log("me llaman")
    console.log(usuarioID)
    const response = await fetch("http://localhost/api/api.php", {
      method: "POST",
      body: JSON.stringify({ borrarUsuario: usuarioID }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log(response)
    if(!response.ok) { throw new Error("Ha habido un error al borrar el usuario")}
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error("Error de red:", error);
  }
}