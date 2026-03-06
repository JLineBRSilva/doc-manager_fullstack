# 📄 Doc Manager

API para manipular documentos, e interface web para gerenciamento visual dos mesmos.

## 📥 BAIXAR E TESTAR

1. Instale o [Node.js](https://nodejs.org/en/) na máquina

2. O [Git](https://git-scm.com) é _opcional_ de se ter instalado na máquina. O projeto também pode ser baixado diretamente como `.zip`

3. Tenha o [PostgreSQL](https://www.postgresql.org/download/) instalado

4. Entre no diretório `backend` e instale as dependências do projeto.

    ```bash
    npm install
    ```

5. Execute a última _migration_ para criar a estrutura da tabela no seu banco de dados

    ```bash
    npm run prisma-generate
    ```

6. Rode o servidor
    
    ```bash
    npm run server
    ```

7. Com outro terminal aberto, entre na pasta `frontend` e instale as dependências
    
    ```bash
    npm install
    ```

8. Para rodar a parte da interface

    ```bash
    npm run dev
    ```

9. Entre no link a seguir para abrir a página no navegador:

    ```bash
    http://localhost:3000
    ```

10. Agora o projeto poderá ser testado!


## ⚒️ 🌟 TECNOLOGIAS & FERRAMENTAS USADAS

### WEB
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [CSS](https://www.w3.org/Style/CSS/)

### BACK-END
- [Node.js](https://nodejs.org/en/)
- [Fastify](https://fastify.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/docs/prisma-orm/quickstart/postgresql)
- [Cors](https://www.npmjs.com/package/@fastify/cors)
- [PostgreSQL](https://www.postgresql.org/)
- [Postman](https://www.postman.com/)