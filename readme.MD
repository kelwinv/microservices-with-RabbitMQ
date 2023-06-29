# Microserviço com RabbitMQ 🐇

Este projeto é um exemplo de aplicação de microserviço utilizando RabbitMQ como serviço de fila. Ele foi desenvolvido em TypeScript e consiste em dois microserviços: "payment" 💰 e "ticket" 🎟️. Esses microserviços interagem por meio de eventos e filas, demonstrando um cenário comum em arquiteturas de microsserviços.

## Pré-requisitos 📋

Antes de começar, verifique se você possui os seguintes requisitos instalados em seu ambiente de desenvolvimento:

- Node.js (versão 18.x ou superior) 🚀
- Yarn Package Manager 📦
- RabbitMQ (servidor de fila) 🐇

## Instalação 💻

Siga as etapas abaixo para configurar e executar o projeto em seu ambiente local.

1. Clone o repositório para o seu diretório de preferência:

   ```shell
   git clone https://github.com/kelwinv/microservices-with-RabbitMQ
   ```

2. Acesse o diretório do projeto:

   ```shell
   cd microservices-with-RabbitMQ
   ```

3. Instale as dependências do projeto:

   ```shell
   yarn install
   ```
   
5. Configuração do PostgreSQL:

   - Certifique-se de que o PostgreSQL esteja instalado e em execução no seu ambiente.
   - Verifique se as configurações de conexão com o PostgreSQL estão corretas nos arquivos dentro de `src/repository` dos diretórios `payment` e `ticket`.
   - Por padrão, os servidores estão esperando uma conexão com o PostgreSQL na rota `postgres://postgres:docker@localhost:5432/app`.
   - Certifique-se de substituir `postgres:docker` pelo seu usuário e senha do PostgreSQL,`localhost:5432` pela rota correta do seu servidor e `app` pelo seu banco.

4. Configuração do RabbitMQ:

   - Certifique-se de que o RabbitMQ esteja instalado e em execução no seu ambiente.
   - Verifique se as configurações do RabbitMQ estão corretas nos arquivos `src/infra/queue/RabbitMQAdapter.ts` dos diretórios `payment` e `ticket`.

5. Execute o microserviço de pagamento:

   ```shell
   cd payment
   yarn start
   ```

6. Em outro terminal, execute o microserviço de ingressos:

   ```shell
   cd ticket
   yarn start
   ```

7. Agora, os microserviços estão em execução e prontos para receber e processar eventos por meio da fila.

## Utilização 🚀

Você pode interagir com os microserviços através de APIs REST fornecidas pelos endpoints expostos pelos servidores.

- Microserviço de Ingressos (Ticket):

  - Endpoint: `http://localhost:3333/purchase_ticket`
  - Método: POST
  - Corpo da solicitação:

    ```json
    {
      "eventId": "ID do evento",
      "email": "seu-email@example.com",
      "creditCardToken": "Token do cartão de crédito"
    }
    ```

Certifique-se de substituir "ID do evento", "seu-email@example.com" e "Token do cartão de crédito" pelos valores apropriados ao realizar as solicitações.

## Contribuição 🤝

Contribuições são bem-vindas! Se você deseja contribuir com este projeto, siga as etapas abaixo:

1. Faça um fork do repositório
2. Crie uma branch para a sua contribuição: `git checkout -b minha-contribuicao`
3. Faça as alterações desejadas e faça commit das mes

mas: `git commit -m 'Minha contribuição'`
4. Envie as alterações para o seu fork: `git push origin minha-contribuicao`
5. Abra um pull request no repositório original

## Licença 📄

Este projeto está licenciado sob a [MIT License](LICENSE).