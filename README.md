# Leitor de CSV

Este projeto é composto de microsserviços responsáveis por ler e salvar no banco de dados as informações de um CSV. O documento modelo utilizado é o de funcionários.

## Requisitos

- [Docker](https://docs.nestjs.com/) 
- [Docker compose](https://docs.docker.com/compose/)


## Instalação e uso

Abra um terminal e rode o seguinte comando:

```
  docker-compose up --build
```

O comando iniciará os três microsserviços de uma vez.

## Documentação

A documentação dos microsserviços está disponível em [swagger](https://swagger.io/). E pode ser acessada pela URL /api.

```shell
  localhost:3000/api
```
> Documentação do serviço auth (responsável pela criação e autenticação de usuários)

```shell
  localhost:3001/api
```
>  Documentação do serviço file-service (responsável por ler o CSV)

```shell
  localhost:3002/api
```
> Documentação do serviço mock (responsável por tratar e inserir os dados do CSV no banco)


## Criação de um usuário

Todas as rotas necessitam de autenticação. Para a criação de um usuário basta utilizar a seguinte rota:

```curl
curl -X POST http://localhost:3000/user
   -H 'Content-Type: application/json'
   -d '{"username":"joaosilva", "name":"João Silva", "password":"123Mudar"}'
```

Em seguida, faça o login utilizando o usuário criado anteriormente:

```curl
curl -X POST http://localhost:3000/auth/login
   -H 'Content-Type: application/json'
   -d '{"username":"joaosilva", "password":"123Mudar"}'
```

A rota retornará o JWT token que poderá ser utilizado nas demais requisições:

```json
{
	"access_token": "eyJhbGciOiJIU..."
}
```

Você pode passar o token de acesso nas requisições pelo próprio swagger ou passá-lo no header (caso esteja utilizando outro testador de API como Insomnia ou Postman) com:

```curl
curl -X GET http://localhost:3000/auth/profile
   -H 'Content-Type: application/json'
   -H 'Authorization: Bearer eyJhbGciOiJIU...'
```

## Upload de arquivo

Você pode subir um arquivo utilizando 

```curl
curl -X POST http://localhost:3001/files/upload
   -H 'Content-Type: multipart/form-data'
   -H 'Authorization: Bearer eyJhbGciOiJIU...'
   -F 'file'
```

Exemplo de retorno de sucesso:

```json
{
	"error": false,
	"statusCode": 200,
	"message": "File sent to mock (employees) service",
	"data": [],
	"errorsArray": []
}
```

### Para recuperar os dados que foram processados, basta utilizar o microsserviço responsável

> O CSV de exemplo insere funcionários, então as rotas são /employees

```curl
curl -X GET http://localhost:3002/employees
   -H 'Content-Type: application/json'
   -H 'Authorization: Bearer eyJhbGciOiJIU...'
```

### Recuperar um funcionário por ID

```curl
curl -X GET http://localhost:3002/employees/{id}
   -H 'Content-Type: application/json'
   -H 'Authorization: Bearer eyJhbGciOiJIU...'
```

### Inserir um novo funcionário (manualmente, sem arquivo)

```curl
curl -X POST http://localhost:3002/employees
   -H 'Content-Type: application/json'
   -H 'Authorization: Bearer eyJhbGciOiJIU...'
   -d '{"name": "string", "age": 0, "department": "string", "role": "string", "hiringDate": "2024-04-27T21:00:02.078Z", "salary": 0}'
```

### Atualizar funcionário existente

```curl
curl -X PATCH http://localhost:3002/employees/{id}
   -H 'Content-Type: application/json'
   -H 'Authorization: Bearer eyJhbGciOiJIU...'
   -d '{"name": "string", "age": 0, "department": "string", "role": "string", "hiringDate": "2024-04-27T21:00:02.078Z", "salary": 0}'
```

### Deletar um funcionário por ID

```curl
curl -X DELETE http://localhost:3002/employees/{id}
   -H 'Content-Type: application/json'
   -H 'Authorization: Bearer eyJhbGciOiJIU...'
```

## Notas e referências

Este projeto utiliza as seguintes ferramentas:

- [NestJS](https://docs.nestjs.com/)
- [Docker](https://docs.nestjs.com/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [Node](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org/)
