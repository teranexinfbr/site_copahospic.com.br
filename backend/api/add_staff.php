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
    $nome = $_POST['nome'] ?? '';
    $sobrenome = $_POST['sobrenome'] ?? '';
    $nick = $_POST['nick'] ?? '';
    $cargo_id = $_POST['cargo_id'] ?? null;
    $descricao = $_POST['descricao'] ?? '';
    $steam_link = $_POST['steam_link'] ?? null;
    $instagram_link = $_POST['instagram_link'] ?? null;
    $twitch_link = $_POST['twitch_link'] ?? null;

    // Validar campos obrigatórios
    if (empty($nome) || empty($sobrenome) || empty($nick) || empty($cargo_id)) {
        http_response_code(400);
        echo json_encode(["error" => "Campos obrigatórios não preenchidos"]);
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

    // Inserir no banco
    $stmt = $pdo->prepare("
        INSERT INTO staff_copahospic (
            nome, sobrenome, nick, descricao, cargo_id, 
            steam_link, instagram_link, twitch_link, foto_link, imagem
        ) VALUES (
            :nome, :sobrenome, :nick, :descricao, :cargo_id, 
            :steam_link, :instagram_link, :twitch_link, NULL, :imagem
        )
    ");
    
    $stmt->execute([
        ':nome' => $nome,
        ':sobrenome' => $sobrenome,
        ':nick' => $nick,
        ':descricao' => $descricao,
        ':cargo_id' => $cargo_id,
        ':steam_link' => $steam_link,
        ':instagram_link' => $instagram_link,
        ':twitch_link' => $twitch_link,
        ':imagem' => $imagem
    ]);

    http_response_code(201);
    echo json_encode(["message" => "Membro adicionado com sucesso"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erro ao adicionar membro: " . $e->getMessage()]);
}
?>