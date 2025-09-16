<?php
header("acess-control-allow-origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../db_connect.php';

try {
    // Base da query com LEFT JOIN
    $query = "
        SELECT
            s.id,
            s.nome,
            s.sobrenome,
            s.nick,
            s.descricao,
            c.nome AS cargo,
            s.steam_link,
            s.instagram_link,
            s.twitch_link,
            s.foto_link,
            s.imagem,
            s.cargo_id
        FROM staff_copahospic s
        LEFT JOIN cargos_staff_copahospic c ON s.cargo_id = c.id
    ";
    
    $conditions = [];
    $params = [];
    
    // Filtro por id
    if (isset($_GET['id']) && is_numeric($_GET['id'])) {
        $conditions[] = "s.id = :id";
        $params[':id'] = (int)$_GET['id'];
    }
    
    // Filtro por cargo
    if (isset($_GET['cargo']) && !empty($_GET['cargo'])) {
        $cargos = is_array($_GET['cargo']) ? $_GET['cargo'] : [$_GET['cargo']];
        $placeholders = array_map(function ($index) {
            return ":cargo$index";
        }, array_keys($cargos));
        $conditions[] = "c.nome IN (" . implode(',', $placeholders) . ")";
        foreach ($cargos as $index => $cargo) {
            $params[":cargo$index"] = $cargo;
        }
    }
    
    // Adicionar condições à query
    if (!empty($conditions)) {
        $query .= " WHERE " . implode(' AND ', $conditions);
    }
    
    // Preparar e executar a query
    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    $staff = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Converter imagens BLOB para base64
    foreach ($staff as &$member) {
        if (!empty($member['imagem'])) {
            $member['imagem'] = 'data:image/jpeg;base64,' . base64_encode($member['imagem']);
        } else {
            $member['imagem'] = null;
        }
    }
    
    // Se buscar por id, retornar objeto único ou erro
    if (isset($_GET['id'])) {
        if (count($staff) === 1) {
            http_response_code(200);
            echo json_encode($staff[0]); // Retorna objeto único
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Membro não encontrado"]);
        }
    } else {
        http_response_code(200);
        echo json_encode($staff); // Retorna array para outros filtros
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erro na consulta: " . $e->getMessage()]);
}
?>