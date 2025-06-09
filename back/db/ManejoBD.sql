-- create database ManejoDB;
-- use ManejoDB;

-- Criação tabela Departamento
CREATE TABLE Departamento (
codigo INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(45)
);

-- Tabela Funcionario
CREATE TABLE Funcionario(
Codigo INT AUTO_INCREMENT PRIMARY KEY,
Cargo VARCHAR(45),
Nome VARCHAR(45),
Telefone VARCHAR(45),
Data_Nascimento DATE,
Rua VARCHAR(45),
Numero INT,
Cidade VARCHAR(45),
CPF VARCHAR(45),
Departamento_Codigo INT,
FOREIGN KEY (Departamento_Codigo) REFERENCES Departamento(Codigo)
);

-- Tabela Administrador
CREATE TABLE Administrador (
Email VARCHAR(50),
Senha VARCHAR(50),
Funcionario_Codigo INT PRIMARY KEY,
FOREIGN KEY (Funcionario_Codigo) REFERENCES Funcionario(Codigo)
);

-- Tabela Operario
CREATE TABLE Operario (
Saldo INT,
Funcionario_Codigo INT PRIMARY KEY,
FOREIGN KEY (Funcionario_Codigo) REFERENCES Funcionario(Codigo)
);

-- Tabela Evento
CREATE TABLE Evento (
Codigo INT AUTO_INCREMENT PRIMARY KEY,
Titulo VARCHAR(45),
Data VARCHAR(45),
Administrador_Funcionario_Codigo INT,
FOREIGN KEY (Administrador_Funcionario_Codigo) REFERENCES Administrador(Funcionario_Codigo)
);

-- Tabela Lembrete
CREATE TABLE Lembrete (
Codigo INT AUTO_INCREMENT PRIMARY KEY,
Observacao VARCHAR(45),
Administrador_Funcionario_Codigo INT,
FOREIGN KEY (Administrador_Funcionario_Codigo) REFERENCES Administrador(Funcionario_Codigo)
);

-- Tabela Compra
CREATE TABLE Compra (
Codigo INT AUTO_INCREMENT PRIMARY KEY,
Preco DOUBLE,
Data_Entrega DATE,
Administrador_Funcionario_Codigo INT,
FOREIGN KEY (Administrador_Funcionario_Codigo) REFERENCES Administrador(Funcionario_Codigo)
);

-- Tabela Material
CREATE TABLE Material (
Codigo INT AUTO_INCREMENT PRIMARY KEY,
Nome VARCHAR(45),
Descricao VARCHAR(45),
Quantidade INT,
Preco DOUBLE
);

-- Tabela Compra_Material
CREATE TABLE Compra_Material (
Compra_Codigo INT,
Material_Codigo INT,
PRIMARY KEY (Compra_Codigo, Material_Codigo),
FOREIGN KEY (Compra_Codigo) REFERENCES Compra(Codigo),
FOREIGN KEY (Material_Codigo) REFERENCES Material(Codigo)
);

-- Tabela Ferramenta
CREATE TABLE Ferramenta (
Codigo INT AUTO_INCREMENT PRIMARY KEY,
Nome VARCHAR(45),
Tipo VARCHAR(45),
Disponibilidade VARCHAR(45),
Localizacao VARCHAR(45)
);

-- Tabela Emprestimo
CREATE TABLE Emprestimo (
Codigo INT AUTO_INCREMENT PRIMARY KEY,
Descricao VARCHAR(45),
Data_Retirada DATE,
Data_Devolucao VARCHAR(45),
Operario_Funcionario_Codigo INT,
FOREIGN KEY (Operario_Funcionario_Codigo) REFERENCES Operario(Funcionario_Codigo)
);

-- Tabela Emprestimo_Ferramenta
CREATE TABLE Emprestimo_Ferramenta (
Codigo_Ferramenta INT,
Emprestimo_Codigo INT,
PRIMARY KEY (Codigo_Ferramenta, Emprestimo_Codigo),
FOREIGN KEY (Codigo_Ferramenta) REFERENCES Ferramenta(Codigo),
FOREIGN KEY (Emprestimo_Codigo) REFERENCES Emprestimo(Codigo)
);