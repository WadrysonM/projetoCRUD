let idParaExcluir;
let isEditMode = false;

// Função para carregar a lista de funcionários
function carregarFuncionarios() {
    fetch("../backend/listaFuncionarios.php")
        .then((response) => response.json())
        .then((data) => {
            const tabelaFuncionario = document.getElementById("tabelaFuncionario");
            tabelaFuncionario.innerHTML = "";

            data.forEach((funcionario) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${funcionario.id}</td>
                    <td>${funcionario.nome}</td>
                    <td>${funcionario.cpf}</td>
                    <td>${funcionario.email}</td>
                    <td>${funcionario.telefone}</td>
                    <td>
                        <button class="btn btn-edit" onclick="window.location.href='editarFuncionario.html?id=${funcionario.id}'">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button class="btn btn-delete" onclick="excluirFuncionario(${funcionario.id})">
                            <i class="fas fa-trash-alt"></i> Excluir
                        </button>
                    </td>
                `;
                tabelaFuncionario.appendChild(row);
            });
        })
        .catch((error) => console.error("Erro ao carregar funcionários:", error));
}

// Função para abrir o modal de exclusão
const excluirFuncionario = (id) => {
    idParaExcluir = id; // Armazena o ID para exclusão
    console.log("ID para excluir:", idParaExcluir); // Debugging
    const modal = document.getElementById("modalExclusao");
    modal.style.display = "block"; // Exibe o modal
};


// Função para fechar o modal
const fecharModal = () => {
    const modal = document.getElementById("modalExclusao");
    modal.style.display = "none"; // Oculta o modal
};

// Função para confirmar e excluir o funcionário
const confirmarExclusao = () => {
    if (!idParaExcluir) {
        alert("ID não definido para exclusão.");
        return;
    }

    fetch("../backend/excluirFuncionario.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `id=${idParaExcluir}`,
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            alert("Funcionário excluído com sucesso!");
            location.reload(); // Recarrega a lista
        } else {
            alert(`Erro: ${data.message}`);
        }
        fecharModal();
    })
    .catch((error) => {
        console.error("Erro na exclusão:", error);
        alert(`Erro: ${error.message}`);
        fecharModal();
    });
};

// Adicione um evento de clique no document para fechar o modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById("modalExclusao");
    if (event.target === modal) {
        fecharModal();
    }
};
// Função para preencher os detalhes do funcionário ao carregar a página
function telaDetalhe() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (id) {
        isEditMode = true; // Mudando para o modo de edição
        fetch(`../backend/telaFuncionario.php?id=${id}`)
            .then((response) => response.json())
            .then((funcionario) => {
                if (funcionario.error) {
                    console.error(funcionario.error);
                    alert("Funcionário não encontrado.");
                } else {
                    preencherCampos(funcionario);
                }
            })
            .catch((error) => {
                console.error("Erro ao buscar os detalhes:", error);
            });
    } else {
        console.error("ID não encontrado na URL.");
    }
}

// Função para preencher os campos do formulário com os dados do funcionário
function preencherCampos(funcionario) {
    document.getElementById("idcodigo").value = funcionario.ID_FUNCIONARIO;
    document.getElementById("nome").value = funcionario.NOME;
    document.getElementById("cpf").value = funcionario.CPF;
    document.getElementById("email").value = funcionario.EMAIL;
    document.getElementById("telefone").value = funcionario.TELEFONE;
    document.getElementById("genero").value = funcionario.GENERO;
    document.getElementById("nascimento").value = funcionario.NASCIMENTO;
    document.getElementById("categoria").value = funcionario.CATEGORIA;
    document.getElementById("endereco").value = funcionario.ENDERECO;
    document.getElementById("cidade").value = funcionario.CIDADE;
    document.getElementById("bairro").value = funcionario.BAIRRO;
    document.getElementById("uf").value = funcionario.UF;
    document.getElementById("pais").value = funcionario.PAIS;
}

// Função para salvar as alterações (seja editando ou cadastrando)
function salvarFuncionario() {
    if (isEditMode) {
        editarFuncionario(); // Chama a função para editar
    } else {
        cadastrarFuncionario(); // Chama a função para cadastrar
    }
}

// Função para editar os dados do funcionário
function editarFuncionario() {
    const formData = new FormData();
    formData.append("id", document.getElementById("idcodigo").value);
    formData.append("nome", document.getElementById("nome").value);
    formData.append("cpf", document.getElementById("cpf").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("telefone", document.getElementById("telefone").value);
    formData.append("genero", document.getElementById("genero").value);
    formData.append("nascimento", document.getElementById("nascimento").value);
    formData.append("categoria", document.getElementById("categoria").value);
    formData.append("endereco", document.getElementById("endereco").value);
    formData.append("cidade", document.getElementById("cidade").value);
    formData.append("bairro", document.getElementById("bairro").value);
    formData.append("uf", document.getElementById("uf").value);
    formData.append("pais", document.getElementById("pais").value);

    
    // Fazendo a requisição para o PHP para editar os dados
    fetch('../backend/editarFuncionario.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Funcionário editado com sucesso!");
            window.location.href = "./listaFuncionarios.html"; 
        } else {
            alert("Erro ao editar funcionário: " + data.message);
        }
    })
    .catch(error => {
        console.error("Erro ao editar funcionário:", error);
    });
}


// Função para enviar os dados do novo funcionário
function cadastrarFuncionario() {
    const formData = new FormData();
   
    formData.append("nome", document.getElementById("nome").value);
    formData.append("cpf", document.getElementById("cpf").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("telefone", document.getElementById("telefone").value);
    formData.append("genero", document.getElementById("genero").value);
    formData.append("nascimento", document.getElementById("nascimento").value);
    formData.append("categoria", document.getElementById("categoria").value);
    formData.append("endereco", document.getElementById("endereco").value);
    formData.append("cidade", document.getElementById("cidade").value);
    formData.append("bairro", document.getElementById("bairro").value);
    formData.append("uf", document.getElementById("uf").value);
    formData.append("pais", document.getElementById("pais").value);

    // Inclui a senha, se necessário
    const senhaContainer = document.getElementById('senha-container');
    if (senhaContainer) {
        formData.append("senha", document.getElementById("senha").value);
    }

    // Fazendo a requisição para o PHP para adicionar os dados
    fetch('../backend/cadastro.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta da rede'); // Lança um erro se a resposta não for ok
        }
        return response.json(); // Retorna o JSON
    })
    .then(data => {
        if (data.success) {
            alert("Funcionário adicionado com sucesso!");
            window.location.href = "./listaFuncionarios.html"; // Redireciona para a lista de funcionários
        } else {
            alert("Erro ao adicionar funcionário: " + data.message);
        }
    })
    .catch(error => {
        console.error("Erro ao adicionar funcionário:", error);
        alert("Erro ao adicionar funcionário. Verifique o console para mais detalhes."); // Mensagem amigável ao usuário
    });
}

// Eventos de carregamento e clique
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("tabelaFuncionario")) {
        carregarFuncionarios(); // Carrega a lista se a tabela estiver presente
    }
    if (document.getElementById("cadastro-form")) {
        telaDetalhe(); // Carrega os detalhes se o formulário estiver presente
    }
});

// Adiciona o evento de clique no botão "Salvar"
document.getElementById('btn-salvar').addEventListener('click', (e) => {
    e.preventDefault(); // Evita o envio do formulário padrão
    salvarFuncionario(); // Chama a função para salvar funcionário
});
