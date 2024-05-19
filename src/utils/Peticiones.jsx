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
    console.log("respuesta peticion: ", response);
    return response;
  } catch (error) {
    console.error("Error de red:", error);
  }
}

export async function comprobarEmail(email) {
  try {
    const formData = new FormData();
    formData.append('comprobarEmail', 
      email
    );

    const response = await fetch("http://localhost/tfg/proyecto-seguimiento-entreno/src/php/api.php", {
      method: "POST",
      body: formData
    });
    console.log("respuesta peticion: ", response);
    return response;
  } catch (error) {
    console.error("Error de red:", error);
  }
}

export async function crearUsuario(form) {
  try {
    console.log("form?:" ,form)
    const formData = new FormData(form)
    formData.append('crearUsuario', 'crearUsuario')
    console.log("form d?:" ,form)
    const response = await fetch("http://localhost/tfg/proyecto-seguimiento-entreno/src/php/api.php", {
      method: "POST",
      body: formData
    });
    console.log("respuesta peticion: ", response);
    return response;
  } catch (error) {
    console.error("Error de red:", error);
  }
}