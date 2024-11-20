<?php
// Definir o cabeçalho para JSON
header('Content-Type: application/json');

// Incluir a conexão com o banco de dados
include_once "../conexao.php";

// Preparar a consulta SQL
$sql = "SELECT ID_FUNCIONARIO, NOME, CPF, EMAIL, TELEFONE, GENERO, NASCIMENTO, CATEGORIA FROM tb_funcionario WHERE ID_FUNCIONARIO > 0";

// Preparar a declaração SQL
$stmt = $mysqli->prepare($sql);

// Verificar se a preparação foi bem-sucedida
if ($stmt) {
    // Executar a consulta
    $stmt->execute();
    
    // Obter o resultado da consulta
    $result = $stmt->get_result();
    
    // Inicializar array para armazenar os funcionários
    $funcionario = array();
    
    // Iterar sobre os resultados
    while ($row = $result->fetch_assoc()) {
        $funcionario[] = array(
            "id" => $row["ID_FUNCIONARIO"],  
            "nome" => $row["NOME"],
            "cpf" => $row["CPF"],            
            "email" => $row["EMAIL"],
            "telefone" => $row["TELEFONE"],
            "genero" => $row["GENERO"],
            "nascimento" => $row["NASCIMENTO"],
            "categoria" => $row["CATEGORIA"],
            
        );
    }
    
    // Fechar a declaração
    $stmt->close();
} else {
    // Caso a preparação da consulta falhe, retornar erro
    exit(json_encode(array("error" => "Falha ao preparar a consulta.")));
}

// Fechar a conexão
$mysqli->close();

// Retornar o resultado como JSON
exit(json_encode($funcionario));
?>
