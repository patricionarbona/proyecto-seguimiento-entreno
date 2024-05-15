<?php
function obtenerUsuarios() {
    $conexion = new PDO('mysql:host=localhost;dbname=entrenos', 'dwes', 'abc123.');
    $resultado = $conexion -> prepare("SELECT * FROM usuarios WHERE email != ?;");
    $resultado -> execute(array($_POST['email']));
    $datos = array();
    while($fila = $resultado -> fetch()) {
        $usuario = array(
            'nombre' => $fila['nombre'],
            'email' => $fila['email'],
            'telefono' => $fila['telefono'],
            'cargo' => $fila['admin'],
            'estado' => $fila['activo'],
            'id' => $fila['id'],
        );

        $datos[] = $usuario;
    }

    $jsonString = json_encode($datos);
    echo $jsonString;
}
?>