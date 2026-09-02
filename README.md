# 📦 Sistema Just In Time (JIT) - Produção de MDF

Sistema web desenvolvido para o gerenciamento de produção e controle de estoque Just In Time para indústrias e marcenarias de MDF. O projeto conta com autenticação de usuários, controle completo de produtos, registro de movimentações (entradas/saídas) e alertas em tempo real para estoque mínimo.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5 & CSS3:** Interface responsiva construída do zero (sem frameworks visuais).
- **JavaScript (Vanilla ES6+):** Manipulação de DOM e consumo da API via `fetch`.

### Backend
- **Node.js:** Ambiente de execução.
- **Express:** Framework web para rotas RESTful.
- **Prisma ORM:** Mapeamento objeto-relacional para interação com o banco de dados.

### Banco de Dados & Infraestrutura
- **SGBD:** MySQL 8.0 (ou MariaDB via XAMPP).
- **Ferramentas de Desenvolvimento:** VS Code, Insomnia e Git.

---

## 🗄️ Estrutura do Banco de Dados (`preparacao_db`)

O banco de dados do sistema é composto por 3 tabelas principais:

* **Usuario:** ID, Nome, E-mail, Senha.
* **Produto:** ID, Nome, Custo, Quantidade (Estoque), Estoque Mínimo, Descrição.
* **Producao:** ID, ID Produto, ID Usuário, Tipo (Fabricado/Pedido), Quantidade, Data.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** instalado (v18 ou superior).
- Servidor **MySQL** rodando (ex: via XAMPP/WampServer).

### Passo a Passo

1. **Clonar o Repositório:**
   ```bash
   git clone [https://github.com/toto20zin/just_in_time_01_2026.git](https://github.com/toto20zin/just_in_time_01_2026.git)
   cd seu-repositorio