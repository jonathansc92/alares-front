## Descrição

Front desenvolvido em React, utilizando o framework NEXTJS.

## Decisão da arquitetura utilizada

Neste projeto a ideia era separar as responsabilidades.
Na pasta src temos algumas estruturas de pastas.
- **admin**: Pasta onde estão os arquivos das páginas administradoras;
- **api**: Pasta onde ficam as chamadas para nossa api externa;
- **components**: Pasta onde estão criado nossos componentes, temos apenas um nesse projeto.

## Lista de bibliotecas de terceiros utilizadas

- primereact; 
- tailwind;

## Quais requisitos obrigatórios que não foram entregues

Neste repositório foram entregues todos os requisitos.

## O que faria se tivesse mais tempo?

- Separaria melhor os arquivos os tornando menores;
- Utilizaria gerenciamento de estado com Redux.

## Como executar o projeto
- Renomear o arquivo .env.local.example para .env.local;
- Execute o comando: 
```
    docker-compose up -d
```

## Rotas
- Página de Planos GET [http://localhost:3000/](http://localhost:3000/)
- Página Administradora de Planos [http://localhost:3000/admin/plans](http://localhost:3000/admin/plans)
- Página Administradora de Pedidos [http://localhost:3000/admin/orders](http://localhost:3000/admin/orders)

## Autor
- Autor - Jonathan Cruz
- [https://jonathansc92.github.io/jonathancruzdev/?language=ptBr](https://jonathansc92.github.io/jonathancruzdev/?language=ptBr)


