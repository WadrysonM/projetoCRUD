<?php
header('Content-Type: application/json');
include '../conexao.php'; // Certifique-se de que o arquivo de conexão está correto

$nome = isset($_GET['nome']) ? $mysqli->real_escape_string($_GET['nome']) : '';

if ($nome === '') {
    echo json_encode([]);
    exit;
}

$query = "SELECT ID_FUNCIONARIO, NOME, CPF, EMAIL, TELEFONE FROM tb_funcionario WHERE NOME LIKE ?";
$stmt = $mysqli->prepare($query);

if ($stmt) {
    $nomeBusca = '%' .$nome. '%';
    $stmt->bind_param("s", $nomeBusca);
    $stmt->execute();

    // Obter os resultados
    $result = $stmt->get_result();
    $funcionarios = array();

    while ($row = $result->fetch_assoc()) {
        $funcionarios[] = array(
            "id" => $row["ID_FUNCIONARIO"],  
            "nome" => $row["NOME"],
            "cpf" => $row["CPF"],            
            "email" => $row["EMAIL"],
            "telefone" => $row["TELEFONE"]);
    }

    // Retornar os dados em formato JSON
    echo json_encode($funcionarios);

    $stmt->close();
} else {
    // Retornar um erro caso a preparação falhe
    echo json_encode([
        "success" => false,
        "message" => "Erro na consulta: " . $mysqli->error
    ]);
}

$mysqli->close();
?>
