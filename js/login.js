// Seleciona o formulário
const form = document.querySelector('form');  

// Adiciona um evento de submissão ao formulário
form.addEventListener('submit', (e) => {  
    e.preventDefault();  // Previne o comportamento padrão de submissão do formulário

    // Captura os valores dos campos de entrada
    const email = document.querySelector('#email').value;  
    const senha = document.querySelector('#senha').value;  
    
    console.log(email, senha); // Agora aqui está correto, para verificar os valores

    // Faz uma requisição POST para login.php
    fetch('../backend/login.php', {  
        method: 'POST',  
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify({ email, senha }),  
    })  
    .then((response) => {
        // Verifica se a resposta é OK
        if (!response.ok) {
            throw new Error('Erro na rede.'); // Lança um erro se a resposta não for 2xx
        }
        return response.json();  
    })  
    .then((data) => {  
        if (data.success) {  
            console.log('Autenticado com sucesso!');  
            // Redirecione o usuário para a página de destino
            window.location.href = './pages/listaFuncionarios.html'; // Ajuste para a página de destino desejada
        } else {  
            console.error('Erro:', data.message);  
            alert(data.message); // Exibe a mensagem de erro ao usuário
        }  
    })  
    .catch((error) => console.error('Erro ao autenticar o usuário:', error));  
});

function toggleSenha() {
    const senhaInput = document.getElementById('senha');
    if (senhaInput.type === "password") {
        senhaInput.type = "text";
    } else {
        senhaInput.type = "password";
    }
}
