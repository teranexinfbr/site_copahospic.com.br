<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../db_connect.php';

try {
    $query = "SELECT id, nome FROM cargos_staff_copahospic";
    
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $cargos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    http_response_code(200);
    echo json_encode($cargos);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erro na consulta: " . $e->getMessage()]);
}
?>
