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
    $email = $_POST['comprobarEmail'];
    $email = json_decode($email,true);
    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("SELECT * FROM usuario WHERE email = ?");
    $resultado->execute([$email]);
    $datos = $resultado -> rowCount() > 0 ? [ "message" => "existe"] : [ "message" => "no existe" ];

    header('Content-Type: application/json');
    echo json_encode($datos);
}
function crearUsuario($datosUsuario){
    $datosUsuario = $_POST['crearUsuario'];
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
function crearEjercicio($datosEjercicio){}
function recuperarEjercicios(){}
function recuperarEjerciciosGrupo($grupo){}
function crearEntreno($datosEntreno){}
function addEjercicioEntreno($ejercicio){}
function guardarEntrenoEjercicio($datosEjercicio){}
function recuperarHistorico(){}
function recuperarHistoricoEjercicio($ejercicio){}

 
?>
