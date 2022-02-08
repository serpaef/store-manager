# store-manager

Projeto desenvolvido durante o módulo de back-end do curso de desenvolvimento web da Trybe.
A API trata-se de um sistema de gerenciamento de vendas construido em NodeJs, onde será possível criar, visualizar, deletar e atualizar produtos e vendas.

## Como executar o projeto?

Primeiro, instale as dependências do node:

`npm i`

Para rodar o servidor em modo debug, execute o seguinte comando na pasta raiz da API:

`npm run debug`

Por se tratar de um projeto de estudos, não é aconselhado seu uso em produção.

### Conexão com o Banco:

**⚠️ IMPORTANTE! ⚠️**

Para a API funcionar corretamente, na raiz do projeto crie um arquivo `.env` com as variáveis de ambiente. Por exemplo, caso o seu usuário SQL seja `nome` e a senha `1234` seu arquivo ficará desta forma:

```
MYSQL_HOST=localhost
MYSQL_USER=nome
MYSQL_PASSWORD=1234
PORT=3000
```

### Tabelas

Na raiz do repositório existe o arquivo `StoreManager.sql` que é o banco de dados base dessa API. Você pode importá-lo localmente para testar o comportamento da aplicação.

O banco terá três tabelas: `products`, `sales` e `sales_products`.

A tabela `sales_products`, é a tabela que faz o relacionamento `N:N` entre `products` e `sales`.

---

## Como a api funciona?

Sendo uma API HTTP, ela funciona com requisições com verbos padrão HTTP. Os endpoints disponíveis são:

### Para os produtos:

#### POST

`/products`

Esse endpoint salva um produto enviado na tabela "products" no banco de dados.

O endpoint deve receber a seguinte estrutura no corpo da requisição:

```
{
  "name": "product_name",
  "quantity": 10
}
```

#### GET

`/products` >>> Esse endpoint retorna todos os produtos cadastrados no banco de dados.

`/products/1` >>> Esse endpoint retorna o produto de id 1 do banco de dados.

#### PUT

`/products/2`

Esse endpoint atualiza os dados do produto de id 2 do banco de dados.
O corpo da requisição deve seguir o mesmo modelo da estrutura de criação:

```
{
  "name": "product_name",
  "quantity": 10
}
```

#### DELETE

`/products/2` >>>Esse endpoint deleta o produto de id 2 do banco de dados.

### Vendas

#### POST

`/sales`

Esse endpoint armazena a venda nas tabelas `sales` e `sales_products` do bando de dados.

O endpoint deve receber a seguinte estrutura no corpo da requisição:

```
[
  {
    "product_id": "product_id",
    "quantity": "product_quantity",
  }
]
```

É possível cadastrar várias vendas, sendo necessário apenas inserir mais itens com a mesma estrutura no array.

#### GET 

`/sales` >>> Esse endpoint retorna todas as vendas cadastradas no banco de dados.

`/sales/1` >>> Esse endpoint retorna a venda de id 1 do banco de dados.

#### PUT

`/sales/2`

Esse endpoint atualiza os dados da venda de id 2 do banco de dados.
O corpo da requisição deve seguir o mesmo modelo da estrutura de criação:

```
[
  {
    "product_id": "product_id",
    "quantity": "product_quantity",
  }
]
```

#### DELETE

`/sales/2` >>>Esse endpoint deleta a venda de id 2 do banco de dados.
