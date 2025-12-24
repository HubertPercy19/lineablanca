<?php
$servername = "localhost";
$username   = "u782069773_Contacto192004";       // cambia si tienes otro usuario
$password   = "L@/$N:qRc1";           // tu contraseña MySQL
$database   = "u782069773_Contacto"; // cambia al nombre de tu DB

$conn = new mysqli($servername, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
