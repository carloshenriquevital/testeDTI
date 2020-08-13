# Desafio processo seletivo DTI

Neste desafio o objetivo era criar um cadastro de produtos para um sistema de controle de estoque, onde o usuário poderá inserir, editar, excluir e listar os produtos no sistema. Foi exigido neste desafio que o front-end fosse construído utilizando React, mas a tecnologia do back-end era de livre escolha.

Para o back-end foi utilizada a linguagem PHP na versão 7.4, e o banco de dados escolhido foi o Sqlite. Vale salientar que ao colocar este sistema em produção, a tecnologia de bando de dados deverá ser substituída por um servidor de banco de dados, como os SGBDs MySQL ou Postgres. Essa mudança é necessária por o Sqlite funciona apenas de forma local em um arquivo, e para produção é necessário que o banco de dados fique disponível para toda rede.

Para adicionar mais flexibilidade ao sistema e separar melhor as reponsabilidades de execução de consultas ao banco de dados, foi adicionada uma camada de Repository, que faz uma ponte entre os controllers e o ORM Eloquent utilizado pelo Laravel. Isso permite também que uma possível troca de ORM, bastando criar uma nova classe que implementem a interface do repository.

Também foi adicionado uma DTO, que no Laravel é chamado apenas de API Resource, para tratar e filtrar os dados que podem ser retornados para o usuário nas consultas a API. Isso adiciona uma camada de segurança evitando que dados possivelmente sensíveis sejam disponibilizados, além de permitir que caso seja necessário, a API retorne os dados em outro formato além do padrão JSON.

As requests nessa aplicação são validadas antes de chegarem aos controllers garantindo consistência dos dados e permitindo assim que os controllers fiquem responsáveis por receber as requests e enviar as reponses. Isso faz o sistema ficar bem flexível e fácil de estender para mais funcionalidades

O back-end foi construído na forma de uma API REST, e suas rotas são protegidas por autenticação JWT. Para fins de teste foi criada uma rota para o front-end obter um token válido.

### Rotas da API

GET - /products

GET - /products/{id}

POST - /products

PUT - /products/{id}

DELETE - /products/{id}

POST - /login

No front-end foi utilizado React com typescript devido aos benefícios da tipagem de dados, e o gerenciador de pacotes utilizado foi o yarn. A interface construída está bem minimalista e não foi utilizado nenhum framework CSS.
Para gerenciamento de rotas foi utilizado o react router, e para comunicação com a API foi utilizada a biblioteca axios devido sua flexibilidade, confiabilidade e facilidade de uso.

Foram criadas 3 telas, uma de listagem, uma de cadastro de produto e a última de edição de produto. Nessas telas são utilizados componentes comuns entre si, criados com a reutilização de código em mente, dentre os componentes criados, podem ser destacados, Input, CurrencyInput e NumericInput que são para entrada de dados, sendo esses dois últimos com aplicação de filtro para permitir apenas a entrada de números, e o CurrencyInput possui máscara para digitar valores com casa decimal.

Também foi criado o componente PageHeader que é um cabeçalho padrão em todas as páginas, e o ContentHeader que é um subtítulo que identifica as páginas e permite a inserção dos botões de adição e voltar. Também foram criados os componentes ListProducts e ListProductItem que são utilizados na construção da página de listagem de produtos.

## Executar o back-end utilizando Docker
Acessar a pasta ./back

**docker build --pull --rm -f "Dockerfile" -t back:latest "."**

**docker run --rm -d  -p 8000:8000/tcp back:latest**

## Executar o back-end utilizando terminal
Caso tenha php instalado na localmente, basta acessar a parta ./back pelo terminal e executar o seguinte comando.

**php artisan serve**

## Executar o front-end utilizando Docker
Acessar a pasta ./front

**docker build --pull --rm -f "Dockerfile" -t front:latest "."**

**docker run --rm -d  -p 80:80/tcp front:latest**

## Executar o front-end utilizando terminal
**yarn start**

