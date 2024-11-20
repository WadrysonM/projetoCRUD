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
                    <td id="tdRow">
                        <button onclick="window.location.href='editarFuncionario.html?id=${funcionario.id}'">
                            <img src="../assets/lapis.svg" alt="">
                        </button>
                        <button class="tooltip" onclick="excluirFuncionario(${funcionario.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" height="25" width="25">
                                <path fill="white" d="M8.78842 5.03866C8.86656 4.96052 8.97254 4.91663 9.08305 4.91663H11.4164C11.5269 4.91663 11.6329 4.96052 11.711 5.03866C11.7892 5.11681 11.833 5.22279 11.833 5.33329V5.74939H8.66638V5.33329C8.66638 5.22279 8.71028 5.11681 8.78842 5.03866ZM7.16638 5.74939V5.33329C7.16638 4.82496 7.36832 4.33745 7.72776 3.978C8.08721 3.61856 8.57472 3.41663 9.08305 3.41663H11.4164C11.9247 3.41663 12.4122 3.61856 12.7717 3.978C13.1311 4.33745 13.333 4.82496 13.333 5.33329V5.74939H15.5C15.9142 5.74939 16.25 6.08518 16.25 6.49939C16.25 6.9136 15.9142 7.24939 15.5 7.24939H15.0105L14.2492 14.7095C14.2382 15.2023 14.0377 15.6726 13.6883 16.0219C13.3289 16.3814 12.8414 16.5833 12.333 16.5833H8.16638C7.65805 16.5833 7.17054 16.3814 6.81109 16.0219C6.46176 15.6726 6.2612 15.2023 6.25019 14.7095L5.48896 7.24939H5C4.58579 7.24939 4.25 6.9136 4.25 6.49939C4.25 6.08518 4.58579 5.74939 5 5.74939H6.16667H7.16638ZM7.91638 7.24996H12.583H13.5026L12.7536 14.5905C12.751 14.6158 12.7497 14.6412 12.7497 14.6666C12.7497 14.7771 12.7058 14.8831 12.6277 14.9613C12.5495 15.0394 12.4436 15.0833 12.333 15.0833H8.16638C8.05588 15.0833 7.94989 15.0394 7.87175 14.9613C7.79361 14.8831 7.74972 14.7771 7.74972 14.6666C7.74972 14.6412 7.74842 14.6158 7.74584 14.5905L6.99681 7.24996H7.91638Z" clip-rule="evenodd" fill-rule="evenodd"></path>
                            </svg>
                            <span class="tooltiptext">remove</span>
                        </button>
                    </td>
                `;
                tabelaFuncionario.appendChild(row);
            });
        })
        .catch((error) => console.error("Erro ao carregar funcionários:", error));
}

// Função para lidar com a busca ao pressionar "Enter"
function handleSearch(event) {
    if (event.key === "Enter") {
        const query = event.target.value.trim(); // Obtém o valor do campo de pesquisa

        // Se o campo estiver vazio, recarrega a lista completa
        if (query === "") {
            carregarFuncionarios();
            return;
        }

        buscarFuncionarios(query); // Chama a função para buscar os funcionários
    }
}

document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const searchTerm = document.getElementById('searchInput').value;
        const searchBy = document.getElementById('searchBy').value; // Obtém o campo selecionado
        pesquisar(searchTerm, searchBy); // Chama a função de pesquisa
    }
});

function pesquisar(searchTerm, searchBy) {
    fetch(`../backend/filtroFuncionarios.php?campo=${searchBy}&valor=${encodeURIComponent(searchTerm)}`)
        .then(response => response.json())
        .then(data => {
            const tabelaFuncionario = document.getElementById('tabelaFuncionario');
            tabelaFuncionario.innerHTML = ''; // Limpa a tabela antes de preencher com os dados

            if (data.length > 0) {
                data.forEach(funcionario => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${funcionario.id}</td>
                        <td>${funcionario.nome}</td>
                        <td>${funcionario.cpf}</td>
                        <td>${funcionario.email}</td>
                        <td>${funcionario.telefone}</td>
                        <td id="tdRow">
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
            } else {
                tabelaFuncionario.innerHTML = '<tr><td colspan="6">Nenhum funcionário encontrado.</td></tr>';
            }
        })
        .catch(error => console.error('Erro ao pesquisar funcionários:', error));
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

document.querySelector('.select-selected').addEventListener('click', function () {
    this.parentElement.classList.toggle('open');
  });

  document.querySelectorAll('.select-items div').forEach(option => {
    option.addEventListener('click', function () {
      const selected = this.parentElement.previousElementSibling;
      selected.innerText = this.innerText;
      selected.dataset.value = this.dataset.value;
      this.parentElement.classList.remove('open');
    });
  });

  window.addEventListener('click', function (e) {
    const select = document.querySelector('.custom-select');
    if (!select.contains(e.target)) {
      select.classList.remove('open');
    }
  });