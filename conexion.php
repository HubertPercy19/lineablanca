<?php
$servername = "localhost";
$username   = "root";       // cambia si tienes otro usuario
$password   = "percy0419";           // tu contraseña MySQL
$database   = "formulario"; // cambia al nombre de tu DB

$conn = new mysqli($servername, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
