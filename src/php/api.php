<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// Verificar si se recibió la solicitud con el parámetro "getUsuarios"
if(isset($_POST["getUsuarios"])) {
    // Establecer la respuesta para la solicitud "getUsuarios"
    obtenerUsuarios();
} 
if(isset($_POST['emailExiste'])) {
    emailExiste($_POST['email']);
}

function obtenerUsuarios() {
    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("SELECT * FROM usuario");
    $resultado->execute();
    $datos = array();
    while($fila = $resultado->fetch()) {
        $usuario = array(
            'nombre' => $fila['nombre'],
            'email' => $fila['email'],
            'cargo' => $fila['admin'],
            'id' => $fila['id'],
        );

        $datos[] = $usuario;
    }
    header('Content-Type: application/json');
    echo json_encode($datos);
}

function emailExiste($email) {
    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("SELECT * FROM usuario WHERE email = ?");
    $resultado->execute([$email]);
    $datos = array();
    while($fila = $resultado->fetch()) {
        $usuario = array(
            'email' => $fila['email'],
        );
        $datos[] = $usuario;
    }
    header('Content-Type: application/json');
    echo json_encode($datos);
}

function crearUsuario() {
    $email 
    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("INSERT INTO `usuario` (`id`, `email`, `password`, `nombre`, `admin`) VALUES (NULL, ?, '?', '?', '0');");
    $resultado->execute([$email]);
    $datos = array();
    while($fila = $resultado->fetch()) {
        $usuario = array(
            'email' => $fila['email'],
        );
        $datos[] = $usuario;
    }
    header('Content-Type: application/json');
    echo json_encode($datos);
}

INSERT INTO `usuario` (`id`, `email`, `password`, `nombre`, `admin`) VALUES (NULL, 'patricio@gmail.com', '123456', 'patricio', '1');
?>
