
# Projeto Desafio Técnico Web Júnior — Gerenciador de Projetos

Este repositório contém uma aplicação fullstack dividida em duas partes:

- **Backend**: API REST construída com [NestJS](https://nestjs.com/)
- **Frontend**: Interface do usuário feita com [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)

---

## 📁 Estrutura de Pastas

```
/
├── backend/       # NestJS 
└── frontend/      # React + TypeScript
```

---

## 🔧 Tecnologias Utilizadas

### Backend
- Node.js
- NestJS
- TypeScript
- ESLint / Prettier

### Frontend
- React
- Vite
- TypeScript
- ESLint

---

## ⚙️ Requisitos

- Node.js >= 18.x
- NPM ou Yarn
---

# 🚀 Backend (NestJS)

### 📍 Local: ./backend

### 📦 Instalar dependências

```bash
cd backend
npm install
```

### ▶️ Rodar em modo desenvolvimento

```bash
npm run start:dev
```

### 📁 Estrutura do Backend

```
backend/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── modules/
│   ├── entities/
│   ├── dto/
│   └── database/
├── test/
├── package.json
├── tsconfig.json
└── README.md
```

### 🌐 Endpoints Exemplo

```
GET    /projects
POST   /projects
PUT    /projects/:id
DELETE /projects/:id
POST   /auth/register
POST   /auth/login
```

> ⚠️ A API usa autenticação JWT. Você precisa estar autenticado para acessar rotas protegidas.

---

# 💻 Frontend (React + Vite)

### 📍 Local: ./frontend

### 📦 Instalar dependências

```bash
cd frontend
npm install
```

### ▶️ Rodar em modo desenvolvimento

```bash
npm run dev
```

### 🛠️ Configurações importantes

- A URL da API pode ser configurada no arquivo:

```
frontend/src/services/api.ts
```

### 📁 Estrutura do Frontend

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── features/
│   ├── services/
│   ├── types/
│   ├── hooks/
│   └── App.tsx
├── package.json
└── vite.config.js
```

---

## 🧪 Testes

### Backend

```bash
npm run test
npm run test:cov
```

---

## 🧰 Comandos úteis

### Backend (NestJS)

| Comando               | Ação                                     |
|----------------------|------------------------------------------|
| npm run start:dev    | Inicia em modo desenvolvimento (ts-node) |

### Frontend (React)

| Comando           | Ação                               |
|-------------------|------------------------------------|
| npm run dev       | Inicia ambiente de desenvolvimento |

---

## 📌 Funcionalidades

- ✅ Autenticação de usuários (login e cadastro)
- ✅ Criação de novos projetos
- ✅ Visualização de projetos em cards
- ✅ Atualização do status dos projetos
- ✅ Exibição dos projetos em um quadro Kanban
- ✅ Proteção de rotas com autenticação

---

## 📦 Deploy

---

## 🧑‍💻 Autores

- Gabriel Telles

