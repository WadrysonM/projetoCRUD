# Sistema de Cadastro e Login

Este projeto é um sistema de cadastro e login para uma empresa, desenvolvido em HTML, CSS, PHP e JavaScript.


## Funcionalidades
- **Introdução do projeto**: O projeto tem como funcionalidade de cadastro de funcionários, edição e exclusão de funcionários.
    Primeiro é direcionado para a tela de login, logo ao entrar com as credênciais válidas, é redirecionado para a tela principal que exibe os dados cadastrados no banco de dados, com alguns dados do funcionário, contendo nessa tela 3 botões com funcionalidades, um botão para editar que leva para a página de edição e puxa os dados do banco de dados, ao salvar a edição é redirecionado para a tela da lista.
    Outro botão que contém na tela é o de excluir, que quando clicado, abre um modal para ter certeza de excluir o funcionário correto, como uma forma de segurança para não consumir com o dado do banco de dados, ao selecionar se tem certeza ou não, apenas fecha o modal (excluindo ou não os dados).
    Outro botão é o de cadastrar, que redireciona para a tela de cadastro, com validação do CPF e o e-mail para serem únicos no banco de dados, em caso de erro de dados duplicados, não cadastra, e em caso de falta de alguns dados, também não cadastra. Ainda nessa tela, tem uma opção para escolher se o funcionário é 'usuario' ou 'colaborador', caso seja colaborador, apenas não solicita a opção de senha, senha só é necessária em caso de ser 'usuario' (admin). Ao cadastrar com todos dados necessários, redireciona novamente para a tela da lista de funcionários já com o novo dado cadastrado no banco de dados.

- **Login na plataforma**: Apenas usuários com a categoria 'usuario' podem logar.
- **Cadastro de pessoa**: Permite o cadastro de novas pessoas com validação de CPF único.
- **Validação e-mail**: Verificação de e-mail único.
- **Feedback ao usuário**: Mensagens claras em caso de sucesso ou erro.

## Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: PHP
- **Banco de Dados**: MySQL

## Como Executar o Projeto

1. **Clone o repositório**:


2. **Configure o banco de dados**:
- Importe o arquivo `sql/banco_de_dados.sql` no seu servidor MySQL para criar o banco de dados e a tabela.

3. **Configure a conexão**:
- No arquivo `php/conexao.php`, ajuste as variáveis `$user` e `$password` com as credenciais do seu banco de dados.

4. **Inicie o servidor**:
- Coloque o projeto no diretório do seu servidor local (por exemplo, `htdocs` do XAMPP) e inicie o servidor Apache e MySQL.

5. **Acesse o sistema**:
- Abra o navegador e acesse `http://localhost/meu-projeto/index.html`.

## Próximos Passos

- Implementar edição e exclusão de funcionários.
- Melhorar a segurança (proteção contra SQL Injection, XSS).
- Implementar critérios mínimos de senha (como tamanho mínimo, caracteres especiais).
- Implementar buscar dados ou funcionários específicos.
- Ajustar alguns erros na tela de edição.

## Licença

Projeto para fins educacionais.
