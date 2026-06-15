# 🎌 anime-api

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

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

A **anime-api** é uma API REST construída com arquitetura MVC que permite gerenciar um catálogo completo de animes organizados de A a Z. Os usuários se cadastram e autenticam via JWT para acessar rotas protegidas. Cada anime pertence a um gênero, formando uma relação entre os recursos.

O projeto utiliza SQLite como banco de dados local, tornando a configuração mais simples e portátil para desenvolvimento e testes.

---

## 🚀 Tecnologias

| Tecnologia | Descrição |
|---|---|
| Node.js | Ambiente de execução JavaScript |
| Express | Framework HTTP para criação da API |
| Prisma ORM | ORM para modelagem e acesso ao banco |
| SQLite | Banco de dados local baseado em arquivo |
| bcrypt | Hash seguro de senhas |
| jsonwebtoken | Geração e validação de tokens JWT |
| dotenv | Gerenciamento de variáveis de ambiente |
| nodemon | Reinício automático em desenvolvimento |

---

## 📁 Estrutura do projeto

```txt
anime-api/
├── prisma/
│   ├── schema.prisma         # Definição dos models e relações
│   ├── dev.db                # Banco SQLite local
│   └── migrations/           # Histórico de migrations do banco
├── src/
│   ├── server.js             # Entry point da aplicação
│   ├── lib/
│   │   └── prisma.js         # Instância única do Prisma Client
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── genero.routes.js
│   │   └── anime.routes.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── genero.controller.js
│   │   └── anime.controller.js
│   └── middlewares/
│       └── auth.middleware.js
├── .env.example
├── .gitignore
├── README.md
└── package.json
```

---

## ⚙️ Como instalar e rodar

### Pré-requisitos

- Node.js instalado (recomendado: versão LTS)

---

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/anime-api.git

# 2. Entre na pasta
cd anime-api

# 3. Instale as dependências
npm install

# 4. Crie o arquivo .env
cp .env.example .env

# 5. Rode as migrations
npx prisma migrate dev --name init

# 6. Inicie o servidor
npm run dev
```

Servidor disponível em:

```txt
http://localhost:3000
```

---

## 🔐 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua_chave_secreta"
PORT=3000
```

| Variável | Descrição |
|---|---|
| `DATABASE_URL` | Caminho do banco SQLite |
| `JWT_SECRET` | Chave usada para assinar os tokens |
| `PORT` | Porta do servidor |

> ⚠️ Nunca envie o arquivo `.env` para o GitHub.

---

## 🗄️ Banco de dados

O projeto utiliza SQLite com Prisma ORM.

Após executar a migration:

```bash
npx prisma migrate dev --name init
```

o banco será criado automaticamente em:

```txt
prisma/dev.db
```

Para visualizar e editar os dados graficamente:

```bash
npx prisma studio
```

---

## 📡 Endpoints

### 🔓 Auth — público

#### `POST /auth/register`

Cadastrar usuário.

**Body:**

```json
{
  "nome": "Isaac",
  "email": "isaac@email.com",
  "senha": "123456"
}
```

---

#### `POST /auth/login`

Realizar login.

**Body:**

```json
{
  "email": "isaac@email.com",
  "senha": "123456"
}
```

---

### 🔒 Gêneros — requer JWT

#### `GET /generos`

Listar gêneros.

---

#### `GET /generos/:id`

Buscar gênero por ID.

---

#### `POST /generos`

Criar gênero.

---

#### `PUT /generos/:id`

Atualizar gênero.

---

#### `DELETE /generos/:id`

Remover gênero.

---

### 🔒 Animes — requer JWT

#### `GET /animes`

Listar animes em ordem alfabética.

---

#### `GET /animes?letra=N`

Filtrar animes pela letra inicial.

---

#### `GET /animes/:id`

Buscar anime por ID.

---

#### `POST /animes`

Criar anime.

---

#### `PUT /animes/:id`

Atualizar anime.

---

#### `DELETE /animes/:id`

Deletar anime.

---

## 📐 Regras de negócio

- Não é permitido cadastrar emails duplicados
- Senhas são criptografadas com bcrypt
- Rotas protegidas exigem JWT válido
- Não é possível criar anime com gênero inexistente
- Não é possível deletar gênero vinculado a animes
- A listagem de animes é ordenada alfabeticamente
- O filtro `?letra=` não diferencia maiúsculas de minúsculas

---

## 📊 Status codes

| Código | Significado |
|---|---|
| `200` | OK |
| `201` | Created |
| `400` | Bad Request |
| `401` | Unauthorized |
| `404` | Not Found |
| `500` | Internal Server Error |

---

## 🛠️ Futuras melhorias

- Paginação
- Upload de imagens
- Favoritos
- Avaliações
- Swagger/OpenAPI
- Docker
- Deploy em produção
- Busca avançada
- Sistema de temporadas
