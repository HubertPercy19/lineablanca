<?php
include("conexion.php");

if (!empty($_POST['nombre']) && !empty($_POST['email']) && !empty($_POST['mensaje'])) {

    $nombre  = trim($_POST['nombre']);
    $email   = trim($_POST['email']);
    $mensaje = trim($_POST['mensaje']);

    // Consulta usando la variable correcta: $conexion
    $stmt = $conexion->prepare("INSERT INTO contacto (nombre, email, mensaje) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nombre, $email, $mensaje);

    if ($stmt->execute()) {
        // redirigir al home correcto
        header("Location: https://artecnicosmultimarcas.com/");
        exit();
    } else {
        echo "❌ Error al guardar: " . $stmt->error;
    }

    $stmt->close();
    $conexion->close();
} else {
    echo "❌ Faltan datos en el formulario.";
}
?>
