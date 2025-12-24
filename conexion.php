<?php
$servername = "localhost";
$username   = "u782069773_Contacto192004";
$password   = "user0419Contact20";
$database   = "u782069773_Contacto";

$conexion = new mysqli($servername, $username, $password, $database);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
?>
