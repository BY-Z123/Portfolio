<?php
header("Content-Type: application/json");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Nettoyage des données
    $name = strip_tags(trim($_POST["name"] ?? ''));
    $email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $message = strip_tags(trim($_POST["message"] ?? ''));

    // Vérification si tous les champs sont remplis
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(["success" => false, "message" => "Tous les champs sont requis."]);
        exit;
    }

    // Vérification de l'adresse email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "message" => "Adresse email invalide."]);
        exit;
    }

    // Adresse où tu veux recevoir les messages
    $to = "zakouyacine3@gmail.com"; // Remplace ceci par ton adresse email
    $subject = "Nouveau message depuis le formulaire de contact";
    $body = "Nom: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email";

    // Essai d'envoi de l'email et vérification du succès
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(["success" => true, "message" => "Message envoyé avec succès !"]);
    } else {
        echo json_encode(["success" => false, "message" => "Une erreur est survenue lors de l'envoi du message."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Méthode non autorisée."]);
}
?>
