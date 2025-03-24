# API de Produtos e Serviços - Node.js

Este é um projeto básico de API RESTful para gerenciar produtos e serviços. Ele utiliza Node.js, Express, PostgreSQL, JWT para autenticação e bcrypt para encriptação de senhas.

## Pré-requisitos

Certifique-se de que você tem as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (v14.x ou superior)
- [PostgreSQL](https://www.postgresql.org/) (v12.x ou superior)

## Instalação

Siga os passos abaixo para instalar e configurar o projeto localmente:

### 1. Clone o repositório

```
git clone https://github.com/seu_usuario/seu_projeto.git
cd seu_projeto
```

### 2. Instale as dependências
Execute o comando abaixo para instalar as dependências do projeto:

```
npm install
```

### 3. Configuração do ambiente
Este projeto usa variáveis de ambiente para configurar a conexão com o banco de dados e outras configurações sensíveis. Há um arquivo de exemplo .env.dev no repositório que contém as variáveis necessárias para rodar o projeto.

Copie o arquivo .env.dev para .env
```
cp .env.dev .env
```

Modifique o arquivo .env
Abra o arquivo .env e ajuste as variáveis de acordo com seu ambiente local:
```
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=sua_chave_secreta
```

### 4. Rodar migrações
Após configurar o banco de dados, execute as migrações para criar as tabelas necessárias:

```
npx knex migrate:latest --knexfile knexfile.mjs
```

### 5. Iniciar o servidor

Agora que tudo está configurado, você pode iniciar o servidor com o comando:
```
npm start
```

O servidor estará rodando em http://localhost:4333.

### 6. Rodar o servidor em modo de desenvolvimento (opcional)
Se você deseja rodar o servidor em modo de desenvolvimento com reinicialização automática sempre que houver mudanças no código, use o nodemon:

```
npm run dev
```

### Testes
Para rodar os testes automatizados, execute o comando:

```
npm test
```