<?php
header('Content-Type: application/json');
include '../conexao.php'; // Certifique-se de que $mysqli está definido neste arquivo

// Função para remover caracteres não numéricos (pontos, traços, etc.)
function removerPontosCPF($cpf) {
    // Remove qualquer coisa que não seja número
    return preg_replace('/\D/', '', $cpf);
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Dados recebidos via POST
        $nome = $_POST['nome'];
        $cpf = $_POST['cpf'];  // CPF com pontos e traços
        $email = $_POST['email'];
        $telefone = $_POST['telefone'];
        $genero = $_POST['genero'];
        $nascimento = $_POST['nascimento'];
        $categoria = $_POST['categoria'];
        $senha = $_POST['senha'];
        $endereco = $_POST['endereco'];
        $bairro = $_POST['bairro'];
        $cidade = $_POST['cidade'];
        $pais = $_POST['pais'];
        $uf = $_POST['uf'];

        // Remover os pontos, traços e outros caracteres não numéricos do CPF
        $cpf = removerPontosCPF($cpf);

        // Verificar se o CPF ou o e-mail já estão cadastrados
        $sql = "SELECT * FROM tb_funcionario WHERE CPF = ? OR EMAIL = ?";
        $stmt = $mysqli->prepare($sql);
        $stmt->bind_param("ss", $cpf, $email); // "s" indica que o parâmetro é uma string
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            echo json_encode(['success' => false, 'message' => 'Este CPF ou EMAIL já está cadastrado.']);
            exit;
        }

        // Criptografar a senha
        $hashedPassword = password_hash($senha, PASSWORD_DEFAULT);

        // Inserir dados no banco de dados
        $sql = "INSERT INTO tb_funcionario 
                (NOME, CPF, EMAIL, TELEFONE, GENERO, NASCIMENTO, CATEGORIA, SENHA, 
                ENDERECO, BAIRRO, CIDADE, PAIS, UF) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $mysqli->prepare($sql);
        $stmt->bind_param("sssssssssssss", 
            $nome, $cpf, $email, $telefone, $genero, $nascimento, $categoria, $hashedPassword, 
            $endereco, $bairro, $cidade, $pais, $uf);

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erro ao cadastrar funcionário.']);
        }
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Erro: ' . $e->getMessage()]);
    exit;
}
?>
