// Função para alternar a exibição do campo de senha com base na categoria
function toggleSenha() {
    var categoria = document.getElementById('categoria').value;
    var senhaContainer = document.getElementById('senha-container');

    // Mostra ou oculta o campo de senha com base na categoria
    if (categoria === 'colaborador') {
        senhaContainer.style.display = 'none'; // Oculta o campo de senha
    } else {
        senhaContainer.style.display = 'block'; // Mostra o campo de senha
    }
}

// Executa a função toggleSenha ao carregar a página
window.onload = function() {
    toggleSenha();
    document.getElementById('categoria').addEventListener('change', toggleSenha);
};

// Máscara para CPF
function mascaraCPF(input) {
    let cpf = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpf.length <= 3) {
        input.value = cpf;
    } else if (cpf.length <= 6) {
        input.value = cpf.replace(/(\d{3})(\d{1,})/, '$1.$2');
    } else if (cpf.length <= 9) {
        input.value = cpf.replace(/(\d{3})(\d{3})(\d{1,})/, '$1.$2.$3');
    } else {
        input.value = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,})/, '$1.$2.$3-$4');
    }
}


// Máscara para Telefone
function mascaraTelefone(input) {
    let telefone = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (telefone.length <= 2) {
        input.value = `(${telefone}`;
    } else if (telefone.length <= 6) {
        input.value = `(${telefone.substring(0, 2)}) ${telefone.substring(2)}`;
    } else {
        input.value = `(${telefone.substring(0, 2)}) ${telefone.substring(2, 7)}-${telefone.substring(7, 11)}`;
    }
}



// Validação básica para E-mail
function validarEmail(input) {
    const email = input.value;
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Expressão regular para validar e-mail

    if (!regex.test(email)) {
        input.setCustomValidity("Por favor, insira um e-mail válido.");
    } else {
        input.setCustomValidity(""); // Remove a mensagem de erro se o e-mail for válido
    }
}

// Função para validar o CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos (pontos, traços, espaços)

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        alert('O CPF deve ter 11 dígitos.');
        return false;
    }

    // Verifica se o CPF é uma sequência de números iguais (ex: 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cpf)) {
        alert('O CPF não pode ser uma sequência de números iguais.');
        return false;
    }

    let soma = 0;
    // Calcula o primeiro dígito verificador
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let primeiroDigito = (soma * 10) % 11;
    if (primeiroDigito === 10 || primeiroDigito === 11) {
        primeiroDigito = 0;
    }
    if (parseInt(cpf.charAt(9)) !== primeiroDigito) {
        alert('O primeiro dígito verificador está incorreto.');
        return false;
    }

    soma = 0;
    // Calcula o segundo dígito verificador
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    let segundoDigito = (soma * 10) % 11;
    if (segundoDigito === 10 || segundoDigito === 11) {
        segundoDigito = 0;
    }
    if (parseInt(cpf.charAt(10)) !== segundoDigito) {
        alert('O segundo dígito verificador está incorreto.');
        return false;
    }

    return true; // CPF válido
}



// Exemplo de uso: valida o CPF no envio do formulário
const form = document.querySelector('#cadastro-form');
form.addEventListener('submit', async (e) => {
    const cpfInput = document.querySelector('#cpf');
    const cpf = cpfInput.value;
    if (!validarCPF(cpf)) {
        e.preventDefault(); // Impede o envio do formulário
        alert('CPF inválido. Por favor, insira um CPF válido.');
        return;
    }

    const cpfExistente = await verificarCPFExistente(cpf);
    if (cpfExistente) {
        e.preventDefault(); // Impede o envio do formulário
        alert('Este CPF já está cadastrado. Por favor, insira um CPF diferente.');
    }
});


