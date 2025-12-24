<?php
include("conexion.php");

if (!empty($_POST['nombre']) && !empty($_POST['email']) && !empty($_POST['mensaje'])) {

    $nombre  = trim($_POST['nombre']);
    $email   = trim($_POST['email']);
    $mensaje = trim($_POST['mensaje']);

    // Consulta adaptada a TU tabla "contacto"
    $stmt = $conn->prepare("INSERT INTO contacto (nombre, email, mensaje) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nombre, $email, $mensaje);

    if ($stmt->execute()) {
        header("Location: index.html");
        exit();
    } else {
        echo "❌ Error al guardar: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "❌ Faltan datos en el formulario.";
}
?>
