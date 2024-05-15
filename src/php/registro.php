<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// Verificar si se recibió la solicitud con el parámetro "getUsuarios"
if(isset($_POST["getUsuarios"])) {
    // Establecer la respuesta para la solicitud "getUsuarios"
    $response = array('success' => true, 'message' => 'te doy usuarios');
} else {
    $response = array('success' => false, 'message' => 'No se ha recibido el parámetro "getUsuarios"');
}

// Devolver la respuesta como JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
