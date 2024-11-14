<?php  

include_once "../conexao.php";  // Inclui a conexão com o banco de dados

// Recebe os dados do POST
$idFuncionario = isset($_POST["id"]) ? $_POST["id"] : 0;
$nome = isset($_POST["nome"]) ? $_POST["nome"] : '';
$email = isset($_POST["email"]) ? $_POST["email"] : '';
$telefone = isset($_POST["telefone"]) ? $_POST["telefone"] : '';
$genero = isset($_POST["genero"]) ? $_POST["genero"] : null;
$nascimento = isset($_POST["nascimento"]) ? $_POST["nascimento"] : '';
$categoria = isset($_POST["categoria"]) ? $_POST["categoria"] : '';
$endereco = isset($_POST["endereco"]) ? $_POST["endereco"] : '';
$bairro = isset($_POST["bairro"]) ? $_POST["bairro"] : '';
$cidade = isset($_POST["cidade"]) ? $_POST["cidade"] : '';
$pais = isset($_POST["pais"]) ? $_POST["pais"] : '';
$uf = isset($_POST["uf"]) ? $_POST["uf"] : '';

// Verifica se os dados necessários foram recebidos
if ($idFuncionario && $nome && $email && $telefone) {
    $sql = "UPDATE tb_funcionario 
            SET NOME = ?, 
                EMAIL = ?, 
                TELEFONE = ?, 
                GENERO = ?, 
                NASCIMENTO = ?, 
                CATEGORIA = ?, 
                ENDERECO = ?, 
                BAIRRO = ?, 
                CIDADE = ?, 
                PAIS = ?, 
                UF = ? 
            WHERE ID_FUNCIONARIO = ?";
    
    $stmt = $mysqli->prepare($sql);

    // Verifica se a preparação da consulta foi bem-sucedida
    if ($stmt === false) {
        die(json_encode([
            "success" => false, 
            "message" => "Erro na preparação do SQL: " . htmlspecialchars($mysqli->error)
        ]));
    }

    // Vincula os parâmetros à consulta SQL
    $stmt->bind_param(
        "sssssssssssi", 
        $nome, 
        $email, 
        $telefone, 
        $genero, 
        $nascimento, 
        $categoria, 
        $endereco, 
        $bairro, 
        $cidade, 
        $pais, 
        $uf, 
        $idFuncionario
    );

    // Executa a consulta e verifica o resultado
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Funcionário atualizado com sucesso."]);
    } else {
        echo json_encode(["success" => false, "message" => "Erro ao atualizar o funcionário: " . htmlspecialchars($stmt->error)]);
    }

    // Fecha o statement e a conexão
    $stmt->close();
    $mysqli->close();
} else {
    echo json_encode([
        "success" => false, 
        "message" => "Dados incompletos.", 
        "dadosRecebidos" => [
            "id" => $idFuncionario,
            "nome" => $nome,
            "email" => $email,
            "telefone" => $telefone,
            "genero" => $genero,
            "nascimento" => $nascimento,
            "categoria" => $categoria,
            "endereco" => $endereco,
            "bairro" => $bairro,
            "cidade" => $cidade,
            "pais" => $pais,
            "uf" => $uf
        ]
    ]);
}
