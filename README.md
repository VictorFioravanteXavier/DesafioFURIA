# DesafioFuria

Este projeto é uma aplicação web construída com Node.js, Express, EJS para as views, e MongoDB como banco de dados. Ele segue uma estrutura MVC (Model-View-Controller) e utiliza Webpack e Babel para gerenciar os assets do frontend.

## Configuração e Instalação

Para configurar e rodar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd DesafioFuria
    ```
2.  **Instale as dependências:**
    Utilizando npm:
    ```bash
    npm install
    ```
    Ou utilizando yarn:
    ```bash
    yarn install
    ```
    Ou utilizando pnpm:
    ```bash
    pnpm install
    ```
3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto com as variáveis de ambiente necessárias (por exemplo, string de conexão do MongoDB, chaves de API, etc.).

    CONNECTIONSTRING = "mongodb://localhost:27017/your-database-name"
    appName="DesafioFuria"
    SECRET_KEY = "your-secret-key"
    GOOGLE_GEMINI_API_KEY = "your-google-gemini-api-key"


## Como Rodar

Existem dois scripts principais definidos no `package.json`:

*   **`npm start`** (ou `yarn start` / `pnpm start`): Inicia o servidor Node.js com `nodemon`, ignorando as pastas `public` e `frontend`. Ideal para desenvolvimento do backend.
*   **`npm run dev`** (ou `yarn dev` / `pnpm dev`): Inicia o `webpack` em modo de observação (`-w`), compilando os assets do frontend automaticamente a cada mudança. Deve ser rodado em paralelo com `npm start` durante o desenvolvimento.

Para rodar a aplicação completa em desenvolvimento, abra dois terminais na raiz do projeto e execute em um:

```bash
npm start
```

Em outro:

```bash
npm run dev
```

## Estrutura do Projeto
A estrutura principal do projeto é organizada da seguinte forma:
```
├── controllers/      # Contém os controladores que lidam com a lógica da requisição e resposta.
├── models/           # Contém os modelos que interagem com o banco de dados (MongoDB).
├── public/           # Arquivos estáticos como CSS, JavaScript compilado, imagens, etc.
│   └── assets/
│       └── js/       # Arquivos JavaScript compilados pelo Webpack.
├── routes.js         # Define as rotas da aplicação e mapeia para os controladores.
├── services/         # Módulos com lógica de negócio específica ou integração com serviços externos.
├── server.js         # Ponto de entrada da aplicação, configura o servidor Express.
├── src/              # Código fonte da aplicação.
│   ├── controllers/
│   ├── middlewares/  # Middlewares do Express.
│   ├── models/
│   ├── services/
│   └── views/        # Arquivos de template EJS para renderização das páginas.
│       └── includes/ # Partes reutilizáveis das views.
├── webpack.config.js # Configuração do Webpack.
├── package.json      # Metadados do projeto e dependências.
├── README.md         # Documentação do projeto.
└── vercel.json       # Configuração para deploy no Vercel (se aplicável).
```

### Tecnologias Principais
Backend: Node.js, Express.js
Frontend: EJS (templates), JavaScript, CSS
Banco de Dados: MongoDB, Mongoose (ODM)
Build Tools: Webpack, Babel
Outras: Axios, Cheerio, bcryptjs, connect-flash, express-session, marked, validator, etc.