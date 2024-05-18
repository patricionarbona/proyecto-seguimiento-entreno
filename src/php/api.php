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

if(isset($_POST['crearUsuario'])) {
    crearUsuario();
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

// function crearUsuario() {
//     $email = $_POST['email'];
//     $password = $_POST['password'];
//     $password_hashed = hash('sha256', $password);    
//     $nombre = $_POST['nombre'];
//     $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
//     $resultado = $conexion->prepare("INSERT INTO `usuario` (`id`, `email`, `password`, `nombre`, `admin`) VALUES (NULL, ?, ?, ?, '0');");
//     $resultado->execute([$email,$password_hashed,$nombre]);
//     $datos = array();
    
//     if($resultado-> rowCount() > 0) {
//         $datos[] = ["message" => "se creo el usuario"];
//     }

//     header('Content-Type: application/json');
//     echo json_encode($datos);
// }

// Querys para gestionar la BD
function comprobarEmail($email){
    $email = json_decode($email,true);
    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("SELECT * FROM usuario WHERE email = ?");
    $resultado->execute([$email]);
    $datos = $resultado -> rowCount() > 0 ? [ "message" => "existe"] : [ "message" => "no existe" ];

    header('Content-Type: application/json');
    echo json_encode($datos);
}
function crearUsuario($datosUsuario){
    $datosUsuario = json_decode($datosUsuario,true);

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
function recuperarUsuario($emailUsuario) {
    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("SELECT * FROM usuario WHERE email = ?");
    $resultado->execute($emailUsuario);
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
function recuperarHistorico(){}
function recuperarHistoricoEjercicio($ejercicio){}

 
?>
