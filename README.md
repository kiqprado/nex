# Nex

Aplicação Next.js para registrar e consultar atividades físicas.

## Estado atual e autenticação

O projeto está em desenvolvimento. O frontend possui fluxo de treino com geolocalização, mapa e métricas, além de integração com uma API externa para salvar e consultar atividades. O backend deve ser executado separadamente.

As telas de autenticação e senha estão implementadas **somente na camada visual**. Ainda não há autenticação, criação de contas, envio ou verificação de códigos, alteração de senha, gerenciamento de sessão ou proteção de rotas.

| Rota | Interface disponível |
| --- | --- |
| `/` | Login com usuário e senha; links para cadastro e recuperação. |
| `/register` | Cadastro com e-mail ou telefone, senha e confirmação. |
| `/forgot-password` | Solicitação de recuperação por e-mail ou telefone. |
| `/reset-password` | Nova senha e confirmação. |

As interfaces compartilham tema escuro, tipografia Orbitron, campos com bordas verdes e sombras violetas e botões com destaque neon. Os requisitos de senha exibidos são orientações visuais; ainda não são validados pela aplicação.

O componente de verificação de código de seis dígitos está criado, mas ainda não está conectado às páginas. O fluxo entre envio, verificação e redefinição permanece pendente.

Para explorar as atividades, acesse `/feed` ou `/workout` diretamente após configurar o ambiente. O botão Entrar ainda não autentica nem redireciona para essas páginas. Utilize somente dados fictícios nos formulários do protótipo: a submissão HTML nativa ainda não foi substituída por um tratamento da aplicação.

## Preparar o ambiente

1. Instale as dependências com `npm install`.
2. Crie ou edite `.env.local` na raiz do projeto, ao lado de `package.json`:

   ```dotenv
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

   A porta acima é um exemplo: use o endereço do seu backend. Inclua o protocolo (`http://` ou `https://`), sem `/` no final e sem o endpoint `/activities`. Se a API tiver um prefixo, inclua-o na base, por exemplo: `http://localhost:8080/api`.

3. Inicie o backend separadamente. Este repositório inicia apenas o frontend.
4. Execute `npm run dev` e abra [localhost:3000](http://localhost:3000).

Após alterar a variável, reinicie o servidor de desenvolvimento. Os arquivos `.env*` são ignorados pelo Git; cada pessoa deve configurar seu ambiente local.

## Configuração centralizada

O arquivo [app/config/api.ts](app/config/api.ts) centraliza a leitura da URL:

```ts
const API_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined")
}

export { API_URL }
```

A validação acontece quando o módulo é carregado. Uma variável ausente ou vazia gera o erro acima, evitando chamadas com uma base indefinida. Atualmente, a configuração não valida o formato da URL nem remove barras finais.

O Next.js carrega os arquivos de ambiente automaticamente, sem instalar `dotenv` ou alterar `next.config.ts`. O prefixo `NEXT_PUBLIC_` disponibiliza o valor no navegador, onde as chamadas atuais são executadas. Esse valor é público: não inclua senhas, tokens ou outras credenciais na URL.

A base centralizada permite trocar o backend por ambiente sem editar os serviços. Para novas chamadas, importe `API_URL` e acrescente somente o caminho do endpoint:

```ts
import { API_URL } from "@/app/config/api"

const response = await fetch(`${API_URL}/activities`)

if (!response.ok) {
  throw new Error(`Failed to fetch activities: ${response.status}`)
}

const activities = await response.json()
```

Mantenha as chamadas nos serviços e reutilize essas funções nas páginas e componentes, evitando repetir endereços ou leituras de `process.env`.

## Uso nos serviços de atividades

| Serviço | Requisição | Comportamento |
| --- | --- | --- |
| [GetActivities](app/services/activities/get-activities.tsx) | `GET ${API_URL}/activities` | Lista as atividades exibidas no feed. |
| [GetActivityById](app/services/activities/get-activity-by-id.tsx) | `GET ${API_URL}/activities/${activityId}` | Busca os detalhes; lança erro em caso de HTTP 404. |
| [CreateActivity](app/services/activities/create-activity.tsx) | `POST ${API_URL}/activities` | Converte a atividade com `CreateActivityPayload` e envia JSON. |

Os serviços lançam erro para respostas HTTP sem sucesso, incluindo HTTP 404. Na página de detalhes, a falha é registrada no console e a ausência de dados resulta na mensagem de atividade não encontrada.

## Configuração por ambiente

| Ambiente | Onde definir `NEXT_PUBLIC_API_URL` |
| --- | --- |
| Desenvolvimento | Em `.env.local`, com o endereço do backend local. |
| Homologação/preview | No ambiente de build do deploy, com a URL da API de homologação. |
| Produção | No ambiente de build do deploy, com a URL pública HTTPS da API de produção. |

As variáveis `NEXT_PUBLIC_*` são incorporadas ao JavaScript durante `npm run build`. Defina a URL antes do build. Para alterá-la em uma aplicação publicada, gere um novo build e faça outro deploy; mudar a variável apenas ao executar `npm run start` não atualiza a URL incorporada no navegador. Isso também vale ao reutilizar uma imagem Docker entre ambientes.

Para executar uma versão de produção localmente, configure a variável e execute:

```bash
npm run build
npm run start
```

O Next.js procura cada variável nesta ordem e usa o primeiro valor encontrado:

1. Variáveis já definidas no processo (terminal, CI ou plataforma de deploy).
2. `.env.$NODE_ENV.local`.
3. `.env.local` (exceto em testes).
4. `.env.$NODE_ENV`.
5. `.env`.

`npm run dev` usa `development`; build e execução de produção usam `production`. Para homologação, use as variáveis do deploy com `NODE_ENV=production`, sem criar um valor `staging` para `NODE_ENV`. Em testes com `NODE_ENV=test`, `.env.local` não é carregado.

## Verificar a integração

Abra `/feed` e confira, na aba **Network/Rede** das ferramentas do navegador, se a requisição para `/activities` usa a base configurada. Abra os detalhes de uma atividade existente para verificar `/activities/{id}`.

| Sintoma | O que conferir |
| --- | --- |
| `NEXT_PUBLIC_API_URL is not defined` | Confira o nome e o valor da variável e se `.env.local` está na raiz. Reinicie o desenvolvimento ou refaça o build do deploy. |
| URL antiga nas requisições | Confira a prioridade das variáveis e se houve um novo build após a alteração. |
| `Failed to fetch` ou conexão recusada | Confirme que o backend está ativo e acessível a partir do navegador. |
| Bloqueio por CORS | Configure o backend para permitir a origem do frontend, incluindo protocolo e porta, como `http://localhost:3000`. |
| Bloqueio por conteúdo misto | Em um frontend HTTPS, use uma API HTTPS. |
| HTTP 404 inesperado | Confira a base, possíveis prefixos como `/api` e as rotas disponíveis no backend. |

Ao acessar pelo celular ou por outro computador, `localhost` aponta para esse dispositivo. Configure uma URL da API acessível por ele, como o IP do computador na rede, e confira a exposição da porta e as origens permitidas no backend.

Referência utilizada: guia da versão instalada do Next.js em `node_modules/next/dist/docs/01-app/02-guides/environment-variables.md`.
