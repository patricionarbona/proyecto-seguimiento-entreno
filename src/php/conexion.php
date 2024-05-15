<?php
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
    $jsonString = json_encode($datos);
    echo $jsonString;
}
?>