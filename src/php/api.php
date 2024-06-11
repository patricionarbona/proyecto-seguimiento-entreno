<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

error_reporting(E_ALL);

ini_set('display_errors',1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verificar si la solicitud contiene 'multipart/form-data'
    if (!empty($_FILES) || !empty($_POST)) {
        // Depuración para ver lo que está llegando
        error_log('POST data: ' . print_r($_POST, true));
        error_log('FILES data: ' . print_r($_FILES, true));

        if (isset($_POST['editarEjercicio']) && $_POST['editarEjercicio'] === 'true') {
            editarEjercicio($_POST, $_FILES);
        } else {
            crearEjercicio($_POST, $_FILES);
        }
    } else {
        // Manejar la solicitud que contiene JSON
        $input = file_get_contents("php://input");
        $data = json_decode($input, true);

        // Depuración para ver lo que está llegando
        error_log('JSON data: ' . print_r($data, true));

        if (isset($data["getUsuarios"])) {
            obtenerUsuarios($data["getUsuarios"]);
        } 

        if (isset($data['crearUsuario'])) {
            crearUsuario($data['crearUsuario']);
        }

        if (isset($data['comprobarEmail'])) {
            comprobarEmail($data['comprobarEmail']);
        }

        if (isset($data['iniciarSesion'])) {
            iniciarSesion($data['iniciarSesion']);
        }

        if (isset($data['recuperarGrupos'])) {
            recuperarGrupos();
        }

        if (isset($data['recuperarEjercicios'])) {
            recuperarEjercicios();
        }

        if (isset($data['recuperarEquipamientos'])) {
            recuperarEquipamientos();
        }

        if (isset($data['recuperarEjerciciosGrupo'])) {
            recuperarEjerciciosGrupo($data['recuperarEjerciciosGrupo']);
        }

        if (isset($data['crearEntreno'])) {
            crearEntreno($data['crearEntreno']);
        }

        if (isset($data['recuperarEntrenos'])) {
            recuperarEntrenos($data['recuperarEntrenos']);
        }

        if (isset($data['recuperarEjerciciosEntreno'])) {
            recuperarEjerciciosEntreno($data['recuperarEjerciciosEntreno']);
        }

        if (isset($data['borrarUsuario'])) {
            borrarUsuario($data['borrarUsuario']);
        }

        if (isset($data['borrarEjercicio'])) {
            borrarEjercicio($data['borrarEjercicio']);
        }

        if (isset($data['editarEjercicio'])) {
            editarEjercicio($data['editarEjercicio']);
        }

        if (isset($data['editarUsuario'])) {
            editarUsuario($data['editarUsuario']);
        }

        if (isset($data['guardarEjercicioEntreno'])) {
            guardarEjercicioEntreno($data['guardarEjercicioEntreno']);
        }
    }
}



function obtenerUsuarios($emailUser) {
    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("SELECT * FROM usuario WHERE email != ?");
    $resultado->execute([$emailUser]);
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
    $resultado = $conexion->prepare("SELECT admin FROM usuario WHERE email = ? AND password = ?");
    $resultado->execute([$email, $password]);
    
    if ($resultado->rowCount() > 0) {
        $fila = $resultado->fetch(PDO::FETCH_ASSOC);
        $datos = [
            "message" => "sesion iniciada",
            "admin" => $fila['admin']
        ];
    } else {
        $datos = [
            "message" => "no inicia"
        ];
    }

    header('Content-Type: application/json');
    echo json_encode($datos);
}


function crearEjercicio($datosEjercicio, $fileData) {
    if (isset($fileData['foto'])) {
        $fileTmpPath = $fileData['foto']['tmp_name'];
        $fileName = $fileData['foto']['name'];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));

        // Obtener el nombre del ejercicio
        $nombreEjercicio = $datosEjercicio['nombre'];

        // Reemplazar los espacios en blanco con guiones bajos y eliminar caracteres especiales del nombre del ejercicio
        $nombreEjercicio = preg_replace("/[^A-Za-z0-9 ]/", '', $nombreEjercicio);
        $nombreEjercicio = str_replace(' ', '_', $nombreEjercicio);

        // Construir el nuevo nombre de archivo
        $newFileName = $nombreEjercicio . '.' . $fileExtension;

        // Directorio de carga
        $uploadFileDir = '/var/www/html/upload/';
        $dest_path = $uploadFileDir . $newFileName;

        try {
            $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
            $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Iniciar la transacción
            $conexion->beginTransaction();

            // Mover el archivo al directorio de destino
            if (move_uploaded_file($fileTmpPath, $dest_path)) {
                // Insertar el ejercicio
                $stmtEjercicio = $conexion->prepare("INSERT INTO ejercicios (ejercicio, descripcion, equipamiento, foto, musculos) VALUES (?, ?, ?, ?, ?)");
                $stmtEjercicio->execute([
                    $datosEjercicio['nombre'],
                    $datosEjercicio['observaciones'],
                    $datosEjercicio['equipamiento'],
                    $newFileName,
                    $datosEjercicio['musculos']
                ]);

                // Obtener el ID del ejercicio recién creado
                $ejercicioId = $conexion->lastInsertId();

                // Obtener el ID del grupo basado en la categoría
                $stmtGrupo = $conexion->prepare("SELECT id FROM grupo WHERE grupo = ?");
                $stmtGrupo->execute([$datosEjercicio['grupo']]);
                $grupo = $stmtGrupo->fetch(PDO::FETCH_ASSOC);

                if (!$grupo) {
                    throw new Exception('No se encontró el grupo especificado');
                }

                $grupoId = $grupo['id'];

                // Insertar en ejercicios_grupo
                $stmtEjercicioGrupo = $conexion->prepare("INSERT INTO ejercicios_grupo (fk_ejercicio, fk_grupo) VALUES (?, ?)");
                $stmtEjercicioGrupo->execute([$ejercicioId, $grupoId]);

                // Confirmar la transacción
                $conexion->commit();

                echo json_encode(["message" => "Ejercicio creado correctamente", "file_path" => $dest_path]);
            } else {
                throw new Exception('Error al mover el archivo al directorio de destino');
            }
        } catch (Exception $e) {
            // Revertir la transacción en caso de error
            $conexion->rollBack();
            echo json_encode(["message" => "Error: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["message" => "No se subió ningún archivo"]);
    }
}









function recuperarEjercicios(){
    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("
        SELECT e.*, g.grupo
        FROM ejercicios e
        JOIN ejercicios_grupo eg ON e.id = eg.fk_ejercicio
        JOIN grupo g ON eg.fk_grupo = g.id
    ");
    $resultado->execute();
    $datos = array();
    while($fila = $resultado->fetch(PDO::FETCH_ASSOC)) {
        $ejercicio = array(
            'id' => $fila['id'],
            'ejercicio' => $fila['ejercicio'],
            'descripcion' => $fila['descripcion'],
            'equipamiento' => $fila['equipamiento'],
            'foto' => $fila['foto'],
            'musculos' => $fila['musculos'],
            'grupo' => $fila['grupo']
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
        JOIN ejercicios_grupo eg ON e.id = eg.fk_ejercicio
        JOIN grupo g ON eg.fk_grupo = g.id
        WHERE g.grupo = ?;
    ");
    $resultado->execute([$grupo]);
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

function recuperarGrupos(){
    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("SELECT * from grupo;");
    $resultado->execute();
    $datos = array();
    while($fila = $resultado -> fetch()) {
        $grupo = array(
            'id' => $fila['id'],
            'grupo' => $fila['grupo'],
            'observaciones' => $fila['observaciones'],
        );

        $datos[] = $grupo;
    }

    header('Content-Type: application/json');
    echo json_encode($datos);
}

function recuperarEntrenos($usuarioEmail){
    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("SELECT * from entreno WHERE fk_usuario =
        (SELECT id FROM usuario WHERE email = ?)
    ;");
    $resultado->execute([$usuarioEmail]);
    $datos = array();
    while($fila = $resultado -> fetch()) {
        $entreno = array(
            'id' => $fila['id'],
            'nombre' => $fila['nombre'],
            'fk_usuario' => $fila['fk_usuario'],
        );

        $datos[] = $entreno;
    }

    header('Content-Type: application/json');
    echo json_encode($datos);
}

function recuperarEquipamientos(){
    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("SELECT * from equipamientos;");
    $resultado->execute();
    $datos = array();
    while($fila = $resultado -> fetch()) {
        $grupo = array(
            'id' => $fila['id'],
            'equipamiento' => $fila['equipamiento'],
            'observaciones' => $fila['observaciones'],
        );

        $datos[] = $grupo;
    }

    header('Content-Type: application/json');
    echo json_encode($datos);
}

function crearEntreno($datosEntreno) {
    $usuarioEmail = $datosEntreno['email'];
    $nombreEntreno = $datosEntreno['entreno'];
    $ejerciciosId = $datosEntreno['ejerciciosId'];  

    try {
        $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Obtener el id del usuario basado en el email
        $stmt = $conexion->prepare("SELECT id FROM usuario WHERE email = :email");
        $stmt->bindParam(':email', $usuarioEmail);
        $stmt->execute();
        $usuarioId = $stmt->fetchColumn();

        if (!$usuarioId) {
            throw new Exception("Usuario no encontrado");
        }

        // Verificar si el entrenamiento ya existe
        $stmt = $conexion->prepare("SELECT id FROM entreno WHERE fk_usuario = :fk_usuario AND nombre = :nombre");
        $stmt->bindParam(':fk_usuario', $usuarioId);
        $stmt->bindParam(':nombre', $nombreEntreno);
        $stmt->execute();
        $entrenoExistente = $stmt->fetchColumn();

        if ($entrenoExistente) {
            echo json_encode(["message" => "2"]);
            return;
        }

        // Iniciar la transacción
        $conexion->beginTransaction();

        // Insertar el nuevo entrenamiento
        $stmt = $conexion->prepare("INSERT INTO entreno (fk_usuario, nombre) VALUES (:fk_usuario, :nombre)");
        $stmt->bindParam(':fk_usuario', $usuarioId);
        $stmt->bindParam(':nombre', $nombreEntreno);
        $stmt->execute();

        // Obtener el id del entrenamiento recién insertado
        $entrenoId = $conexion->lastInsertId();

        // Insertar los ejercicios en el entrenamiento
        $stmt = $conexion->prepare("INSERT INTO entreno_ejercicios (fk_entreno, fk_ejercicio, observacion) VALUES (:fk_entreno, :fk_ejercicio, '')");
        foreach ($ejerciciosId as $ejercicioId) {
            $stmt->bindParam(':fk_entreno', $entrenoId);
            $stmt->bindParam(':fk_ejercicio', $ejercicioId);
            $stmt->execute();
        }

        // Confirmar la transacción
        $conexion->commit();

        // Respuesta exitosa
        echo json_encode(["message" => "1"]);
    } catch (Exception $e) {
        // Revertir la transacción en caso de error
        $conexion->rollBack();
        echo json_encode(["message" => "0", "error" => $e->getMessage()]);
    }
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


function recuperarEjerciciosEntreno($entrenoId) {
    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("
    SELECT e.id, e.ejercicio, e.descripcion, e.equipamiento, e.foto, e.musculos, ee.observacion
    FROM entreno_ejercicios ee
    JOIN ejercicios e ON ee.fk_ejercicio = e.id
    WHERE ee.fk_entreno = ?
");

    $resultado->execute([$entrenoId]);
    $datos = array();
    while($fila = $resultado -> fetch()) {
        $entreno = array(
            'id' => $fila['id'],
            'descripcion' => $fila['descripcion'],
            'equipamiento' => $fila['equipamiento'],
            'foto' => $fila['foto'],
            'musculos' => $fila['musculos'],
            'observacion' => $fila['observacion'],
        );

        $datos[] = $entreno;
    }

    header('Content-Type: application/json');
    echo json_encode($datos);
}


function borrarUsuario($usuarioId) {
    try {
        $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
        $conexion->beginTransaction();

        // Obtener entrenos del usuario
        $stmt = $conexion->prepare("SELECT id FROM entreno WHERE fk_usuario = :usuarioId");
        $stmt->execute(['usuarioId' => $usuarioId]);
        $entrenos = $stmt->fetchAll(PDO::FETCH_COLUMN);

        // Eliminar datos relacionados en entreno_historico
        if ($entrenos) {
            $entrenosPlaceholders = implode(',', array_fill(0, count($entrenos), '?'));
            $stmt = $conexion->prepare("DELETE FROM entreno_historico WHERE fk_entreno IN ($entrenosPlaceholders)");
            $stmt->execute($entrenos);
        }

        // Eliminar datos relacionados en entreno_ejercicios
        if ($entrenos) {
            $stmt = $conexion->prepare("DELETE FROM entreno_ejercicios WHERE fk_entreno IN ($entrenosPlaceholders)");
            $stmt->execute($entrenos);
        }

        // Eliminar datos relacionados en usuario_entreno
        $stmt = $conexion->prepare("DELETE FROM usuario_entreno WHERE fk_usuario = :usuarioId");
        $stmt->execute(['usuarioId' => $usuarioId]);

        // Eliminar entrenos del usuario
        $stmt = $conexion->prepare("DELETE FROM entreno WHERE fk_usuario = :usuarioId");
        $stmt->execute(['usuarioId' => $usuarioId]);

        // Finalmente, eliminar el usuario
        $stmt = $conexion->prepare("DELETE FROM usuario WHERE id = :usuarioId");
        $stmt->execute(['usuarioId' => $usuarioId]);

        $conexion->commit();

        // Enviar mensaje de éxito
        header('Content-Type: application/json');
        echo json_encode(['message' => 'Eliminado el usuario']);
    } catch (Exception $e) {
        $conexion->rollBack();

        // Enviar mensaje de error
        header('Content-Type: application/json');
        echo json_encode(['message' => 'Error al eliminar el usuario', 'error' => $e->getMessage()]);
    }
}

function borrarEjercicio($ejercicioId) {
    try {
        $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
        $conexion->beginTransaction();

        // Obtener el nombre del archivo de la foto del ejercicio
        $stmt = $conexion->prepare("SELECT foto FROM ejercicios WHERE id = ?");
        $stmt->execute([$ejercicioId]);
        $foto = $stmt->fetch(PDO::FETCH_ASSOC)['foto'];

        // Eliminar datos relacionados en entreno_historico
        $stmt = $conexion->prepare("DELETE FROM entreno_historico WHERE fk_ejercicio = ?");
        $stmt->execute([$ejercicioId]);

        // Eliminar datos relacionados en entreno_ejercicios
        $stmt = $conexion->prepare("DELETE FROM entreno_ejercicios WHERE fk_ejercicio = ?");
        $stmt->execute([$ejercicioId]);

        // Eliminar datos relacionados en usuario_entreno
        $stmt = $conexion->prepare("DELETE FROM ejercicios_grupo WHERE fk_ejercicio = ?");
        $stmt->execute([$ejercicioId]);

        // Eliminar el ejercicio
        $stmt = $conexion->prepare("DELETE FROM ejercicios WHERE id = ?");
        $stmt->execute([$ejercicioId]);

        // Confirmar la transacción
        $conexion->commit();

        // Eliminar la foto del sistema de archivos
        if ($foto) {
            $filePath = '/var/www/html/upload/' . $foto;
            if (file_exists($filePath)) {
                unlink($filePath);
            }
        }

        // Enviar mensaje de éxito
        header('Content-Type: application/json');
        echo json_encode(['message' => 'Eliminado el ejercicio']);
    } catch (Exception $e) {
        $conexion->rollBack();

        // Enviar mensaje de error
        header('Content-Type: application/json');
        echo json_encode(['message' => 'Error al eliminar el ejercicio', 'error' => $e->getMessage()]);
    }
}

function editarEjercicio($datosEjercicio, $fileData = null) {
    $idEjercicio = $datosEjercicio['id'];
    $nombre = $datosEjercicio['nombre'];
    $descripcion = $datosEjercicio['descripcion'];
    $equipamiento = $datosEjercicio['equipamiento'];
    $musculos = $datosEjercicio['musculos'];
    $grupo = $datosEjercicio['grupo'];

    try {
        $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Construir dinámicamente la consulta de actualización
        $updateFields = [];
        $updateValues = [];

        if ($nombre != "null" && $nombre !== '') {
            $updateFields[] = "ejercicio = ?";
            $updateValues[] = $nombre;
        }

        if ($descripcion != "null" && $descripcion !== '') {
            $updateFields[] = "descripcion = ?";
            $updateValues[] = $descripcion;
        }

        if ($equipamiento != "null" && $equipamiento !== '') {
            $updateFields[] = "equipamiento = ?";
            $updateValues[] = $equipamiento;
        }

        if ($musculos != "null" && $musculos !== '') {
            $updateFields[] = "musculos = ?";
            $updateValues[] = $musculos;
        }

        $updateValues[] = $idEjercicio;

        if (!empty($updateFields)) {
            $sql = "UPDATE ejercicios SET " . implode(", ", $updateFields) . " WHERE id = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->execute($updateValues);
        }

        // Actualizar el grupo del ejercicio
        if ($grupo != "null" && $grupo !== '') {
            $stmtGrupo = $conexion->prepare("SELECT id FROM grupo WHERE grupo = ?");
            $stmtGrupo->execute([$grupo]);
            $grupoId = $stmtGrupo->fetch(PDO::FETCH_ASSOC)['id'];

            if ($grupoId) {
                $stmtEjercicioGrupo = $conexion->prepare("UPDATE ejercicios_grupo SET fk_grupo = ? WHERE fk_ejercicio = ?");
                $stmtEjercicioGrupo->execute([$grupoId, $idEjercicio]);
            } else {
                throw new Exception('Grupo no encontrado');
            }
        }

        // Manejar la carga de una nueva foto si se proporciona
        if ($fileData && isset($fileData['foto']) && $fileData['foto']['tmp_name']) {
            $fileTmpPath = $fileData['foto']['tmp_name'];
            $fileName = $fileData['foto']['name'];
            $fileNameCmps = explode(".", $fileName);
            $fileExtension = strtolower(end($fileNameCmps));

            // Reemplazar los espacios en blanco con guiones bajos y eliminar caracteres especiales del nombre del ejercicio
            $nombreEjercicio = preg_replace("/[^A-Za-z0-9 ]/", '', $nombre);
            $nombreEjercicio = str_replace(' ', '_', $nombreEjercicio);

            // Construir el nuevo nombre de archivo
            $newFileName = $nombreEjercicio . '.' . $fileExtension;

            // Directorio de carga
            $uploadFileDir = '/var/www/html/upload/';
            $dest_path = $uploadFileDir . $newFileName;

            // Mover el archivo al directorio de destino
            if (move_uploaded_file($fileTmpPath, $dest_path)) {
                // Actualizar el campo de la foto en la base de datos
                $stmt = $conexion->prepare("UPDATE ejercicios SET foto = ? WHERE id = ?");
                $stmt->execute([$newFileName, $idEjercicio]);
            } else {
                throw new Exception('Error al mover el archivo al directorio de destino');
            }
        }

        echo json_encode(["message" => "Ejercicio editado correctamente"]);
    } catch (Exception $e) {
        echo json_encode(["message" => "Error: " . $e->getMessage()]);
    }
}


function editarUsuario($datosUsuario) {
    $idUsuario = $datosUsuario['id'];
    $nombre = $datosUsuario['nombre'];
    $email = $datosUsuario['email'];
    $cargo = $datosUsuario['cargo'];

    try {
        $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Construir dinámicamente la consulta de actualización
        $updateFields = [];
        $updateValues = [];

        if ($nombre !== null && $nombre !== '') {
            $updateFields[] = "nombre = ?";
            $updateValues[] = $nombre;
        }

        if ($email !== null && $email !== '') {
            $updateFields[] = "email = ?";
            $updateValues[] = $email;
        }        

        if ($cargo !== null && $cargo !== '') {
            $updateFields[] = "admin = ?";
            $updateValues[] = $cargo;
        }

        $updateValues[] = $idUsuario;

        if (!empty($updateFields)) {
            $sql = "UPDATE usuario SET " . implode(", ", $updateFields) . " WHERE id = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->execute($updateValues);
        }

        echo json_encode(["message" => "editado el usuario"]);
    } catch (Exception $e) {
        echo json_encode(["message" => "Error: " . $e->getMessage()]);
    }
}

function guardarEjercicioEntreno($datosEjercicio){
    $idEntreno = $datosEjercicio['idEntreno'];
    $idEjercicio = $datosEjercicio['id'];
    $peso = $datosEjercicio['peso'];
    $series = $datosEjercicio['series'];
    $repeticiones = $datosEjercicio['repeticiones'];
    $observacion = $datosEjercicio['observacion'];
    $fecha = date('Y-m-d H:i:s');

    $conexion = new PDO('mysql:host=localhost;dbname=tfg', 'tfg', '1234');
    $resultado = $conexion->prepare("INSERT INTO entreno_historico (id, fk_entreno, fk_ejercicio, peso, series, repeticiones, observacion, fecha) 
        VALUES (
            NULL,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ? );");
    $resultado->execute([$idEntreno, $idEjercicio, $peso, $series, $repeticiones, $observacion, $fecha ]);

    $datos = $resultado ? [ "message" => "añadido entreno"] : [ "message" => "no añadido" ];

    header('Content-Type: application/json');
    echo json_encode($datos);
}

?>