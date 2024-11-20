<?php
include_once "../conexao.php";  // Inclui a conexão com o banco de dados

$idFuncionario = isset($_GET["id"]) ? $_GET["id"] : 0;

$sql = "SELECT ID_FUNCIONARIO, NOME, CPF, EMAIL, TELEFONE, GENERO, NASCIMENTO, CATEGORIA, SENHA, 
                ENDERECO, BAIRRO, CIDADE, PAIS, UF FROM tb_funcionario WHERE ID_FUNCIONARIO = ? LIMIT 1";

$stmt = $mysqli -> prepare($sql);

$stmt->bind_param("i", $idFuncionario);

$stmt->execute();

$result = $stmt->get_result();

$funcionario = $result->fetch_assoc();


exit(json_encode($funcionario));