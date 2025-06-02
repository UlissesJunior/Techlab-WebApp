
<h1  align="center">
💲<br>Tech4Humans Finance - WebApp para gestão financeira
</h1>

Bem-vindo ao repositório do projeto *Tech4Humans Finance*, um webApp desenvolvido para gerenciar finanças pessoais. Este projeto é parte de um teste técnico para uma vaga como desenvolvedor na Tech4Humans.

<p  align="center">
	<img  src="./public/AuthSplashLogo.png"> 
<p>

---

## Sumário

1. [Introdução e Visão Geral](#introdução-e-visão-geral)

2. [Tecnologias e Dependências Utilizadas](#tecnologias-e-dependências-utilizadas)

3. [Estrutura do Projeto](#estrutura-do-projeto)

4. [Como Executar o Projeto](#como-executar-o-projeto)

5. [Agradecimentos](#agradecimentos)

---

## Introdução e Visão Geral

Este projeto foi desenvolvido como parte de um desafio técnico para avaliar conhecimentos em React JS, Tailwind CSS, Node JS, TypeORM e SQL. O objetivo principal é permitir o cadastro de contas bancárias e o registro de transações financeiras entre essas contas.

O *Tech4Humans Finance* oferece as seguintes funcionalidades principais:

*  **Criação de conta no sistema:** Usuário se cadastra no sistema com nome, email e senha. Depois tem a oportunidade de fazer o upload de uma imagem de perfil e por fim a criação da primeira conta bancária.

*  **Registro e Gerenciamento de Transações Financeiras:** Registro de transações (débito, crédito, transferência), com detalhes como Tipo, Contas Envolvidas, Valor, Descrição e Data.

*  **Visualização dos dados em lista ou dashboard:** O usuário tem a navegação fácil e intuitiva em todo o sistema, pois os conceitos de UI/UX foram aplicados. 

Além de cumprir os requisitos funcionais mínimos, este projeto buscou aplicar as melhores práticas em:

*  **Orientação a Objetos:** Na estrutura dos services e controllers.

*  **Clean Code:** Para garantir legibilidade, manutenção e organização do código.

*  **Testes Unitários:** Para assegurar a qualidade de dialogs que contenham regras de negócio
 
## Tecnologias e Dependências Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias e bibliotecas:  

*  **Next JS:** Considerando que um sistema financeiro real é um produto que precisa ser vendido, um SEO bom no front faz toda a diferença, isso e a estruturação fácil do Next, me fez preferir ele como biblioteca principal para o React.

*  **Tailwind CSS:** Era a biblioteca requerida no teste e também a minha favorita no desenvolvimento frontend, atualmente é a mais populares para o desenvolvimento e a versão 4 trouxe novidades excelentes.
  
*  **Jest:** Para a implementação de testes unitários nos dialogs que contenham regra de negócio.

* **Axios:** Cliente HTTP baseado em Promises para fazer requisições à API do backend. 

* **Highcharts:** Bibliotecas robustas para criação de gráficos e visualização de dados, essenciais para apresentar informações financeiras de forma clara e intuitiva. Já utilizava diariamente na minha experiência trabalhista e voltar a lidar com essa biblioteca foi muito bom.

* **react-toastify:** Bibliotecas para exibição de toasters ao usuário, proporcionando uma experiência interativa e informando sobre o sucesso ou falha das operações.

## **Estrutura do Projeto**

A estrutura do projeto tem a seguinte estrutura (a partir do src):
```
src/
├─ __tests__/
│  ├─ AccountDialog.jest.tsx
│  ├─ FilterDialog.jest.tsx
│  └─ TransactionDialog.jest.tsx
├─ app/
│  ├─ (app)/
│  │  ├─ dashboard/
│  │  │  └─ page.tsx
│  │  ├─ transactions/
│  │  │  └─ page.tsx
│  │  └─ layout.tsx
│  ├─ (auth)/
│  │  ├─ login/
│  │  │  └─ page.tsx
│  │  ├─ signup/
│  │  │  └─ page.tsx
│  │  └─ layout.tsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ Layout/
│  │  ├─ Dashboard/
│  │  │  ├─ AccountList/
│  │  │  │  └─ AccountList.tsx
│  │  │  ├─ Charts/
│  │  │  │  └─ BarChart.tsx
│  │  │  └─ Transactions/
│  │  │     ├─ TransactionsItem.tsx
│  │  │     └─ TransactionsList.tsx
│  │  └─ Navbar/
│  │     ├─ Avatar.tsx
│  │     ├─ Navbar.tsx
│  │     ├─ NavbarLinks.tsx
│  │     ├─ NavbarLogo.tsx
│  │     └─ ThemeToggle.tsx
│  └─ UI/
│     ├─ ApplyFiltersButton.tsx
│     ├─ BalanceCard.tsx
│     ├─ DateRangerPicker.tsx
│     ├─ DialogButton.tsx
│     ├─ DialogInput.tsx
│     ├─ DialogSelect.tsx
│     ├─ ImageUpload.tsx
│     └─ OperationsButton.tsx
├─ contexts/
│  ├─ AccountsContext.tsx
│  ├─ AuthContext.tsx
│  ├─ ProtectedRoutesContext.tsx
│  └─ TransactionsContext.tsx
├─ controllers/
│  ├─ AccountController.ts
│  ├─ AuthController.ts
│  ├─ TransactionController.ts
│  └─ UserController.ts
├─ dialogs/
│  ├─ AccountDialog.tsx
│  ├─ FilterDialog.tsx
│  └─ TransactionDialog.tsx
├─ hooks/
│  ├─ use-mobile.ts
│  └─ useLockBodyScroll.ts
├─ lib/
│  ├─ banksUtils.tsx
│  ├─ transactionDialogUtils.ts
│  ├─ transactionsPageUtils.ts
│  └─ utils.ts
├─ models/
│  ├─ account.ts
│  ├─ transaction.ts
│  └─ user.ts
└─ services/
   ├─ AccountService.ts
   ├─ ApiService.ts
   ├─ AuthService.ts
   ├─ TransactionService.ts
   └─ UserService.ts

```

## **Como Executar o Projeto**

Para executar este projeto em seu ambiente de desenvolvimento local, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

* Node.js (versão LTS recomendada)

* npm

* Git

### 1. Clone o Repositório

Abra seu terminal ou prompt de comando e execute:

```bash

git clone github.com/UlissesJunior/Techlab-WebApp

cd Techlab-WebApp

```

### 2. Configuração e Execução

Execute o comando a seguir para instalar as dependências necessárias.

```bash

npm install

```

Para iniciar a aplicação React:

```bash

npm run dev

```

A aplicação estará disponível em `http://localhost:3000`.

Antes de executar qualquer ação no front, verifique como iniciar o servidor do backend no [LINK](https://github.com/UlissesJunior/Techlab-WebApp-Backend/blob/main/README.md).Certifique-se de que o backend esteja rodando antes de iniciar o frontend, pois a aplicação web depende da API para carregar e gerenciar os dados.


## Agradecimentos

Gostaria de agradecer a Tech4Humans e o CEU pela oportunidade de participar do processo seletivo, em especial a Ludimilla e o Allan pelas ótimas dicas durante a mentoria. A experiência foi muito positiva, e espero ter a chance de colaborar com vocês em breve na Tech4Humans! 😊