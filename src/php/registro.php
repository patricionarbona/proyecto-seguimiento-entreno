<?php
header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers:* ");
header("Access-Control-Allow-Methods:* ");
// Suponiendo que el registro se realizó correctamente
$response = array('success' => true, 'message' => 'Registro exitoso');

// Devolver la respuesta como JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
