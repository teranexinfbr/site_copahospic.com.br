<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *"); // Permite requisições do React
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

try {
    $host = "192.168.200.128:3306"; // Ajuste conforme necessário
    $dbname = "hspcdb"; // Substitua pelo nome do seu banco
    $username = "root"; // Substitua pelo seu usuário
    $password = "VizinhoPNC@"; // Substitua pela sua senha

    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erro na conexão: " . $e->getMessage()]);
    exit;
}
?>