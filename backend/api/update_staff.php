<?php
require_once '../db_connect.php';

try {
    // Verificar se os dados foram enviados via POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(["error" => "Método não permitido"]);
        exit;
    }

    // Coletar dados do formulário
    $id = $_POST['id'] ?? null;
    $nome = $_POST['nome'] ?? '';
    $sobrenome = $_POST['sobrenome'] ?? '';
    $nick = $_POST['nick'] ?? '';
    $cargo_id = $_POST['cargo_id'] ?? null;
    $descricao = $_POST['descricao'] ?? '';
    $steam_link = $_POST['steam_link'] ?? null;
    $instagram_link = $_POST['instagram_link'] ?? null;
    $twitch_link = $_POST['twitch_link'] ?? null;

    // Validar campos obrigatórios
    if (empty($id) || empty($nome) || empty($sobrenome) || empty($nick) || empty($cargo_id)) {
        http_response_code(400);
        echo json_encode(["error" => "Campos obrigatórios não preenchidos"]);
        exit;
    }

    // Verificar se o membro existe
    $stmt = $pdo->prepare("SELECT id FROM staff_copahospic WHERE id = :id");
    $stmt->execute([':id' => $id]);
    if (!$stmt->fetch()) {
        http_response_code(404);
        echo json_encode(["error" => "Membro não encontrado"]);
        exit;
    }

    // Processar upload de imagem
    $imagem = null;
    if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] === UPLOAD_ERR_OK) {
        $imagem = file_get_contents($_FILES['imagem']['tmp_name']);
        if ($imagem === false) {
            http_response_code(400);
            echo json_encode(["error" => "Erro ao processar a imagem"]);
            exit;
        }
    }

    // Atualizar no banco
    $query = "
        UPDATE staff_copahospic 
        SET 
            nome = :nome, 
            sobrenome = :sobrenome, 
            nick = :nick, 
            descricao = :descricao, 
            cargo_id = :cargo_id, 
            steam_link = :steam_link, 
            instagram_link = :instagram_link, 
            twitch_link = :twitch_link, 
            foto_link = NULL
    ";
    
    // Adicionar imagem à query apenas se fornecida
    if ($imagem !== null) {
        $query .= ", imagem = :imagem";
    }
    
    $query .= " WHERE id = :id";
    
    $stmt = $pdo->prepare($query);
    
    $params = [
        ':id' => $id,
        ':nome' => $nome,
        ':sobrenome' => $sobrenome,
        ':nick' => $nick,
        ':descricao' => $descricao,
        ':cargo_id' => $cargo_id,
        ':steam_link' => $steam_link,
        ':instagram_link' => $instagram_link,
        ':twitch_link' => $twitch_link
    ];
    
    if ($imagem !== null) {
        $params[':imagem'] = $imagem;
    }
    
    $stmt->execute($params);

    http_response_code(200);
    echo json_encode(["message" => "Membro atualizado com sucesso"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erro ao atualizar membro: " . $e->getMessage()]);
}
?>