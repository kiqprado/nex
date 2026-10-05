# Nex

Aplicação web para registrar corridas, caminhadas e trilhas com geolocalização, mapas e métricas de treino.

Desenvolvida com **Next.js**, **React**, **TypeScript**, **Tailwind CSS** e **MapLibre**.

## Estado do projeto

🚧 **Em desenvolvimento**

A aplicação utiliza uma API externa para cadastro de usuários, registro de atividades e consulta de percursos.

A integração de autenticação e perfil está em evolução. Alguns recursos possuem interface demonstrativa ou implementação parcial, e os fluxos completos ainda precisam ser validados antes do uso em produção.

## Executar localmente

### Requisitos

- Node.js e npm em versões compatíveis com o projeto.
- Backend configurado e disponível separadamente.

### Instalação

1. Instale as dependências:

   ```sh
   npm ci
   ```

2. Crie um arquivo `.env.local` na raiz do projeto:

   ```dotenv
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

   Substitua o endereço pela URL base do seu backend. Inclua o protocolo e, quando necessário, o prefixo da API, sem adicionar rotas de recursos ou barra final.

3. Inicie o backend e execute o frontend:

   ```sh
   npm run dev
   ```

4. Abra [http://localhost:3000](http://localhost:3000).

> Para registrar um treino, permita o acesso à localização quando solicitado pelo navegador.

## Integração e ambiente

Este repositório contém apenas o frontend. O backend é responsável pela persistência dos dados, pelo gerenciamento da sessão e pela autorização das operações.

Quando frontend e API estiverem em origens diferentes, configure o backend para permitir a comunicação com a aplicação e o envio das credenciais necessárias.

### Configuração da API

| Variável | Finalidade |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | URL base da API utilizada pelo frontend |

> **Configuração pública:** variáveis com o prefixo `NEXT_PUBLIC_` ficam acessíveis no navegador. Não inclua senhas, tokens ou outros segredos nesses valores.

Após alterar a configuração local, reinicie o servidor de desenvolvimento. Em produção, defina a URL da API antes de gerar o build e gere uma nova versão ao modificá-la.

Mantenha os arquivos de configuração local fora do controle de versão.

### Localização e mapas

O registro de treinos depende da geolocalização do navegador. A exibição dos mapas utiliza um serviço externo.

Ao acessar por outro dispositivo, configure um endereço de API acessível por ele. `localhost` se refere ao próprio dispositivo.

## Comandos

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Iniciar o ambiente de desenvolvimento |
| `npm run lint` | Executar a análise estática |
| `npm run build` | Gerar o build de produção |
| `npm start` | Executar o build de produção |
