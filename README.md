# Kandimons

Versão rosa do Rolimons, renomeada para **Kandimons**, com a logo K e as referências ao Roblox trocadas por Project Kandi.

## Rodar

```bash
npm start        # http://localhost:3000  (PORT=8080 npm start para mudar a porta)
```

Precisa só do Node 16+, sem `npm install`. Sem Node (ex.: Termux): `python server.py` (porta opcional: `python server.py 8080`). Também funciona em qualquer hospedagem estática para o visual (a busca precisa do servidor Node).

## Estrutura

```
public/            site (HTML, css/style.css, js/*.js, images/)
server/index.js    servidor Node (estático + rota /api/*)
server.py          o mesmo servidor em Python
server/mock-api.js dados de demonstração (itens, jogadores, grupos, jogos)
```

## API de demonstração

| Rota | Retorno |
|------|---------|
| `GET /api/items/v3/itemdetails` | itens e bundles |
| `GET /api/itemthumbs/v2/thumbssm` | miniaturas |
| `GET /api/players/v1/playersearch?searchstring=` | jogadores |
| `GET /api/groups/v1/groupsearch?searchstring=` | grupos |
| `GET /api/games/v1/gamelist` | jogos |

Os dados são fictícios. Para usar dados reais, troque o conteúdo de `handle()` em `server/mock-api.js` por consultas ao seu banco ou API; o formato das respostas é o que o front já espera.

## O que ainda não existe

Só a página inicial foi salva do site original. Links do menu apontam para `#`, e login, trocas, catálogo e páginas de item precisam ser construídos em cima de um backend real.
