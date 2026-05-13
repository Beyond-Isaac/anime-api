# 🎌 anime-api

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Laragon](https://img.shields.io/badge/Laragon-0E83CD?style=for-the-badge&logo=laragon&logoColor=white)

API REST para catálogo de animes de A a Z, com gerenciamento de gêneros e autenticação de usuários via JWT.

---

## 📋 Sumário

- [Sobre o projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Como instalar e rodar](#-como-instalar-e-rodar)
- [Variáveis de ambiente](#-variáveis-de-ambiente)
- [Endpoints](#-endpoints)
- [Regras de negócio](#-regras-de-negócio)
- [Status codes](#-status-codes)

---

## 📖 Sobre o projeto

A **anime-api** é uma API REST construída com arquitetura MVC que permite gerenciar um catálogo completo de animes organizados de A a Z. Os usuários se cadastram e autenticam via JWT para acessar as rotas protegidas. Cada anime pertence a um gênero, formando uma relação entre os dois recursos.

---

## 🚀 Tecnologias

| Tecnologia | Descrição |
|---|---|
| Node.js | Ambiente de execução JavaScript |
| Express | Framework HTTP para criação da API |
| Prisma ORM | Mapeamento objeto-relacional com MySQL |
| MySQL | Banco de dados relacional |
| bcrypt | Hash seguro de senhas |
| jsonwebtoken | Geração e validação de tokens JWT |
| dotenv | Gerenciamento de variáveis de ambiente |
| nodemon | Reinício automático em desenvolvimento |

---

## 📁 Estrutura do projeto

```
anime-api/
├── prisma/
│   ├── schema.prisma         # Definição dos models e relações
│   └── migrations/           # Histórico de migrations do banco
├── src/
│   ├── server.js             # Entry point — configura e sobe o Express
│   ├── lib/
│   │   └── prisma.js         # Instância única do Prisma Client
│   ├── routes/
│   │   ├── auth.routes.js    # Rotas de autenticação
│   │   ├── genero.routes.js  # Rotas de gêneros
│   │   └── anime.routes.js   # Rotas de animes
│   ├── controllers/
│   │   ├── auth.controller.js    # Lógica de register e login
│   │   ├── genero.controller.js  # Lógica do CRUD de gêneros
│   │   └── anime.controller.js   # Lógica do CRUD de animes
│   └── middlewares/
│       └── auth.middleware.js    # Validação do token JWT
├── .env.example              # Exemplo de variáveis de ambiente
├── .gitignore                # node_modules e .env ignorados
├── README.md
└── package.json
```

---

## ⚙️ Como instalar e rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- MySQL rodando localmente (recomendado: [Laragon](https://laragon.org/download))

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/anime-api.git
cd anime-api

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais (veja a seção abaixo)

# 4. Crie o banco de dados no MySQL
# No Laragon, clique em Database → New → anime_db
# Ou via terminal MySQL:
# CREATE DATABASE anime_db;

# 5. Rode a migration para criar as tabelas
npx prisma migrate dev --name init

# 6. Inicie o servidor em modo desenvolvimento
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

---

## 🔐 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
DATABASE_URL="mysql://root:@localhost:3306/anime_db"
JWT_SECRET="sua_chave_secreta_aqui"
PORT=3000
```

| Variável | Descrição |
|---|---|
| `DATABASE_URL` | String de conexão com o MySQL |
| `JWT_SECRET` | Chave secreta para assinar os tokens JWT |
| `PORT` | Porta onde o servidor vai rodar |

> ⚠️ Nunca commite o arquivo `.env` com dados reais no repositório.

---

## 📡 Endpoints

### 🔓 Auth — público

#### `POST /auth/register` — Cadastrar usuário

**Body:**
```json
{
  "nome": "Isaac",
  "email": "isaac@email.com",
  "senha": "123456"
}
```

**Resposta `201`:**
```json
{
  "mensagem": "Usuário cadastrado com sucesso.",
  "usuario": {
    "id": 1,
    "nome": "Isaac",
    "email": "isaac@email.com"
  }
}
```

---

#### `POST /auth/login` — Fazer login

**Body:**
```json
{
  "email": "isaac@email.com",
  "senha": "123456"
}
```

**Resposta `200`:**
```json
{
  "mensagem": "Login realizado com sucesso.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> O token retornado deve ser enviado no header `Authorization: Bearer <token>` em todas as rotas protegidas.

---

### 🔒 Gêneros — requer token JWT

#### `GET /generos` — Listar todos os gêneros

**Resposta `200`:**
```json
[
  { "id": 1, "nome": "Shonen", "criadoEm": "2024-01-01T00:00:00.000Z" },
  { "id": 2, "nome": "Seinen", "criadoEm": "2024-01-01T00:00:00.000Z" }
]
```

---

#### `GET /generos/:id` — Buscar gênero por ID

**Resposta `200`:**
```json
{
  "id": 1,
  "nome": "Shonen",
  "criadoEm": "2024-01-01T00:00:00.000Z",
  "animes": [
    { "id": 1, "titulo": "Naruto", "ano": 2002 }
  ]
}
```

---

#### `POST /generos` — Criar gênero

**Body:**
```json
{
  "nome": "Shonen"
}
```

**Resposta `201`:**
```json
{
  "id": 1,
  "nome": "Shonen",
  "criadoEm": "2024-01-01T00:00:00.000Z"
}
```

---

#### `PUT /generos/:id` — Atualizar gênero

**Body:**
```json
{
  "nome": "Shonen Atualizado"
}
```

**Resposta `200`:**
```json
{
  "id": 1,
  "nome": "Shonen Atualizado",
  "criadoEm": "2024-01-01T00:00:00.000Z"
}
```

---

#### `DELETE /generos/:id` — Deletar gênero

**Resposta `200`:**
```json
{
  "mensagem": "Gênero deletado com sucesso."
}
```

---

### 🔒 Animes — requer token JWT

#### `GET /animes` — Listar todos os animes em ordem alfabética

**Resposta `200`:**
```json
[
  {
    "id": 2,
    "titulo": "Attack on Titan",
    "sinopse": "Humanidade luta pela sobrevivência contra gigantes.",
    "ano": 2013,
    "estudio": "Wit Studio",
    "generoId": 1,
    "genero": { "id": 1, "nome": "Shonen" }
  }
]
```

---

#### `GET /animes?letra=N` — Filtrar animes pela letra inicial (catálogo A-Z)

Retorna apenas os animes cujo título começa com a letra informada, em ordem alfabética.

**Exemplo:** `GET /animes?letra=N` retorna Naruto e Naruto Shippuden.

---

#### `GET /animes/:id` — Buscar anime por ID

**Resposta `200`:**
```json
{
  "id": 1,
  "titulo": "Naruto",
  "sinopse": "Um jovem ninja que sonha em se tornar Hokage.",
  "ano": 2002,
  "estudio": "Pierrot",
  "generoId": 1,
  "genero": { "id": 1, "nome": "Shonen" }
}
```

---

#### `POST /animes` — Criar anime

**Body:**
```json
{
  "titulo": "Naruto",
  "sinopse": "Um jovem ninja que sonha em se tornar Hokage.",
  "ano": 2002,
  "estudio": "Pierrot",
  "generoId": 1
}
```

**Resposta `201`:**
```json
{
  "id": 1,
  "titulo": "Naruto",
  "sinopse": "Um jovem ninja que sonha em se tornar Hokage.",
  "ano": 2002,
  "estudio": "Pierrot",
  "generoId": 1,
  "genero": { "id": 1, "nome": "Shonen" }
}
```

---

#### `PUT /animes/:id` — Atualizar anime

**Body** (envie apenas os campos que deseja atualizar):
```json
{
  "titulo": "Naruto Clássico",
  "ano": 2002
}
```

**Resposta `200`:** retorna o anime atualizado com os dados do gênero.

---

#### `DELETE /animes/:id` — Deletar anime

**Resposta `200`:**
```json
{
  "mensagem": "Anime deletado com sucesso."
}
```

---

## 📐 Regras de negócio

- Não é possível cadastrar dois usuários com o mesmo email
- Senhas são armazenadas com hash bcrypt — nunca em texto puro
- Todas as rotas de `/animes` e `/generos` exigem token JWT válido
- Não é possível deletar um gênero que possui animes cadastrados
- Não é possível criar um anime com um `generoId` inexistente
- A listagem de animes é sempre retornada em ordem alfabética (A-Z)
- O filtro `?letra=` aceita tanto maiúscula quanto minúscula

---

## 📊 Status codes

| Código | Significado | Quando acontece |
|---|---|---|
| `200` | OK | Requisição bem-sucedida |
| `201` | Created | Recurso criado com sucesso |
| `400` | Bad Request | Campos obrigatórios ausentes ou regra de negócio violada |
| `401` | Unauthorized | Token ausente, inválido ou expirado |
| `404` | Not Found | Recurso não encontrado pelo ID informado |
| `500` | Internal Server Error | Erro inesperado no servidor |
