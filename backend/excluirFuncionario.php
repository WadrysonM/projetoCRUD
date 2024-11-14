<?php   

include_once "../conexao.php";  // Inclui a conexão com o banco de dados

$idFuncionario = isset($_POST["id"]) ? $_POST["id"] : 0;

$sql = "DELETE FROM tb_funcionario WHERE ID_FUNCIONARIO = ?";
$stmt = $mysqli->prepare($sql);       
$stmt->bind_param("i", $idFuncionario);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {    
    echo json_encode(["success" => false, "message" => "Erro ao excluir o usuário: " . htmlspecialchars($stmt->error)]);
}

$stmt->close();
$mysqli->close();       