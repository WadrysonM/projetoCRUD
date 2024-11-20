<?php
include_once "../conexao.php";  // Inclui a conexão com o banco de dados

// Obtém os dados do POST
$email = isset($_POST["email"]) ? $_POST["email"] : "";
$senha = isset($_POST["senha"]) ? $_POST["senha"] : "";

// Verifica se os dados necessários foram recebidos
if ($email && $senha) {
    // Prepara a consulta
    $sql = "SELECT * FROM tb_funcionario WHERE EMAIL = ?";
    $stmt = $mysqli->prepare($sql);
    
    if ($stmt) {
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        // Verificação de senha segura
        if ($user && password_verify($senha, $user['SENHA'])) {
            session_start();
            $_SESSION["id"] = $user["ID_FUNCIONARIO"];
            //caso de sucesso, direciona para a página das listas de usuarios.
            header("Location: ../pages/listaFuncionarios.html");

        } else {
        
            echo json_encode(["success" => false, "message" => "Login ou senha inválidos"]);
            header("Location: ../index.html");

        }
        
        $stmt->close(); // Fechar a declaração
    } else {
        echo json_encode(["success" => false, "message" => "Erro na preparação da consulta"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Login ou senha inválidos erro "]);    
}

$mysqli->close(); // Fechar a conexão
