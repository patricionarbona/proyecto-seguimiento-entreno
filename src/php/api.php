<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Verificar si se recibió la solicitud con el parámetro "getUsuarios"
if(isset($data["getUsuarios"])) {
    // Establecer la respuesta para la solicitud "getUsuarios"
    obtenerUsuarios();
} 

if(isset($data['crearUsuario'])) {
    crearUsuario($data['crearUsuario']);
}

if(isset($data['comprobarEmail'])) {
    comprobarEmail($data['comprobarEmail']);
}

if(isset($data['iniciarSesion'])) {
    iniciarSesion($data['iniciarSesion']);
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


// Querys para gestionar la BD
function comprobarEmail($email){
    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("SELECT * FROM usuario WHERE email = ?");
    $resultado->execute([$email]);
    $datos = $resultado -> rowCount() > 0 ? [ "message" => "existe"] : [ "message" => "no existe" ];

    header('Content-Type: application/json');
    echo json_encode($datos);
}

function crearUsuario($datosUsuario){

    $nombre = $datosUsuario['nombre'];
    $email = $datosUsuario['email'];
    $password = $datosUsuario['password'];
    $password = hash('sha256', $password);

    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("INSERT INTO usuario (id, email, password, nombre, admin) VALUES (NULL, ? , ? , ? , '0');");
    $resultado->execute([$email, $password, $nombre]);
    $datos = $resultado ? [ "message" => "añadido usuario"] : [ "message" => "no añadido" ];

    header('Content-Type: application/json');
    echo json_encode($datos);
}
function recuperarUsuarios() {
    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("SELECT * FROM usuario");
    $resultado->execute();
    $datos = array();
    while($fila = $resultado -> fetch()) {
        $usuario = array(
            'id' => $fila['id'],
            'nombre' => $fila['nombre'],
            'email' => $fila['email'],
            'cargo' => $fila['admin'],
        );

        $datos[] = $usuario;
    }

    header('Content-Type: application/json');
    echo json_encode($datos);
}
function iniciarSesion($datos) {
    $email = $datos['email'];
    $password = $datos['password'];
    $password = hash('sha256', $password);
    
    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("SELECT * FROM usuario WHERE email = ? AND password=?");
    $resultado->execute([$email, $password]);
    $datos = array();
    $datos = $resultado -> rowCount() > 0 ? [ "message" => "sesion iniciada"] : [ "message" => "no inicia" ];


    header('Content-Type: application/json');
    echo json_encode($datos);
}
function crearEjercicio($datosEjercicio){
    $datosEjercicio = json_decode($datosEjercicio,true);

    $ejercicio = $datosEjercicio['ejercicio'];
    $descripcion = $datosEjercicio['descripcion'];
    $foto = $datosEjercicio['foto'];
    $musculos = $datosEjercicio['musculos'];
    $grupoMuscular = $datosEjercicio['grupoMuscular'];

    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("INSERT INTO ejercicios (id, ejercicio, descripcion, foto, musculos) VALUES (NULL, ?, ?, ?, ?);");
    $resultado->execute([$ejercicio, $descripcion, $foto, $musculos]);
    $datos = $resultado ? [ "message" => "añadido ejercicio"] : [ "message" => "no añadido ejercicio" ];
    
    //insertar en ejercicios_grupo
    $resultado = $conexion -> prepare("INSERT INTO ejercicios_grupo (id, fk_ejercicio, fk_grupo) 
        VALUES (
            NULL, 
            (SELECT id FROM ejercicios WHERE ejercicio = ?), 
            (SELECT id FROM grupo WHERE grupo = ?)
    );");

    $resultado -> execute([$ejercicio, $grupo]);
    $datos = $resultado ? [ "message" => "añadido ejercicio"] : [ "message" => "no añadido ejercicio" ];

    header('Content-Type: application/json');
    echo json_encode($datos);
}
function recuperarEjercicios(){
    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("SELECT * FROM ejercicios");
    $resultado->execute();
    $datos = array();
    while($fila = $resultado -> fetch()) {
        $ejercicio = array(
            'id' => $fila['id'],
            'ejercicio' => $fila['ejercicio'],
            'descripcion' => $fila['descripcion'],
            'foto' => $fila['foto'],
            'musculos' => $fila['musculos'],
        );

        $datos[] = $ejercicio;
    }

    header('Content-Type: application/json');
    echo json_encode($datos);
}
function recuperarEjerciciosGrupo($grupo){
    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("SELECT e.*
        FROM ejercicios e
        JOIN ejercicios_grupo eg ON e.id = eg.fk_ejercicios
        JOIN grupo g ON eg.fk_grupo = g.id
        WHERE g.nombre = ?;
    ");
    $resultado->execute([$grupo]);
    $datos = array();
    while($fila = $resultado -> fetch()) {
        $ejercicio = array(
            'id' => $fila[''],
            'ejercicio' => $fila['ejercicio'],
            'descripcion' => $fila['descripcion'],
            'foto' => $fila['foto'],
            'musculos' => $fila['musculos'],
        );

        $datos[] = $ejercicio;
    }

    header('Content-Type: application/json');
    echo json_encode($datos);
}
function crearEntreno($datosEntreno){
    $usuario = $datosEntreno['usuarioEmail'];
    $nombreEntreno = $datosEntreno['entreno'];

    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("INSERT INTO entreno (id, fk_usuario, nombre) 
        VALUES (
            NULL,
            (SELECT id FROM usuario where email = ?) ,
            ? );");
    $resultado->execute([$usuario,$nombreEntreno ]);
    $idEntreno = $conexion -> lastInsertId();

    $resultado = $conexion->prepare("INSERT INTO usuario_entreno (id, fk_usuario, fk_entrenos) 
        VALUES (
            NULL,
            (SELECT id FROM usuario WHERE email = ?),
            ? );");
    $resultado->execute([$usuario,$idEntreno ]);

    $datos = $resultado ? [ "message" => "añadido entreno"] : [ "message" => "no añadido" ];

    header('Content-Type: application/json');
    echo json_encode($datos);
}
function addEjercicioEntreno($datosEjercicio){
    $idEntreno = $datosEjercicio['idEntreno'];
    $idEjercicio = $datosEjercicio['idEjercicio'];
    $observacion = $datosEjercicio['observacion'];

    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("INSERT INTO entreno_ejercicios (id, fk_entreno, fk_ejercicio, observacion) 
        VALUES (
            NULL,
            ?,
            ?,
            ? );");
    $resultado->execute([$idEntreno, $idEjercicio, $observacion ]);

    $datos = $resultado ? [ "message" => "añadido entreno"] : [ "message" => "no añadido" ];

    header('Content-Type: application/json');
    echo json_encode($datos);
}
function guardarEntrenoEjercicio($datosEjercicio){
    $idUsuario = $datosEjercicio['idUsuario'];
    $idEntreno = $datosEjercicio['idEntreno'];
    $idEjercicio = $datosEjercicio['idEjercicio'];
    $peso = $datosEjercicio['peso'];
    $series = $datosEjercicio['series'];
    $repeticiones = $datosEjercicio['repeticiones'];
    $observacion = $datosEjercicio['observacion'];
    $fecha = $datosEjercicio['fecha'];

    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("INSERT INTO entreno_historico (id, fk_usuario, fk_entreno, fk_ejercicio, peso, series, repeticiones, observacion, fecha) 
        VALUES (
            NULL,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ? );");
    $resultado->execute([$idUsuario, $idEntreno, $idEjercicio, $peso, $series, $repeticiones, $observacion, $fecha ]);

    $datos = $resultado ? [ "message" => "añadido entreno"] : [ "message" => "no añadido" ];

    header('Content-Type: application/json');
    echo json_encode($datos);
}
function recuperarHistoricoEntreno($datos){
    $idUsuario = $datos['idUsuario'];
    $idEntreno = $datos['idEntreno'];

    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("SELECT * 
        FROM entreno_historico enh
        JOIN ejercicios ej ON ej.id = enh.fk_ejercicio  
        WHERE fk_usuario = ? AND fk_entreno = ? 
        ORDER BY ej.ejercicio, enh.fecha");
    
    $resultado->execute([$idUsuario, $idEntreno]);
    $datos = array();
    while($fila = $resultado -> fetch_assoc()) {
        $ejercicio = array(
            'id' => $fila['id'],
            'fk_usuario' => $fila['fk_usuario'],
            'fk_entreno' => $fila['fk_entreno'],
            'fk_ejercicio' => $fila['fk_ejercicio'],
            'ejercicio' => $fila['ejercicio'],
            'peso' => $fila['peso'],
            'series' => $fila['series'],
            'repeticiones' => $fila['observacion'],
            'fecha' => $fila['fecha'],
        );

        $datos[] = $ejercicio;
    }

    header('Content-Type: application/json');
    echo json_encode($datos);
}
function recuperarHistoricoEjercicio($datos){
    $idUsuario = $datos['idUsuario'];
    $idEjercicio = $datos['idEjercicio'];

    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("SELECT * 
        FROM entreno_historico enh
        JOIN ejercicios ej ON ej.id = enh.fk_ejercicio  
        WHERE fk_usuario = ? AND fk_ejercicio = ? 
        ORDER BY enh.fecha");
    
    $resultado->execute([$idUsuario, $idEntreno]);
    $datos = array();
    while($fila = $resultado -> fetch_assoc()) {
        $ejercicio = array(
            'id' => $fila['id'],
            'fk_usuario' => $fila['fk_usuario'],
            'fk_entreno' => $fila['fk_entreno'],
            'fk_ejercicio' => $fila['fk_ejercicio'],
            'ejercicio' => $fila['ejercicio'],
            'peso' => $fila['peso'],
            'series' => $fila['series'],
            'repeticiones' => $fila['observacion'],
            'fecha' => $fila['fecha'],
        );

        $datos[] = $ejercicio;
    }

    header('Content-Type: application/json');
    echo json_encode($datos);
}
?>
