# calli-v2

# Calli

O Calli é uma aplicação web fullstack de alta performance desenvolvida para ajudar atletas e entusiastas da calistenia e musculação a organizar as suas rotinas de treino, gerir exercícios personalizados e acompanhar o seu progresso em tempo real.

# Funcionalidades Práticas

Autenticação Segura: Registo e início de sessão robustos geridos por NextAuth com encriptação de palavras-passe via bcryptjs.

Rotinas Personalizadas: Criação, seleção e eliminação de listas de treinos semanais ou temáticas (ex: "Sexta-feira", "Treino de Costas").

Gestão Dinâmica de Exercícios: Adição de exercícios específicos a cada lista, definindo o tipo de medição (repetições ou minutos) e a quantidade alvo.

Controlo de Progresso Activo: Possibilidade de marcar exercícios como concluídos de forma persistente no banco de dados.

Estatísticas de Evolução: Painel analítico que calcula de forma dinâmica a percentagem total de progresso do atleta baseado nos treinos agendados e finalizados.

Catálogo de Exercícios Integrado: Base de conhecimento categorizada (Peitoral, Costas, Pernas, Cardio) com descrições detalhadas de cada movimento.

Design Moderno e Responsivo: Interface escura e futurista adaptada a todos os dispositivos usando Tailwind CSS v4 e com a identidade visual verde-limão (#b3ff38) personalizada da marca Calli.

# Tecnologias Utilizadas

Framework: Next.js (v15+) (App Router & React Server Components)

Linguagem: TypeScript

Base de Dados: PostgreSQL

ORM / Conectividade: Prisma (com suporte nativo a Pool de ligações)

Autenticação: NextAuth.js

Estilização: Tailwind CSS (v4)

Ícones: Lucide React

# Principais Páginas da Aplicação

# 1. Home (/)

Página de entrada com o logótipo oficial do Calli, uma breve introdução aos objetivos do sistema e um botão de chamada de atenção (Call-to-Action) que direciona o utilizador diretamente para a sua zona de treinos.

# 2. Zona de Treinos (/treinos?listId=...)

A página central de operações. Possui uma barra lateral com todas as listas de treino criadas pelo utilizador. No painel principal, exibe o treino selecionado, um formulário de adição rápida de novos exercícios (integrado com a base estática de dados) e a lista de exercícios pendentes e finalizados.
Nota técnica: Esta página tira partido dos searchParams assíncronos integrados com o Next.js 15.

# 3. Evolução (/evolucao)

Um painel intuitivo que lê as informações gravadas na base de dados para o utilizador autenticado e apresenta:

Percentagem de conclusão de objetivos.

Número total de listas de treino registadas.

Quantidade total de exercícios planeados.

Quantidade de exercícios finalizados.

# 4. Catálogo de Exercícios (/catalogo)

Biblioteca com suporte visual que lista diferentes categorias musculares e os exercícios recomendados correspondentes, fornecendo instruções curtas e diretas sobre como realizar a atividade física de forma segura.

# 5. Login e Registo (/login e /cadastro)

Formulários esteticamente minimalistas e seguros que impedem o acesso de utilizadores não identificados às páginas privadas e realizam as validações de dados necessárias.

# Como Rodar e Testar o Projeto Localmente

Siga o passo a passo abaixo para ter a aplicação a funcionar na sua máquina de desenvolvimento.

# Pré-requisitos

Node.js instalado (Versão 18.x ou superior recomendada).

Uma instância ativa do banco de dados PostgreSQL instalada localmente ou na nuvem.

# 1. Clonar o Repositório

```bash
git clone [https://github.com/seu-utilizador/calli-fitness.git](https://github.com/seu-utilizador/calli-fitness.git)
cd calli-fitness
```

# 2. Instalar as Dependências

```bash
npm install
```

# 3. Configurar as Variáveis de Ambiente

Modifique o arquivo chamado .env na raiz do projeto e preencha-o com as suas credenciais locais:

```bash
DATABASE_URL="postgresql://postgres:SUA_SENHA_AQUI@localhost:5432/calli_db?schema=public"
NEXTAUTH_SECRET="chave_super_secreta_calli_2026_fitness"
NEXTAUTH_URL="http://localhost:3000"
```

# 4. Sincronizar o Banco de Dados e Gerar o Cliente Prisma

Execute o comando de sincronização para criar as tabelas estruturais automaticamente no seu PostgreSQL e gerar o Prisma Client tipado em TypeScript:

```bash
npx prisma db push
npx prisma generate
```

# 5. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

Abra o seu navegador e aceda a http://localhost:3000.

# 6. Explorar os dados graficamente (Prisma Studio)

Caso pretenda visualizar, alterar, criar ou apagar registos diretamente no banco de dados através de uma interface web, abra outro terminal e execute:

```bash
npx prisma studio
```

Acesse http://localhost:5555.

# Mapeamento da API e Server Actions

# Endpoints Autenticados (Sessão / Cookies)

A comunicação e validação de tokens JWT da sessão é realizada de forma silenciosa e segura através do router NextAuth nas seguintes rotas:


| `POST/api/auth/signin` | Envia as credenciais inseridas na página de login para autenticação |

| `POST/api/auth/signout` | Encerra a sessão ativa limpando os cookies seguros no browser |

| `GET/api/auth/session` | Retorna os dados do utilizador ativo (User ID, e-mail e nome) |
