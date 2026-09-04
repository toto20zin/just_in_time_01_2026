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

# ✅ Lista de Verificação por Atividade

## ATIVIDADE 1 – Documentação de Requisitos
| Evidência | Capacidade | Peso | Sim | Não |
|-----------|------------|------|-----|-----|
| Desenvolveu conforme análise de requisitos | C6 | 2 | ✅ |  |
| Modelo de requisitos funcionais mínimos | C6 | 2 | ✅ |  |

## ATIVIDADE 2 – DER
| Evidência | Capacidade | Peso | Sim | Não |
|-----------|------------|------|-----|-----|
| Chaves estrangeiras conforme modelagem | C4 | 2 | ✅ |  |
| Relações 1:N entre tabelas | C4 | 2 | ✅ |  |
| Tipos definidos corretamente (DATE, INT, etc.) | C4 | 2 | ✅ |  |
| Entidades Usuário, Produto e Produção | C4 | 1 | ✅ |  |

## ATIVIDADE 3 – Script Banco de Dados
| Evidência | Capacidade | Peso | Sim | Não |
|-----------|------------|------|-----|-----|
| Criou banco com nome especificado | C4 | 1 | ✅ |  |
| Criou todas as tabelas com chaves estrangeiras | C4 | 2 | ✅ |  |
| Inseriu registros de teste | C4 | 2 | ✅ |  |

## ATIVIDADE 4 – Interface Autenticação de Usuário
| Evidência | Capacidade | Peso | Sim | Não |
|-----------|------------|------|-----|-----|
| Criou sessão/localStorage para usuário autenticado | C7 | 2 | ✅ |  |
| Redireciona para interface principal após login | C7 | 3 | ✅ |  |
| Campos de login, senha e botão entrar | C7 | 2 | ✅ |  |
| Tratamento de falha de autenticação | C7 | 3 | ✅ |  |

## ATIVIDADE 5 – Interface Principal
| Evidência | Capacidade | Peso | Sim | Não |
|-----------|------------|------|-----|-----|
| Acesso ao cadastro de produto | C7 | 1 | ✅ |  |
| Acesso à gestão de produção | C7 | 1 | ✅ |  |
| Logout redireciona para login | C7 | 1 | ✅ |  |
| Exibe nome do usuário autenticado | C7 | 2 | ✅ |  |

## ATIVIDADE 6 – Interface Cadastro de Produto
| Evidência | Capacidade | Peso | Sim | Não |
|-----------|------------|------|-----|-----|
| Lista produtos ao carregar | C7 | 2 | ✅ |  |
| Inserção de novo produto | C7 | 2 | ✅ |  |
| Edição de produto existente | C7 | 3 | ✅ |  |
| Exclusão de produto existente | C7 | 2 | ✅ |  |
| Validação de dados | C7 | 3 | ✅ |  |
| Retorno à interface principal | C7 | 1 | ✅ |  |
| Campo de busca funcional | C7 | 3 | ✅ |  |

## ATIVIDADE 7 – Interface Gestão de Produção (Just in Time)
| Evidência | Capacidade | Peso | Sim | Não |
|-----------|------------|------|-----|-----|
| Seleção de produto e tipo (entrada/saída) | C7 | 2 | ✅ |  |
| Inserção de dados de transferência | C7 | 3 | ✅ |  |
| Lista em ordem alfabética | C7 | 3 |  | ❌ |
| Alerta de estoque mínimo | C7 | 3 | ✅ |  |

## ATIVIDADE 8 – Casos de Testes
| Evidência | Capacidade | Peso | Sim | Não |
|-----------|------------|------|-----|-----|
| Ferramentas e ambiente de testes descritos | C8 | 2 | ✅ |  |
| Casos de teste por requisito funcional | C8 | 2 | ✅ |  |
| Testes executados conforme casos | C8 | 2 | ✅ |  |

## ATIVIDADE 9 – Documentação de Infraestrutura
| Evidência | Capacidade | Peso | Sim | Não |
|-----------|------------|------|-----|-----|
| Linguagem e versão identificadas | C1 | 1 | ✅ |  |
| SGBD e versão identificados | C1 | 1 | ✅ |  |
| Sistema operacional e versão identificados | C1 | 1 | ✅ |  |

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** instalado (v18 ou superior).
- Servidor **MySQL** rodando (ex: via XAMPP/WampServer).

### Passo a Passo

1. **Clonar o Repositório:**
   ```bash
   git clone [https://github.com/toto20zin/just_in_time_01_2026.git](https://github.com/toto20zin/just_in_time_01_2026.git)
   