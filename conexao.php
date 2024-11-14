<?php
// Parâmetros de conexão
$servidor = "localhost";  // Endereço do servidor
$usuario = "";        // Usuário do MySQL
$senha = "";   // Senha do MySQL
$bancodados = "empresa_bd"; // Nome do banco de dados
$porta = 3306;
// Cria a conexão

$mysqli = mysqli_connect($servidor, $usuario, $senha, $bancodados, $porta);

if ($mysqli->connect_error) {
    die("Falha ao conectar: " . $mysqli->connect_error);
}
