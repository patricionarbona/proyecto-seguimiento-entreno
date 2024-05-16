<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// Verificar si se recibió la solicitud con el parámetro "getUsuarios"
if(isset($_POST["getUsuarios"])) {
    // Establecer la respuesta para la solicitud "getUsuarios"
    obtenerUsuarios();
} else {
    $response = array('success' => false, 'message' => 'No se ha recibido el parámetro "getUsuarios"');
}


function obtenerUsuarios() {
    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion -> prepare("SELECT * FROM usuario ;");
    $resultado -> execute();
    $datos = array();
    while($fila = $resultado -> fetch()) {
        $usuario = array(
            'nombre' => $fila['nombre'],
            'email' => $fila['email'],
            'cargo' => $fila['admin'],
            'id' => $fila['id'],
        );

        $datos[] = $usuario;
    }
    header('Content-Type: application/json');
    $jsonString = json_encode($datos);
    echo $jsonString;
}
?>
