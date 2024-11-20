<?php
header('Content-Type: application/json');
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Conexão com o banco de dados
include '../conexao.php';

// Verifique se a variável $mysqli foi definida
if (!isset($mysqli)) {
    die(json_encode([
        "success" => false,
        "message" => "Erro: Variável \$mysqli não foi definida."
    ]));
}

// Captura os parâmetros de pesquisa
$campo = isset($_GET['campo']) ? $_GET['campo'] : 'nome';  // Default para nome
$valor = isset($_GET['valor']) ? $mysqli->real_escape_string($_GET['valor']) : '';

// Verifica se o valor foi informado
if ($valor === '') {
    echo json_encode([]);
    exit;
}

// Verifica se o campo é válido
$camposValidos = ['nome', 'cpf', 'email', 'telefone'];
if (!in_array($campo, $camposValidos)) {
    die(json_encode([
        "success" => false,
        "message" => "Campo de pesquisa inválido."
    ]));
}

// Construir a consulta dinâmica
$query = "SELECT ID_FUNCIONARIO, NOME, CPF, EMAIL, TELEFONE FROM tb_funcionario WHERE $campo LIKE ?";
$stmt = $mysqli->prepare($query);

if ($stmt) {
    $valorBusca = '%' . $valor . '%';  // Adiciona % para a busca parcial
    $stmt->bind_param("s", $valorBusca);
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