CREATE DATABASE empresa_bd;
USE empresa_bd;
CREATE TABLE tb_funcionario (
    ID_FUNCIONARIO INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    NOME VARCHAR(100) NOT NULL,           -- Campo obrigatório
    CPF VARCHAR(11) NOT NULL UNIQUE,      -- Campo obrigatório e único
    EMAIL VARCHAR(100) NOT NULL UNIQUE,   -- Campo obrigatório e único
    TELEFONE VARCHAR(15) NOT NULL,        -- Campo obrigatório
    GENERO ENUM('Masculino', 'Feminino', 'Outro') DEFAULT 'Outro', -- Gênero com valor padrão
    NASCIMENTO DATE NOT NULL,             -- Data de nascimento obrigatória
    CATEGORIA ENUM('usuario', 'colaborador') NOT NULL, -- Categoria como enum
    SENHA VARCHAR(255),                   -- Senha obrigatória apenas para categoria 'usuario'
    ENDERECO VARCHAR(255),                -- Campo opcional
    BAIRRO VARCHAR(100),                  -- Campo opcional
    CIDADE VARCHAR(100),                  -- Campo opcional
    PAIS VARCHAR(100),                    -- Campo opcional
    UF VARCHAR(2),                        -- UF (Estado) com limite de 2 caracteres
    CADASTRO TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Registra automaticamente a data de cadastro
);

